<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Centro extends Model
{

    protected $fillable = [
        'nombre',
        'direccion',
        'responsable',
        'logotipo',
    ];

    public function users(): HasMany
    {
        return $this->HasMany(User::class);
    }

    public function compostera() : HasMany {
        return $this->HasMany(Compostera::class);
    }

}
