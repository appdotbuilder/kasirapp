<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sales = Sale::query()
            ->with(['user', 'saleItems.product'])
            ->when($request->search, function ($query, $search) {
                $query->where('invoice_number', 'like', "%{$search}%");
            })
            ->when($request->cashier, function ($query, $cashier) {
                $query->where('user_id', $cashier);
            })
            ->when($request->payment_method, function ($query, $method) {
                $query->where('payment_method', $method);
            })
            ->when($request->date_from, function ($query, $date) {
                $query->whereDate('created_at', '>=', $date);
            })
            ->when($request->date_to, function ($query, $date) {
                $query->whereDate('created_at', '<=', $date);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $cashiers = User::byRole('kasir')->active()->get();

        return Inertia::render('sales/index', [
            'sales' => $sales,
            'cashiers' => $cashiers,
            'filters' => $request->only(['search', 'cashier', 'payment_method', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load(['user', 'saleItems.product.category']);

        return Inertia::render('sales/show', [
            'sale' => $sale,
        ]);
    }
}