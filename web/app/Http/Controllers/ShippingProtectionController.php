<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Shipping;

class ShippingProtectionController extends Controller
{
    public function get_shipping_protection(Request $request)
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
                $shipping_protection = Shipping::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($shipping_protection) {
                    $var = [
                        'shipping_protection' => $shipping_protection,
                        //'money_format' => $money_format,
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
    public function put_shipping_protection(Request $request)
    {
        try {
            
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $shipping_protection = Shipping::where('customer_id', $customer['id'])->first();
                if ($shipping_protection) {
                    if (is_null($request->sp_featured_product_shopify_id)) {
                        $request->merge([
                            'sp_featured_product_shopify_id' => '',
                        ]);
                    };
                    if (is_null($request->sp_featured_product_shopify_handle)) {
                        $request->merge([
                            'sp_featured_product_shopify_handle' => '',
                        ]);
                    };
                    if (is_null($request->sp_featured_product_shopify_title)) {
                        $request->merge([
                            'sp_featured_product_shopify_title' => '',
                        ]);
                    };
                    if (is_null($request->sp_featured_product_shopify_originalSrc)) {
                        $request->merge([
                            'sp_featured_product_shopify_originalSrc' => '',
                        ]);
                    };
                    if (is_null($request->sp_featured_product_shopify_id_variant)) {
                        $request->merge([
                            'sp_featured_product_shopify_id_variant' => '',
                        ]);
                    };
                    $update_shipping_protection = $shipping_protection->update($request->all());
                    if ($update_shipping_protection) {
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
