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
            $customer =  Customer::with('CartEmpty')->where('shop_url', $shop)->first();
            if ($customer->CartEmpty) {
                if (is_null($request->cart_empty_upsell_list_products)) {
                    $request->merge([
                        'cart_empty_upsell_list_products' => '',
                    ]);
                };
                $updateCartEmpty = CartEmpty::where('customer_id', $customer['id'])->update($request->all());
            };
            if ($updateCartEmpty) {
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
    }
}
