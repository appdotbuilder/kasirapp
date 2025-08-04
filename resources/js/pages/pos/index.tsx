import React, { useState, useCallback } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { Search, Plus, Minus, ShoppingCart, CreditCard, Banknote, Smartphone, Building2 } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    sku: string;
    barcode?: string;
    retail_price: number;
    stock_quantity: number;
    unit: string;
    category: {
        id: number;
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
}

interface CartItem extends Product {
    quantity: number;
    discount_amount: number;
}

interface StoreSetting {
    store_name: string;
    tax_rate: number;
    currency: string;
}

interface Props {
    products: Product[];
    categories: Category[];
    storeSettings: StoreSetting | null;
    [key: string]: unknown;
}

export default function POSIndex({ products, categories, storeSettings }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer' | 'ewallet'>('cash');
    const [amountPaid, setAmountPaid] = useState<string>('');
    const [discountAmount, setDiscountAmount] = useState<string>('0');
    const [notes, setNotes] = useState('');

    const taxRate = storeSettings?.tax_rate || 0;
    const currency = storeSettings?.currency || 'IDR';

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (product.barcode && product.barcode.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = !selectedCategory || product.category.id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = useCallback((product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1, discount_amount: 0 }];
            }
        });
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.id !== productId));
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, []);

    const updateDiscount = useCallback((productId: number, discount: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, discount_amount: discount } : item
            )
        );
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
        setAmountPaid('');
        setDiscountAmount('0');
        setNotes('');
    }, []);

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {
        const itemTotal = item.quantity * item.retail_price;
        return sum + itemTotal - item.discount_amount;
    }, 0);

    const afterDiscount = subtotal - parseFloat(discountAmount);
    const taxAmount = afterDiscount * (taxRate / 100);
    const totalAmount = afterDiscount + taxAmount;
    const changeAmount = Math.max(0, parseFloat(amountPaid || '0') - totalAmount);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Cart is empty');
            return;
        }

        if (parseFloat(amountPaid) < totalAmount) {
            alert('Amount paid is insufficient');
            return;
        }

        const saleData = {
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.retail_price,
                discount_amount: item.discount_amount,
            })),
            payment_method: paymentMethod,
            amount_paid: parseFloat(amountPaid),
            discount_amount: parseFloat(discountAmount),
            notes,
        };

        router.post('/pos', saleData);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppShell>
            <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
                {/* Products Section */}
                <div className="flex-1 p-6 overflow-hidden">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">🏪 Point of Sale</h1>
                        
                        {/* Search and Filter */}
                        <div className="flex space-x-4 mb-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search products by name, SKU, or barcode..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-md"
                                value={selectedCategory || ''}
                                onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-[calc(100%-120px)]">
                        {filteredProducts.map(product => (
                            <Card 
                                key={product.id} 
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => addToCart(product)}
                            >
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-bold text-blue-600">
                                            {formatCurrency(product.retail_price)}
                                        </span>
                                        <Badge variant={product.stock_quantity > 0 ? "secondary" : "destructive"}>
                                            {product.stock_quantity} {product.unit}
                                        </Badge>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {product.category.name}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Cart Section */}
                <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Cart ({cart.length})
                            </h2>
                            {cart.length > 0 && (
                                <Button variant="outline" size="sm" onClick={clearCart}>
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8">
                                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>Cart is empty</p>
                                <p className="text-sm">Add products to start a sale</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-sm">{item.name}</h4>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </Button>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <span className="font-semibold">
                                                {formatCurrency(item.quantity * item.retail_price)}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <label className="text-xs text-gray-500">Discount:</label>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={item.discount_amount}
                                                onChange={(e) => updateDiscount(item.id, parseFloat(e.target.value) || 0)}
                                                className="text-xs h-8"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Payment Section */}
                    {cart.length > 0 && (
                        <div className="border-t border-gray-200 p-6">
                            {/* Payment Method */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setPaymentMethod('cash')}
                                    >
                                        <Banknote className="w-4 h-4 mr-1" />
                                        Cash
                                    </Button>
                                    <Button
                                        variant={paymentMethod === 'card' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <CreditCard className="w-4 h-4 mr-1" />
                                        Card
                                    </Button>
                                    <Button
                                        variant={paymentMethod === 'transfer' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setPaymentMethod('transfer')}
                                    >
                                        <Building2 className="w-4 h-4 mr-1" />
                                        Transfer
                                    </Button>
                                    <Button
                                        variant={paymentMethod === 'ewallet' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setPaymentMethod('ewallet')}
                                    >
                                        <Smartphone className="w-4 h-4 mr-1" />
                                        E-Wallet
                                    </Button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-sm">
                                    <span>Discount:</span>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={discountAmount}
                                        onChange={(e) => setDiscountAmount(e.target.value)}
                                        className="w-20 h-6 text-xs text-right"
                                    />
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                    <span>Tax ({taxRate}%):</span>
                                    <span>{formatCurrency(taxAmount)}</span>
                                </div>
                                
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                            </div>

                            {/* Amount Paid */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={amountPaid}
                                    onChange={(e) => setAmountPaid(e.target.value)}
                                />
                                {parseFloat(amountPaid || '0') >= totalAmount && (
                                    <p className="text-sm text-green-600 mt-1">
                                        Change: {formatCurrency(changeAmount)}
                                    </p>
                                )}
                            </div>

                            {/* Notes */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                                <Input
                                    placeholder="Additional notes..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            {/* Checkout Button */}
                            <Button
                                onClick={handleCheckout}
                                className="w-full"
                                disabled={cart.length === 0 || parseFloat(amountPaid || '0') < totalAmount}
                            >
                                Complete Sale - {formatCurrency(totalAmount)}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}