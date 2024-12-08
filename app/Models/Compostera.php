<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;
use \Illuminate\Database\Eloquent\Relations\HasMany;

class Compostera extends Model
{

    protected $fillable = [
        'tipo',
        'imagen',
        'ocupado',
    ];
    
    public function registros(): HasMany
    {
        return $this->hasMany(Registro::class);
    }

    public function ciclos(): HasMany
    {
        return $this->hasMany(Ciclo::class, 'compostera_id'); 
    }
    
    public function centros(): BelongsTo
    {
        return $this->belongsTo(Centro::class , 'centro_id', 'id');
    }

}
