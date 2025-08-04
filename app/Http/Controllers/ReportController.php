<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    /**
     * Display sales reports.
     */
    public function index(Request $request)
    {
        $request->validate([
            'type' => 'nullable|in:daily,monthly',
            'date' => 'nullable|date',
            'cashier_id' => 'nullable|exists:users,id',
            'payment_method' => 'nullable|in:cash,card,transfer,ewallet',
        ]);

        $type = $request->get('type', 'daily');
        $date = $request->get('date', today()->format('Y-m-d'));

        $query = Sale::with(['user', 'saleItems.product']);

        if ($type === 'daily') {
            $query->whereDate('created_at', $date);
        } else {
            $dateCarbon = Carbon::parse($date);
            $query->whereMonth('created_at', $dateCarbon->month)
                  ->whereYear('created_at', $dateCarbon->year);
        }

        if ($request->cashier_id) {
            $query->where('user_id', $request->cashier_id);
        }

        if ($request->payment_method) {
            $query->where('payment_method', $request->payment_method);
        }

        $sales = $query->get();

        $summary = [
            'total_sales' => $sales->count(),
            'total_amount' => $sales->sum('total_amount'),
            'total_discount' => $sales->sum('discount_amount'),
            'total_tax' => $sales->sum('tax_amount'),
            'payment_methods' => $sales->groupBy('payment_method')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'amount' => $group->sum('total_amount'),
                ];
            }),
        ];

        return Inertia::render('reports/index', [
            'sales' => $sales,
            'summary' => $summary,
            'filters' => $request->only(['type', 'date', 'cashier_id', 'payment_method']),
            'cashiers' => User::byRole('kasir')->active()->get(),
        ]);
    }
}