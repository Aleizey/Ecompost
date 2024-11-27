<?php

namespace Database\Seeders;

use App\Models\Compostera;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComposteraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Compostera tipo "11"
        $compostera1 = new Compostera();
        $compostera1->tipo = "11";
        $compostera1->centro_id = "1";
        $compostera1->save();

        // Compostera tipo "22"
        $compostera2 = new Compostera();
        $compostera2->tipo = "22";
        $compostera2->centro_id = "1";
        $compostera2->save();

        // Compostera tipo "33"
        $compostera3 = new Compostera();
        $compostera3->tipo = "33";
        $compostera3->centro_id = "1";
        $compostera3->save();
    }
}
