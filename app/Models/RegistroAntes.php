<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistroAntes extends Model
{
    //

    public function registros(): BelongsTo
    {
        return $this->belongsTo(Registro::class);
    }

}
