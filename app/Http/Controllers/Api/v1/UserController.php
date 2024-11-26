<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    use DisableAuthorization;
    
    protected $model = User::class;


}
