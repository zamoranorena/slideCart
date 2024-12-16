<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartBar extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "cart_bar";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_cart_bar',
        'enabled_cart_bar_home_page',
        'cart_bar_product_shopify_originalSrc',
        'cart_bar_button_text',
        'cart_bar_button_redirect',
        'cart_bar_show_prices_x_qty',
        'cart_bar_button_background_color_h',
        'cart_bar_button_background_color_s',
        'cart_bar_button_background_color_b',
        'cart_bar_button_background_color_hex',
        'cart_bar_button_text_color_h',
        'cart_bar_button_text_color_s',
        'cart_bar_button_text_color_b',
        'cart_bar_button_text_color_hex',
        'cart_bar_background_color_h',
        'cart_bar_background_color_s',
        'cart_bar_background_color_b',
        'cart_bar_background_color_hex',
        'cart_bar_productTitle_color_h',
        'cart_bar_productTitle_color_s',
        'cart_bar_productTitle_color_b',
        'cart_bar_productTitle_color_hex',
        'cart_bar_price_color_h',
        'cart_bar_price_color_s',
        'cart_bar_price_color_b',
        'cart_bar_price_color_hex',
        'cart_bar_comparePrice_color_h',
        'cart_bar_comparePrice_color_s',
        'cart_bar_comparePrice_color_b',
        'cart_bar_comparePrice_color_hex',
        'cart_bar_show_mobile',
        'cart_bar_mobile_position',
        'cart_bar_mobile_hide_atc',
        'cart_bar_mobile_hide_stickybarButton',
        'cart_bar_mobile_show_full_stickybarButton',
        'cart_bar_mobile_show_productImage',
        'cart_bar_mobile_show_productTitle',
        'cart_bar_mobile_show_reviewStarts',
        'cart_bar_mobile_show_variantSelect',
        'cart_bar_mobile_show_quantitySelect',
        'cart_bar_mobile_show_price',
        'cart_bar_mobile_show_comparePrice',
        'cart_bar_mobile_positionOffset',
        'cart_bar_show_desktop',
        'cart_bar_desktop_position',
        'cart_bar_desktop_hide_atc',
        'cart_bar_desktop_hide_stickybarButton',
        'cart_bar_desktop_show_productImage',
        'cart_bar_desktop_show_productTitle',
        'cart_bar_desktop_show_reviewStars',
        'cart_bar_desktop_show_variantSelect',
        'cart_bar_desktop_show_quantitySelect',
        'cart_bar_desktop_show_price',
        'cart_bar_desktop_show_comparePrice',
        'cart_bar_desktop_positionOffset',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
