<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\StoreSetting
 *
 * @property int $id
 * @property string $store_name
 * @property string|null $store_address
 * @property string|null $store_phone
 * @property string|null $store_email
 * @property string|null $store_logo
 * @property float $tax_rate
 * @property string|null $receipt_header
 * @property string|null $receipt_footer
 * @property string $currency
 * @property string|null $printer_name
 * @property array|null $printer_settings
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting wherePrinterName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting wherePrinterSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereReceiptFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereReceiptHeader($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereStoreAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereStoreEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereStoreLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereStoreName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereStorePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereTaxRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereUpdatedAt($value)
 * @method static \Database\Factories\StoreSettingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StoreSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_name',
        'store_address',
        'store_phone',
        'store_email',
        'store_logo',
        'tax_rate',
        'receipt_header',
        'receipt_footer',
        'currency',
        'printer_name',
        'printer_settings',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tax_rate' => 'decimal:2',
        'printer_settings' => 'array',
    ];
}