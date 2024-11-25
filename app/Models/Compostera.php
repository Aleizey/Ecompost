<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;
use \Illuminate\Database\Eloquent\Relations\HasMany;

class Compostera extends Model
{
    //

    /**
     * Get all of the task for the user
     *  
     *@return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function registros(): HasMany
    {
        return $this->hasMany(Registro::class);
    }

    /**
     * Get all of the task for the user
     *  
     *@return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function centros(): BelongsTo
    {
        return $this->belongsTo(Centro::class);
    }

}
