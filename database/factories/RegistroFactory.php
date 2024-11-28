<?php

namespace Database\Factories;

use App\Models\Registro;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RegistroFactory extends Factory
{
    protected $model = Registro::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fecha_hora' => Carbon::now()->subDays(rand(1, 30)), 
            'user_id' => $this->faker->numberBetween(1, 6), 
            'compostera_id' => $this->faker->numberBetween(1, 3), 
            'ciclo_id' => $this->faker->numberBetween(10, 15), 
        ];
    }
}
