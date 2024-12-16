<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_checkout_button";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'checkout_button_text',
        'enabled_checkout_button',
        'checkout_button_icon',
        'checkout_button_icon_enabled',
        'checkout_button_text_color_h',
        'checkout_button_text_color_s',
        'checkout_button_text_color_b',
        'checkout_button_text_color_hex',
        'checkout_button_text_colorHover_h',
        'checkout_button_text_colorHover_s',
        'checkout_button_text_colorHover_b',
        'checkout_button_text_colorHover_hex',
        'checkout_button_text_font_size',
        'checkout_button_text_transform',
        'checkout_button_text_weight',
        'checkout_button_background_color_h',
        'checkout_button_background_color_s',
        'checkout_button_background_color_b',
        'checkout_button_background_color_hex',
        'checkout_button_background_colorHover_h',
        'checkout_button_background_colorHover_s',
        'checkout_button_background_colorHover_b',
        'checkout_button_background_colorHover_hex',
        'checkout_button_border',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
