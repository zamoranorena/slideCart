<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementTiers extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_announcement_tiers";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'announcement_text',
        'settings_announcement_id',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
    }
}
