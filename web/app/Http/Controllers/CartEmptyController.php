<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\FreeItems;
use App\Models\Settings;
use App\Models\CartEmpty;

class CartEmptyController extends Controller
{
    public function get_cart_empty(Request $request)
    {
        try {
            $var = [
                'error' => true,
                'message' => "Error get data.",
            ];

            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
               /*  $cart_empty =  CartEmpty::where('customer_id', $customer['id'])->first();
                if ($cart_empty) {
                    $var = [
                        'cart_empty' => $cart_empty,
                    ];
                }; */
                $cart_settings =  Customer::with('CartEmpty')->where('id', $customer['id'])->first();
                if ($cart_settings) {
                    $var = [
                        'cart_empty' => $cart_settings->CartEmpty,
                    ];
                };
            }
            return response($var);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
    public function put_cart_empty(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::where('shop_url', $shop)->first();
            if($customer){
                if (is_null($request->cart_empty_upsell_list_products)) {
                    $request->merge([
                        'cart_empty_upsell_list_products' => '',
                    ]);
                };
                $data = [
                    'enabled_cart_empty' => $request->enabled_cart_empty,
                    'cart_empty_title' => $request->cart_empty_title,
                    'cart_empty_title_font_size' => $request->cart_empty_title_font_size,
                    'cart_empty_title_text_transform' => $request->cart_empty_title_text_transform,
                    'cart_empty_title_font_weight' => $request->cart_empty_title_font_weight,
                    'cart_empty_title_color_h' => $request->cart_empty_title_color_h,
                    'cart_empty_title_color_s' => $request->cart_empty_title_color_s,
                    'cart_empty_title_color_b' => $request->cart_empty_title_color_b,
                    'cart_empty_title_color_hex' => $request->cart_empty_title_color_hex,
                    'cart_empty_subtitle' => $request->cart_empty_subtitle,
                    'cart_empty_subtitle_font_size' => $request->cart_empty_subtitle_font_size,
                    'cart_empty_subtitle_text_transform' => $request->cart_empty_subtitle_text_transform,
                    'cart_empty_subtitle_font_weight' => $request->cart_empty_subtitle_font_weight,
                    'cart_empty_subtitle_color_h' => $request->cart_empty_subtitle_color_h,
                    'cart_empty_subtitle_color_s' => $request->cart_empty_subtitle_color_s,
                    'cart_empty_subtitle_color_b' => $request->cart_empty_subtitle_color_b,
                    'cart_empty_subtitle_color_hex' => $request->cart_empty_subtitle_color_hex,
                    'cart_empty_button_background_color_h' => $request->cart_empty_button_background_color_h,
                    'cart_empty_button_background_color_s' => $request->cart_empty_button_background_color_s,
                    'cart_empty_button_background_color_b' => $request->cart_empty_button_background_color_b,
                    'cart_empty_button_background_color_hex' => $request->cart_empty_button_background_color_hex,
                    'cart_empty_button_text' => $request->cart_empty_button_text,
                    'cart_empty_button_font_size' => $request->cart_empty_button_font_size,
                    'cart_empty_button_url' => $request->cart_empty_button_url,
                    'cart_empty_button_font_weight' => $request->cart_empty_button_font_weight,
                    'cart_empty_button_text_transform' => $request->cart_empty_button_text_transform,
                    'cart_empty_button_font_color_h' => $request->cart_empty_button_font_color_h,
                    'cart_empty_button_font_color_s' => $request->cart_empty_button_font_color_s,
                    'cart_empty_button_font_color_b' => $request->cart_empty_button_font_color_b,
                    'cart_empty_button_font_color_hex' => $request->cart_empty_button_font_color_hex,
                    'cart_empty_button_border_radius' => $request->cart_empty_button_border_radius,
                    'cart_empty_enabled_upsell' => $request->cart_empty_enabled_upsell,
                    'cart_empty_upsell_list_products' => $request->cart_empty_upsell_list_products,
                    'cart_empty_upsell_font_size' => $request->cart_empty_upsell_font_size,
                    'cart_empty_upsell_mode' => $request->cart_empty_upsell_mode,
                    'cart_empty_upsell_qty' => $request->cart_empty_upsell_qty,
                    'cart_empty_upsell_autoplay_time' => $request->cart_empty_upsell_autoplay_time,
                    'cart_empty_upsell_add_to_cart_mode' => $request->cart_empty_upsell_add_to_cart_mode,
                    'cart_empty_upsell_heading' => $request->cart_empty_upsell_heading,
                    'cart_empty_upsell_heading_background_color_h' => $request->cart_empty_upsell_heading_background_color_h,
                    'cart_empty_upsell_heading_background_color_s' => $request->cart_empty_upsell_heading_background_color_s,
                    'cart_empty_upsell_heading_background_color_b' => $request->cart_empty_upsell_heading_background_color_b,
                    'cart_empty_upsell_heading_background_color_hex' => $request->cart_empty_upsell_heading_background_color_hex,
                    'cart_empty_upsell_text_color_h' => $request->cart_empty_upsell_text_color_h,
                    'cart_empty_upsell_text_color_s' => $request->cart_empty_upsell_text_color_s,
                    'cart_empty_upsell_text_color_b' => $request->cart_empty_upsell_text_color_b,
                    'cart_empty_upsell_text_color_hex' => $request->cart_empty_upsell_text_color_hex,
                    'cart_empty_upsell_heading_bold_font' => $request->cart_empty_upsell_heading_bold_font,
                    'cart_empty_upsell_product_url' => $request->cart_empty_upsell_product_url,
                    'cart_empty_upsell_max_item' => $request->cart_empty_upsell_max_item,
                ];
                CartEmpty::where('customer_id', $customer['id'])
                    ->update($data);
            };

            return response()->json([
                'error' => false,
                'message' => 'success.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }

    /* public function put_cart_empty(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $cart_empty = CartEmpty::where('customer_id', $customer['id'])->first();
                if ($cart_empty) {
                    if (is_null($request->cart_empty_upsell_list_products)) {
                        $request->merge([
                            'cart_empty_upsell_list_products' => '',
                        ]);
                    };
                    
                    $cart_empty->update([
                        'enabled_cart_empty' => $request->enabled_cart_empty,
                        'cart_empty_title' => $request->cart_empty_title,
                        'cart_empty_title_font_size' => $request->cart_empty_title_font_size,
                        'cart_empty_title_text_transform' => $request->cart_empty_title_text_transform,
                        'cart_empty_title_font_weight' => $request->cart_empty_title_font_weight,
                        'cart_empty_title_color_h' => $request->cart_empty_title_color_h,
                        'cart_empty_title_color_s' => $request->cart_empty_title_color_s,
                        'cart_empty_title_color_b' => $request->cart_empty_title_color_b,
                        'cart_empty_title_color_hex' => $request->cart_empty_title_color_hex,
                        'cart_empty_subtitle' => $request->cart_empty_subtitle,
                        'cart_empty_subtitle_font_size' => $request->cart_empty_subtitle_font_size,
                        'cart_empty_subtitle_text_transform' => $request->cart_empty_subtitle_text_transform,
                        'cart_empty_subtitle_font_weight' => $request->cart_empty_subtitle_font_weight,
                        'cart_empty_subtitle_color_h' => $request->cart_empty_subtitle_color_h,
                        'cart_empty_subtitle_color_s' => $request->cart_empty_subtitle_color_s,
                        'cart_empty_subtitle_color_b' => $request->cart_empty_subtitle_color_b,
                        'cart_empty_subtitle_color_hex' => $request->cart_empty_subtitle_color_hex,
                        'cart_empty_button_background_color_h' => $request->cart_empty_button_background_color_h,
                        'cart_empty_button_background_color_s' => $request->cart_empty_button_background_color_s,
                        'cart_empty_button_background_color_b' => $request->cart_empty_button_background_color_b,
                        'cart_empty_button_background_color_hex' => $request->cart_empty_button_background_color_hex,
                        'cart_empty_button_text' => $request->cart_empty_button_text,
                        'cart_empty_button_font_size' => $request->cart_empty_button_font_size,
                        'cart_empty_button_url' => $request->cart_empty_button_url,
                        'cart_empty_button_font_weight' => $request->cart_empty_button_font_weight,
                        'cart_empty_button_text_transform' => $request->cart_empty_button_text_transform,
                        'cart_empty_button_font_color_h' => $request->cart_empty_button_font_color_h,
                        'cart_empty_button_font_color_s' => $request->cart_empty_button_font_color_s,
                        'cart_empty_button_font_color_b' => $request->cart_empty_button_font_color_b,
                        'cart_empty_button_font_color_hex' => $request->cart_empty_button_font_color_hex,
                        'cart_empty_button_border_radius' => $request->cart_empty_button_border_radius,
                        'cart_empty_enabled_upsell' => $request->cart_empty_enabled_upsell,
                        'cart_empty_upsell_list_products' => $request->cart_empty_upsell_list_products,
                        'cart_empty_upsell_font_size' => $request->cart_empty_upsell_font_size,
                        'cart_empty_upsell_mode' => $request->cart_empty_upsell_mode,
                        'cart_empty_upsell_qty' => $request->cart_empty_upsell_qty,
                        'cart_empty_upsell_autoplay_time' => $request->cart_empty_upsell_autoplay_time,
                        'cart_empty_upsell_add_to_cart_mode' => $request->cart_empty_upsell_add_to_cart_mode,
                        'cart_empty_upsell_heading' => $request->cart_empty_upsell_heading,
                        'cart_empty_upsell_heading_background_color_h' => $request->cart_empty_upsell_heading_background_color_h,
                        'cart_empty_upsell_heading_background_color_s' => $request->cart_empty_upsell_heading_background_color_s,
                        'cart_empty_upsell_heading_background_color_b' => $request->cart_empty_upsell_heading_background_color_b,
                        'cart_empty_upsell_heading_background_color_hex' => $request->cart_empty_upsell_heading_background_color_hex,
                        'cart_empty_upsell_text_color_h' => $request->cart_empty_upsell_text_color_h,
                        'cart_empty_upsell_text_color_s' => $request->cart_empty_upsell_text_color_s,
                        'cart_empty_upsell_text_color_b' => $request->cart_empty_upsell_text_color_b,
                        'cart_empty_upsell_text_color_hex' => $request->cart_empty_upsell_text_color_hex,
                        'cart_empty_upsell_heading_bold_font' => $request->cart_empty_upsell_heading_bold_font,
                        'cart_empty_upsell_product_url' => $request->cart_empty_upsell_product_url,
                        'cart_empty_upsell_max_item' => $request->cart_empty_upsell_max_item,
                    ]);
                };
                EnsureClientFile::chargeEnvironment($shop);
            };

            return response()->json([
                'error' => false,
                'message' => 'success.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    } */
}
