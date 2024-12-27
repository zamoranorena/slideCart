<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

use App\Exceptions\ShopifyProductCreatorException;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Lib\VerifyApp;
use App\Models\Customer;
use App\Models\Dashboard;
use Shopify\Auth\Session as AuthSession;
class VerifyAppController extends Controller
{
    public function verify_app(Request $request)
    {
        /** @var AuthSession */
        /* try {
            $var = [
                'error' => true,
                'message' => "Error get data.",
            ];
            
            $session = $request->get('shopifySession');
            Log::debug($session->getShop());

            $demo = VerifyApp::call($session);
            Log::debug($demo);
             $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $dahsboard = Dashboard::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($dahsboard) {
                    $var = [
                        'dahsboard' => $dahsboard,
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
        } */
        $session = $request->get('shopifySession');
        $success = $code = $error = $activeApp = $activeEmbedApp = null;
        try {
            //$customer = Customer::where('shop_url', $session->getShop())->first();
            //if ($customer) {
                //$dahsboard = Dashboard::where('customer_id', $customer['id'])->first();
            //};
            $activeEmbedApp = VerifyApp::call($session);
            //$activeApp = $dahsboard['dashboard_general_app'];
            $success = true;
            $code = 200;
            $error = null;
        } catch (\Exception $e) {
            $success = false;
    
            if ($e instanceof ShopifyProductCreatorException) {
                $code = $e->response->getStatusCode();
                $error = $e->response->getDecodedBody();
                if (array_key_exists("errors", $error)) {
                    $error = $error["errors"];
                }
            } else {
                $code = 500;
                $error = $e->getMessage();
            }
    
        } finally {
            return response()->json(["success" => $success, "error" => $error, "activeApp" => true, "activeEmbedApp" => $activeEmbedApp], $code);
        }
    }
}
