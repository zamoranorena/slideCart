<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoToCart extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_cart_button";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_cart_button',
        'cart_button_text',
        'cart_button_text_color_h',
        'cart_button_text_color_s',
        'cart_button_text_color_b',
        'cart_button_text_color_hex',
        'cart_button_text_colorHover_h',
        'cart_button_text_colorHover_s',
        'cart_button_text_colorHover_b',
        'cart_button_text_colorHover_hex',
        'cart_button_text_font_size',
        'cart_button_text_transform',
        'cart_button_text_weight',
        'cart_button_background_color_h',
        'cart_button_background_color_s',
        'cart_button_background_color_b',
        'cart_button_background_color_hex',
        'cart_button_background_colorHover_h',
        'cart_button_background_colorHover_s',
        'cart_button_background_colorHover_b',
        'cart_button_background_colorHover_hex',
        'cart_button_border',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
