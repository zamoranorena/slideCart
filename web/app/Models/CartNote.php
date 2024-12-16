<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartNote extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_cart_note";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_cart_note',
        'cart_note_show_icon',
        'cart_note_show_ini',
        'cart_note_heading',
        'cart_note_heading_close',
        'cart_note_heading_placeholder',
        'cart_note_heading_color_h',
        'cart_note_heading_color_s',
        'cart_note_heading_color_b',
        'cart_note_heading_color_hex',
        'cart_note_font_size',
        'cart_note_text_transform',
        'cart_note_font_weight',
        'cart_note_additional',
        'cart_note_additional_text',
        'cart_note_additional_message',
        'cart_note_additional_color_h',
        'cart_note_additional_color_s',
        'cart_note_additional_color_b',
        'cart_note_additional_color_hex',
        'cart_note_additional_font_size',
        'customer_id',
    
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
