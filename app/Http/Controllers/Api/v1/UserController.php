<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;
use App\Http\Requests\UserFormRequest;
use App\Models\User;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
use DisableAuthorization;
     
    protected $model = User::class;
    protected $request = UserFormRequest::class;
}
