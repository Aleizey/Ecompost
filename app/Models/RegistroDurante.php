<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistroDurante extends Model
{

    use HasFactory;
    protected $fillable = [
        'riego',
        'revolver',
        'litros_verde',
        'tipo_aporte_verde',
        'aporte_seco',
        'tipo_aporte_seco',
        'fotografias_durante',
        'observaciones_durante',
        'registro_id',
    ];

    public function registros(): BelongsTo
    {
        return $this->belongsTo(Registro::class , 'registro_id');
    }
}
