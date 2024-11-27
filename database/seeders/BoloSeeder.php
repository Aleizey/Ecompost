<?php

namespace Database\Seeders;

use App\Models\Bolo;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BoloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fechas completas
        $fechasCompletas = [
            ['nombre' => 'Primer bolo', 'fecha_inicio' => Carbon::create(2022, 1, 12), 'fecha_final' => Carbon::create(2022, 4, 12)],
            ['nombre' => 'Segundo bolo', 'fecha_inicio' => Carbon::create(2023, 2, 22), 'fecha_final' => Carbon::create(2023, 5, 22)],
            ['nombre' => 'Tercer bolo', 'fecha_inicio' => Carbon::create(2024, 3, 4), 'fecha_final' => Carbon::create(2024, 6, 4)],
        ];

        // Fechas sin finalizar
        $fechasSinFinal = [
            ['nombre' => 'Cuarto bolo', 'fecha_inicio' => Carbon::create(2024, 10, 1)],
            ['nombre' => 'Quinto bolo', 'fecha_inicio' => Carbon::create(2024, 11, 5)],
            ['nombre' => 'Sexto bolo', 'fecha_inicio' => Carbon::create(2024, 12, 3)],
        ];

        // Crear bolos con fechas completas
        foreach ($fechasCompletas as $data) {
            $bolo = new Bolo();
            $bolo->nombre = $data['nombre'];
            $bolo->fecha_inicio = $data['fecha_inicio'];
            $bolo->fecha_final = $data['fecha_final'];
            $bolo->save();
        }

        // Crear bolos sin fecha final
        foreach ($fechasSinFinal as $data) {
            $bolo = new Bolo();
            $bolo->nombre = $data['nombre'];
            $bolo->fecha_inicio = $data['fecha_inicio'];
            $bolo->comentario = 'sin terminar';
            $bolo->save();
        }
    }
}
