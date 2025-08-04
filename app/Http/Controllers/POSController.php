<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $products = Product::with('category')
            ->active()
            ->get();
            
        $categories = Product::with('category')
            ->active()
            ->get()
            ->pluck('category')
            ->unique('id')
            ->values();

        $storeSettings = StoreSetting::first();

        return Inertia::render('pos/index', [
            'products' => $products,
            'categories' => $categories,
            'storeSettings' => $storeSettings,
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.discount_amount' => 'nullable|numeric|min:0',
            'payment_method' => 'required|in:cash,card,transfer,ewallet',
            'amount_paid' => 'required|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $storeSettings = StoreSetting::first();
            $taxRate = $storeSettings ? $storeSettings->tax_rate : 0;

            // Calculate totals
            $subtotal = 0;
            $totalDiscount = (float) ($request->discount_amount ?? 0);

            foreach ($request->items as $item) {
                $itemTotal = $item['quantity'] * $item['unit_price'];
                $itemDiscount = (float) ($item['discount_amount'] ?? 0);
                $subtotal += $itemTotal - $itemDiscount;
                $totalDiscount += $itemDiscount;
            }

            $taxAmount = $subtotal * ($taxRate / 100);
            $totalAmount = $subtotal + $taxAmount;
            $changeAmount = max(0, $request->amount_paid - $totalAmount);

            // Generate invoice number
            $invoiceNumber = 'INV-' . date('Ymd') . '-' . str_pad((string)(Sale::whereDate('created_at', today())->count() + 1), 4, '0', STR_PAD_LEFT);

            // Create sale
            $sale = Sale::create([
                'invoice_number' => $invoiceNumber,
                'user_id' => auth()->id(),
                'subtotal' => $subtotal,
                'discount_amount' => $totalDiscount,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'amount_paid' => $request->amount_paid,
                'change_amount' => $changeAmount,
                'notes' => $request->notes,
            ]);

            // Create sale items and update stock
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Check if enough stock
                if ($product->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                // Create sale item
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'discount_amount' => $item['discount_amount'] ?? 0,
                    'total_price' => ($item['quantity'] * $item['unit_price']) - ($item['discount_amount'] ?? 0),
                ]);

                // Update product stock
                $product->decrement('stock_quantity', $item['quantity']);
            }

            DB::commit();

            return Inertia::render('pos/receipt', [
                'sale' => $sale->load(['saleItems.product', 'user']),
                'storeSettings' => $storeSettings,
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            
            return back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }


}