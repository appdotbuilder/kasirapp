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
        Schema::create('store_settings', function (Blueprint $table) {
            $table->id();
            $table->string('store_name')->comment('Store name');
            $table->text('store_address')->nullable()->comment('Store address');
            $table->string('store_phone')->nullable()->comment('Store phone number');
            $table->string('store_email')->nullable()->comment('Store email');
            $table->string('store_logo')->nullable()->comment('Store logo path');
            $table->decimal('tax_rate', 5, 2)->default(0)->comment('Default tax rate percentage');
            $table->string('receipt_header')->nullable()->comment('Custom receipt header text');
            $table->string('receipt_footer')->nullable()->comment('Custom receipt footer text');
            $table->string('currency', 3)->default('IDR')->comment('Currency code');
            $table->string('printer_name')->nullable()->comment('Thermal printer name');
            $table->json('printer_settings')->nullable()->comment('Printer configuration settings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_settings');
    }
};