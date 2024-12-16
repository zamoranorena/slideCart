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
use App\Models\Rewards;
use App\Models\RewardsAllTiers;
use App\Models\RewardsSpecificTiers;

class RewardsController extends Controller
{
    public function get_rewards(Request $request)
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
                $rewards = Rewards::where('customer_id', $customer['id'])->first();
                $rewardsAllTiers = RewardsAllTiers::where('customer_id', $customer['id'])->get();
                $rewardsSpecificTiers = RewardsSpecificTiers::where('customer_id', $customer['id'])->get();
                $money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($rewards) {
                    $var = [
                        'rewards' => $rewards,
                        'rewardsAllTiers' => $rewardsAllTiers,
                        'rewardsSpecificTiers' => $rewardsSpecificTiers,
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
    public function put_rewards(Request $request)
    {

        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $rewards = Rewards::where('customer_id', $customer['id'])->first();
                if ($rewards) {
                    $rewards->update([
                        'enabled_rewards' => $request->enabled_rewards,
                        'rewards_countries' => $request->rewards_countries,
                        'rewards_enabled_in_cartEmpty' => $request->rewards_enabled_in_cartEmpty,
                        'rewards_converted_amount' => $request->rewards_converted_amount,
                        'rewards_show_goals' => $request->rewards_show_goals,
                        'rewards_bar_no_dscto' => $request->rewards_bar_no_dscto,
                        'rewards_show_prices_percentages' => $request->rewards_show_prices_percentages,
                        'rewards_mode' => $request->rewards_mode,
                        'rewards_range' => $request->rewards_range,
                        'rewards_font_size' => $request->rewards_font_size,
                        'rewards_text_transform' => $request->rewards_text_transform,
                        'rewards_font_weight' => $request->rewards_font_weight,
                        'rewards_background_content_color_h' => $request->rewards_background_content_color_h,
                        'rewards_background_content_color_s' => $request->rewards_background_content_color_s,
                        'rewards_background_content_color_b' => $request->rewards_background_content_color_b,
                        'rewards_background_content_color_hex' => $request->rewards_background_content_color_hex,
                        'rewards_background_primary_color_h' => $request->rewards_background_primary_color_h,
                        'rewards_background_primary_color_s' => $request->rewards_background_primary_color_s,
                        'rewards_background_primary_color_b' => $request->rewards_background_primary_color_b,
                        'rewards_background_primary_color_hex' => $request->rewards_background_primary_color_hex,
                        'rewards_background_secondary_color_h' => $request->rewards_background_secondary_color_h,
                        'rewards_background_secondary_color_s' => $request->rewards_background_secondary_color_s,
                        'rewards_background_secondary_color_b' => $request->rewards_background_secondary_color_b,
                        'rewards_background_secondary_color_hex' => $request->rewards_background_secondary_color_hex,
                        'rewards_font_color_h' => $request->rewards_font_color_h,
                        'rewards_font_color_s' => $request->rewards_font_color_s,
                        'rewards_font_color_b' => $request->rewards_font_color_b,
                        'rewards_font_color_hex' => $request->rewards_font_color_hex,
                        'rewards_border_radius' => $request->rewards_border_radius,
                    ]);
                };

                $update_rewards_all_tier = $request->update_rewards_all_tier || false;
                $update_rewards_specific_tier = $request->update_rewards_specific_tier || false;

                if ($update_rewards_all_tier) {
                    $rewards_all_tier = RewardsAllTiers::where('customer_id', $customer['id'])->get(); //DATA DE LA BD
                    $arr_rewards_all_tiers = $request->values_rewards_all_countries; //DATA RECIBIDA

                    if (count($arr_rewards_all_tiers) == 0 && count($rewards_all_tier) > 0) {
                        RewardsAllTiers::where('settings_rewards_id', $rewards_all_tier[0]['settings_rewards_id'])->delete();
                    };
                    if (count($arr_rewards_all_tiers) > 0 && count($rewards_all_tier) == 0) {
                        $PresetData = [];
                        for ($i = 0; $i < count($arr_rewards_all_tiers); $i++) {
                            $employee = array(
                                'settings_rewards_id' => $rewards['id'],
                                'rewards_title' => $arr_rewards_all_tiers[$i]['rewards_title'],
                                'rewards_congratulations' => $arr_rewards_all_tiers[$i]['rewards_congratulations'],
                                'rewards_amount' => $arr_rewards_all_tiers[$i]['rewards_amount'],
                                'rewards_confetti_time' => $arr_rewards_all_tiers[$i]['rewards_confetti_time'],
                                'rewards_confetti' => $arr_rewards_all_tiers[$i]['rewards_confetti'],
                                'customer_id' => $customer['id'],
                            );
                            array_push($PresetData, $employee);
                        };
                        RewardsAllTiers::insert($PresetData);
                    };
                    if (count($arr_rewards_all_tiers) > 0 && count($rewards_all_tier) > 0) {
                        RewardsAllTiers::where('settings_rewards_id', $rewards_all_tier[0]['settings_rewards_id'])->delete();
                        $PresetData = [];
                        for ($i = 0; $i < count($arr_rewards_all_tiers); $i++) {
                            $employee = array(
                                'settings_rewards_id' => $rewards['id'],
                                'rewards_title' => $arr_rewards_all_tiers[$i]['rewards_title'],
                                'rewards_congratulations' => $arr_rewards_all_tiers[$i]['rewards_congratulations'],
                                'rewards_amount' => $arr_rewards_all_tiers[$i]['rewards_amount'],
                                'rewards_confetti_time' => $arr_rewards_all_tiers[$i]['rewards_confetti_time'],
                                'rewards_confetti' => $arr_rewards_all_tiers[$i]['rewards_confetti'],
                                'customer_id' => $customer['id'],
                            );
                            array_push($PresetData, $employee);
                        };
                        RewardsAllTiers::insert($PresetData);
                    };
                };

                if ($update_rewards_specific_tier) {
                    $rewards_specific_tier = RewardsSpecificTiers::where('customer_id', $customer['id'])->get(); //DATA DE LA BD
                    $arr_rewards_specific_tiers = $request->values_rewards_specific_countries; //DATA RECIBIDA

                    if (count($arr_rewards_specific_tiers) == 0 && count($rewards_specific_tier) > 0) {
                        RewardsSpecificTiers::where('settings_rewards_id', $rewards_specific_tier[0]['settings_rewards_id'])->delete();
                    };
                    if (count($arr_rewards_specific_tiers) > 0 && count($rewards_specific_tier) == 0) {
                        $PresetData = [];
                        for ($i = 0; $i < count($arr_rewards_specific_tiers); $i++) {
                            $employee = array(
                                'settings_rewards_id' => $rewards['id'],
                                'rewards_title_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_title_specific_countries'],
                                'rewards_congratulations_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_congratulations_specific_countries'],
                                'rewards_amount_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_amount_specific_countries'],
                                'rewards_confetti_time_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_confetti_time_specific_countries'],
                                'rewards_confetti_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_confetti_specific_countries'],
                                'rewards_specific_country' => $arr_rewards_specific_tiers[$i]['rewards_specific_country'],
                                'customer_id' => $customer['id'],
                            );
                            array_push($PresetData, $employee);
                        };
                        RewardsSpecificTiers::insert($PresetData);
                    };
                    if (count($arr_rewards_specific_tiers) > 0 && count($rewards_specific_tier) > 0) {
                        RewardsSpecificTiers::where('settings_rewards_id', $rewards_specific_tier[0]['settings_rewards_id'])->delete();
                        $PresetData = [];
                        for ($i = 0; $i < count($arr_rewards_specific_tiers); $i++) {
                            $employee = array(
                                'settings_rewards_id' => $rewards['id'],
                                'rewards_title_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_title_specific_countries'],
                                'rewards_congratulations_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_congratulations_specific_countries'],
                                'rewards_amount_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_amount_specific_countries'],
                                'rewards_confetti_time_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_confetti_time_specific_countries'],
                                'rewards_confetti_specific_countries' => $arr_rewards_specific_tiers[$i]['rewards_confetti_specific_countries'],
                                'rewards_specific_country' => $arr_rewards_specific_tiers[$i]['rewards_specific_country'],
                                'customer_id' => $customer['id'],
                            );
                            array_push($PresetData, $employee);
                        };
                        RewardsSpecificTiers::insert($PresetData);
                    };
                };
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
