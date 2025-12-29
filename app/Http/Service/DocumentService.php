<?php


namespace App\Http\Service;

use App\Http\Enum\IsDeleted;
use App\Http\Enum\Role;
use App\Http\Enum\TrackStatus;
use Illuminate\Support\Str;
use App\Models\Document;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DocumentService {


    public function all(
        ?string $search = null,
        ?string $type = null,
        ?string $status = null,
        ?string $date = null,
        ?string $department = null,
        ?bool $showTracks = false,
        ?bool $isPaginate = true
        ) {

        $user = Auth::user();


        $documents = Document::with(['documentType', 'user.department', 'latestTrack'])
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
            ->when($type, function ( $query) use($type) {
                $query->whereHas('documentType', function ($query) use($type) {
                    $query->where('name',  $type);
                });
            })
            ->when($status, function ($query) use($status) {
                $query->whereHas('latestTrack', function ($query) use($status) {
                    $query->where('status',  $status);
                });
            })
            ->when($date, function ($query) use($date) {
                $start = Carbon::createFromFormat('m/d/Y', $date)->startOfDay();
                $end   = Carbon::createFromFormat('m/d/Y', $date)->endOfDay();

                $query->whereBetween('created_at', [$start, $end]);
            })
            ->when($showTracks, function ($query) {
                    $query->with([
                        'tracks' => function ($query) {
                            $query->latest()->with('user.department');
                        }
                    ]);
            })
            ->when($department, function ($query) use ($department){
                $query->whereHas('user', function ($query) use($department) {
                    $query->whereHas('department', function ($query) use($department){
                        $query->where('name', $department);
                    });
                });
            })
            ->isNotDeleted();

        $documents = $isPaginate ? $documents->paginate(10)->withQueryString() : $documents->get();


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
