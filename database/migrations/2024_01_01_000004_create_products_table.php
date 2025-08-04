<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->string('sku')->unique()->comment('Stock Keeping Unit');
            $table->string('barcode')->unique()->nullable()->comment('Product barcode');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->decimal('wholesale_price', 10, 2)->comment('Wholesale price');
            $table->decimal('retail_price', 10, 2)->comment('Retail price');
            $table->decimal('reseller_price', 10, 2)->comment('Reseller price');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->integer('min_stock_level')->default(5)->comment('Minimum stock alert level');
            $table->string('unit')->default('pcs')->comment('Unit of measurement');
            $table->string('image')->nullable()->comment('Product image path');
            $table->boolean('is_active')->default(true)->comment('Whether the product is active');
            $table->timestamps();
            
            $table->index('category_id');
            $table->index('is_active');
            $table->index('sku');
            $table->index('barcode');
            $table->index(['stock_quantity', 'min_stock_level']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};