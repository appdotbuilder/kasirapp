<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and accessories',
                'slug' => 'electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Clothing',
                'description' => 'Apparel and fashion items',
                'slug' => 'clothing',
                'is_active' => true,
            ],
            [
                'name' => 'Food & Beverages',
                'description' => 'Food items and drinks',
                'slug' => 'food-beverages',
                'is_active' => true,
            ],
            [
                'name' => 'Home & Garden',
                'description' => 'Home improvement and garden supplies',
                'slug' => 'home-garden',
                'is_active' => true,
            ],
            [
                'name' => 'Books & Stationery',
                'description' => 'Books, office supplies, and stationery',
                'slug' => 'books-stationery',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}