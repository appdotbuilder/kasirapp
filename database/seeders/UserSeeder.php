<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin KasirApp',
            'email' => 'admin@kasirapp.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
            'phone' => '+62 81234567890',
            'email_verified_at' => now(),
        ]);

        // Create cashier users
        User::create([
            'name' => 'Kasir Satu',
            'email' => 'kasir1@kasirapp.com',
            'password' => Hash::make('password'),
            'role' => 'kasir',
            'is_active' => true,
            'phone' => '+62 81234567891',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Kasir Dua',
            'email' => 'kasir2@kasirapp.com',
            'password' => Hash::make('password'),
            'role' => 'kasir',
            'is_active' => true,
            'phone' => '+62 81234567892',
            'email_verified_at' => now(),
        ]);

        // Create reseller user
        User::create([
            'name' => 'Reseller Mitra',
            'email' => 'reseller@kasirapp.com',
            'password' => Hash::make('password'),
            'role' => 'reseller',
            'is_active' => true,
            'phone' => '+62 81234567893',
            'email_verified_at' => now(),
        ]);

        // Create affiliate user
        User::create([
            'name' => 'Affiliate Partner',
            'email' => 'affiliate@kasirapp.com',
            'password' => Hash::make('password'),
            'role' => 'affiliate',
            'is_active' => true,
            'phone' => '+62 81234567894',
            'commission_rate' => 5.00, // 5% commission
            'email_verified_at' => now(),
        ]);
    }
}