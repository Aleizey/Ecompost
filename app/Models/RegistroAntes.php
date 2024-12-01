<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistroAntes extends Model
{

    use HasFactory;
    protected $fillable = [
        'temperatura_ambiente',
        'temperatura_compostera',
        'olor',
        'ciclo_id',
        'presencia_insectos',
        'humedad',
        'fotografias_iniciales',
        'observaciones_iniciales',
        'registro_id',
    ];

    public function registros(): BelongsTo
    {
        return $this->belongsTo(Registro::class , 'registro_id');
    }

}
