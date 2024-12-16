<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialOffer extends Model
{

    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_special_offer_notification";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_special_offer_notification',
        'offer_based_notification',
        'max_offers_show_notification',
        'qualified_background_color_h_notification',
        'qualified_background_color_s_notification',
        'qualified_background_color_b_notification',
        'qualified_background_color_hex_notification',
        'qualified_text_color_h_notification',
        'qualified_text_color_s_notification',
        'qualified_text_color_b_notification',
        'qualified_text_color_hex_notification',
        'qualified_bold_font_notification',
        'unqualified_background_color_h_notification',
        'unqualified_background_color_s_notification',
        'unqualified_background_color_b_notification',
        'unqualified_background_color_hex_notification',
        'unqualified_text_color_h_notification',
        'unqualified_text_color_s_notification',
        'unqualified_text_color_b_notification',
        'unqualified_text_color_hex_notification',
        'unqualified_bold_font_notification',
        'customer_id'
        
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
