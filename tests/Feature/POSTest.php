<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\StoreSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class POSTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create(['role' => 'kasir']);
        
        $category = Category::factory()->create();
        $this->product = Product::factory()->create([
            'category_id' => $category->id,
            'stock_quantity' => 10,
            'retail_price' => 50000,
        ]);

        StoreSetting::factory()->create([
            'tax_rate' => 11.00,
        ]);
    }

    public function test_can_view_pos_interface(): void
    {
        $response = $this->actingAs($this->user)->get('/pos');

        $response->assertOk()
                ->assertInertia(fn ($page) => $page
                    ->component('pos/index')
                    ->has('products')
                    ->has('categories')
                    ->has('storeSettings')
                );
    }

    public function test_can_create_sale(): void
    {
        $saleData = [
            'items' => [
                [
                    'product_id' => $this->product->id,
                    'quantity' => 2,
                    'unit_price' => $this->product->retail_price,
                    'discount_amount' => 0,
                ]
            ],
            'payment_method' => 'cash',
            'amount_paid' => 150000,
            'discount_amount' => 0,
            'notes' => 'Test sale',
        ];

        $response = $this->actingAs($this->user)->post('/pos', $saleData);

        $response->assertOk();
        
        $this->assertDatabaseHas('sales', [
            'user_id' => $this->user->id,
            'payment_method' => 'cash',
            'amount_paid' => 150000,
        ]);

        $this->assertDatabaseHas('sale_items', [
            'product_id' => $this->product->id,
            'quantity' => 2,
            'unit_price' => $this->product->retail_price,
        ]);

        // Check stock was updated
        $this->product->refresh();
        $this->assertEquals(8, $this->product->stock_quantity);
    }

    public function test_cannot_sell_insufficient_stock(): void
    {
        $saleData = [
            'items' => [
                [
                    'product_id' => $this->product->id,
                    'quantity' => 15, // More than available stock
                    'unit_price' => $this->product->retail_price,
                    'discount_amount' => 0,
                ]
            ],
            'payment_method' => 'cash',
            'amount_paid' => 750000,
            'discount_amount' => 0,
        ];

        $response = $this->actingAs($this->user)->post('/pos', $saleData);

        $response->assertSessionHasErrors();
        
        // Stock should remain unchanged
        $this->product->refresh();
        $this->assertEquals(10, $this->product->stock_quantity);
    }

    public function test_requires_authentication_for_pos(): void
    {
        $response = $this->get('/pos');
        $response->assertRedirect('/login');
    }
}