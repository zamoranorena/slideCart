<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
/* use App\Models\Settings; */
use App\Models\CartCoupon;

class CartCouponController extends Controller
{
    public function get_cart_coupon(Request $request)
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
                $cart_coupon = CartCoupon::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($cart_coupon) {
                    $var = [
                        'cart_coupon' => $cart_coupon,
                        /* 'money_format' => $money_format, */
                    ];
                };
            };
            return response($var);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
    public function put_cart_coupon(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                /* $cart_coupon = CartCoupon::where('customer_id', $customer['id'])->first();
                if ($cart_coupon) {
                    $update_cart_coupon = $cart_coupon->update($request->all());
                    if ($update_cart_coupon) {
                        EnsureClientFile::chargeEnvironment($shop);
                    };
                }; */
                CartCoupon::where('customer_id', $customer['id'])->update([
                    'enabled_cart_coupon_button' => $request->enabled_cart_coupon_button,
                    'position_cart_coupon_button' => $request->position_cart_coupon_button,
                    'name_cart_coupon_button' => $request->name_cart_coupon_button,
                    'placeholder_cart_coupon_button' => $request->placeholder_cart_coupon_button,
                    'button_background_color_h' => $request->button_background_color_h,
                    'button_background_color_s' => $request->button_background_color_s,
                    'button_background_color_b' => $request->button_background_color_b,
                    'button_background_color_hex' => $request->button_background_color_hex,
                    'button_font_color_h' => $request->button_font_color_h,
                    'button_font_color_s' => $request->button_font_color_s,
                    'button_font_color_b' => $request->button_font_color_b,
                    'button_font_color_hex' => $request->button_font_color_hex,
                    'button_font_size' => $request->button_font_size,
                    'button_text_transform' => $request->button_text_transform,
                    'button_font_weight' => $request->button_font_weight,
                    'button_border_radius' => $request->button_border_radius,
                ]);
                $demo = EnsureClientFile::chargeEnvironment($shop);
                Log::error('CARCOUPON');
                Log::error($demo);
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
}
