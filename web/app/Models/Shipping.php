<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_shipping_protection";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_shipping_protection',
        'sp_featured_product_shopify_id',
        'sp_featured_product_shopify_handle',
        'sp_featured_product_shopify_title',
        'sp_featured_product_shopify_originalSrc',
        'sp_featured_product_shopify_id_variant',
        'sp_show_image',
        'sp_auto_add',
        'sp_title_color_h',
        'sp_title_color_s',
        'sp_title_color_b',
        'sp_title_color_hex',
        'sp_title_font_size',
        'sp_title_transform',
        'sp_title_font_weight',
        'sp_description_color_h',
        'sp_description_color_s',
        'sp_description_color_b',
        'sp_description_color_hex',
        'sp_description_font_size',
        'sp_description_transform',
        'sp_description_font_weight',
        'sp_price_color_h',
        'sp_price_color_s',
        'sp_price_color_b',
        'sp_price_color_hex',
        'sp_price_font_size',
        'sp_price_font_weight',
        'sp_compare_price_color_h',
        'sp_compare_price_color_s',
        'sp_compare_price_color_b',
        'sp_compare_price_color_hex',
        'sp_compare_price_font_size',
        'sp_compare_price_font_weight',
        'sp_toggle_color_h',
        'sp_toggle_color_s',
        'sp_toggle_color_b',
        'sp_toggle_color_hex',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
