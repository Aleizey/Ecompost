<?php

namespace App\Http\Controllers\Api\v1;

// use App\Http\Controllers\Controller;

use App\Models\Registro;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class RegistroRegistrosDuranteController extends RelationController
{
    /**
     * Display a listing of the resource.
     */
<<<<<<< HEAD

    //  use DisableAuthorization;
=======
     use DisableAuthorization;
>>>>>>> b6b54c10908cebaf89eb0f63d01c4bb77d046c03
     protected $model = Registro::class;
 
     protected $relation = 'registro_durantes';

}
