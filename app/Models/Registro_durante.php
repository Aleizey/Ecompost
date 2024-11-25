<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Registro_durante extends Model
{
    //

    /**
     * Get all of the task for the user
     *  
     *@return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function registros(): BelongsTo
    {
        return $this->belongsTo(Registro::class);
    }
}
