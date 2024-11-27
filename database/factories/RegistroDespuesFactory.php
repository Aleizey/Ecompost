<?php

namespace Database\Factories;

use App\Models\Registro;
use App\Models\RegistroDespues;
use Illuminate\Database\Eloquent\Factories\Factory;

class RegistroDespuesFactory extends Factory
{
    protected $model = RegistroDespues::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nivel_llenado_final' => $this->faker->randomFloat(2, 0, 10), 
            'fotografias_final' => $this->faker->imageUrl(), 
            'observaciones_final' => $this->faker->sentence(10), 
            'registro_id' => Registro::doesntHave('registro_despues')->inRandomOrder()->first()?->id,
        ];
    }
}
