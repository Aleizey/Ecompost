<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use Orion\Concerns\DisablePagination;
use Orion\Http\Controllers\Controller;
use App\Models\RegistroAntes;
use Illuminate\Http\Request;

class RegistroAntesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use DisablePagination;
    protected $model = RegistroAntes::class; 
}
