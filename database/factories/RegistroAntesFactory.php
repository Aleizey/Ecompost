<?php

namespace Database\Factories;

use App\Models\RegistroAntes;
use App\Models\Registro;
use Illuminate\Database\Eloquent\Factories\Factory;

class RegistroAntesFactory extends Factory
{
    protected $model = RegistroAntes::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'temperatura_ambiente' => $this->faker->randomFloat(1, 15, 35),
            'temperatura_compostera' => $this->faker->randomFloat(1, 20, 50),
            'olor' => $this->faker->randomElement(['Podrido', 'Sin olor malo', 'Sin olor', 'Con olor bueno', 'Aromatico']),
            'presencia_insectos' => $this->faker->boolean(),
            'humedad' => $this->faker->randomElement(['Exceso', 'Buena', 'Defecto']),
            'fotografias_iniciales' => $this->faker->imageUrl(),
            'observaciones_iniciales' => $this->faker->sentence(),
            'registro_id' => Registro::doesntHave('registro_antes')->inRandomOrder()->first()?->id,
        ];
    }
}
