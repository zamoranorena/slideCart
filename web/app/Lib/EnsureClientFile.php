<?php

declare(strict_types=1);

namespace App\Lib;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Customer;
use App\Models\Dashboard;
use App\Models\Settings;
use App\Models\AdditionalSettings;
use App\Models\CartEmpty;
use App\Models\CountDown;
/* use App\Models\Settings; */

class EnsureClientFile
{
    public function editData()
    {
    }

    public static function chargeEnvironment($shop)
    {
        try {
            if ($shop) {
                /*  $arr_data = Customer::with(
                    'Dashboard:customer_id,dashboard_general_app',
                    'Settings'
                )->where("shop_url", $shop)->first(); */
                //Log::debug("CHARGE_ENVIROMENT: " . json_encode($arr_data, JSON_PRETTY_PRINT));

                $customer = Customer::with('Payment')->where("shop_url", $shop)->first();
                //Log::debug("chargeEnviroment: " . json_encode($customer, JSON_PRETTY_PRINT));
                if ($customer) {
                    $content_file = 'window.HSSLIDECART=[];';
                    $payment = collect($customer->payment)->where('status', "ACTIVE")->first();
                    if ($payment) {
                        /* $dashboard = Dashboard::where('customer_id', $customer['id'])->first();
                        $settings = Settings::where('customer_id', $customer['id'])->first();
                        $additional_settings = AdditionalSettings::where('customer_id', $customer['id'])->first();
                        $cart_empty = CartEmpty::where('customer_id', $customer['id'])->first();
                        $countdown = CountDown::where('customer_id', $customer['id'])->first(); */

                        $dashboard = 'Dashboard:customer_id,dashboard_general_app';
                        $settings = 'Settings';
                        $additional_settings =  'AdditionalSettings';
                        $cart_empty = 'cli_cart_empty';
                        $countdown =  'cli_countdown';
                        $announcement = 'cli_announcement';
                        $announcement_tiers = 'cli_announcement_tiers';
                        $rewards = 'cli_rewards';
                        $rewards_all_countries_tiers = 'cli_rewards_all_countries_tiers';
                        $rewards_specific_countries_tiers = 'cli_rewards_specific_countries_tiers';
                        $tiered_free_items = 'cli_tiered_free_items';
                        $tiered_free_items_tiers = 'cli_tiered_free_items_tiers';
                        $special_offer_notification = 'cli_special_offer_notification';
                        $special_offer_notification_tier = 'cli_special_offer_notification_tier';
                        $minimum_order = 'cli_minimum_order';
                        $cart_coupon = 'cli_cart_coupon';
                        $cart_note = 'cli_cart_note';
                        $additional_check = 'cli_additional_check';
                        $language_settings = 'cli_language_settings';
                        $gift_wrap = 'cli_gift_wrap';
                        $shipping_protection = 'cli_shipping_protection';
                        $terms_conditions = 'cli_terms_conditions';
                        $checkout_button = 'cli_checkout_button';
                        $cart_button = 'cli_cart_button';
                        $continue_shopping = 'cli_continue_shopping';
                        $payment_badges = 'cli_payment_badges';
                        $customize = 'cli_customize';
                        $integrations = 'cli_integrations';
                        $cart_bar = 'cli_cart_bar';
                        $sticky_cart = 'cli_sticky_cart';
                        $quick_buy = 'cli_quick_buy';
                        $cart_animator = 'cli_cart_animator';
                        $coupon_bar = 'cli_coupon_bar';

                        $arr_data = Customer::with(
                            $dashboard,
                            $settings,
                            $additional_settings,
                            $cart_empty,
                            $countdown,
                            $announcement,
                            $announcement_tiers,
                            $rewards,
                            $rewards_all_countries_tiers,
                            $rewards_specific_countries_tiers,
                            $tiered_free_items,
                            $tiered_free_items_tiers,
                            $special_offer_notification,
                            $special_offer_notification_tier,
                            $minimum_order,
                            $cart_coupon,
                            $cart_note,
                            $additional_check,
                            $language_settings,
                            $gift_wrap,
                            $shipping_protection,
                            $terms_conditions,
                            $checkout_button,
                            $cart_button,
                            $continue_shopping,
                            $payment_badges,
                            $customize,
                            $integrations,
                            $cart_bar,
                            $sticky_cart,
                            $quick_buy,
                            $cart_animator,
                            $coupon_bar,
                        )->where("shop_url", $shop)->first();
                        Log::debug("CLIENT_FILE: " . json_encode($arr_data, JSON_PRETTY_PRINT));
                        $dashboard = $arr_data->Dashboard;
                        $settings = $arr_data->Settings;
                        $additional_settings =  $arr_data->AdditionalSettings;
                        $cart_empty =  $arr_data->cli_cart_empty;
                        $countdown =  $arr_data->cli_countdown;
                        $announcement = $arr_data->cli_announcement;
                        $announcement_tiers = $arr_data->cli_announcement_tiers;
                        $rewards = $arr_data->cli_rewards;
                        $rewards_all_countries_tiers = $arr_data->cli_rewards_all_countries_tiers;
                        $rewards_specific_countries_tiers = $arr_data->cli_rewards_specific_countries_tiers;
                        $tiered_free_items = $arr_data->cli_tiered_free_items;
                        $tiered_free_items_tiers = $arr_data->cli_tiered_free_items_tiers;
                        $special_offer_notification = $arr_data->cli_special_offer_notification;
                        $special_offer_notification_tier = $arr_data->cli_special_offer_notification_tier;
                        $minimum_order = $arr_data->cli_minimum_order;
                        $cart_coupon = $arr_data->cli_cart_coupon;
                        $cart_note = $arr_data->cli_cart_note;
                        $additional_check = $arr_data->cli_additional_check;
                        $language_settings = $arr_data->cli_language_settings;
                        $gift_wrap = $arr_data->cli_gift_wrap;
                        $shipping_protection = $arr_data->cli_shipping_protection;
                        $terms_conditions = $arr_data->cli_terms_conditions;
                        $checkout_button = $arr_data->cli_checkout_button;
                        $cart_button = $arr_data->cli_cart_button;
                        $continue_shopping = $arr_data->cli_continue_shopping;
                        $payment_badges = $arr_data->cli_payment_badges;
                        $customize = $arr_data->cli_customize;
                        $integrations = $arr_data->cli_integrations;
                        $cart_bar = $arr_data->cli_cart_bar;
                        $sticky_cart = $arr_data->cli_sticky_cart;
                        $quick_buy = $arr_data->cli_quick_buy;
                        $cart_animator = $arr_data->cli_cart_animator;
                        $coupon_bar = $arr_data->cli_coupon_bar;

                        $settings = [
                            "devices" => $settings,
                            "additional_settings" => $additional_settings,
                            "cart_empty" => $cart_empty,
                            "countdown" => $countdown,
                            "announcement" => $announcement,
                            "announcement_tiers" => $announcement_tiers,
                            "rewards" => $rewards,
                            "rewards_all_countries_tiers" => $rewards_all_countries_tiers,
                            "rewards_specific_countries_tiers" => $rewards_specific_countries_tiers,
                            /* "product_recommendations_settings" => $product_recommendations_settings,
                            "manually_products_upsells" => $manually_products_upsells,
                            "static_products_upsells" => $static_products_upsells, */
                            "tiered_free_items" => $tiered_free_items,
                            "tiered_free_items_tiers" => $tiered_free_items_tiers,
                            "special_offer_notification" => $special_offer_notification,
                            "special_offer_notification_tier" => $special_offer_notification_tier,
                            "minimum_order" => $minimum_order,
                            "cart_coupon" => $cart_coupon,
                            "cart_note" => $cart_note,
                            "additional_check" => $additional_check,
                            "language_settings" => $language_settings,
                            "gift_wrap" => $gift_wrap,
                            "shipping_protection" => $shipping_protection,
                            "terms_conditions" => $terms_conditions,
                            "checkout_button" => $checkout_button,
                            "cart_button" => $cart_button,
                            "continue_shopping" => $continue_shopping,
                            "payment_badges" => $payment_badges,
                        ];

                        $token = [
                            "auth" => md5($shop . '<gH5<H-GJn!3GAAb'),
                        ];

                        $data = [
                            "dashboard" => $dashboard,
                            "settings" => $settings,
                            "customize" => $customize,
                            /* upsell:dataUpsells, */
                            "integrations" => $integrations,
                            "cart_bar" => $cart_bar,
                            "sticky_cart" => $sticky_cart,
                            "quick_buy" => $quick_buy,
                            "cart_animator" => $cart_animator,
                            "coupon_bar" => $coupon_bar,
                            "token" => $token,
                            "updateLanguage" => 1,
                        ];
       
                        $jsonData = 'window.HSSLIDECART.setSettings = ' . json_encode($data, JSON_PRETTY_PRINT) . ';';
                        $content_file = $jsonData;
                    };
                    //Storage::disk('local')->put(md5($shop) . '.js', $content_file);
                    //File::put('clients/' . md5($shop) . '.js', $content_file);
                    if (env('APP_ENV') === 'production') {
                        File::put('clients/' . md5($shop) . '.js', $content_file);
                    } else {
                        Storage::disk('frontend')->put(md5($shop) . '.js', $content_file);
                    };
                };
            };
        } catch (\Exception $th) {
            //throw $th;
        }
    }
}
