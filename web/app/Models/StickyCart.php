<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StickyCart extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "sticky_cart";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_sticky_cart',
        'sticky_cart_show_mobile',
        'sticky_cart_show_desktop',
        'sticky_cart_hide_page',
        'sticky_cart_hide_empty',
        'sticky_cart_show_countdown',
        'sticky_cart_position',
        'sticky_cart_distance',
        'sticky_cart_redirect',
        'sticky_cart_icon',
        'sticky_cart_total_color_h',
        'sticky_cart_total_color_s',
        'sticky_cart_total_color_b',
        'sticky_cart_total_color_hex',
        'sticky_cart_total_background_color_h',
        'sticky_cart_total_background_color_s',
        'sticky_cart_total_background_color_b',
        'sticky_cart_total_background_color_hex',
        'sticky_cart_icon_color_h',
        'sticky_cart_icon_color_s',
        'sticky_cart_icon_color_b',
        'sticky_cart_icon_color_hex',
        'sticky_cart_background_color_h',
        'sticky_cart_background_color_s',
        'sticky_cart_background_color_b',
        'sticky_cart_background_color_hex',
        'sticky_cart_countdown_color_h',
        'sticky_cart_countdown_color_s',
        'sticky_cart_countdown_color_b',
        'sticky_cart_countdown_color_hex',
        'sticky_cart_countdown_background_color_h',
        'sticky_cart_countdown_background_color_s',
        'sticky_cart_countdown_background_color_b',
        'sticky_cart_countdown_background_color_hex',
        'customer_id`,  ',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
