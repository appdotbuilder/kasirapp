<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreSetting>
 */
class StoreSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'store_name' => fake()->company(),
            'store_address' => fake()->address(),
            'store_phone' => fake()->phoneNumber(),
            'store_email' => fake()->companyEmail(),
            'tax_rate' => fake()->randomFloat(2, 0, 15),
            'receipt_header' => fake()->sentence(),
            'receipt_footer' => fake()->sentence(),
            'currency' => fake()->randomElement(['IDR', 'USD', 'EUR']),
            'printer_name' => fake()->optional()->word(),
            'printer_settings' => [
                'paper_width' => fake()->randomElement([58, 80]),
                'font_size' => fake()->numberBetween(8, 14),
                'line_spacing' => fake()->randomFloat(1, 1.0, 2.0),
            ],
        ];
    }
}