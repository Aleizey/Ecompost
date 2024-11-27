<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ciclo extends Model
{

    protected $fillable = [
        'fecha_inicio',
        'fecha_final',
        'compostera_id',
        'bolo_id',
    ];

    // relaciones
    public function registros(): HasMany
    {
        return $this->HasMany(Registro::class);
    }

    public function composteras(): BelongsTo
    {
        return $this->BelongsTo(Compostera::class);
    }

    public function bolos(): BelongsTo
    {
        return $this->BelongsTo(Bolo::class);
    }

}
