<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssingIcon extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "assing_icon";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'id_icon',
        'id_module',
        'default_icon',
        'sorting'
    ];

}
