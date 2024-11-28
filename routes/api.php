<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;
use App\Http\Controllers\Api\v1\CentroController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\BoloController;

Route::group(['as' => 'api.'], function () {
    Orion::resource('centros', CentroController::class);
    Orion::resource('bolos', BoloController::class);
});


