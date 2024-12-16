<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdditionalSettings extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "additional_settings";
    protected $hidden = [
        'id',
        'customer_id'
    ];
    protected $fillable = [
        'hide_slide_cart',
        'hide_cart',
        'hide_decimal',
        'hide_discount_money_cart',
        'add_url_item_cart',
        'reverse_currency_symbol',
        'prices_reverse_order',
        'show_especial',
        'show_discount',
        'show_clear_all',
        'show_products_count',
        'show_prices_x_qty',
        'show_compare_price',
        'show_save_item',
        'base_price_for_discount',
        'show_discount_order_x_item',
        'hidden_variant_title_cart',
        'show_product_property',
        'show_weight',
        'show_unit_price',
        'show_quantity_box_cart',
        'hidden_quantity_box_cart_free',
        'show_quantity_box_upsells',
        'show_subscription_option',
        'show_subscription_option_upsell',
        'selected_subscribe_upsell',
        'add_utm',
        'cart_links',
        'open_cart',
        'image_quality',
        'image_container',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
