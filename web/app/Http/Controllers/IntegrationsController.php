<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
/* use App\Models\Settings; */
use App\Models\Integrations;

class IntegrationsController extends Controller
{
    public function get_integrations(Request $request)
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
                //$integrations = Integrations::where('customer_id', $customer['id'])->first();

                $integrations = Integrations::select('integrations.id', 'integrations.enabled_app', 'integrations_app.integrations_app_title', 'integrations_app.integrations_app_description', 'integrations_app.automatic', 'integrations_app.new')
                    ->join('integrations_app', 'integrations.integrations_app_id', '=', 'integrations_app.id')
                    ->where('integrations.customer_id', $customer['id'])
                    ->where('new', '>', 0)
                    ->get();

                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($integrations) {
                    $var = [
                        'integrations' => $integrations,
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
    public function put_integrations(Request $request)
    {
        try {

            /* Log::debug($request->all()); */
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $request = $request->all();
                if ($request['arr_integrations']) {
                    $arr_integrations = $request['arr_integrations'];
                    foreach ($arr_integrations as $integration) {
                        Integrations::where([
                            ['customer_id', '=',  $customer['id']],
                            ['id', '=', $integration['id']],
                        ])->update([
                            'enabled_app' => $integration['enabled_app']
                        ]);
                    }
                    EnsureClientFile::chargeEnvironment($shop);
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
