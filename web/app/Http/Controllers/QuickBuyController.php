<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\AssingIcon;

class QuickBuyController extends Controller
{
    public function get_quick_buy(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $quick_buy =  Customer::with('QuickBuy')->where('id', $customer['id'])->first();
                $icons = AssingIcon::select('icons.id', 'icons.icon')
                    ->leftjoin('modules', 'modules.id', '=', 'assing_icon.id_module')
                    ->leftjoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
                    ->where('modules.module', 'quick-buy')
                    ->orderBy('assing_icon.sorting', 'asc')
                    ->get();
                $var = '{
                    "dataQuickBuy": [ ' . json_encode($quick_buy->QuickBuy) . '],
                    "iconsQuickBuy":' . $icons . '
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
    public function put_quick_buy(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::with('QuickBuy')->where('shop_url', $shop)->first();
            if ($customer->QuickBuy) {
                $updateQuickBuy = $customer->QuickBuy()->update($request->all());
                if ($updateQuickBuy) {
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
