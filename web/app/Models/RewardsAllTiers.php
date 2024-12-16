<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RewardsAllTiers extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_rewards_all_countries_tiers";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'settings_rewards_id',
        'rewards_title',
        'rewards_congratulations',
        'rewards_amount',
        'rewards_confetti_time',
        'rewards_confetti',
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
