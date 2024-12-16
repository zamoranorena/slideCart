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
use App\Models\Checkout;
use App\Models\MinimumOrder;
use App\Models\AssingIcon;

class CheckoutButtonController extends Controller
{
    public function get_checkout_button(Request $request)
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
                $checkout_button = Checkout::where('customer_id', $customer['id'])->first();
                $minimum_order = MinimumOrder::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                $icons = AssingIcon::select('icons.id', 'icons.icon')
                    ->leftjoin('modules', 'modules.id', '=', 'assing_icon.id_module')
                    ->leftjoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
                    ->where('modules.module', 'settings_checkout_button')
                    ->orderBy('assing_icon.sorting', 'asc')
                    ->get();

                if ($checkout_button) {
                    $var = [
                        'checkout_button' => $checkout_button,
                        'minimum_order' => $minimum_order,
                        'icons' => $icons,
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
    public function put_checkout_button(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $checkout_button = Checkout::where('customer_id', $customer['id'])->first();
                if ($checkout_button) {
                    $update_checkout_button =$checkout_button->update($request->all());
                    if ($update_checkout_button) {
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
