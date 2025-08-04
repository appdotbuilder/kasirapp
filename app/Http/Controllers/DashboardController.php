<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Get dashboard statistics
        $todaySales = Sale::today()->sum('total_amount');
        $monthSales = Sale::thisMonth()->sum('total_amount');
        $totalProducts = Product::active()->count();
        $lowStockProducts = Product::lowStock()->count();
        $totalCategories = Category::active()->count();
        
        // Get recent sales
        $recentSales = Sale::with(['user', 'saleItems.product'])
            ->latest()
            ->take(5)
            ->get();
            
        // Get low stock alerts
        $lowStockAlerts = Product::with('category')
            ->lowStock()
            ->active()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'todaySales' => $todaySales,
                'monthSales' => $monthSales,
                'totalProducts' => $totalProducts,
                'lowStockProducts' => $lowStockProducts,
                'totalCategories' => $totalCategories,
            ],
            'recentSales' => $recentSales,
            'lowStockAlerts' => $lowStockAlerts,
        ]);
    }
}