<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManuallyProducts extends Model
{

    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_manually_products_upsell";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_product_manually',
        'section_heading_products_manually',
        'mode_upsell_manually',
        'slides_per_view_manually',
        'slides_autoplay_time_manually',
        'mode_add_to_cart_manually',
        'heading_background_color_h_manually',
        'heading_background_color_s_manually',
        'heading_background_color_b_manually',
        'heading_background_color_hex_manually',
        'heading_text_color_h_manually',
        'heading_text_color_s_manually',
        'heading_text_color_b_manually',
        'heading_text_color_hex_manually',
        'heading_bold_font_manually',
        'upsell_product_font_size_manually',
        'upsell_product_url_manually',
        'maximum_items_suggest_manually',
        'cross_upsell_groups_manually',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
