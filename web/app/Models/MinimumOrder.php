<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MinimumOrder extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_minimum_order";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_minimum_order',
        'minimum_order_option',
        'minimum_order',
        'minimum_order_text',
        'minimum_font_size',
        'minimum_color_h',
        'minimum_color_s',
        'minimum_color_b',
        'minimum_color_hex',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
