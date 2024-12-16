<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    
    use HasFactory;

    const CREATED_AT = 'date';
    const UPDATED_AT = null;

    protected $table = "payments";

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
