import React from 'react';
import { Link } from '@inertiajs/react';

interface Props {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">💰</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">KasirApp</h1>
                                <p className="text-sm text-gray-600">Modern Point of Sale Solution</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <div className="flex space-x-3">
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-6xl mb-4 block">🏪</span>
                    </div>
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Complete POS Solution for
                        <span className="text-blue-600 block">Modern Businesses</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Streamline your sales, manage inventory efficiently, and grow your business with our comprehensive Point of Sale application designed for retailers, restaurants, and service businesses.
                    </p>
                    
                    {!auth?.user && (
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Start Free Trial 🚀
                            </Link>
                            <Link
                                href="/login"
                                className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Product Management</h3>
                        <p className="text-gray-600 mb-4">
                            Complete CRUD operations for products with categorization, stock levels, and multiple pricing tiers (wholesale, retail, reseller).
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Barcode scanning support</li>
                            <li>• Stock level tracking</li>
                            <li>• Low stock alerts</li>
                            <li>• Category management</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <div className="text-4xl mb-4">💳</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Sales Transactions</h3>
                        <p className="text-gray-600 mb-4">
                            Fast and intuitive sales interface with shopping cart, discount management, tax calculations, and multiple payment methods.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Multiple payment methods</li>
                            <li>• Discount & tax handling</li>
                            <li>• Quick product search</li>
                            <li>• Receipt generation</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <div className="text-4xl mb-4">🧾</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Receipt Printing</h3>
                        <p className="text-gray-600 mb-4">
                            Professional receipt printing with thermal printer support and PDF generation for digital receipts.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Thermal printer support</li>
                            <li>• PDF receipt generation</li>
                            <li>• Custom receipt branding</li>
                            <li>• Email receipts</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Sales Reports</h3>
                        <p className="text-gray-600 mb-4">
                            Comprehensive reporting with daily and monthly sales reports, filtering by cashier, and payment method analysis.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Daily & monthly reports</li>
                            <li>• Cashier performance</li>
                            <li>• Payment method analysis</li>
                            <li>• Export capabilities</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <div className="text-4xl mb-4">📈</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Stock Management</h3>
                        <p className="text-gray-600 mb-4">
                            Automatic stock updates upon sales with intelligent low stock alerts to keep your inventory optimized.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Auto stock updates</li>
                            <li>• Low stock notifications</li>
                            <li>• Inventory tracking</li>
                            <li>• Stock level reports</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <div className="text-4xl mb-4">⚙️</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Store Settings</h3>
                        <p className="text-gray-600 mb-4">
                            Configure your store information, branding, tax rates, and printer settings for a personalized experience.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Store branding setup</li>
                            <li>• Tax configuration</li>
                            <li>• Printer settings</li>
                            <li>• User role management</li>
                        </ul>
                    </div>
                </div>

                {/* User Roles Section */}
                <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">👥 User Roles & Permissions</h3>
                        <p className="text-lg text-gray-600">
                            Designed for different user types with specific access levels and capabilities
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-3">👨‍💼</div>
                            <h4 className="font-bold text-gray-900 mb-2">Admin</h4>
                            <p className="text-sm text-gray-600">Full access to all features, user management, and settings</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">👨‍💻</div>
                            <h4 className="font-bold text-gray-900 mb-2">Kasir</h4>
                            <p className="text-sm text-gray-600">Sales transactions and product stock information</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🏬</div>
                            <h4 className="font-bold text-gray-900 mb-2">Reseller</h4>
                            <p className="text-sm text-gray-600">Special pricing access and stock availability</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🤝</div>
                            <h4 className="font-bold text-gray-900 mb-2">Affiliate</h4>
                            <p className="text-sm text-gray-600">Referral tracking and commission reports</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">👤</div>
                            <h4 className="font-bold text-gray-900 mb-2">Consumer</h4>
                            <p className="text-sm text-gray-600">Purchase history and personal portal</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {!auth?.user && (
                    <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business? 🚀</h3>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of businesses already using KasirApp to streamline their operations
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/register"
                                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Start Your Free Trial
                            </Link>
                            <Link
                                href="/login"
                                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Sign In Now
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">💰</span>
                            </div>
                            <span className="text-xl font-bold">KasirApp</span>
                        </div>
                        <p className="text-gray-400">
                            © 2024 KasirApp. Modern POS Solution for Every Business.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}