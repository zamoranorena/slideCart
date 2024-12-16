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
use App\Models\ContinueShop;

class ContinueShopController extends Controller
{
    public function get_continue_shopping(Request $request)
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
                $continue_shopping = ContinueShop::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($continue_shopping) {
                    $var = [
                        'continue_shopping' => $continue_shopping,
                        /* 'money_format' => $money_format, */
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
    public function put_continue_shopping(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $continue_shopping = ContinueShop::where('customer_id', $customer['id'])->first();
                if ($continue_shopping) {
                    if (is_null($request->continue_shopping_button_url)) {
                        $request->merge([
                            'continue_shopping_button_url' => '',
                        ]);
                    };
                    $update_continue_shopping = $continue_shopping->update($request->all());
                    if ($update_continue_shopping) {
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
