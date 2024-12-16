<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Customize;
use App\Models\AssingIcon;

use function Psy\debug;

class CustomizeController extends Controller
{
    public function get_customize(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $customize =  Customer::with('Customize')->where('id', $customer['id'])->first();
                $icons = AssingIcon::select('icons.id', 'icons.icon')
                    ->leftjoin('modules', 'modules.id', '=', 'assing_icon.id_module')
                    ->leftjoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
                    ->where('modules.module', 'customize')
                    ->orderBy('assing_icon.sorting', 'asc')
                    ->get();
                $var = '{
                    "customize": [ ' . json_encode($customize->Customize) . '],
                    "iconsCustomize":' . $icons . '
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
    public function put_customize(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::with('Customize')->where('shop_url', $shop)->first();
            if ($customer->Customize) {
                if (is_null($request->customize_body_prod_remove_text)) {
                    $request->merge([
                        'customize_body_prod_remove_text' => '',
                    ]);
                };
                $updateCustomize = $customer->Customize()->update($request->all());
                if ($updateCustomize) {
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

    public function get_customize_upsell(Request $request)
    {
        try {
            $responses = [
                'error' => true,
                'message' => "Error get data.",
            ];
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $customize = Customize::select(
                    'customize_body_upsell_background_color_h',
                    'customize_body_upsell_background_color_s',
                    'customize_body_upsell_background_color_b',
                    'customize_body_upsell_background_color_hex',
                    'customize_body_upsell_border_color_h',
                    'customize_body_upsell_border_color_s',
                    'customize_body_upsell_border_color_b',
                    'customize_body_upsell_border_color_hex',
                    'customize_body_upsell_arrows_color_h',
                    'customize_body_upsell_arrows_color_s',
                    'customize_body_upsell_arrows_color_b',
                    'customize_body_upsell_arrows_color_hex',
                    'customize_body_upsell_prod_title_color_text_h',
                    'customize_body_upsell_prod_title_color_text_s',
                    'customize_body_upsell_prod_title_color_text_b',
                    'customize_body_upsell_prod_title_color_text_hex',
                    'customize_body_upsell_prod_title_font_size',
                    'customize_body_upsell_prod_title_font_weigth',
                    'customize_body_upsell_prod_title_text_transform',
                    'customize_body_upsell_var_title_text_color_h',
                    'customize_body_upsell_var_title_text_color_s',
                    'customize_body_upsell_var_title_text_color_b',
                    'customize_body_upsell_var_title_text_color_hex',
                    'customize_body_upsell_var_title_font_size',
                    'customize_body_upsell_var_title_font_weigth',
                    'customize_body_upsell_var_title_text_transform',
                    'customize_body_upsell_price_color_text_h',
                    'customize_body_upsell_price_color_text_s',
                    'customize_body_upsell_price_color_text_b',
                    'customize_body_upsell_price_color_text_hex',
                    'customize_body_upsell_price_font_size',
                    'customize_body_upsell_price_font_weigth',
                    'customize_body_upsell_compare_price_color_text_h',
                    'customize_body_upsell_compare_price_color_text_s',
                    'customize_body_upsell_compare_price_color_text_b',
                    'customize_body_upsell_compare_price_color_text_hex',
                    'customize_body_upsell_compare_price_font_size',
                    'customize_body_upsell_compare_price_font_weigth',
                    'customize_body_upsell_enabled_sale_price',
                    'customize_body_upsell_sale_price_color_text_h',
                    'customize_body_upsell_sale_price_color_text_s',
                    'customize_body_upsell_sale_price_color_text_b',
                    'customize_body_upsell_sale_price_color_text_hex',
                    'customize_body_upsell_sale_price_font_size',
                    'customize_body_upsell_sale_price_font_weigth',
                    'customize_body_upsell_var_options_color_text_h',
                    'customize_body_upsell_var_options_color_text_s',
                    'customize_body_upsell_var_options_color_text_b',
                    'customize_body_upsell_var_options_color_text_hex',
                    'customize_body_upsell_var_options_font_size',
                    'customize_body_upsell_var_options_font_weigth',
                    'customize_body_upsell_var_options_text_transform',
                    'customize_body_upsell_button_background_color_h',
                    'customize_body_upsell_button_background_color_s',
                    'customize_body_upsell_button_background_color_b',
                    'customize_body_upsell_button_background_color_hex',
                    'customize_body_upsell_button_text_color_h',
                    'customize_body_upsell_button_text_color_s',
                    'customize_body_upsell_button_text_color_b',
                    'customize_body_upsell_button_text_color_hex',
                    'customize_body_upsell_button_text_font_size',
                    'customize_body_upsell_button_text_font_weigth',
                    'customize_body_upsell_button_text_transform',
                    'customize_body_upsell_button_border_radius',
                    'customize_body_upsell_button_hov_background_color_h',
                    'customize_body_upsell_button_hov_background_color_s',
                    'customize_body_upsell_button_hov_background_color_b',
                    'customize_body_upsell_button_hov_background_color_hex',
                    'customize_body_upsell_button_hov_text_color_h',
                    'customize_body_upsell_button_hov_text_color_s',
                    'customize_body_upsell_button_hov_text_color_b',
                    'customize_body_upsell_button_hov_text_color_hex',
                )->where('customer_id', $customer['id'])->get();
                /* $customize =  Customer::with('Customize')->where('id', $customer['id'])->first();
                $icons = AssingIcon::select('icons.id', 'icons.icon')
                    ->leftjoin('modules', 'modules.id', '=', 'assing_icon.id_module')
                    ->leftjoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
                    ->where('modules.module', 'customize')
                    ->orderBy('assing_icon.sorting', 'asc')
                    ->get();
                $var = '{
                    "customize": [ ' . json_encode($customize->Customize) . '],
                    "iconsCustomize":' . $icons . '
              }';
                $var = json_decode($var, true);
                return response($var); */
                if ($customize) {
                    $responses = [
                        'customize' => $customize
                    ];
                };
            };
            return response()->json($responses);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }

    public function put_customize_upsell(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::with('Customize')->where('shop_url', $shop)->first();
            if ($customer->Customize) {
                $updateCustomize = Customize::where('customer_id', $customer['id'])->update([
                    'customize_body_upsell_background_color_h' => $request->customize_body_upsell_background_color_h,
                    'customize_body_upsell_background_color_s' => $request->customize_body_upsell_background_color_s,
                    'customize_body_upsell_background_color_b' => $request->customize_body_upsell_background_color_b,
                    'customize_body_upsell_background_color_hex' => $request->customize_body_upsell_background_color_hex,
                    'customize_body_upsell_border_color_h' => $request->customize_body_upsell_border_color_h,
                    'customize_body_upsell_border_color_s' => $request->customize_body_upsell_border_color_s,
                    'customize_body_upsell_border_color_b' => $request->customize_body_upsell_border_color_b,
                    'customize_body_upsell_border_color_hex' => $request->customize_body_upsell_border_color_hex,
                    'customize_body_upsell_arrows_color_h' => $request->customize_body_upsell_arrows_color_h,
                    'customize_body_upsell_arrows_color_s' => $request->customize_body_upsell_arrows_color_s,
                    'customize_body_upsell_arrows_color_b' => $request->customize_body_upsell_arrows_color_b,
                    'customize_body_upsell_arrows_color_hex' => $request->customize_body_upsell_arrows_color_hex,
                    'customize_body_upsell_prod_title_color_text_h' => $request->customize_body_upsell_prod_title_color_text_h,
                    'customize_body_upsell_prod_title_color_text_s' => $request->customize_body_upsell_prod_title_color_text_s,
                    'customize_body_upsell_prod_title_color_text_b' => $request->customize_body_upsell_prod_title_color_text_b,
                    'customize_body_upsell_prod_title_color_text_hex' => $request->customize_body_upsell_prod_title_color_text_hex,
                    'customize_body_upsell_prod_title_font_size' => $request->customize_body_upsell_prod_title_font_size,
                    'customize_body_upsell_prod_title_font_weigth' => $request->customize_body_upsell_prod_title_font_weigth,
                    'customize_body_upsell_prod_title_text_transform' => $request->customize_body_upsell_prod_title_text_transform,
                    'customize_body_upsell_var_title_text_color_h' => $request->customize_body_upsell_var_title_text_color_h,
                    'customize_body_upsell_var_title_text_color_s' => $request->customize_body_upsell_var_title_text_color_s,
                    'customize_body_upsell_var_title_text_color_b' => $request->customize_body_upsell_var_title_text_color_b,
                    'customize_body_upsell_var_title_text_color_hex' => $request->customize_body_upsell_var_title_text_color_hex,
                    'customize_body_upsell_var_title_font_size' => $request->customize_body_upsell_var_title_font_size,
                    'customize_body_upsell_var_title_font_weigth' => $request->customize_body_upsell_var_title_font_weigth,
                    'customize_body_upsell_var_title_text_transform' => $request->customize_body_upsell_var_title_text_transform,
                    'customize_body_upsell_price_color_text_h' => $request->customize_body_upsell_price_color_text_h,
                    'customize_body_upsell_price_color_text_s' => $request->customize_body_upsell_price_color_text_s,
                    'customize_body_upsell_price_color_text_b' => $request->customize_body_upsell_price_color_text_b,
                    'customize_body_upsell_price_color_text_hex' => $request->customize_body_upsell_price_color_text_hex,
                    'customize_body_upsell_price_font_size' => $request->customize_body_upsell_price_font_size,
                    'customize_body_upsell_price_font_weigth' => $request->customize_body_upsell_price_font_weigth,
                    'customize_body_upsell_compare_price_color_text_h' => $request->customize_body_upsell_compare_price_color_text_h,
                    'customize_body_upsell_compare_price_color_text_s' => $request->customize_body_upsell_compare_price_color_text_s,
                    'customize_body_upsell_compare_price_color_text_b' => $request->customize_body_upsell_compare_price_color_text_b,
                    'customize_body_upsell_compare_price_color_text_hex' => $request->customize_body_upsell_compare_price_color_text_hex,
                    'customize_body_upsell_compare_price_font_size' => $request->customize_body_upsell_compare_price_font_size,
                    'customize_body_upsell_compare_price_font_weigth' => $request->customize_body_upsell_compare_price_font_weigth,
                    'customize_body_upsell_enabled_sale_price' =>  $request->customize_body_upsell_enabled_sale_price,
                    'customize_body_upsell_sale_price_color_text_h' =>  $request->customize_body_upsell_sale_price_color_text_h,
                    'customize_body_upsell_sale_price_color_text_s' =>  $request->customize_body_upsell_sale_price_color_text_s,
                    'customize_body_upsell_sale_price_color_text_b' =>  $request->customize_body_upsell_sale_price_color_text_b,
                    'customize_body_upsell_sale_price_color_text_hex' =>  $request->customize_body_upsell_sale_price_color_text_hex,
                    'customize_body_upsell_sale_price_font_size' =>  $request->customize_body_upsell_sale_price_font_size,
                    'customize_body_upsell_sale_price_font_weigth' =>  $request->customize_body_upsell_sale_price_font_weigth,
                    'customize_body_upsell_button_background_color_h' => $request->customize_body_upsell_button_background_color_h,
                    'customize_body_upsell_button_background_color_s' => $request->customize_body_upsell_button_background_color_s,
                    'customize_body_upsell_button_background_color_b' => $request->customize_body_upsell_button_background_color_b,
                    'customize_body_upsell_button_background_color_hex' => $request->customize_body_upsell_button_background_color_hex,
                    'customize_body_upsell_button_text_color_h' => $request->customize_body_upsell_button_text_color_h,
                    'customize_body_upsell_button_text_color_s' => $request->customize_body_upsell_button_text_color_s,
                    'customize_body_upsell_button_text_color_b' => $request->customize_body_upsell_button_text_color_b,
                    'customize_body_upsell_button_text_color_hex' => $request->customize_body_upsell_button_text_color_hex,
                    'customize_body_upsell_button_text_font_size' => $request->customize_body_upsell_button_text_font_size,
                    'customize_body_upsell_button_text_font_weigth' => $request->customize_body_upsell_button_text_font_weigth,
                    'customize_body_upsell_button_text_transform' => $request->customize_body_upsell_button_text_transform,
                    'customize_body_upsell_button_border_radius' => $request->customize_body_upsell_button_border_radius,
                    'customize_body_upsell_button_hov_background_color_h' => $request->customize_body_upsell_button_hov_background_color_h,
                    'customize_body_upsell_button_hov_background_color_s' => $request->customize_body_upsell_button_hov_background_color_s,
                    'customize_body_upsell_button_hov_background_color_b' => $request->customize_body_upsell_button_hov_background_color_b,
                    'customize_body_upsell_button_hov_background_color_hex' => $request->customize_body_upsell_button_hov_background_color_hex,
                    'customize_body_upsell_button_hov_text_color_h' => $request->customize_body_upsell_button_hov_text_color_h,
                    'customize_body_upsell_button_hov_text_color_s' => $request->customize_body_upsell_button_hov_text_color_s,
                    'customize_body_upsell_button_hov_text_color_b' => $request->customize_body_upsell_button_hov_text_color_b,
                    'customize_body_upsell_button_hov_text_color_hex' => $request->customize_body_upsell_button_hov_text_color_hex,
                ]);
                if ($updateCustomize) {
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
