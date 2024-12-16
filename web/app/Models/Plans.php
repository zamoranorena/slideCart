<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plans extends Model
{
    
    use HasFactory;

    /* const CREATED_AT = null;
    const UPDATED_AT = null; */

    protected $table = "plans";

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
