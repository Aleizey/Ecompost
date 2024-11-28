<?php

use App\Http\Controllers\Api\v1\ComposteraController;
use App\Http\Controllers\Api\v1\RegistroAntesController;
use App\Http\Controllers\Api\v1\RegistroController;
use App\Http\Controllers\Api\v1\RegistroDespuesController;
use App\Http\Controllers\Api\v1\RegistroDuranteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;
use App\Http\Controllers\Api\v1\CentroController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\BoloController;

Route::group(['as' => 'api.'], function () {
    Orion::resource('centros', CentroController::class);
    Orion::resource('bolos', BoloController::class);
    Orion::resource('compostera', ComposteraController::class);
    Orion::resource('registro', RegistroController::class);
    Orion::resource('registroAntes', RegistroAntesController::class);
    Orion::resource('registroDurante', RegistroDuranteController::class);
    Orion::resource('registroDespues', RegistroDespuesController::class);
});


