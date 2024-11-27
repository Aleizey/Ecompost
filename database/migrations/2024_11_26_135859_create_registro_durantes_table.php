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
        Schema::create('registro_durantes', function (Blueprint $table) {
            $table->id();
            $table->boolean('riego')->default(0);
            $table->boolean('revolver')->default(0);
            $table->float('litros_verde');
            $table->text('tipo_aporte_verde');
            $table->float('aporte_seco');
            $table->text('tipo_aporte_seco');
            $table->string('fotografias_durante');
            $table->text('observaciones_durante');
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
        Schema::dropIfExists('registro_durantes');
    }
};
