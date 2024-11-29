<?php

namespace Database\Seeders;

use App\Models\Centro;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CentrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $centro = new Centro();
        $centro->nombre = "Majada Marcial";
        $centro->direccion = "Puerto del Rosario Las Palmas";
        $centro->responsable = "Alejadro";
        $centro->codigo ="01";
        $centro->save();

        $centro2 = new Centro();
        $centro2->nombre = "San Diego De Alchala";
        $centro2->direccion = "Puerto del Rosario Las Palmas";
        $centro2->responsable = "Razuk";
        $centro2->codigo ="02";
        $centro2->save();
    }
}
