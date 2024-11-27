<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use App\Models\Centro;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;
// use Illuminate\Http\Request;

class CentroController extends Controller
{

    use DisableAuthorization;
    protected $model = Centro::class; 

}
