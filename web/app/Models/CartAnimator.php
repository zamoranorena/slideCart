<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartAnimator extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "cart_animator";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
       'enabled_cart_animator',
       'cart_animator_add_cart_button',
       'cart_animator_add_cart_button_time',
       'cart_animator_sticky_bar_button',
       'cart_animator_sticky_bar_button_time',
       'cart_animator_sticky_cart_button',
       'cart_animator_sticky_cart_button_time',
       'cart_animator_quick_buy_button',
       'cart_animator_quick_buy_button_time',
       'cart_animator_checkout_button',
       'cart_animator_checkout_button_time',
       'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
