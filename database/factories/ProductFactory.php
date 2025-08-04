<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $wholesalePrice = fake()->randomFloat(2, 10000, 500000);
        $retailPrice = $wholesalePrice * fake()->randomFloat(2, 1.2, 2.0);
        $resellerPrice = $wholesalePrice * fake()->randomFloat(2, 1.1, 1.5);
        
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'sku' => fake()->unique()->bothify('SKU-####-????'),
            'barcode' => fake()->optional()->numerify('##############'),
            'category_id' => Category::factory(),
            'wholesale_price' => $wholesalePrice,
            'retail_price' => $retailPrice,
            'reseller_price' => $resellerPrice,
            'stock_quantity' => fake()->numberBetween(0, 100),
            'min_stock_level' => fake()->numberBetween(5, 20),
            'unit' => fake()->randomElement(['pcs', 'pack', 'box', 'bottle', 'kg', 'liter']),
            'is_active' => fake()->boolean(95), // 95% chance of being active
        ];
    }
}