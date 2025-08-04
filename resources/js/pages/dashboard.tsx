import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { 
    ShoppingCart, 
    Package, 
    TrendingUp, 
    AlertTriangle, 
    DollarSign,
    Calendar,
    BarChart3
} from 'lucide-react';

interface Sale {
    id: number;
    invoice_number: string;
    total_amount: number;
    payment_method: string;
    created_at: string;
    user: {
        name: string;
    };
    sale_items: Array<{
        quantity: number;
        product: {
            name: string;
        };
    }>;
}

interface Product {
    id: number;
    name: string;
    stock_quantity: number;
    min_stock_level: number;
    category: {
        name: string;
    };
}

interface Stats {
    todaySales: number;
    monthSales: number;
    totalProducts: number;
    lowStockProducts: number;
    totalCategories: number;
}

interface Props {
    stats: Stats;
    recentSales: Sale[];
    lowStockAlerts: Product[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentSales, lowStockAlerts }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppShell>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome to KasirApp - Your POS Command Center</p>
                    </div>
                    <Link href="/pos">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Start New Sale
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(stats.todaySales)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(stats.monthSales)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.totalProducts}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Package className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Categories</p>
                                    <p className="text-2xl font-bold text-indigo-600">{stats.totalCategories}</p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link href="/pos">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardContent className="p-6 text-center">
                                <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold">New Sale</h3>
                                <p className="text-sm opacity-90">Start POS Transaction</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/products">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardContent className="p-6 text-center">
                                <Package className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold">Products</h3>
                                <p className="text-sm opacity-90">Manage Inventory</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/sales">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            <CardContent className="p-6 text-center">
                                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold">Sales</h3>
                                <p className="text-sm opacity-90">View Transactions</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/reports">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                            <CardContent className="p-6 text-center">
                                <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold">Reports</h3>
                                <p className="text-sm opacity-90">Sales Analytics</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2" />
                                Recent Sales
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentSales.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No sales today</p>
                                    <p className="text-sm">Start your first transaction!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentSales.map(sale => (
                                        <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">{sale.invoice_number}</p>
                                                <p className="text-sm text-gray-600">
                                                    {sale.user.name} • {formatDate(sale.created_at)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {sale.sale_items.reduce((sum, item) => sum + item.quantity, 0)} items
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">
                                                    {formatCurrency(sale.total_amount)}
                                                </p>
                                                <Badge variant="outline" className="text-xs">
                                                    {sale.payment_method}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href="/sales" className="block">
                                        <Button variant="outline" className="w-full">
                                            View All Sales
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Low Stock Alerts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                                Low Stock Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {lowStockAlerts.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>All products in stock</p>
                                    <p className="text-sm">No low stock alerts</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {lowStockAlerts.map(product => (
                                        <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-gray-600">{product.category.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="destructive">
                                                    {product.stock_quantity} left
                                                </Badge>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Min: {product.min_stock_level}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href="/products?low_stock=1" className="block">
                                        <Button variant="outline" className="w-full">
                                            Manage Inventory
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}