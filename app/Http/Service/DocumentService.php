<?php


namespace App\Http\Service;

use App\Http\Enum\IsDeleted;
use App\Http\Enum\Role;
use App\Http\Enum\TrackStatus;
use Illuminate\Support\Str;
use App\Models\Document;
use Illuminate\Support\Facades\Auth;

class DocumentService {


    public function all(?string $search) {

        $user = Auth::user();


        $documents = Document::with(['documentType', 'user', 'latestTrack'])
            ->when($search, function ($query) use ($search) {
                $query->whereAny(['id','name', 'description'], 'LIKE', "%{$search}%")
                        ->orWhereHas('documentType', fn($q) => $q->where('name', 'LIKE', "%{$search}%"))
                        ->orWhereHas('user', fn($q) =>
                            $q->whereAny(['first_name', 'last_name'], 'LIKE', "%{$search}%")
                        )
                        ->orWhereHas('latestTrack', function($query) use($search) {
                            $query->where('status', 'LIKE', "{$search}");
                        });

            })
            ->when($user->role === Role::USER->value, function ($query) use ($user) {
                $query->whereHas('tracks', fn($q) => $q->where('user_id', $user->id));
            })
            ->isNotDeleted()
            ->paginate(10)
            ->withQueryString();

        return $documents;
    }

    public function create(array $data) {

        $trackService = app(TrackService::class);

        $document = Document::create([
            "id" => Str::random(10),
            "user_id" => Auth::user()->id,
            "document_type_id" => $data['type'],
            "name" => $data["name"],
            "description" => $data["description"],
            "others" => $data["others"]
        ]);

        $trackService->create([
            "user" => $document->user->id,
            "document" => $document->id,
            "status" => TrackStatus::CREATED->value
        ]);
    }

    public function find(string $id) {
        return Document::with( [
            'documentType',
            'tracks' => function($query) {
                $query->latest();
            },
            'tracks.user',
            'tracks.user.department'])
        ->find($id);
    }

    public function update(string $id, array $data) {
        $document = Document::findOrFail($id);

        $document->update([
            "document_type_id" => $data['type'],
            "name" => $data["name"],
            "description" => $data["description"],
        ]);
    }

    public function delete(string $id) {
        $document = Document::findOrFail($id);

        $document->update([
            'is_deleted' => IsDeleted::YES->value,
        ]);
    }


    public function findMany (?array $ids = null){


        return  Document::with([
                'documentType',
                'tracks' => function($query) {
                    $query->latest();
                },
                'tracks.user',
                'tracks.user.department'])
                    ->when($ids, function ($query) use ($ids) {
                        $query->whereIn('id',$ids);
                    })
                    ->isNotDeleted()
                    ->get();

    }
}
