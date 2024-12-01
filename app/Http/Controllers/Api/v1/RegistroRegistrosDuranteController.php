<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class RegistroRegistrosDuranteController extends RelationController
{
    /**
     * Display a listing of the resource.
     */

     use DisableAuthorization;
     protected $model = Registro::class;
 
     protected $relation = 'registrosDurante';
}
