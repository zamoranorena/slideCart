<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\CustomizeController;
use App\Http\Controllers\CountDownController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\RewardsController;
use App\Http\Controllers\FreeItemsController;
use App\Http\Controllers\GiftWrapController;
use App\Http\Controllers\ShippingProtectionController;
use App\Http\Controllers\TermsController;
use App\Http\Controllers\MinimumController;
use App\Http\Controllers\CheckoutButtonController;
use App\Http\Controllers\CartButtonController;
use App\Http\Controllers\ContinueShopController;
use App\Http\Controllers\CartNoteController;
use App\Http\Controllers\CartCouponController;
use App\Http\Controllers\AdditionalCheckoutController;
use App\Http\Controllers\PaymentBadgesController;
use App\Http\Controllers\IntegrationsController;
use App\Http\Controllers\TranslatorController;
use App\Http\Controllers\CustomCssController;
use App\Http\Controllers\CustomJsController;
use App\Http\Controllers\AdditionalSettingsController;
use App\Http\Controllers\CartBarController;
use App\Http\Controllers\StickyCartController;
use App\Http\Controllers\QuickBuyController;
use App\Http\Controllers\CartAnimatorController;
use App\Http\Controllers\CouponBarController;
use App\Http\Controllers\VerifyAppController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/', function () {
   return "HELLO API GET";
});

// PROBANDO API.PHP

Route::get('get_client_data', [ClientController::class, 'get_client_data'])->middleware('shopify.auth');
Route::put('put_client_data', [ClientController::class, 'put_client_data'])->middleware('shopify.auth');

// PLANS
Route::get('get_current_plan',[ PlansController::class, 'get_current_plan' ])->middleware('shopify.auth');
Route::get('create_charge',[ PlansController::class, 'create_charge' ])->middleware('shopify.auth');
Route::post('cancel_charge',[ PlansController::class, 'cancel_charge' ])->middleware('shopify.auth');

//DASHBOARD
Route::get('getDashboard',[ DashboardController::class, 'get_dashboard' ])->middleware('shopify.auth');
Route::post('setDashboard',[ DashboardController::class, 'set_dashboard' ])->middleware('shopify.auth');


//CART-EDITOR
//SETTINGS
Route::get('get_settings',[ SettingsController::class, 'get_settings' ])->middleware('shopify.auth');
Route::put('settings',[ SettingsController::class, 'put_settings' ])->middleware('shopify.auth');

//CUSTOMIZE
Route::get('get_customize',[ CustomizeController::class, 'get_customize' ])->middleware('shopify.auth');
Route::get('get_customize_upsell',[ CustomizeController::class, 'get_customize_upsell' ])->middleware('shopify.auth');
Route::put('customize',[ CustomizeController::class, 'put_customize' ])->middleware('shopify.auth');
Route::put('update_customize_upsell',[ CustomizeController::class, 'put_customize_upsell' ])->middleware('shopify.auth');


//COUNTDOWN
Route::get('get_countdown',[ CountDownController::class, 'get_countdown' ])->middleware('shopify.auth');
Route::put('countdown',[ CountDownController::class, 'put_countdown' ])->middleware('shopify.auth');

//ANNOUNCEMENT
Route::get('get_announcement',[ AnnouncementController::class, 'get_announcement' ])->middleware('shopify.auth');
Route::put('announcement',[ AnnouncementController::class, 'put_announcement' ])->middleware('shopify.auth');

//REWARDS
Route::get('get_rewards',[ RewardsController::class, 'get_rewards' ])->middleware('shopify.auth');
Route::put('rewards',[ RewardsController::class, 'put_rewards' ])->middleware('shopify.auth');


//FREE_ITEMS
Route::get('get_free_items',[ FreeItemsController::class, 'get_free_items' ])->middleware('shopify.auth');
Route::put('free_items',[ FreeItemsController::class, 'put_free_items' ])->middleware('shopify.auth');

//GIFT_WRAP
Route::get('get_gift_wrap',[ GiftWrapController::class, 'get_gift_wrap' ])->middleware('shopify.auth');
Route::put('gift_wrap',[ GiftWrapController::class, 'put_gift_wrap' ])->middleware('shopify.auth');

//SHIPPING_PROTECTION
Route::get('get_shipping_protection',[ ShippingProtectionController::class, 'get_shipping_protection' ])->middleware('shopify.auth');
Route::put('shipping_protection',[ ShippingProtectionController::class, 'put_shipping_protection' ])->middleware('shopify.auth');

//TERMS
Route::get('get_terms',[ TermsController::class, 'get_terms' ])->middleware('shopify.auth');
Route::put('terms',[ TermsController::class, 'put_terms' ])->middleware('shopify.auth');

//MINIMUM
Route::get('get_minimum',[ MinimumController::class, 'get_minimum' ])->middleware('shopify.auth');
Route::put('minimum',[ MinimumController::class, 'put_minimum' ])->middleware('shopify.auth');

