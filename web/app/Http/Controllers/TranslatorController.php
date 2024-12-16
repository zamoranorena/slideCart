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
use App\Models\Language;

class TranslatorController extends Controller
{
    public function get_language(Request $request)
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
                $language = Language::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($language) {
                    $var = [
                        'language' => $language,
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
    public function put_language(Request $request)
    {
        try {
            Log::debug($request->all());
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $language = Language::where('customer_id', $customer['id'])->first();
                if ($language) {
                    if (is_null($request->cart_title_language_settings)) {
                        $request->merge([
                            'cart_title_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->cart_empty_text_language_settings)) {
                        $request->merge([
                            'cart_empty_text_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->add_to_cart_language_settings)) {
                        $request->merge([
                            'add_to_cart_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->rc_withOutSub_in_upsell_language_settings)) {
                        $request->merge([
                            'rc_withOutSub_in_upsell_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->rc_withSub_in_upsell_language_settings)) {
                        $request->merge([
                            'rc_withSub_in_upsell_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->add_in_upsell_language_settings)) {
                        $request->merge([
                            'add_in_upsell_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->shopping_cart_language_settings)) {
                        $request->merge([
                            'shopping_cart_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->product_language_settings)) {
                        $request->merge([
                            'product_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->products_language_settings)) {
                        $request->merge([
                            'products_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->subtotal_language_settings)) {
                        $request->merge([
                            'subtotal_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->clear_all_language_settings)) {
                        $request->merge([
                            'clear_all_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->remove_language_settings)) {
                        $request->merge([
                            'remove_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->sold_out_language_settings)) {
                        $request->merge([
                            'sold_out_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->unavailable_language_settings)) {
                        $request->merge([
                            'unavailable_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->free_language_settings)) {
                        $request->merge([
                            'free_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->free_gnral_language_settings)) {
                        $request->merge([
                            'free_gnral_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->add_discount_code_language_settings)) {
                        $request->merge([
                            'add_discount_code_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->discount_applied_language_settings)) {
                        $request->merge([
                            'discount_applied_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->checkout_button_textlanguage_settings)) {
                        $request->merge([
                            'checkout_button_textlanguage_settings' => ''
                        ]);
                    };
                    if (is_null($request->vendor_key_text_language_settings)) {
                        $request->merge([
                            'vendor_key_text_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->subscription_text_language_settings)) {
                        $request->merge([
                            'subscription_text_language_settings' => ''
                        ]);
                    };
                    if (is_null($request->valid_coupon_text)) {
                        $request->merge([
                            'valid_coupon_text' => ''
                        ]);
                    };
                    if (is_null($request->shipping_taxes_discounts_language_settings)) {
                        $request->merge([
                            'shipping_taxes_discounts_language_settings' => ''
                        ]);
                    };
                    $updateLanguage = $language->update($request->all());
                    if ($updateLanguage) {
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
