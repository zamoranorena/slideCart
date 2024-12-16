<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermsConditions extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_terms_conditions";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_terms',
        'text_terms',
        'font_size_terms',
        'url_terms',
        'notify_terms',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
