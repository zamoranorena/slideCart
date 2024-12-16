<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContinueShop extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_continue_shopping";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_continue_shopping',
        'continue_shopping_text',
        'continue_shopping_text_font_size',
        'continue_shopping_text_transform',
        'continue_shopping_text_weight',
        'continue_shopping_text_color_h',
        'continue_shopping_text_color_s',
        'continue_shopping_text_color_b',
        'continue_shopping_text_color_hex',
        'continue_shopping_text_colorHover_h',
        'continue_shopping_text_colorHover_s',
        'continue_shopping_text_colorHover_b',
        'continue_shopping_text_colorHover_hex',
        'continue_shopping_button_url',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
