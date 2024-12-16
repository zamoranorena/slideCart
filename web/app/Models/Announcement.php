<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_announcement";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'enabled_announcement',
        'announcement_background_color_h',
        'announcement_background_color_s',
        'announcement_background_color_b',
        'announcement_background_color_hex',
        'announcement_border_color_h',
        'announcement_border_color_s',
        'announcement_border_color_b',
        'announcement_border_color_hex',
        'announcement_font_color_h',
        'announcement_font_color_s',
        'announcement_font_color_b',
        'announcement_font_color_hex',
        'announcement_font_size',
        'announcement_text_transform',
        'announcement_font_weight',
        'announcement_text_alignment',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
