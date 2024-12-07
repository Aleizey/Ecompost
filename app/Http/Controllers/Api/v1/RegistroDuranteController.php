<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use Orion\Concerns\DisablePagination;
use Orion\Http\Controllers\Controller;
use App\Models\RegistroDespues;
use Illuminate\Http\Request;

class RegistroDuranteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use DisablePagination;
    protected $model = RegistroDespues::class; 

}
