<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;

use function Psy\debug;

class CartAnimatorController extends Controller
{
    public function get_cart_animator(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $cart_animator =  Customer::with('CartAnimator')->where('id', $customer['id'])->first();
                $var = '{
                    "dataCartAnimator": [ ' . json_encode($cart_animator->CartAnimator) . ']
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
    public function put_cart_animator(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::with('CartAnimator')->where('shop_url', $shop)->first();
            if ($customer->CartAnimator) {
                $updateCartAnimator = $customer->CartAnimator()->update($request->all());
                if ($updateCartAnimator) {
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
