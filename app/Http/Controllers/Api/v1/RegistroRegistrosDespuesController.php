<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;

use App\Models\Registro;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;
use Orion\Http\Controllers\RelationController;

class RegistroRegistrosDespuesController extends RelationController
{
    /**
     * Display a listing of the resource.
     */
    // use DisableAuthorization;
    use DisablePagination;
    protected $model = Registro::class;

    protected $relation = 'registro_despues';
}
