<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsAdminOrStaff;
use App\Http\Middleware\IsAdminOrStaffOrOwner;
use App\Http\Middleware\IsOwnerAccount;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::get('/login', [AuthController::class, 'index'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.users');
});


Route::middleware(['auth'])->group(function (){

    Route::get('/reports', [ReportController::class, 'index'])->name('reports');

    Route::get('/documents', [DocumentController::class, 'index'])->name('documents');


    Route::post('/tracks/{id}', [TrackController::class, 'store'])->name('tracks.create');


    Route::middleware(IsAdminOrStaff::class)->group(function() {
        Route::get('/dashboard',[DashboardController::class, 'index'])->name('dashboard');

        //users
        Route::get('/users', [UserController::class, 'index'])->name('users.users');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');

        Route::put('/users/password/{id}', [UserController::class, 'updatePassword'])->name('users.updatePassword');

        //departments
        Route::get('/departments', [DepartmentController::class, 'index'])->name('departments');
        Route::post('/departments', [DepartmentController::class, 'store'])->name('departments.store');
        Route::put('/departments/{id}', [DepartmentController::class, 'update'])->name('departments.update');
    });

    Route::middleware(IsAdminOrStaffOrOwner::class)->group(function() {

        //users
        Route::get('/users/{id}', [UserController::class, 'user'])->name('users.user');
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');


        Route::put('/documents/{id}', [DocumentController::class, 'update'])->name('documents.update');
    });


    Route::middleware(IsAdmin::class)->group(function() {

        Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');

        Route::delete('/departments/{id}', [DepartmentController::class, 'delete'])->name('departments.delete');

        Route::delete('/documents/{id}', [DocumentController::class, 'delete'])->name('documents.delete');
    });

    //users
    Route::put('/user/account/{id}', [UserController::class, 'updateUserPassword'])->name('users.account')->middleware(IsOwnerAccount::class);

    //documents

    Route::get('/documents/tracks/{id}', [DocumentController::class, 'tracks'])->name('documents.tracks');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    //tracks

    Route::get('/tracks', [TrackController::class, 'index'])->name('tracks');

    // Route::post('/tracks/received/{id}', [TrackController::class, 'recived'])->name('tracks.received');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout.users');

});



