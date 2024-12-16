<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Settings;

class CustomJsController extends Controller
{
    public function get_customjs(Request $request)
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
                $custom_js =  Customer::with('Settings')->where('id', $customer['id'])->first();
                if ($custom_js) {
                    $var = [
                        'dataCustomJs' =>
                        array([
                            'customJs' => $custom_js->Settings->customJs
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
    public function put_custom_js(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            //$customer =  Customer::with('CartBar')->where('shop_url', $shop)->first();
            $customer =  Customer::where('shop_url', $shop)->first();
            if ($customer) {
                if (is_null($request->customJs)) {
                    $request->merge([
                        'customJs' => '',
                    ]);
                };
                $updateCustomJs = Settings::where('customer_id', $customer['id'])->update(['customJs' => $request->customJs]);
                if ($updateCustomJs) {
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
