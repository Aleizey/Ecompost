<?php

// Relationships
use App\Http\Controllers\Api\v1\BoloCiclosController;
// Relations simples
use App\Http\Controllers\Api\v1\BoloController;
use App\Http\Controllers\Api\v1\CentroController;
use App\Http\Controllers\Api\v1\ComposteraController;
use App\Http\Controllers\Api\v1\RegistroController;
use App\Http\Controllers\Api\v1\RegistroAntesController;
use App\Http\Controllers\Api\v1\RegistroDuranteController;
use App\Http\Controllers\Api\v1\RegistroDespuesController;
// others (Orion)
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function () {
    // Todas las tablas (sin cambios)
    Orion::resource('centros', CentroController::class);
    Orion::resource('bolos', BoloController::class);
    Orion::resource('compostera', ComposteraController::class);
    Orion::resource('registro', RegistroController::class);
    Orion::resource('registroAntes', RegistroAntesController::class);
    Orion::resource('registroDurante', RegistroDuranteController::class);
    Orion::resource('registroDespues', RegistroDespuesController::class);
    // Relationships entre las tablas 
    Orion::hasManyResource('bolos', 'ciclos', BoloCiclosController::class);
});


