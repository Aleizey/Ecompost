<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Registro extends Model
{
    //
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [

    ];

    /**
     * Get all of the task for the user
     *  
     *@return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all of the task for the user
     *  
     *@return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function registro_antes(): HasMany
    {
        return $this->hasMany(Registro_antes::class);
    }

    public function registro_durantes(): HasMany
    {
        return $this->hasMany(Registro_durante::class);
    }

    public function registro_despues(): HasMany
    {
        return $this->hasMany(Registro_despues::class);
    }
}