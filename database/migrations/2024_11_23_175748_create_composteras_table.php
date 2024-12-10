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
        Schema::create('composteras', function (Blueprint $table) {
            $table->id();
            $table->string('imagen')->nullable();
            $table->enum('tipo', ['11', '22', '33']);
            $table->boolean('ocupado')->default(0);
            $table->bigInteger('centro_id')->unsigned()->index();
            $table->foreign('centro_id')->references('id')->on('centros')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composteras');
    }
};
