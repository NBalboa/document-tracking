<?php

namespace App\Http\Controllers;

use App\Http\Enum\TrackStatus;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) {

        $documentsByDepartment = Document::select('departments.name as department_name', DB::raw('COUNT(*) as total'))
            ->join('users', 'documents.user_id', '=', 'users.id')
            ->join('departments', 'users.department_id', '=', 'departments.id')
            ->where('documents.is_deleted', 0)
            ->groupBy('departments.id', 'departments.name')
            ->orderByDesc('total')
            ->get();

        $documentStatus = TrackStatus::values();

        $documentsByLatestStatus = Document::query()
            ->join('tracks', function ($join) {
                $join->on('tracks.document_id', '=', 'documents.id')
                    ->whereRaw('tracks.id = (
                        SELECT t2.id FROM tracks t2
                        WHERE t2.document_id = documents.id
                        ORDER BY t2.created_at DESC
                        LIMIT 1
                    )');
            })
            ->where('documents.is_deleted', 0)
            ->select('tracks.status as latest_status', DB::raw('COUNT(*) as total'))
            ->groupBy('tracks.status')
            ->pluck('total', 'latest_status');


        $documentsByLatestStatus = collect($documentStatus)
        ->map(function ($status) use ($documentsByLatestStatus) {
            return [
                'latest_status' => ucfirst($status),
                'total' => $documentsByLatestStatus[$status] ?? 0,
            ];
        })
        ->values();

        $year = $request->get('year');



        // Get counts by month that actually have records
        $monthlyCounts = Document::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->when($year, function ($query) use ($year) {
                $query->whereYear('created_at', $year);
            })
            ->where('is_deleted', 0)
            ->groupBy(DB::raw('MONTH(created_at)'))

            ->pluck('total', 'month') // [month_number => total]
            ->toArray();

        // Fill missing months with 0 and return { month: "January", total: 0 }
        $allMonths = collect(range(1, 12))->map(function ($month) use ($monthlyCounts) {
            return [
                'month' => Carbon::create()->month($month)->format('F'),
                'total' => $monthlyCounts[$month] ?? 0,
            ];
        });


        $years = Document::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');


        $users = User::isNotDeleted()->count();
        $documents = Document::isNotDeleted()->count();


        return Inertia::render('User/Dashboard/Dashboard', [
            "documentsByDepartment" => $documentsByDepartment,
            "documentsByLatestStatus" => $documentsByLatestStatus,
            "allMonths" => $allMonths,
            "years" => $years,
            "year" => $year,
            "total" => [
                'users' => $users,
                'documents' => $documents,
            ]
        ]);
    }
}
