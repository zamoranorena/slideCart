<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntegrationsApp extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "integrations_app";
    protected $fillable = [
        'integrations_app_title',
        'integrations_app_description',
        'status_default',
        'automatic',
        'new',
        'sort_by',
    ];

   
}
