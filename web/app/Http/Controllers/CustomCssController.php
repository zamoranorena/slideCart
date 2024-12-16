<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Settings;

class CustomCssController extends Controller
{
    public function get_customcss(Request $request)
    {
        Log::debug('CustomCssController: ');
        try {
            $var = [
                'error' => true,
                'message' => "Error get data.",
            ];
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $custom_css =  Customer::with('Settings')->where('id', $customer['id'])->first();
                if ($custom_css) {
                    $var = [
                        'dataCustomCss' =>
                        array([
                            'customCss' => $custom_css->Settings->customCss
                        ])
                    ];
                };
            };
            return response()->json($var);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
    public function put_custom_css(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            //$customer =  Customer::with('CartBar')->where('shop_url', $shop)->first();
            $customer =  Customer::where('shop_url', $shop)->first();
            if ($customer) {
                if (is_null($request->customCss)) {
                    $request->merge([
                        'customCss' => '',
                    ]);
                };
                $updateCustomCss = Settings::where('customer_id', $customer['id'])->update(['customCss' => $request->customCss]);
                if ($updateCustomCss) {
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
