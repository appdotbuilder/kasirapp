<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Category $category;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create(['role' => 'admin']);
        $this->category = Category::factory()->create();
    }

    public function test_can_view_products_index(): void
    {
        Product::factory()->count(3)->create(['category_id' => $this->category->id]);

        $response = $this->actingAs($this->user)->get('/products');

        $response->assertOk()
                ->assertInertia(fn ($page) => $page
                    ->component('products/index')
                    ->has('products')
                    ->has('categories')
                );
    }

    public function test_can_create_product(): void
    {
        $productData = [
            'name' => 'Test Product',
            'description' => 'Test Description',
            'sku' => 'TEST-001',
            'barcode' => '1234567890',
            'category_id' => $this->category->id,
            'wholesale_price' => 100000,
            'retail_price' => 150000,
            'reseller_price' => 130000,
            'stock_quantity' => 50,
            'min_stock_level' => 10,
            'unit' => 'pcs',
            'is_active' => true,
        ];

        $response = $this->actingAs($this->user)->post('/products', $productData);

        $response->assertRedirect('/products')
                ->assertSessionHas('success');

        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'sku' => 'TEST-001',
            'category_id' => $this->category->id,
        ]);
    }

    public function test_can_update_product(): void
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);

        $updateData = [
            'name' => 'Updated Product Name',
            'description' => $product->description,
            'sku' => $product->sku,
            'category_id' => $this->category->id,
            'wholesale_price' => 200000,
            'retail_price' => 300000,
            'reseller_price' => 250000,
            'stock_quantity' => $product->stock_quantity,
            'min_stock_level' => $product->min_stock_level,
            'unit' => $product->unit,
            'is_active' => true,
        ];

        $response = $this->actingAs($this->user)->put("/products/{$product->id}", $updateData);

        $response->assertRedirect('/products')
                ->assertSessionHas('success');

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product Name',
            'wholesale_price' => 200000,
        ]);
    }

    public function test_can_delete_product(): void
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);

        $response = $this->actingAs($this->user)->delete("/products/{$product->id}");

        $response->assertRedirect('/products')
                ->assertSessionHas('success');

        $this->assertDatabaseMissing('products', [
            'id' => $product->id,
        ]);
    }

    public function test_requires_authentication_for_products(): void
    {
        $response = $this->get('/products');
        $response->assertRedirect('/login');
    }
}