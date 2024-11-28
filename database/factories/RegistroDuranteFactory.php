<?php

namespace Database\Factories;

use App\Models\Registro;
use App\Models\RegistroDurante;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class RegistroDuranteFactory extends Factory
{
    protected $model = RegistroDurante::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'riego' => $this->faker->boolean(50), 
            'revolver' => $this->faker->boolean(50),
            'litros_verde' => $this->faker->randomFloat(2, 0, 100), 
            'tipo_aporte_verde' => $this->faker->sentence(),
            'aporte_seco' => $this->faker->randomFloat(2, 0, 50),
            'tipo_aporte_seco' => $this->faker->sentence(),
            'fotografias_durante' => $this->faker->imageUrl(640, 480, 'nature', true, 'photo', true),
            'observaciones_durante' => $this->faker->paragraph(),
            'registro_id' => Registro::doesntHave('registro_durantes')->inRandomOrder()->first()?->id,
        ];
    }
}
