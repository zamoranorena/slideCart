<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftWrap extends Model
{
    
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $table = "settings_gift_wrap";
    protected $hidden = [
        'customer_id'
    ];
    protected $fillable = [
        'enabled_gift_wrap',
        'product_type',
        'gift_wrap_icon',
        'gift_wrap_icon_color_h',
        'gift_wrap_icon_color_s',
        'gift_wrap_icon_color_b',
        'gift_wrap_icon_color_hex',
        'offer_name',
        'offer_name_color_h',
        'offer_name_color_s',
        'offer_name_color_b',
        'offer_name_color_hex',
        'offer_price',
        'offer_price_color_h',
        'offer_price_color_s',
        'offer_price_color_b',
        'offer_price_color_hex',
        'offer_compare_price',
        'offer_compare_price_color_h',
        'offer_compare_price_color_s',
        'offer_compare_price_color_b',
        'offer_compare_price_color_hex',
        'gift_wrap_handle_shopify',
        'gift_wrap_id_shopify',
        'offer_icon_url_img_host',
        'offer_icon_url_img_shopify',
        'featured_product_shopify_id',
        'featured_product_shopify_handle',
        'featured_product_shopify_title',
        'featured_product_shopify_originalSrc',
        'featured_product_shopify_id_variants',
        'featured_product_shopify_title_variants',
        'featured_product_title',
        'featured_product_title_bold',
        'featured_product_show_image',
        'display_selling_color_h',
        'display_selling_color_s',
        'display_selling_color_b',
        'display_selling_color_hex',
        'display_compare_price_color_h',
        'display_compare_price_color_s',
        'display_compare_price_color_b',
        'display_compare_price_color_hex',
        'offer_font_size',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
