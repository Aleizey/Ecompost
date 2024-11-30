<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bolo extends Model
{
    protected $fillable = [
        'nombre',
        'fecha_inicio',
        'fecha_final',
        'comentario',
        'imagen',
    ];

    protected $attributes = [
        'comentario' => 'sin comentarios',
    ];



    protected static function boot()
    {
        parent::boot();

        static::creating(function ($bolo) {
            $bolo->fecha_inicio = $bolo->fecha_inicio ?? now();
        });
    }


    public function ciclos(): HasMany
    {
        return $this->HasMany(Ciclo::class);
    }
}
