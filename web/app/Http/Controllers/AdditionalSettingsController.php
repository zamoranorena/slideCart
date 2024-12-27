<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\AdditionalSettings;

class AdditionalSettingsController extends Controller
{
    public function get_additional_settings(Request $request)
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
                $additional_settings = AdditionalSettings::where('customer_id', $customer['id'])->first();
                //$money_format = Settings::select(['money_format'])->where('customer_id', $customer['id'])->first();
                if ($additional_settings) {
                    $var = [
                        'additional_settings' => $additional_settings,
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
    public function put_additional_settings(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $additional_settings = AdditionalSettings::where('customer_id', $customer['id'])->first();
                if ($additional_settings) {
                    $update_additional_settings = $additional_settings->update([
                        'hide_slide_cart' => $request->hide_slide_cart,
                        'hide_cart' => $request->hide_cart,
                        'hide_decimal' => $request->hide_decimal,
                        'hide_discount_money_cart' => $request->hide_discount_money_cart,
                        'add_url_item_cart' => $request->add_url_item_cart,
                        'reverse_currency_symbol' => $request->reverse_currency_symbol,
                        'prices_reverse_order' => $request->prices_reverse_order,
                        'show_especial' => $request->show_especial,
                        'show_discount' => $request->show_discount,
                        'show_clear_all' => $request->show_clear_all,
                        'show_products_count' => $request->show_products_count,
                        'show_prices_x_qty' => $request->show_prices_x_qty,
                        'show_compare_price' => $request->show_compare_price,
                        'show_save_item' => $request->show_save_item,
                        'base_price_for_discount' => $request->base_price_for_discount,
                        'show_discount_order_x_item' => $request->show_discount_order_x_item,
                        'hidden_variant_title_cart' => $request->hidden_variant_title_cart,
                        'show_product_property' => $request->show_product_property,
                        'show_weight' => $request->show_weight,
                        'show_unit_price' => $request->show_unit_price,
                        'show_quantity_box_cart' => $request->show_quantity_box_cart,
                        'hidden_quantity_box_cart_free' => $request->hidden_quantity_box_cart_free,
                        'show_quantity_box_upsells' => $request->show_quantity_box_upsells,
                        'add_utm' => $request->add_utm,
                        'selected_subscribe_upsell' => $request->selected_subscribe_upsell,
                        'cart_links' => $request->cart_links,
                        'open_cart' => $request->open_cart,
                        'show_subscription_option' => $request->show_subscription_option,
                        'show_subscription_option_upsell' => $request->show_subscription_option_upsell,
                        'image_quality' => $request->image_quality,
                        'image_container' => $request->image_container,
                    ]);
                    if ($update_additional_settings) {
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
