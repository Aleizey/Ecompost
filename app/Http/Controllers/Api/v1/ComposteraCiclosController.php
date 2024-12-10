<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Ciclo;
use App\Models\Compostera;
use Orion\Http\Controllers\RelationController;

class ComposteraCiclosController extends RelationController
{
    /**
     * The relation model.
     *
     * @return string
     */
    protected $model = Compostera::class;
    protected $relation = 'ciclos';

    /**
     * Build a base query to filter the relationship.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function buildRelationQuery()
    {
        return parent::buildRelationQuery()->whereNull('fecha_final');
    }
    
}
