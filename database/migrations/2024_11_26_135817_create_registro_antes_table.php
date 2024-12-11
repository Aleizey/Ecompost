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
        Schema::create('registro_antes', function (Blueprint $table) {
            $table->id();
            $table->float('temperatura_ambiente')->nullable();
            $table->float('temperatura_compostera')->nullable();
            $table->enum('olor', ['Podrido', 'Sin olor malo', 'Sin olor', 'Con olor bueno', 'Aromatico'])->nullable();
            $table->boolean('presencia_insectos')->default(0)->nullable();
            $table->enum('humedad', ['Exceso', 'Buena', 'Defecto'])->nullable();
            $table->string('fotografias_iniciales')->nullable();
            $table->float('llenado_inicial')->nullable();
            $table->text('observaciones_iniciales')->nullable();
            $table->unsignedBigInteger('registro_id')->index();
            $table->foreign('registro_id')->references('id')->on('registros')->onDelete('cascade');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registro_antes');
    }
};
