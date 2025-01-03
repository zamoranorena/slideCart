<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Settings extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'enabled_desktop',
        'enabled_mobile',
        'money_format',
        'cart_type',
        'personalize',
        'template_item_cart',
        'customCss',
        'customJs',
        'customer_id'
    ];

    public function customer():BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
