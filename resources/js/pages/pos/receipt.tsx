import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Receipt as ReceiptIcon, Printer, Download, ShoppingCart } from 'lucide-react';

interface SaleItem {
    id: number;
    quantity: number;
    unit_price: number;
    discount_amount: number;
    total_price: number;
    product: {
        name: string;
        sku: string;
        unit: string;
    };
}

interface Sale {
    id: number;
    invoice_number: string;
    subtotal: number;
    discount_amount: number;
    tax_amount: number;
    total_amount: number;
    payment_method: string;
    amount_paid: number;
    change_amount: number;
    notes?: string;
    created_at: string;
    user: {
        name: string;
    };
    sale_items: SaleItem[];
}

interface StoreSetting {
    store_name: string;
    store_address?: string;
    store_phone?: string;
    store_email?: string;
    receipt_header?: string;
    receipt_footer?: string;
    currency: string;
}

interface Props {
    sale: Sale;
    storeSettings: StoreSetting | null;
    [key: string]: unknown;
}

export default function Receipt({ sale, storeSettings }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: storeSettings?.currency || 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        // This would typically generate a PDF download
        alert('PDF download functionality would be implemented here');
    };

    return (
        <AppShell>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <ReceiptIcon className="w-8 h-8 mr-3" />
                            Receipt
                        </h1>
                        <p className="text-gray-600 mt-1">Transaction completed successfully</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button onClick={handlePrint} variant="outline">
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                        <Button onClick={handleDownloadPDF} variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                        <Link href="/pos">
                            <Button className="bg-green-600 hover:bg-green-700">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                New Sale
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Receipt */}
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center space-y-2 mb-6">
                                <h2 className="text-xl font-bold">{storeSettings?.store_name || 'KasirApp Store'}</h2>
                                {storeSettings?.store_address && (
                                    <p className="text-sm text-gray-600">{storeSettings.store_address}</p>
                                )}
                                {storeSettings?.store_phone && (
                                    <p className="text-sm text-gray-600">{storeSettings.store_phone}</p>
                                )}
                                {storeSettings?.store_email && (
                                    <p className="text-sm text-gray-600">{storeSettings.store_email}</p>
                                )}
                                {storeSettings?.receipt_header && (
                                    <p className="text-sm font-medium text-gray-800 mt-4">{storeSettings.receipt_header}</p>
                                )}
                            </div>

                            <div className="border-t border-b border-gray-200 py-4 mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Invoice:</span>
                                    <span className="font-medium">{sale.invoice_number}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Date:</span>
                                    <span>{formatDate(sale.created_at)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Cashier:</span>
                                    <span>{sale.user.name}</span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="space-y-3 mb-4">
                                {sale.sale_items.map((item, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">{item.product.name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>
                                                {item.quantity} {item.product.unit} × {formatCurrency(item.unit_price)}
                                            </span>
                                            <span>{formatCurrency(item.quantity * item.unit_price)}</span>
                                        </div>
                                        {item.discount_amount > 0 && (
                                            <div className="flex justify-between text-sm text-red-600">
                                                <span>Discount:</span>
                                                <span>-{formatCurrency(item.discount_amount)}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(sale.subtotal)}</span>
                                </div>
                                {sale.discount_amount > 0 && (
                                    <div className="flex justify-between text-sm text-red-600">
                                        <span>Total Discount:</span>
                                        <span>-{formatCurrency(sale.discount_amount)}</span>
                                    </div>
                                )}
                                {sale.tax_amount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>Tax:</span>
                                        <span>{formatCurrency(sale.tax_amount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span>{formatCurrency(sale.total_amount)}</span>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Payment Method:</span>
                                    <span className="capitalize font-medium">{sale.payment_method}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Amount Paid:</span>
                                    <span>{formatCurrency(sale.amount_paid)}</span>
                                </div>
                                {sale.change_amount > 0 && (
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Change:</span>
                                        <span>{formatCurrency(sale.change_amount)}</span>
                                    </div>
                                )}
                            </div>

                            {sale.notes && (
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <p className="text-sm text-gray-600">
                                        <strong>Notes:</strong> {sale.notes}
                                    </p>
                                </div>
                            )}

                            {storeSettings?.receipt_footer && (
                                <div className="border-t border-gray-200 pt-4 mt-4 text-center">
                                    <p className="text-xs text-gray-500">{storeSettings.receipt_footer}</p>
                                </div>
                            )}

                            <div className="text-center mt-6">
                                <p className="text-xs text-gray-500">Thank you for your business!</p>
                                <p className="text-xs text-gray-400 mt-2">Powered by KasirApp</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}