//CHECKOUT BUTTON
Route::get('get_checkout_button',[ CheckoutButtonController::class, 'get_checkout_button' ])->middleware('shopify.auth');
Route::put('checkout_button',[ CheckoutButtonController::class, 'put_checkout_button' ])->middleware('shopify.auth');

//CART BUTTON
Route::get('get_cart_button',[ CartButtonController::class, 'get_cart_button' ])->middleware('shopify.auth');
Route::put('cart_button',[ CartButtonController::class, 'put_cart_button' ])->middleware('shopify.auth');

//CONTINUE SHOPPING
Route::get('get_continue_shopping',[ ContinueShopController::class, 'get_continue_shopping' ])->middleware('shopify.auth');
Route::put('continue_shopping',[ ContinueShopController::class, 'put_continue_shopping' ])->middleware('shopify.auth');

//CART NOTE
Route::get('get_cart_note',[ CartNoteController::class, 'get_cart_note' ])->middleware('shopify.auth');
Route::put('cart_note',[ CartNoteController::class, 'put_cart_note' ])->middleware('shopify.auth');


//CART COUPON
Route::get('get_cart_coupon',[ CartCouponController::class, 'get_cart_coupon' ])->middleware('shopify.auth');
Route::put('cart_coupon',[ CartCouponController::class, 'put_cart_coupon' ])->middleware('shopify.auth');

//EXPRESS PAYMENTS
Route::get('get_additional_checkout_button',[ AdditionalCheckoutController::class, 'get_additional_checkout_button' ])->middleware('shopify.auth');
Route::put('additional_checkout_button',[ AdditionalCheckoutController::class, 'put_additional_checkout_button' ])->middleware('shopify.auth');


//PAYMENT_BADGES
Route::get('get_payment_badges',[ PaymentBadgesController::class, 'get_payment_badges' ])->middleware('shopify.auth');
Route::put('payment_badges',[ PaymentBadgesController::class, 'put_payment_badges' ])->middleware('shopify.auth');

//INTEGRATIONS
Route::get('get_integrations',[ IntegrationsController::class, 'get_integrations' ])->middleware('shopify.auth');
Route::put('integrations',[ IntegrationsController::class, 'put_integrations' ])->middleware('shopify.auth');

//LANGUAGE
Route::get('get_language',[ TranslatorController::class, 'get_language' ])->middleware('shopify.auth');
Route::put('language',[ TranslatorController::class, 'put_language' ])->middleware('shopify.auth');

//CUSTOMCSS
Route::get('get_customcss',[ CustomCssController::class, 'get_customcss' ])->middleware('shopify.auth');
Route::put('custom_css',[ CustomCssController::class, 'put_custom_css' ])->middleware('shopify.auth');

//CUSTOMJS
Route::get('get_customjs',[ CustomJsController::class, 'get_customjs' ])->middleware('shopify.auth');
Route::put('custom_js',[ CustomJsController::class, 'put_custom_js' ])->middleware('shopify.auth');

//ADDITIONAL_SETTINGS
Route::get('get_additional_settings',[ AdditionalSettingsController::class, 'get_additional_settings' ])->middleware('shopify.auth');
Route::put('additional_settings',[ AdditionalSettingsController::class, 'put_additional_settings' ])->middleware('shopify.auth');



//CARTBAR
Route::get('get_cart_bar',[ CartBarController::class, 'get_cart_bar' ])->middleware('shopify.auth');
Route::put('cart_bar',[ CartBarController::class, 'put_cart_bar' ])->middleware('shopify.auth');

//STICKYCART
Route::get('get_sticky_cart',[ StickyCartController::class, 'get_sticky_cart' ])->middleware('shopify.auth');
Route::put('sticky_cart',[ StickyCartController::class, 'put_sticky_cart'])->middleware('shopify.auth');

//QUICKBUY
Route::get('get_quick_buy',[ QuickBuyController::class, 'get_quick_buy' ])->middleware('shopify.auth');
Route::put('quick_buy',[ QuickBuyController::class, 'put_quick_buy'])->middleware('shopify.auth');

//CARTANIMATOR
Route::get('get_cart_animator',[ CartAnimatorController::class, 'get_cart_animator' ])->middleware('shopify.auth');
Route::put('cart_animator',[ CartAnimatorController::class, 'put_cart_animator'])->middleware('shopify.auth');

//COUPONBAR
Route::get('get_coupon_bar',[ CouponBarController::class, 'get_coupon_bar' ])->middleware('shopify.auth');
Route::put('coupon_bar',[ CouponBarController::class, 'put_coupon_bar'])->middleware('shopify.auth');

//VERIFY APP
Route::get('verify',[ VerifyAppController::class, 'verify_app' ])->middleware('shopify.auth');