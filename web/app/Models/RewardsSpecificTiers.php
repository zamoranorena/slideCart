<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RewardsSpecificTiers extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_rewards_specific_countries_tiers";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'settings_rewards_id',
        'rewards_title_specific_countries',
        'rewards_congratulations_specific_countries',
        'rewards_amount_specific_countries',
        'rewards_confetti_time_specific_countries',
        'rewards_confetti_specific_countries',
        'rewards_specific_country',
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
