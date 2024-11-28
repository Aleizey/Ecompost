<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistroDespues extends Model
{

    use HasFactory;
    protected $fillable = [
        'nivel_llenado_final',
        'fotografias_final',
        'observaciones_final',
        'registro_id'
    ];
    
    public function registros(): BelongsTo
    {
        return $this->belongsTo(Registro::class);
    }
}
