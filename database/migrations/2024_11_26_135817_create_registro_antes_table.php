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
            $table->float('temperatura_ambiente');
            $table->float('temperatura_compostera');
            $table->enum('olor', ['Podrido', 'Sin olor malo', 'Sin olor', 'Con olor bueno', 'Aromatico']);
            $table->boolean('presencia_insectos')->default(0);
            $table->enum('humedad', ['Exceso', 'Buena', 'Defecto']);
            $table->string('fotografias_iniciales');
            $table->text('observaciones_iniciales');
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
