<?php

namespace Database\Seeders;

use App\Models\Registro;
use App\Models\RegistroAntes;
use App\Models\RegistroDespues;
use App\Models\RegistroDurante;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            CentrosSeeder::class,
            UsersSeeder::class,
            ComposteraSeeder::class,
            BoloSeeder::class,
            CicloSeeder::class,
        ]);

        User::factory(5)->create();
        Registro::factory()->count(20)->create();
        RegistroAntes::factory()->count(20)->create();
        RegistroDurante::factory()->count(20)->create();
        RegistroDespues::factory()->count(20)->create();

    }
}
