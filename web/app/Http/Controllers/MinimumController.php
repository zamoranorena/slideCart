<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Checkout;
use App\Models\Settings;
use App\Models\MinimumOrder;

class MinimumController extends Controller
{
    public function get_minimum(Request $request)
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
                $minimum = MinimumOrder::where('customer_id', $customer['id'])->first();
                $money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($minimum) {
                    $var = [
                        'minimum' => $minimum,
                        'money_format' => $money_format,
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
    public function put_minimum(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $minimum = MinimumOrder::where('customer_id', $customer['id'])->first();

                $enabled_minimum_order = $request->enabled_minimum_order;
                if($enabled_minimum_order){
                    $checkout_button = Checkout::where('customer_id', $customer['id'])->first();
                    if($checkout_button){
                        $checkout_button->update(['enabled_checkout_button' => 1]);
                    };
                };

                if ($minimum) {
                    //$update_minimum = $minimum->update($request->all());
                    $update_minimum = $minimum->update([
                    'enabled_minimum_order' => $request->enabled_minimum_order,
                    'minimum_order' => $request->minimum_order,
                    'minimum_order_option' => $request->minimum_order_option,
                    'minimum_order_text' => $request->minimum_order_text,
                    'minimum_font_size' => $request->minimum_font_size,
                    'minimum_color_h' => $request->minimum_color_h,
                    'minimum_color_s' => $request->minimum_color_s,
                    'minimum_color_b' => $request->minimum_color_b,
                    'minimum_color_hex' => $request->minimum_color_hex,
                    ]);
                    if ($update_minimum) {
                        EnsureClientFile::chargeEnvironment($shop);
                    };
                };
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
