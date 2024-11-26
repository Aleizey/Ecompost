<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ciclo extends Model
{
    //
    public function registros(): HasMany
    {
        return $this->HasMany(Registro::class);
    }
}
