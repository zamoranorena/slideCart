<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartEmpty extends Model
{

    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_cart_empty";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'enabled_cart_empty',
        'cart_empty_title',
        'cart_empty_title_font_size',
        'cart_empty_title_text_transform',
        'cart_empty_title_font_weight',
        'cart_empty_title_color_h',
        'cart_empty_title_color_s',
        'cart_empty_title_color_b',
        'cart_empty_title_color_hex',
        'cart_empty_subtitle',
        'cart_empty_subtitle_font_size',
        'cart_empty_subtitle_text_transform',
        'cart_empty_subtitle_font_weight',
        'cart_empty_subtitle_color_h',
        'cart_empty_subtitle_color_s',
        'cart_empty_subtitle_color_b',
        'cart_empty_subtitle_color_hex',
        'cart_empty_button_background_color_h',
        'cart_empty_button_background_color_s',
        'cart_empty_button_background_color_b',
        'cart_empty_button_background_color_hex',
        'cart_empty_button_text',
        'cart_empty_button_font_size',
        'cart_empty_button_url',
        'cart_empty_button_font_weight',
        'cart_empty_button_text_transform',
        'cart_empty_button_font_color_h',
        'cart_empty_button_font_color_s',
        'cart_empty_button_font_color_b',
        'cart_empty_button_font_color_hex',
        'cart_empty_button_border_radius',
        'cart_empty_enabled_upsell',
        'cart_empty_upsell_list_products',
        'cart_empty_upsell_font_size',
        'cart_empty_upsell_mode',
        'cart_empty_upsell_qty',
        'cart_empty_upsell_autoplay_time',
        'cart_empty_upsell_add_to_cart_mode',
        'cart_empty_upsell_heading',
        'cart_empty_upsell_heading_background_color_h',
        'cart_empty_upsell_heading_background_color_s',
        'cart_empty_upsell_heading_background_color_b',
        'cart_empty_upsell_heading_background_color_hex',
        'cart_empty_upsell_text_color_h',
        'cart_empty_upsell_text_color_s',
        'cart_empty_upsell_text_color_b',
        'cart_empty_upsell_text_color_hex',
        'cart_empty_upsell_heading_bold_font',
        'cart_empty_upsell_product_url',
        'cart_empty_upsell_max_item',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
