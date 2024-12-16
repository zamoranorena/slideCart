<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartCoupon extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_cart_coupon";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_cart_coupon_button',
        'name_cart_coupon_button',
        'placeholder_cart_coupon_button',
        'button_background_color_h',
        'button_background_color_s',
        'button_background_color_b',
        'button_background_color_hex',
        'button_font_color_h',
        'button_font_color_s',
        'button_font_color_b',
        'button_font_color_hex',
        'button_font_size',
        'button_text_transform',
        'button_font_weight',
        'button_border_radius',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
