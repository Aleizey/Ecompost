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
        Schema::create('registros', function (Blueprint $table) {
            $table->id();
            $table->dateTime('fecha_hora');
            $table->boolean('inicio_ciclo');
            $table->bigInteger('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('compostera_id')->unsigned()->index();
            $table->foreign('compostera_id')->references('id')->on('composteras')->onDelete('cascade');
            $table->bigInteger('ciclo_id')->unsigned()->index();
            $table->foreign('ciclo_id')->references('id')->on('ciclos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registros');
    }
};
