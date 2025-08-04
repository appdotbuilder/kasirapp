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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique()->comment('Unique invoice number');
            $table->foreignId('user_id')->constrained();
            $table->decimal('subtotal', 12, 2)->comment('Subtotal before tax and discount');
            $table->decimal('discount_amount', 10, 2)->default(0)->comment('Total discount amount');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Total tax amount');
            $table->decimal('total_amount', 12, 2)->comment('Final total amount');
            $table->enum('payment_method', ['cash', 'card', 'transfer', 'ewallet'])->comment('Payment method used');
            $table->decimal('amount_paid', 12, 2)->comment('Amount paid by customer');
            $table->decimal('change_amount', 10, 2)->default(0)->comment('Change given to customer');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('payment_method');
            $table->index('created_at');
            $table->index(['created_at', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};