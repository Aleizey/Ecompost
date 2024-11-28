<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use Orion\Http\Controllers\Controller;
use App\Models\RegistroAntes;
use Illuminate\Http\Request;

class RegistroAntesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $model = RegistroAntes::class; 
}
