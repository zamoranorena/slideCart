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
use App\Models\FreeItems;
use App\Models\FreeItemsTiers;

class FreeItemsController extends Controller
{
    public function get_free_items(Request $request)
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
                $tiered_free_items = FreeItems::where('customer_id', $customer['id'])->first();
                $tiered_free_items_tiers = FreeItemsTiers::where('customer_id', $customer['id'])->get();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($tiered_free_items) {
                    $var = [
                        'tiered_free_items' => $tiered_free_items,
                        'tiered_free_items_tiers' => $tiered_free_items_tiers,
                        //'money_format' => $money_format,
                    ];
                } else {
                    FreeItems::create([
                        'customer_id' =>  $customer['id']
                    ]);
                    $tiered_free_items = FreeItems::where('customer_id', $customer['id'])->first();
                    $var = [
                        'tiered_free_items' => $tiered_free_items,
                        'tiered_free_items_tiers' => $tiered_free_items_tiers,
                        //'money_format' => $money_format,
                    ];
                }
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
    public function put_free_items(Request $request)
    {
        try {
            
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $tiered_free_items = FreeItems::where('customer_id', $customer['id'])->first();
                if ($tiered_free_items) {
                    $tiered_free_items->update([
                        'enabled_tiered_free_items' => $request->enabled_tiered_free_items,
                        'tfi_mode_view' => $request->tfi_mode_view,
                        'tfi_slides_per_view' => $request->tfi_slides_per_view,
                        'tfi_slides_autoplay_time' => $request->tfi_slides_autoplay_time,
                        'tfi_mode_add_to_cart' => $request->tfi_mode_add_to_cart,
                        'tfi_section_heading' => $request->tfi_section_heading,
                        'tfi_heading_background_color_h' => $request->tfi_heading_background_color_h,
                        'tfi_heading_background_color_s' => $request->tfi_heading_background_color_s,
                        'tfi_heading_background_color_b' => $request->tfi_heading_background_color_b,
                        'tfi_heading_background_color_hex' => $request->tfi_heading_background_color_hex,
                        'tfi_heading_text_color_h' => $request->tfi_heading_text_color_h,
                        'tfi_heading_text_color_s' => $request->tfi_heading_text_color_s,
                        'tfi_heading_text_color_b' => $request->tfi_heading_text_color_b,
                        'tfi_heading_text_color_hex' => $request->tfi_heading_text_color_hex,
                        'tfi_heading_bold_font' => $request->tfi_heading_bold_font,
                        'tfi_product_url_automatic' => $request->tfi_product_url_automatic,
                        'tfi_heading_font_size' => $request->tfi_heading_font_size,
                        'tfi_lock_method' => $request->tfi_lock_method,
                        'tfi_unlock_text' => $request->tfi_unlock_text,
                        'tfi_unlock_text_show' => $request->tfi_unlock_text_show,
                        'tfi_unlock_text_transform' => $request->tfi_unlock_text_transform,
                        'tfi_unlock_text_font_size' => $request->tfi_unlock_text_font_size,
                        'tfi_unlock_text_font_weight' => $request->tfi_unlock_text_font_weight,
                        'tfi_unlock_text_color_h' => $request->tfi_unlock_text_color_h,
                        'tfi_unlock_text_color_s' => $request->tfi_unlock_text_color_s,
                        'tfi_unlock_text_color_b' => $request->tfi_unlock_text_color_b,
                        'tfi_unlock_text_color_hex' => $request->tfi_unlock_text_color_hex,
                        'tfi_unlock_bar_color_primary_h' => $request->tfi_unlock_bar_color_primary_h,
                        'tfi_unlock_bar_color_primary_s' => $request->tfi_unlock_bar_color_primary_s,
                        'tfi_unlock_bar_color_primary_b' => $request->tfi_unlock_bar_color_primary_b,
                        'tfi_unlock_bar_color_primary_hex' => $request->tfi_unlock_bar_color_primary_hex,
                        'tfi_unlock_bar_color_secondary_h' => $request->tfi_unlock_bar_color_secondary_h,
                        'tfi_unlock_bar_color_secondary_s' => $request->tfi_unlock_bar_color_secondary_s,
                        'tfi_unlock_bar_color_secondary_b' => $request->tfi_unlock_bar_color_secondary_b,
                        'tfi_unlock_bar_color_secondary_hex' => $request->tfi_unlock_bar_color_secondary_hex,
                        'tfi_unlock_bar_border_radius' => $request->tfi_unlock_bar_border_radius,
                        'tfi_calculate_based_on' => $request->tfi_calculate_based_on,
                        'tfi_locked_limit' => $request->tfi_locked_limit,
                        'tfi_unlocked_limit' => $request->tfi_unlocked_limit,
                        'tfi_show_quantity_box' => $request->tfi_show_quantity_box,
                        'tif_auto_add' => $request->tif_auto_add,
                    ]);

                    $update_tiered_free_items_tiers = $request->update_tiered_free_items_tiers || false;
                    
                    if ($update_tiered_free_items_tiers) {
                        $free_items_tier = FreeItemsTiers::where('customer_id', $customer['id'])->get(); //DATA DE LA BD
                        $arr_tiered_free_items_tiers = $request->values_tiered_free_items_tiers; //DATA RECIBIDA
    
                        if (count($arr_tiered_free_items_tiers) == 0 && count($free_items_tier) > 0) {
                            FreeItemsTiers::where('settings_tiered_free_items_id', $free_items_tier[0]['settings_tiered_free_items_id'])->delete();
                        };
                        if (count($arr_tiered_free_items_tiers) > 0 && count($free_items_tier) == 0) {
                            $PresetData = [];
                            for ($i = 0; $i < count($arr_tiered_free_items_tiers); $i++) {
                                $employee = array(
                                    'settings_tiered_free_items_id' => $tiered_free_items['id'],
                                    'tfi_tier_amount_from' =>$arr_tiered_free_items_tiers[$i]['tfi_tier_amount_from'],
                                    'tfi_tier_products' => $arr_tiered_free_items_tiers[$i]['tfi_tier_products'],
                                    'tfi_tier_name' => $arr_tiered_free_items_tiers[$i]['tfi_tier_name'],
                                    'tfi_tier_max_item' => $arr_tiered_free_items_tiers[$i]['tfi_tier_max_item'],
                                    'tfi_tier_hide_when_in_cart' => $arr_tiered_free_items_tiers[$i]['tfi_tier_hide_when_in_cart'],
                                    'customer_id' => $customer['id'],
                                );
                                array_push($PresetData, $employee);
                            };
                            FreeItemsTiers::insert($PresetData);
                        };
                        if (count($arr_tiered_free_items_tiers) > 0 && count($free_items_tier) > 0) {
                            FreeItemsTiers::where('settings_tiered_free_items_id', $free_items_tier[0]['settings_tiered_free_items_id'])->delete();
                            $PresetData = [];
                            for ($i = 0; $i < count($arr_tiered_free_items_tiers); $i++) {
                                $employee = array(
                                    'settings_tiered_free_items_id' => $tiered_free_items['id'],
                                    'tfi_tier_amount_from' =>$arr_tiered_free_items_tiers[$i]['tfi_tier_amount_from'],
                                    'tfi_tier_products' => $arr_tiered_free_items_tiers[$i]['tfi_tier_products'],
                                    'tfi_tier_name' => $arr_tiered_free_items_tiers[$i]['tfi_tier_name'],
                                    'tfi_tier_max_item' => $arr_tiered_free_items_tiers[$i]['tfi_tier_max_item'],
                                    'tfi_tier_hide_when_in_cart' => $arr_tiered_free_items_tiers[$i]['tfi_tier_hide_when_in_cart'],
                                    'customer_id' => $customer['id'],
                                );
                                array_push($PresetData, $employee);
                            };
                            FreeItemsTiers::insert($PresetData);
                        };
                    };
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
