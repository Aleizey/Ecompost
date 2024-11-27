<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use Orion\Http\Controllers\Controller;
use App\Models\Bolo;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class BoloController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    use DisableAuthorization;
    protected $model = Bolo::class;
}
