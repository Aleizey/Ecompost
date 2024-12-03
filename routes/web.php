<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', function () {
    return view('users');
})->middleware(['auth', 'verified'])->name('users');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/image', [ProfileController::class, 'updateImage'])->name('profile.update.image');
});

Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});

Route::get('/formulario', function () {
    return view('formulario');
})->middleware(['auth', 'verified'])->name('formulario');


Route::resource('users', UserController::class)
->middleware('can:administrate,App\Models\User');

require __DIR__ . '/auth.php';
