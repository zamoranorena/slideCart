<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_language";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'cart_title_language_settings',
        'cart_empty_text_language_settings',
        'add_to_cart_language_settings',
        'add_in_upsell_language_settings',
        'rc_withOutSub_in_upsell_language_settings',
        'rc_withSub_in_upsell_language_settings',
        'shopping_cart_language_settings',
        'product_language_settings',
        'products_language_settings',
        'subtotal_language_settings',
        'clear_all_language_settings',
        'remove_language_settings',
        'sold_out_language_settings',
        'unavailable_language_settings',
        'free_language_settings',
        'free_gnral_language_settings',
        'add_discount_code_language_settings',
        'discount_applied_language_settings',
        'checkout_button_textlanguage_settings',
        'vendor_key_text_language_settings',
        'subscription_text_language_settings',
        'valid_coupon_text',
        'shipping_taxes_discounts_language_settings',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
