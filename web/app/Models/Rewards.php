<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rewards extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_rewards";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_rewards',
        'rewards_countries',
        'rewards_enabled_in_cartEmpty',
        'rewards_bar_no_dscto',
        'rewards_converted_amount',
        'rewards_show_goals',
        'rewards_show_prices_percentages',
        'rewards_mode',
        'rewards_range',
        'rewards_font_size',
        'rewards_text_transform',
        'rewards_font_weight',
        'rewards_background_content_color_h',
        'rewards_background_content_color_s',
        'rewards_background_content_color_b',
        'rewards_background_content_color_hex',
        'rewards_background_primary_color_h',
        'rewards_background_primary_color_s',
        'rewards_background_primary_color_b',
        'rewards_background_primary_color_hex',
        'rewards_background_secondary_color_h',
        'rewards_background_secondary_color_s',
        'rewards_background_secondary_color_b',
        'rewards_background_secondary_color_hex',
        'rewards_font_color_h',
        'rewards_font_color_s',
        'rewards_font_color_b',
        'rewards_font_color_hex',
        'rewards_border_radius',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
