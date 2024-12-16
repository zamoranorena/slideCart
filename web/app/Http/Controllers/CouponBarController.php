<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;

class CouponBarController extends Controller
{
    public function get_coupon_bar(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $coupon_bar=  Customer::with('CouponBar')->where('id', $customer['id'])->first();
                $var = '{
                    "dataCouponBar": [ ' . json_encode($coupon_bar->CouponBar) . ']
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
    public function put_coupon_bar(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            
            $customer =  Customer::with('CouponBar')->where('shop_url', $shop)->first();
            Log::debug($request->all());
            if ($customer->CouponBar) {
                $updateCouponBar= $customer->CouponBar()->update($request->all());
                if ($updateCouponBar) {
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
