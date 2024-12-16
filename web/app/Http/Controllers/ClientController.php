<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Shopify\Auth\Session as AuthSession;
use Shopify\Clients\Graphql;
use App\Lib\EnsureBilling;
use App\Lib\EnsureClientFile;
use App\Lib\GetDataShop;
use App\Lib\EnsureEnvironment;
use App\Models\Customer;
use App\Models\FreeItems;
use App\Models\CartNote;
use App\Models\GiftWrap;
use App\Models\Shipping;
use App\Models\Rewards;
use App\Models\Countdown;
use App\Models\Announcement;
use App\Models\Customize;
use App\Models\Dashboard;
use App\Models\Payment;
use App\Models\Settings;
use stdClass;

class ClientController extends Controller
{
    public function get_client_data(Request $request)
    {
        /** @var AuthSession */
        try {
            $var = [
                'error' => true,
                'message' => "Error get data.",
            ];

            $session = $request->get('shopifySession');
            $shop = $session->getShop();

            $customer = Customer::with([
                'Customize', 
                'Countdown', 
                'Announcement', 
                'Rewards', 
                'FreeItems', 
                'GiftWrap', 
                'Shipping', 
                'CartNote',
                'CartCoupon',
                'TermsConditions',
                'MinimumOrder',
                'Checkout',
                'GoToCart',
                'ContinueShop',
                'PaymentBadges',
                'AdditionalCheckout',
                'StickyCart',
                'CartBar'
            ])->where('shop_url', $shop)->first();

            if (!$customer->FreeItems) {
               $customer->FreeItems()->create([
                    'customer_id' => $customer['id']
                ]);
                $data = Customer::with([
                    'FreeItems'
                ])->where('shop_url', $shop)->first();

                Log::debug('$data->FreeItems');
                Log::debug($data->FreeItems);
                $customer->FreeItems = $data->FreeItems;
            };
            
            $dashboard = Dashboard::where('customer_id', $customer['id'])->first();
            
            $customize = $customer->Customize;
            $countdown = $customer->Countdown;
            $announcement = $customer->Announcement;
            $reward = $customer->Rewards;
            $tiered_free_items = $customer->FreeItems;
            $gift_wrap = $customer->GiftWrap;
            $shipping_protection = $customer->Shipping;
            $cart_note = $customer->CartNote;
            $cart_coupon = $customer->CartCoupon;
            $terms_conditions = $customer->TermsConditions;
            $minimum_order = $customer->MinimumOrder;
            $checkout = $customer->Checkout;
            $go_to_cart = $customer->GoToCart;
            $continue_shop = $customer->ContinueShop;
            $payment_badges = $customer->PaymentBadges;
            $additional_checkout = $customer->AdditionalCheckout;
            $cart_bar = $customer->CartBar;
            $sticky_cart = $customer->StickyCart;
            $quick_buy = $customer->QuickBuy;
            $cart_animator = $customer->CartAnimator;
            $coupon_bar = $customer->CouponBar;
            
            if ($customer) {
                $var = [
                    'dashboard' => $dashboard,
                    'shop' => $customer['shop_url'],
                    'new_user' => $customer['new_user'],
                    'status_user' => $customer['old_user'],
                    'cart_editor' => [
                        "customize_enabled_loading" => $customize->customize_enabled_loading,
                        "enabled_countdown" => $countdown->enabled_countdown,
                        "enabled_announcement" => $announcement->enabled_announcement,
                        "enabled_rewards" => $reward->enabled_rewards,
                        "enabled_tiered_free_items" => $tiered_free_items->enabled_tiered_free_items || [],
                        "enabled_gift_wrap" => $gift_wrap->enabled_gift_wrap,
                        "enabled_shipping_protection" => $shipping_protection->enabled_shipping_protection,
                        "enabled_cart_note" => $cart_note->enabled_cart_note,
                        "enabled_cart_coupon_button" => $cart_coupon->enabled_cart_coupon_button,
                        "enabled_terms" => $terms_conditions->enabled_terms,
                        "enabled_minimum_order" => $minimum_order->enabled_minimum_order,
                        "enabled_checkout_button" => $checkout->enabled_checkout_button,
                        "enabled_cart_button" => $go_to_cart->enabled_cart_button,
                        "enabled_continue_shopping" => $continue_shop->enabled_continue_shopping,
                        "enabled_payment_badges" => $payment_badges->enabled_payment_badges,
                        "enabled_additional_checkout_buttons" => $additional_checkout->enabled_additional_checkout_buttons
                    ],
                    'additional_add_ons' => [
                        "enabled_sticky_cart" => $sticky_cart->enabled_sticky_cart,
                        "enabled_cart_bar" => $cart_bar->enabled_cart_bar,
                        "enabled_quick_buy" => $quick_buy->enabled_quick_buy,
                        "enabled_cart_animator" => $cart_animator->enabled_cart_animator,
                        "enabled_coupon_bar" => $coupon_bar->enabled_coupon_bar
                    ]
                ];
                return response($var);
            }
        } catch (\Exception $e) {
            return response()->json([
                "saved" => 0,
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function put_client_data(Request $request)
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
                $status_user = $request->status_user;
                $update_customer = $customer->update(['old_user' => $status_user]);
                if ($update_customer) {
                    $dashboard = Dashboard::where('customer_id', $customer['id'])->first();
                    if(!$dashboard){
                        $dataShop = GetDataShop::call($shop, $customer['token']);
                        $money_format = $dataShop["data"]["shop"]["currencyFormats"]["moneyFormat"] || '';
                        EnsureEnvironment::create_environment($customer['id'], $money_format); //crear enviro 
                    };
                    EnsureClientFile::chargeEnvironment($shop);
                };
            };
            $var = [
                'status_user' => $update_customer,
            ];
            return response($var);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
}
