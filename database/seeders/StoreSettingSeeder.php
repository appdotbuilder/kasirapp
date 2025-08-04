<?php

namespace Database\Seeders;

use App\Models\StoreSetting;
use Illuminate\Database\Seeder;

class StoreSettingSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        StoreSetting::create([
            'store_name' => 'KasirApp Store',
            'store_address' => 'Jl. Raya No. 123, Jakarta, Indonesia',
            'store_phone' => '+62 21 1234567',
            'store_email' => 'store@kasirapp.com',
            'tax_rate' => 11.00, // PPN 11%
            'receipt_header' => 'Terima kasih telah berbelanja',
            'receipt_footer' => 'Barang yang sudah dibeli tidak dapat dikembalikan',
            'currency' => 'IDR',
            'printer_settings' => [
                'paper_width' => 58,
                'font_size' => 12,
                'line_spacing' => 1.5,
            ],
        ]);
    }
}