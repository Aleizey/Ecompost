<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use App\Models\Ciclo;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class CicloRegistrosController extends RelationController
{
    /**
     * Display a listing of the resource.
     */
    // use DisableAuthorization;
    protected $model = Ciclo::class;

    protected $relation = 'registros';
}
