<?php

namespace Database\Seeders;

use App\Models\Bolo;
use App\Models\Ciclo;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CicloSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener todos los bolos con fecha final
        $bolosConFechaFinal = Bolo::whereNotNull('fecha_final')->get();

        // Recorrer los bolos
        foreach ($bolosConFechaFinal as $bolo) {
            
            $fechaInicio1 = Carbon::parse($bolo->fecha_inicio);
            $fecha_final1 = $fechaInicio1->copy()->addMonth();

            $fechaInicio2 = $fecha_final1;
            $fecha_final2 = $fechaInicio2->copy()->addMonth();

            $fechaInicio3 = $fecha_final2;
            $fecha_final3 = $fechaInicio3->copy()->addMonth();

            // Crear los ciclos asociados al bolo

            // Ciclo 1 - Compostera de aporte (id = 1)
            $ciclo1 = new Ciclo();
            $ciclo1->fecha_inicio = $fechaInicio1;
            $ciclo1->fecha_final = $fecha_final1;
            $ciclo1->compostera_id = 1;
            $ciclo1->bolo_id = $bolo->id;
            $ciclo1->save();

            // Ciclo 2 - Compostera de degradación (id = 2)
            $ciclo2 = new Ciclo();
            $ciclo2->fecha_inicio = $fechaInicio2;
            $ciclo2->fecha_final = $fecha_final2;
            $ciclo2->compostera_id = 2; 
            $ciclo2->bolo_id = $bolo->id;
            $ciclo2->save();

            // Ciclo 3 - Compostera de maduración (id = 3)
            $ciclo3 = new Ciclo();
            $ciclo3->fecha_inicio = $fechaInicio3;
            $ciclo3->fecha_final = $fecha_final3;
            $ciclo3->compostera_id = 3; 
            $ciclo3->bolo_id = $bolo->id;
            $ciclo3->save();
        }
    }
}
