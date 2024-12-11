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
        Schema::create('registro_despues', function (Blueprint $table) {
            $table->id();
            $table->float('nivel_llenado_final')->nullable();
            $table->string('fotografias_final')->nullable();
            $table->text('observaciones_final')->nullable();
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
        Schema::dropIfExists('registro_despues');
    }
};
