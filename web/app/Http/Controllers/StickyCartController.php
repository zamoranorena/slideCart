<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\AssingIcon;

class StickyCartController extends Controller
{
    public function get_sticky_cart(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $sticky_cart =  Customer::with('StickyCart')->where('id', $customer['id'])->first();
                $icons = AssingIcon::select('icons.id', 'icons.icon')
                    ->leftjoin('modules', 'modules.id', '=', 'assing_icon.id_module')
                    ->leftjoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
                    ->where('modules.module', 'sticky-cart')
                    ->orderBy('assing_icon.sorting', 'asc')
                    ->get();
                $var = '{
                    "dataStickyCart": [ ' . json_encode($sticky_cart->StickyCart) . '],
                    "iconsStickyCart":' . $icons . '
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
    public function put_sticky_cart(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::with('StickyCart')->where('shop_url', $shop)->first();
            if ($customer->StickyCart) {
                $updateStickyCart = $customer->StickyCart()->update($request->all());
                if ($updateStickyCart) {
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
