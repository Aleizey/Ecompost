<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Ciclo;
use Orion\Http\Controllers\RelationController;

class CicloBoloController extends RelationController
{
    /**
     * El modelo principal.
     */
    protected $model = Ciclo::class;

    /**
     * La relación que se gestionará.
     */
    protected $relation = 'bolo';
    
}
