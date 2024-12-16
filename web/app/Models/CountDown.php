<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountDown extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_countdown";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'enabled_countdown',
        'countdown_reset',
        'countdown_minutes_reservation',
        'countdown_text',
        'countdown_text_expire',
        'countdown_expire_clear_cart',
        'countdown_background_color_h',
        'countdown_background_color_s',
        'countdown_background_color_b',
        'countdown_background_color_hex',
        'countdown_border_color_h',
        'countdown_border_color_s',
        'countdown_border_color_b',
        'countdown_border_color_hex',
        'countdown_font_color_h',
        'countdown_font_color_s',
        'countdown_font_color_b',
        'countdown_font_color_hex',
        'countdown_font_size',
        'countdown_text_transform',
        'countdown_font_weight',
        'countdown_text_alignment',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
