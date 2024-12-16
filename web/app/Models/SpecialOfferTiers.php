<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialOfferTiers extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_special_offer_notification_tiers";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'settings_special_offer_notification_id',
        'num_special_offer_notification_tier',
        'min_val_qualify',
        'special_offer_message_qualify',
        'special_offer_message_not_qualify',
        'tier_name',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function special_offer()
    {
        return $this->belongsTo(SpecialOffer::class);
    }
}
