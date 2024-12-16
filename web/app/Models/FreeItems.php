<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeItems extends Model
{

    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_tiered_free_items";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_tiered_free_items',
        'tfi_mode_view',
        'tfi_slides_per_view',
        'tfi_slides_autoplay_time',
        'tfi_mode_add_to_cart',
        'tfi_section_heading',
        'tfi_heading_background_color_h',
        'tfi_heading_background_color_s',
        'tfi_heading_background_color_b',
        'tfi_heading_background_color_hex',
        'tfi_heading_text_color_h',
        'tfi_heading_text_color_s',
        'tfi_heading_text_color_b',
        'tfi_heading_text_color_hex',
        'tfi_heading_bold_font',
        'tfi_product_url_automatic',
        'tfi_heading_font_size',
        'tfi_lock_method',
        'tfi_unlock_text',
        'tfi_unlock_text_show',
        'tfi_unlock_text_transform',
        'tfi_unlock_text_font_size',
        'tfi_unlock_text_font_weight',
        'tfi_unlock_text_color_h',
        'tfi_unlock_text_color_s',
        'tfi_unlock_text_color_b',
        'tfi_unlock_text_color_hex',
        'tfi_unlock_bar_color_primary_h',
        'tfi_unlock_bar_color_primary_s',
        'tfi_unlock_bar_color_primary_b',
        'tfi_unlock_bar_color_primary_hex',
        'tfi_unlock_bar_color_secondary_h',
        'tfi_unlock_bar_color_secondary_s',
        'tfi_unlock_bar_color_secondary_b',
        'tfi_unlock_bar_color_secondary_hex',
        'tfi_unlock_bar_border_radius',
        'tfi_calculate_based_on',
        'tfi_locked_limit',
        'tfi_unlocked_limit',
        'tfi_show_quantity_box',
        'tif_auto_add',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
