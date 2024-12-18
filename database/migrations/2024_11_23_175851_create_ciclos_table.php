<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ciclos', function (Blueprint $table) {
            $table->id();
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_final')->nullable();
            $table->bigInteger('compostera_id')->unsigned()->index(); 
            $table->foreign('compostera_id')->references('id')->on('composteras' )->onDelete('cascade');
            $table->bigInteger('bolo_id')->unsigned()->index(); 
            $table->foreign('bolo_id')->references('id')->on('bolos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ciclos');
    }
};
