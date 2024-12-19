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

class SettingsController extends Controller
{
    public function get_settings(Request $request)
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
                $cart_settings =  Customer::with(
                    'Settings:customer_id,enabled_desktop,enabled_mobile')->where('id', $customer['id'])->first();
                if ($cart_settings) {
                    $var = [
                        'settings' => $cart_settings->Settings,
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
    public function put_settings(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            /* $customer =  Customer::with('Settings')->where('shop_url', $shop)->first();
            if ($customer->Settings) {
                $updateSettings = Settings::where('customer_id', $customer['id'])->update([
                    'enabled_desktop' => $request->enabled_desktop,
                    'enabled_mobile' => $request->enabled_mobile,
                ]);
            };
            if ($updateSettings) {
                EnsureClientFile::chargeEnvironment($shop);
            }; */
            $customer =  Customer::where('shop_url', $shop)->first();
            if ($customer) {
                Settings::where('customer_id', $customer['id'])
                    ->update([
                        'enabled_desktop' => $request->enabled_desktop,
                        'enabled_mobile' => $request->enabled_mobile,
                    ]);
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
