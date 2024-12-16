<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuickBuy extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "quick_buy";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_quick_buy',
        'quick_buy_button_type',
        'quick_buy_button_show_mobile',
        'quick_buy_button_show_desktop',
        'quick_buy_button_show_quantity_selector',
        'quick_buy_button_size',
        'quick_buy_button_position',
        'quick_buy_button_redirect',
        'quick_buy_button_background_color_h',
        'quick_buy_button_background_color_s',
        'quick_buy_button_background_color_b',
        'quick_buy_button_background_color_hex',
        'quick_buy_button_icon',
        'quick_buy_button_icon_color_h',
        'quick_buy_button_icon_color_s',
        'quick_buy_button_icon_color_b',
        'quick_buy_button_icon_color_hex',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
