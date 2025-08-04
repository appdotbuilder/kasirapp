<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $categories = Category::all();
        
        $products = [
            // Electronics
            [
                'name' => 'Smartphone Android',
                'description' => 'Latest Android smartphone with high-resolution camera',
                'sku' => 'ELEC-PHONE-001',
                'barcode' => '1234567890123',
                'category_id' => $categories->where('slug', 'electronics')->first()->id,
                'wholesale_price' => 2000000,
                'retail_price' => 2500000,
                'reseller_price' => 2300000,
                'stock_quantity' => 25,
                'min_stock_level' => 5,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            [
                'name' => 'Wireless Headphones',
                'description' => 'Bluetooth wireless headphones with noise cancellation',
                'sku' => 'ELEC-HEAD-001',
                'barcode' => '1234567890124',
                'category_id' => $categories->where('slug', 'electronics')->first()->id,
                'wholesale_price' => 300000,
                'retail_price' => 450000,
                'reseller_price' => 400000,
                'stock_quantity' => 50,
                'min_stock_level' => 10,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            [
                'name' => 'Laptop Charger',
                'description' => 'Universal laptop charger with multiple tips',
                'sku' => 'ELEC-CHAR-001',
                'barcode' => '1234567890125',
                'category_id' => $categories->where('slug', 'electronics')->first()->id,
                'wholesale_price' => 150000,
                'retail_price' => 200000,
                'reseller_price' => 180000,
                'stock_quantity' => 3, // Low stock
                'min_stock_level' => 5,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            
            // Clothing
            [
                'name' => 'Cotton T-Shirt',
                'description' => 'Comfortable cotton t-shirt available in multiple colors',
                'sku' => 'CLOT-TSHIRT-001',
                'barcode' => '1234567890126',
                'category_id' => $categories->where('slug', 'clothing')->first()->id,
                'wholesale_price' => 45000,
                'retail_price' => 75000,
                'reseller_price' => 65000,
                'stock_quantity' => 100,
                'min_stock_level' => 20,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            [
                'name' => 'Denim Jeans',
                'description' => 'Premium denim jeans with comfortable fit',
                'sku' => 'CLOT-JEANS-001',
                'barcode' => '1234567890127',
                'category_id' => $categories->where('slug', 'clothing')->first()->id,
                'wholesale_price' => 150000,
                'retail_price' => 250000,
                'reseller_price' => 220000,
                'stock_quantity' => 2, // Low stock
                'min_stock_level' => 10,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            
            // Food & Beverages
            [
                'name' => 'Instant Coffee',
                'description' => 'Premium instant coffee blend',
                'sku' => 'FOOD-COFFEE-001',
                'barcode' => '1234567890128',
                'category_id' => $categories->where('slug', 'food-beverages')->first()->id,
                'wholesale_price' => 25000,
                'retail_price' => 35000,
                'reseller_price' => 32000,
                'stock_quantity' => 150,
                'min_stock_level' => 30,
                'unit' => 'pack',
                'is_active' => true,
            ],
            [
                'name' => 'Mineral Water 600ml',
                'description' => 'Pure mineral water in convenient bottle',
                'sku' => 'FOOD-WATER-001',
                'barcode' => '1234567890129',
                'category_id' => $categories->where('slug', 'food-beverages')->first()->id,
                'wholesale_price' => 3000,
                'retail_price' => 5000,
                'reseller_price' => 4000,
                'stock_quantity' => 200,
                'min_stock_level' => 50,
                'unit' => 'bottle',
                'is_active' => true,
            ],
            
            // Home & Garden
            [
                'name' => 'LED Light Bulb',
                'description' => 'Energy efficient LED light bulb 12W',
                'sku' => 'HOME-LED-001',
                'barcode' => '1234567890130',
                'category_id' => $categories->where('slug', 'home-garden')->first()->id,
                'wholesale_price' => 35000,
                'retail_price' => 50000,
                'reseller_price' => 45000,
                'stock_quantity' => 75,
                'min_stock_level' => 15,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            
            // Books & Stationery
            [
                'name' => 'Notebook A5',
                'description' => 'Spiral notebook with 100 pages',
                'sku' => 'BOOK-NOTE-001',
                'barcode' => '1234567890131',
                'category_id' => $categories->where('slug', 'books-stationery')->first()->id,
                'wholesale_price' => 15000,
                'retail_price' => 25000,
                'reseller_price' => 22000,
                'stock_quantity' => 4, // Low stock
                'min_stock_level' => 20,
                'unit' => 'pcs',
                'is_active' => true,
            ],
            [
                'name' => 'Ballpoint Pen Set',
                'description' => 'Set of 5 ballpoint pens in different colors',
                'sku' => 'BOOK-PEN-001',
                'barcode' => '1234567890132',
                'category_id' => $categories->where('slug', 'books-stationery')->first()->id,
                'wholesale_price' => 12000,
                'retail_price' => 20000,
                'reseller_price' => 18000,
                'stock_quantity' => 80,
                'min_stock_level' => 25,
                'unit' => 'set',
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}