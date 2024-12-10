<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use App\Models\Bolo;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;
use Orion\Http\Controllers\RelationController;

class BoloCiclosController extends RelationController
{
    /**
     * Display a listing of the resource.
     */
    // use DisableAuthorization;
    use DisablePagination;
    protected $model = Bolo::class;

    protected $relation = 'ciclos';
}
