<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeItemsTiers extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_tiered_free_items_tiers";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'tfi_tier_amount_from',
        'tfi_tier_products',
        'tfi_tier_name',
        'tfi_tier_max_item',
        'tfi_tier_hide_when_in_cart',
        'settings_tiered_free_items_id',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function rewards()
    {
        return $this->belongsTo(Rewards::class);
    }
}
