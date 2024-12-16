<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CouponBar extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "coupon_bar";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_coupon_bar',
        'coupon_bar_timer',
        'coupon_bar_position',
        'coupon_bar_text',
        'coupon_bar_text_expire',
        'coupon_bar_hours',
        'coupon_bar_minutes',
        'coupon_bar_seconds',
        'coupon_bar_clear_offer',
        'coupon_bar_background_color_h',
        'coupon_bar_background_color_s',
        'coupon_bar_background_color_b',
        'coupon_bar_background_color_hex',
        'coupon_bar_font_color_h',
        'coupon_bar_font_color_s',
        'coupon_bar_font_color_b',
        'coupon_bar_font_color_hex',
        'coupon_bar_font_size',
        'coupon_bar_text_transform',
        'coupon_bar_font_weight',
        'coupon_bar_text_alignment',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
