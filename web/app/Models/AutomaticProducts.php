<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutomaticProducts extends Model
{

    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_automatic_products_recommendations";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_product_recommendations',
        'based_last_product',
        'section_heading_products',
        'mode_upsell_automatic',
        'slides_per_view_automatic',
        'slides_autoplay_time_automatic',
        'mode_add_to_cart_automatic',
        'heading_background_color_h',
        'heading_background_color_s',
        'heading_background_color_b',
        'heading_background_color_hex',
        'heading_text_color_h',
        'heading_text_color_s',
        'heading_text_color_b',
        'heading_text_color_hex',
        'heading_bold_font',
        'font_size_upsell_automatic',
        'upsell_product_url_automatic',
        'maximum_items_suggest',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
