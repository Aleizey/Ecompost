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

        //ciclos de la compostera 4
        //fechas 
        
        $C4FechaInicio1 = Carbon::create(2024, 10, 1);
        $C4FechaInicio2 = Carbon::create(2022, 11, 1);
        $C4FechaInicio3 = Carbon::create(2022, 12, 1);

        $ciclo1C4 = new Ciclo();
        $ciclo1C4->fecha_inicio = $C4FechaInicio1;
        $ciclo1C4->fecha_final = $C4FechaInicio2;
        $ciclo1C4->compostera_id = 1;
        $ciclo1C4->bolo_id = 4;
        $ciclo1C4->save();

        $ciclo2C4 = new Ciclo();
        $ciclo2C4->fecha_inicio = $C4FechaInicio2;
        $ciclo2C4->fecha_final = $C4FechaInicio3;
        $ciclo2C4->compostera_id = 1;
        $ciclo2C4->bolo_id = 4;
        $ciclo2C4->save();
        
        $ciclo3C4 = new Ciclo();
        $ciclo3C4->fecha_inicio = $C4FechaInicio3;
        $ciclo3C4->compostera_id = 1;
        $ciclo3C4->bolo_id = 4;
        $ciclo3C4->save();

        //ciclos de la compostera 5
        //fechas 

        $C5FechaInicio2 = Carbon::create(2024, 11, 5);
        $C5FechaInicio3 = Carbon::create(2022, 12, 5);

        $ciclo1C5 = new Ciclo();
        $ciclo1C5->fecha_inicio = $C5FechaInicio2;
        $ciclo1C5->fecha_final = $C5FechaInicio3;
        $ciclo1C5->compostera_id = 1;
        $ciclo1C5->bolo_id = 5;
        $ciclo1C5->save();

        $ciclo2C5 = new Ciclo();
        $ciclo2C5->fecha_inicio = $C5FechaInicio3;
        $ciclo2C5->compostera_id = 2;
        $ciclo2C5->bolo_id = 5;
        $ciclo2C5->save();

        //ciclos de la compostera 6
        //fechas 

        $C5FechaInicio1 = Carbon::create(2024, 12, 3);

        $ciclo1 = new Ciclo();
        $ciclo1->fecha_inicio = $C5FechaInicio1;
        $ciclo1->compostera_id = 1;
        $ciclo1->bolo_id = 6;
        $ciclo1->save();

    }
}
