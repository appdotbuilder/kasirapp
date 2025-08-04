<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50000, 1000000);
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.1);
        $taxAmount = ($subtotal - $discountAmount) * 0.11; // 11% tax
        $totalAmount = $subtotal - $discountAmount + $taxAmount;
        $amountPaid = $totalAmount + fake()->randomFloat(2, 0, 50000); // May have change
        
        return [
            'invoice_number' => 'INV-' . date('Ymd') . '-' . fake()->unique()->numberBetween(1000, 9999),
            'user_id' => User::factory(),
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'payment_method' => fake()->randomElement(['cash', 'card', 'transfer', 'ewallet']),
            'amount_paid' => $amountPaid,
            'change_amount' => $amountPaid - $totalAmount,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}