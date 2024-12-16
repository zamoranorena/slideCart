<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Settings;
use App\Models\GiftWrap;
use App\Models\AssingIcon;

class GiftWrapController extends Controller
{
    public function get_gift_wrap(Request $request)
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
                $gift_wrap = GiftWrap::where('customer_id', $customer['id'])->first();
                $icons = AssingIcon::select('icons.id', 'icons.icon')
                    ->leftjoin('modules', 'modules.id', '=', 'assing_icon.id_module')
                    ->leftjoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
                    ->where('modules.module', 'settings')
                    ->orderBy('assing_icon.sorting', 'asc')
                    ->get();
                $money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($gift_wrap) {
                    $var = [
                        'gift_wrap' => $gift_wrap,
                        'icons_settings' => $icons,
                        'money_format' => $money_format,
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
    public function put_gift_wrap(Request $request)
    {
        //Log::debug($request->all());
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $gift_wrap = GiftWrap::where('customer_id', $customer['id'])->first();
                if ($gift_wrap) {
                    if (is_null($request->featured_product_shopify_id)) {
                        $request->merge([
                            'featured_product_shopify_id' => '',
                        ]);
                    };
                    if (is_null($request->featured_product_shopify_handle)) {
                        $request->merge([
                            'featured_product_shopify_handle' => '',
                        ]);
                    };
                    if (is_null($request->featured_product_shopify_title)) {
                        $request->merge([
                            'featured_product_shopify_title' => '',
                        ]);
                    };
                    if (is_null($request->featured_product_shopify_originalSrc)) {
                        $request->merge([
                            'featured_product_shopify_originalSrc' => '',
                        ]);
                    };
                    if (is_null($request->featured_product_shopify_id_variants)) {
                        $request->merge([
                            'featured_product_shopify_id_variants' => '',
                        ]);
                    };
                    if (is_null($request->featured_product_shopify_title_variants)) {
                        $request->merge([
                            'featured_product_shopify_title_variants' => '',
                        ]);
                    };
                    $update_gift_wrap = $gift_wrap->update($request->all());
                    if ($update_gift_wrap) {
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
