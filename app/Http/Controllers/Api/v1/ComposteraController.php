<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use App\Models\Compostera;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;
use Orion\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComposteraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // use DisableAuthorization;
    use DisablePagination;
    protected $model = Compostera::class;


}
