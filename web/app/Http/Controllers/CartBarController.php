<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\CartBar;

class CartBarController extends Controller
{
    public function get_cart_bar(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $cart_bar =  Customer::with('CartBar')->where('id', $customer['id'])->first();
                $var = '{
                    "dataCartBar": [ ' . json_encode($cart_bar->CartBar) . '],
                    "new_user":' . $customer['new_user'] . '
              }';
                $var = json_decode($var, true);
                return response($var);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
    public function put_cart_bar(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            //$customer =  Customer::with('CartBar')->where('shop_url', $shop)->first();
            $customer =  Customer::where('shop_url', $shop)->first();
            if ($customer) {
                if (is_null($request->cart_bar_product_shopify_id)) {
                    $request->merge([
                        'cart_bar_product_shopify_id' => '',
                    ]);
                };
                if (is_null($request->cart_bar_product_shopify_handle)) {
                    $request->merge([
                        'cart_bar_product_shopify_handle' => '',
                    ]);
                };
                if (is_null($request->cart_bar_product_shopify_title)) {
                    $request->merge([
                        'cart_bar_product_shopify_title' => '',
                    ]);
                };
                if (is_null($request->cart_bar_product_shopify_originalSrc)) {
                    $request->merge([
                        'cart_bar_product_shopify_originalSrc' => '',
                    ]);
                };
                //Log::debug($customer['id']);
                $updateCartBar = CartBar::where('customer_id', $customer['id'])->update($request->all());
                //Log::debug($updateCartBar);
                //$updateCartBar = $customer->CartBar()->update($request->all());
                if ($updateCartBar) {
                    EnsureClientFile::chargeEnvironment($shop);
                };
                return response()->json([
                    'error' => false,
                    'message' => 'success.',
                ]);
            };
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
}
