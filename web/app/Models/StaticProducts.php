<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaticProducts extends Model
{

    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_static_products_upsell";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_static_products_upsell',
        'list_products_static',
        'section_heading_products_static',
        'mode_upsell_static',
        'slides_per_view_static',
        'slides_autoplay_time_static',
        'mode_add_to_cart_static',
        'heading_background_color_h_static',
        'heading_background_color_s_static',
        'heading_background_color_b_static',
        'heading_background_color_hex_static',
        'heading_text_color_h_static',
        'heading_text_color_s_static',
        'heading_text_color_b_static',
        'heading_text_color_hex_static',
        'heading_bold_font_static',
        'font_size_upsell_static',
        'upsell_product_url_static',
        'maximum_items_suggest_static',
        'customer_id'
        
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
