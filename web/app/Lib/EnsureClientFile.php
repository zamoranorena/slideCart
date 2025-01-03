<?php

declare(strict_types=1);

namespace App\Lib;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Customer;
use App\Models\Payment;
use App\Models\Dashboard;
use App\Models\Settings;
use App\Models\AdditionalSettings;
use App\Models\CartEmpty;
use App\Models\CountDown;
use App\Models\Announcement;
use App\Models\AnnouncementTiers;
use App\Models\Rewards;
use App\Models\RewardsAllTiers;
use App\Models\RewardsSpecificTiers;

use App\Models\FreeItems;
use App\Models\FreeItemsTiers;
use App\Models\SpecialOffer;
use App\Models\SpecialOfferTiers;
use App\Models\MinimumOrder;
use App\Models\CartCoupon;
use App\Models\CartNote;
use App\Models\AdditionalCheckout;
use App\Models\Language;
use App\Models\GiftWrap;
use App\Models\Shipping;
use App\Models\TermsConditions;
use App\Models\Checkout;
use App\Models\GoToCart;
use App\Models\ContinueShop;
use App\Models\PaymentBadges;

use App\Models\Customize;
use App\Models\Integrations;
use App\Models\CartBar;
use App\Models\StickyCart;
use App\Models\QuickBuy;
use App\Models\CartAnimator;
use App\Models\CouponBar;

/* use App\Models\Settings; */

class EnsureClientFile
{
    public function editData() {}

    public static function chargeEnvironment($shop)
    {
        try {
            if ($shop) {
                /*  $arr_data = Customer::with(
                    'Dashboard:customer_id,dashboard_general_app',
                    'Settings'
                )->where("shop_url", $shop)->first(); */
                //Log::debug("CHARGE_ENVIROMENT: " . json_encode($arr_data, JSON_PRETTY_PRINT));



                //$customer = Customer::with('Payment')->where("shop_url", $shop)->first();
                $customer = Customer::query()
                    ->select('id')
                    ->where("shop_url", $shop)
                    ->first();



                if ($customer) {
                    $content_file = 'window.HSSLIDECART=[];';
                    $payment = Payment::where('customer_id', $customer->id)->where('status', "ACTIVE")->orWhere('status', "active")->first();
                    if ($payment) {
                        $dashboard = Dashboard::query()
                            ->select('dashboard_general_app')
                            ->where("customer_id", $customer->id)
                            ->first();
                        $settings = Settings::query()
                            ->select(
                                'enabled_desktop',
                                'enabled_mobile',
                                'money_format',
                                'personalize',
                                'template_item_cart',
                                'customCss',
                                'customJs',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();
                        $additional_settings = AdditionalSettings::query()
                            ->select(
                                'hide_slide_cart',
                                'hide_cart',
                                'hide_decimal',
                                'hide_discount_money_cart',
                                'hide_discount_list_footer',
                                'add_url_item_cart',
                                'reverse_currency_symbol',
                                'prices_reverse_order',
                                'show_especial',
                                'show_discount',
                                'show_clear_all',
                                'show_products_count',
                                'show_prices_x_qty',
                                'show_compare_price',
                                'show_save_item',
                                'base_price_for_discount',
                                'show_discount_order_x_item',
                                'hidden_variant_title_cart',
                                'show_product_property',
                                'show_weight',
                                'show_unit_price',
                                'show_quantity_box_cart',
                                'hidden_quantity_box_cart_free',
                                'show_quantity_box_upsells',
                                'show_subscription_option',
                                'show_subscription_option_upsell',
                                'selected_subscribe_upsell',
                                'add_utm',
                                'cart_links',
                                'open_cart',
                                'image_quality',
                                'image_container',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $cart_empty = CartEmpty::query()
                            ->select(
                                'enabled_cart_empty',
                                'cart_empty_title',
                                'cart_empty_title_font_size',
                                'cart_empty_title_text_transform',
                                'cart_empty_title_font_weight',
                                'cart_empty_title_color_hex',
                                'cart_empty_subtitle',
                                'cart_empty_subtitle_font_size',
                                'cart_empty_subtitle_text_transform',
                                'cart_empty_subtitle_font_weight',
                                'cart_empty_subtitle_color_hex',
                                'cart_empty_button_background_color_hex',
                                'cart_empty_button_text',
                                'cart_empty_button_font_size',
                                'cart_empty_button_url',
                                'cart_empty_button_font_weight',
                                'cart_empty_button_text_transform',
                                'cart_empty_button_font_color_hex',
                                'cart_empty_button_border_radius',
                                'cart_empty_enabled_upsell',
                                'cart_empty_upsell_list_products',
                                'cart_empty_upsell_font_size',
                                'cart_empty_upsell_mode',
                                'cart_empty_upsell_qty',
                                'cart_empty_upsell_autoplay_time',
                                'cart_empty_upsell_add_to_cart_mode',
                                'cart_empty_upsell_heading',
                                'cart_empty_upsell_heading_background_color_hex',
                                'cart_empty_upsell_text_color_hex',
                                'cart_empty_upsell_heading_bold_font',
                                'cart_empty_upsell_product_url',
                                'cart_empty_upsell_max_item',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $countdown = CountDown::query()
                            ->select(
                                'enabled_countdown',
                                'countdown_minutes_reservation',
                                'countdown_reset',
                                'countdown_text',
                                'countdown_text_expire',
                                'countdown_expire_clear_cart',
                                'countdown_background_color_hex',
                                'countdown_border_color_hex',
                                'countdown_font_color_hex',
                                'countdown_font_size',
                                'countdown_text_transform',
                                'countdown_font_weight',
                                'countdown_text_alignment',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $announcement = Announcement::query()
                            ->select(
                                'enabled_announcement',
                                'announcement_background_color_hex',
                                'announcement_border_color_hex',
                                'announcement_font_color_hex',
                                'announcement_font_size',
                                'announcement_text_transform',
                                'announcement_font_weight',
                                'announcement_text_alignment',
                                'announcement_autoplay_time',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();
                        $announcement_tiers = AnnouncementTiers::query()
                            ->select(
                                'announcement_text',
                                'settings_announcement_id',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();
                        $rewards = Rewards::query()
                            ->select(
                                'enabled_rewards',
                                'rewards_countries',
                                'rewards_enabled_in_cartEmpty',
                                'rewards_converted_amount',
                                'rewards_show_goals',
                                'rewards_bar_no_dscto',
                                'rewards_show_prices_percentages',
                                'rewards_mode',
                                'rewards_range',
                                'rewards_font_size',
                                'rewards_text_transform',
                                'rewards_font_weight',
                                'rewards_background_content_color_hex',
                                'rewards_background_primary_color_hex',
                                'rewards_background_secondary_color_hex',
                                'rewards_font_color_hex',
                                'rewards_border_radius',
                            )
                            ->where('customer_id', $customer->id)->first();

                        $rewards_all_countries_tiers = RewardsAllTiers::query()
                            ->select(
                                'settings_rewards_id',
                                'rewards_title',
                                'rewards_congratulations',
                                'rewards_amount',
                                'rewards_confetti_time',
                                'rewards_confetti',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $rewards_specific_countries_tiers = RewardsSpecificTiers::query()
                            ->select(
                                'settings_rewards_id',
                                'rewards_title_specific_countries',
                                'rewards_congratulations_specific_countries',
                                'rewards_amount_specific_countries',
                                'rewards_confetti_time_specific_countries',
                                'rewards_confetti_specific_countries',
                                'rewards_specific_country',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $tiered_free_items = FreeItems::query()
                            ->select(
                                'enabled_tiered_free_items',
                                'tfi_mode_view',
                                'tfi_slides_per_view',
                                'tfi_slides_autoplay_time',
                                'tfi_mode_add_to_cart',
                                'tfi_section_heading',
                                'tfi_heading_background_color_hex',
                                'tfi_heading_text_color_hex',
                                'tfi_heading_bold_font',
                                'tfi_product_url_automatic',
                                'tfi_heading_font_size',
                                'tfi_lock_method',
                                'tfi_unlock_text',
                                'tfi_unlock_text_show',
                                'tfi_unlock_text_transform',
                                'tfi_unlock_text_font_size',
                                'tfi_unlock_text_font_weight',
                                'tfi_unlock_text_color_hex',
                                'tfi_unlock_bar_color_primary_hex',
                                'tfi_unlock_bar_color_secondary_hex',
                                'tfi_unlock_bar_border_radius',
                                'tfi_calculate_based_on',
                                'tfi_locked_limit',
                                'tfi_unlocked_limit',
                                'tfi_show_quantity_box',
                                'tif_auto_add',
                                'tfi_only_product_tier',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $tiered_free_items_tiers = FreeItemsTiers::query()
                            ->select(
                                'tfi_tier_amount_from',
                                'tfi_tier_products',
                                'tfi_tier_name',
                                'tfi_tier_max_item',
                                'tfi_tier_hide_when_in_cart',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();
                        if (is_null($tiered_free_items_tiers)) {
                            $tiered_free_items_tiers = [];
                        };

                        $special_offer_notification = SpecialOffer::query()
                            ->select(
                                'enabled_special_offer_notification',
                                'offer_based_notification',
                                'max_offers_show_notification',
                                'qualified_background_color_hex_notification',
                                'qualified_text_color_hex_notification',
                                'qualified_bold_font_notification',
                                'unqualified_background_color_hex_notification',
                                'unqualified_text_color_hex_notification',
                                'unqualified_bold_font_notification',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $special_offer_notification_tier = SpecialOfferTiers::query()
                            ->select(
                                'settings_special_offer_notification_id',
                                'num_special_offer_notification_tier',
                                'min_val_qualify',
                                'special_offer_message_qualify',
                                'special_offer_message_not_qualify',
                                'tier_name',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $minimum_order = MinimumOrder::query()
                            ->select(
                                'enabled_minimum_order',
                                'minimum_order',
                                'minimum_order_option',
                                'minimum_order_text',
                                'minimum_font_size',
                                'minimum_color_hex',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $cart_coupon = CartCoupon::query()
                            ->select(
                                'enabled_cart_coupon_button',
                                'position_cart_coupon_button',
                                'name_cart_coupon_button',
                                'placeholder_cart_coupon_button',
                                'button_background_color_hex',
                                'button_font_color_hex',
                                'button_font_size',
                                'button_text_transform',
                                'button_font_weight',
                                'button_border_radius',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $cart_note = CartNote::query()
                            ->select(
                                'enabled_cart_note',
                                'cart_note_show_icon',
                                'cart_note_show_ini',
                                'cart_note_heading',
                                'cart_note_heading_close',
                                'cart_note_heading_placeholder',
                                'cart_note_heading_color_hex',
                                'cart_note_font_size',
                                'cart_note_text_transform',
                                'cart_note_font_weight',
                                'cart_note_additional',
                                'cart_note_additional_text',
                                'cart_note_additional_message',
                                'cart_note_additional_color_hex',
                                'cart_note_additional_font_size',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $additional_check = AdditionalCheckout::query()
                            ->select(
                                'enabled_additional_checkout_buttons'
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $language_settings = Language::query()
                            ->select(
                                'cart_title_language_settings',
                                'cart_empty_text_language_settings',
                                'add_to_cart_language_settings',
                                'add_in_upsell_language_settings',
                                'rc_withOutSub_in_upsell_language_settings',
                                'rc_withSub_in_upsell_language_settings',
                                'rc_upgrade_language_settings',
                                'rc_downgrade_language_settings',
                                'discount_savings_language_settings',
                                'shopping_cart_language_settings',
                                'product_language_settings',
                                'products_language_settings',
                                'subtotal_language_settings',
                                'clear_all_language_settings',
                                'remove_language_settings',
                                'sold_out_language_settings',
                                'unavailable_language_settings',
                                'free_language_settings',
                                'free_gnral_language_settings',
                                'add_discount_code_language_settings',
                                'discount_applied_language_settings',
                                'checkout_button_textlanguage_settings',
                                'vendor_key_text_language_settings',
                                'subscription_text_language_settings',
                                'valid_coupon_text',
                                'original_total_price_language_settings',
                                'total_discount_savings_language_settings',
                                'notification_button_text',
                                'shipping_taxes_discounts_language_settings',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $gift_wrap = GiftWrap::query()
                            ->select(
                                'settings_gift_wrap.enabled_gift_wrap',
                                'settings_gift_wrap.product_type',
                                'settings_gift_wrap.gift_wrap_icon',
                                'settings_gift_wrap.gift_wrap_icon_color_hex',
                                'settings_gift_wrap.offer_name',
                                'settings_gift_wrap.offer_name_color_hex',
                                'settings_gift_wrap.offer_price',
                                'settings_gift_wrap.offer_price_color_hex',
                                'settings_gift_wrap.offer_compare_price',
                                'settings_gift_wrap.offer_compare_price_color_hex',
                                'settings_gift_wrap.offer_icon_url_img_host',
                                'settings_gift_wrap.offer_icon_url_img_shopify',
                                'settings_gift_wrap.featured_product_shopify_handle',
                                'settings_gift_wrap.featured_product_shopify_title',
                                'settings_gift_wrap.featured_product_shopify_originalSrc',
                                'settings_gift_wrap.featured_product_shopify_id_variants',
                                'settings_gift_wrap.featured_product_title',
                                'settings_gift_wrap.featured_product_title_bold',
                                'settings_gift_wrap.featured_product_show_image',
                                'settings_gift_wrap.display_selling_color_hex',
                                'settings_gift_wrap.display_compare_price_color_hex',
                                'settings_gift_wrap.offer_font_size',
                                'icons.icon'
                            )
                            ->leftJoin('icons', 'settings_gift_wrap.gift_wrap_icon', '=', 'icons.id')
                            ->where('settings_gift_wrap.customer_id', $customer->id)
                            ->first();

                        $shipping_protection = Shipping::query()
                            ->select(
                                'enabled_shipping_protection',
                                'sp_featured_product_shopify_handle',
                                'sp_featured_product_shopify_id_variant',
                                'sp_show_image',
                                'sp_auto_add',
                                'sp_title_color_hex',
                                'sp_title_font_size',
                                'sp_title_transform',
                                'sp_title_font_weight',
                                'sp_description_color_hex',
                                'sp_description_font_size',
                                'sp_description_transform',
                                'sp_description_font_weight',
                                'sp_price_color_hex',
                                'sp_price_font_size',
                                'sp_price_font_weight',
                                'sp_compare_price_color_hex',
                                'sp_compare_price_font_size',
                                'sp_compare_price_font_weight',
                                'sp_toggle_color_hex',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $terms_conditions = TermsConditions::query()
                            ->select(
                                'enabled_terms',
                                'text_terms',
                                'font_size_terms',
                                'url_terms',
                                'notify_terms',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $checkout_button = Checkout::query()
                            ->select(
                                'settings_checkout_button.enabled_checkout_button',
                                'settings_checkout_button.checkout_button_icon',
                                'settings_checkout_button.checkout_button_icon_enabled',
                                'settings_checkout_button.checkout_button_show_subtotal_text',
                                'settings_checkout_button.checkout_button_text',
                                'settings_checkout_button.checkout_button_text_color_hex',
                                'settings_checkout_button.checkout_button_text_colorHover_hex',
                                'settings_checkout_button.checkout_button_text_font_size',
                                'settings_checkout_button.checkout_button_text_transform',
                                'settings_checkout_button.checkout_button_text_weight',
                                'settings_checkout_button.checkout_button_background_color_hex',
                                'settings_checkout_button.checkout_button_background_colorHover_hex',
                                'settings_checkout_button.checkout_button_border',
                                'icons.icon as checkout_button_icon_svg'
                            )
                            ->leftJoin('icons', 'settings_checkout_button.checkout_button_icon', '=', 'icons.id')
                            ->where('settings_checkout_button.customer_id', $customer->id)
                            ->first();

                        $cart_button = GoToCart::query()
                            ->select(
                                'enabled_cart_button',
                                'cart_button_text',
                                'cart_button_text_color_hex',
                                'cart_button_text_colorHover_hex',
                                'cart_button_text_font_size',
                                'cart_button_text_transform',
                                'cart_button_text_weight',
                                'cart_button_background_color_hex',
                                'cart_button_background_colorHover_hex',
                                'cart_button_border',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $continue_shopping = ContinueShop::query()
                            ->select(
                                'enabled_continue_shopping',
                                'continue_shopping_text',
                                'continue_shopping_text_font_size',
                                'continue_shopping_text_transform',
                                'continue_shopping_text_weight',
                                'continue_shopping_text_color_hex',
                                'continue_shopping_text_colorHover_hex',
                                'continue_shopping_button_url',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $payment_badges = PaymentBadges::query()
                            ->select(
                                'enabled_payment_badges',
                                'url_img_host',
                                'url_img_shopify',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $customize = Customize::query()
                            ->select(
                                'customize.customize_slidecart_design',
                                'customize.customize_slidecart_size',
                                'customize.customize_slidecart_position',
                                'customize.customize_slidecart_animation_mobile',
                                'customize.customize_slidecart_footer_fixed',
                                'customize.customize_slidecart_rtl',
                                'customize.customize_slidecart_margin_left',
                                'customize.customize_enabled_loading',
                                'customize.customize_loading_background_rgb',
                                'customize.customize_loading_icon_hex',
                                'customize.customize_header_background_color_hex',
                                'customize.customize_header_text_color_hex',
                                'customize.customize_header_text_font_size',
                                'customize.customize_header_text_transform',
                                'customize.customize_header_icon_color_hex',
                                'customize.customize_header_icon_color_hov_hex',
                                'customize.customize_header_icon_size',
                                'customize.customize_body_background_color_hex',
                                'customize.customize_body_text_color_hex',
                                'customize.customize_body_border_color_hex',
                                'customize.customize_body_prod_icon_remove_color_hex',
                                'customize.customize_body_design_qty',
                                'customize.customize_body_prod_remove_enabled',
                                'customize.customize_body_prod_remove_text',
                                'customize.customize_body_prod_icon_remove_size',
                                'customize.customize_body_prod_icon_remove_color_hov_hex',
                                'customize.customize_body_prod_title_color_text_hex',
                                'customize.customize_body_prod_title_font_size',
                                'customize.customize_body_prod_title_font_weigth',
                                'customize.customize_body_prod_title_text_transform',
                                'customize.customize_body_var_title_color_text_hex',
                                'customize.customize_body_var_title_font_size',
                                'customize.customize_body_var_title_font_weigth',
                                'customize.customize_body_var_title_text_transform',
                                'customize.customize_body_price_color_text_hex',
                                'customize.customize_body_price_font_size',
                                'customize.customize_body_price_font_weigth',
                                'customize.customize_body_compare_price_color_text_hex',
                                'customize.customize_body_compare_price_font_size',
                                'customize.customize_body_compare_price_font_weigth',
                                'customize.customize_body_enabled_sale_price',
                                'customize.customize_body_sale_price_color_text_hex',
                                'customize.customize_body_sale_price_font_size',
                                'customize.customize_body_sale_price_font_weigth',
                                'customize.customize_body_discount_color_text_hex',
                                'customize.customize_body_discount_font_size',
                                'customize.customize_body_discount_font_weigth',
                                'customize.customize_body_saving_color_text_hex',
                                'customize.customize_body_saving_font_size',
                                'customize.customize_body_saving_font_weigth',
                                'customize.customize_body_upgrade_button_background_color_hex',
                                'customize.customize_body_upgrade_button_text_color_hex',
                                'customize.customize_body_upgrade_button_text_transform',
                                'customize.customize_body_upgrade_button_text_font_size',
                                'customize.customize_body_upgrade_button_text_font_weigth',
                                'customize.customize_body_upgrade_button_border_radius',
                                'customize.customize_body_upsell_background_color_hex',
                                'customize.customize_body_upsell_border_color_hex',
                                'customize.customize_body_upsell_arrows_color_hex',
                                'customize.customize_body_upsell_prod_title_color_text_hex',
                                'customize.customize_body_upsell_prod_title_font_size',
                                'customize.customize_body_upsell_prod_title_font_weigth',
                                'customize.customize_body_upsell_prod_title_text_transform',
                                'customize.customize_body_upsell_var_title_text_color_hex',
                                'customize.customize_body_upsell_var_title_font_size',
                                'customize.customize_body_upsell_var_title_font_weigth',
                                'customize.customize_body_upsell_var_title_text_transform',
                                'customize.customize_body_upsell_price_color_text_hex',
                                'customize.customize_body_upsell_price_font_size',
                                'customize.customize_body_upsell_price_font_weigth',
                                'customize.customize_body_upsell_compare_price_color_text_hex',
                                'customize.customize_body_upsell_compare_price_font_size',
                                'customize.customize_body_upsell_compare_price_font_weigth',
                                'customize.customize_body_upsell_enabled_sale_price',
                                'customize.customize_body_upsell_sale_price_color_text_hex',
                                'customize.customize_body_upsell_sale_price_font_size',
                                'customize.customize_body_upsell_sale_price_font_weigth',
                                'customize.customize_body_upsell_var_options_color_text_hex',
                                'customize.customize_body_upsell_var_options_font_size',
                                'customize.customize_body_upsell_var_options_font_weigth',
                                'customize.customize_body_upsell_var_options_text_transform',
                                'customize.customize_body_upsell_button_background_color_hex',
                                'customize.customize_body_upsell_button_text_color_hex',
                                'customize.customize_body_upsell_button_text_font_size',
                                'customize.customize_body_upsell_button_text_font_weigth',
                                'customize.customize_body_upsell_button_text_transform',
                                'customize.customize_body_upsell_button_border_radius',
                                'customize.customize_body_upsell_button_hov_background_color_hex',
                                'customize.customize_body_upsell_button_hov_text_color_hex',
                                'customize.customize_popup_background_color_hex',
                                'customize.customize_popup_border_color_hex',
                                'customize.customize_popup_title_text_color_hex',
                                'customize.customize_popup_title_font_size',
                                'customize.customize_popup_title_font_weigth',
                                'customize.customize_popup_title_text_transform',
                                'customize.customize_popup_price_text_color_hex',
                                'customize.customize_popup_price_font_size',
                                'customize.customize_popup_price_font_weigth',
                                'customize.customize_popup_compare_price_text_color_hex',
                                'customize.customize_popup_compare_price_font_size',
                                'customize.customize_popup_compare_price_font_weigth',
                                'customize.customize_popup_enabled_sale_price',
                                'customize.customize_popup_sale_price_text_color_hex',
                                'customize.customize_popup_sale_price_font_size',
                                'customize.customize_popup_sale_price_font_weigth',
                                'customize.customize_popup_var_options_design',
                                'customize.customize_popup_button_background_color_hex',
                                'customize.customize_popup_button_text_color_hex',
                                'customize.customize_popup_button_border_radius',
                                'customize.customize_popup_button_text_font_size',
                                'customize.customize_popup_button_text_font_weigth',
                                'customize.customize_popup_button_text_transform',
                                'customize.customize_popup_button_hov_background_color_hex',
                                'customize.customize_popup_button_hov_text_color_hex',
                                'customize.customize_footer_total_price_text_color_hex',
                                'customize.customize_footer_total_price_font_size',
                                'customize.customize_footer_total_price_font_weigth',
                                'customize.customize_footer_compare_price_text_color_hex',
                                'customize.customize_footer_compare_price_font_size',
                                'customize.customize_footer_compare_price_font_weigth',
                                'customize.customize_footer_discount_text_color_hex',
                                'customize.customize_footer_discount_font_size',
                                'customize.customize_footer_discount_font_weigth',
                                'customize.customize_footer_background_color_hex',
                                'customize.customize_footer_text_color_hex',
                                'customize.customize_footer_orig_total_price_text_color_hex',
                                'customize.customize_footer_orig_total_price_text_font_size',
                                'customize.customize_footer_orig_total_price_text_font_weight',
                                'customize.customize_footer_orig_total_price_color_hex',
                                'customize.customize_footer_orig_total_price_font_size',
                                'customize.customize_footer_orig_total_price_font_weight',
                                'customize.customize_footer_total_discount_text_color_hex',
                                'customize.customize_footer_total_discount_text_font_size',
                                'customize.customize_footer_total_discount_text_font_weight',
                                'customize.customize_footer_total_discount_color_hex',
                                'customize.customize_footer_total_discount_font_size',
                                'customize.customize_footer_total_discount_font_weight',
                                'icons.icon'
                            )
                            ->leftJoin('icons', 'customize.customize_body_prod_icon_remove', '=', 'icons.id')
                            ->where('customize.customer_id', $customer->id)
                            ->first();

                        $integrations = Integrations::query()
                            ->select(
                                'integrations.enabled_app',
                                'integrations.integrations_app_key',
                                'integrations_app.integrations_app_require_key',
                                'integrations_app.automatic',
                                'integrations.integrations_app_id'
                            )
                            ->leftJoin('integrations_app', 'integrations.integrations_app_id', '=', 'integrations_app.id')
                            ->where('integrations.customer_id', $customer->id)
                            ->where('integrations_app.new', '>', 0)
                            ->first();

                        $cart_bar = CartBar::query()
                            ->select(
                                'enabled_cart_bar',
                                'enabled_cart_bar_home_page',
                                'cart_bar_product_shopify_handle',
                                'cart_bar_product_shopify_title',
                                'cart_bar_product_shopify_originalSrc',
                                'cart_bar_button_text',
                                'cart_bar_button_redirect',
                                'cart_bar_show_prices_x_qty',
                                'cart_bar_button_background_color_hex',
                                'cart_bar_button_text_color_hex',
                                'cart_bar_background_color_hex',
                                'cart_bar_productTitle_color_hex',
                                'cart_bar_price_color_hex',
                                'cart_bar_comparePrice_color_hex',
                                'cart_bar_show_mobile',
                                'cart_bar_mobile_position',
                                'cart_bar_mobile_hide_atc',
                                'cart_bar_mobile_hide_stickybarButton',
                                'cart_bar_mobile_show_full_stickybarButton',
                                'cart_bar_mobile_show_productImage',
                                'cart_bar_mobile_show_productTitle',
                                'cart_bar_mobile_show_reviewStarts',
                                'cart_bar_mobile_show_variantSelect',
                                'cart_bar_mobile_show_quantitySelect',
                                'cart_bar_mobile_show_price',
                                'cart_bar_mobile_show_comparePrice',
                                'cart_bar_mobile_positionOffset',
                                'cart_bar_show_desktop',
                                'cart_bar_desktop_position',
                                'cart_bar_desktop_hide_atc',
                                'cart_bar_desktop_hide_stickybarButton',
                                'cart_bar_desktop_show_productImage',
                                'cart_bar_desktop_show_productTitle',
                                'cart_bar_desktop_show_reviewStars',
                                'cart_bar_desktop_show_variantSelect',
                                'cart_bar_desktop_show_quantitySelect',
                                'cart_bar_desktop_show_price',
                                'cart_bar_desktop_show_comparePrice',
                                'cart_bar_desktop_positionOffset',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $sticky_cart = StickyCart::query()
                            ->select(
                                'sticky_cart.enabled_sticky_cart',
                                'sticky_cart.sticky_cart_show_mobile',
                                'sticky_cart.sticky_cart_show_desktop',
                                'sticky_cart.sticky_cart_hide_page',
                                'sticky_cart.sticky_cart_hide_empty',
                                'sticky_cart.sticky_cart_show_countdown',
                                'sticky_cart.sticky_cart_position',
                                'sticky_cart.sticky_cart_distance',
                                'sticky_cart.sticky_cart_redirect',
                                'sticky_cart.sticky_cart_icon',
                                'sticky_cart.sticky_cart_total_color_hex',
                                'sticky_cart.sticky_cart_total_background_color_hex',
                                'sticky_cart.sticky_cart_icon_color_hex',
                                'sticky_cart.sticky_cart_background_color_hex',
                                'sticky_cart.sticky_cart_countdown_color_hex',
                                'sticky_cart.sticky_cart_countdown_background_color_hex',
                                'icons.icon'
                            )
                            ->leftJoin('icons', 'sticky_cart.sticky_cart_icon', '=', 'icons.id')
                            ->where('sticky_cart.customer_id',  $customer->id)
                            ->first();

                        $quick_buy = QuickBuy::query()
                            ->select(
                                'quick_buy.enabled_quick_buy',
                                'quick_buy.quick_buy_button_type',
                                'quick_buy.quick_buy_button_show_mobile',
                                'quick_buy.quick_buy_button_show_desktop',
                                'quick_buy.quick_buy_button_show_quantity_selector',
                                'quick_buy.quick_buy_button_size',
                                'quick_buy.quick_buy_button_position',
                                'quick_buy.quick_buy_button_redirect',
                                'quick_buy.quick_buy_button_background_color_hex',
                                'quick_buy.quick_buy_button_icon',
                                'quick_buy.quick_buy_button_icon_color_hex',
                                'quick_buy.quick_buy_button_variants_background_color_rgb',
                                'quick_buy.quick_buy_button_variants_line_color_hex',
                                'quick_buy.quick_buy_button_variants_font_size',
                                'quick_buy.quick_buy_button_variants_font_weight',
                                'icons.icon'
                            )
                            ->leftJoin('icons', 'quick_buy.quick_buy_button_icon', '=', 'icons.id')
                            ->where('quick_buy.customer_id', $customer->id)
                            ->first();

                        $cart_animator = CartAnimator::query()
                            ->select(
                                'enabled_cart_animator',
                                'cart_animator_add_cart_button',
                                'cart_animator_add_cart_button_time',
                                'cart_animator_sticky_bar_button',
                                'cart_animator_sticky_bar_button_time',
                                'cart_animator_sticky_cart_button',
                                'cart_animator_sticky_cart_button_time',
                                'cart_animator_quick_buy_button',
                                'cart_animator_quick_buy_button_time',
                                'cart_animator_checkout_button',
                                'cart_animator_checkout_button_time',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();

                        $coupon_bar = CouponBar::query()
                            ->select(
                                'enabled_coupon_bar',
                                'coupon_bar_timer',
                                'coupon_bar_position',
                                'coupon_bar_text',
                                'coupon_bar_text_expire',
                                'coupon_bar_hours',
                                'coupon_bar_minutes',
                                'coupon_bar_seconds',
                                'coupon_bar_clear_offer',
                                'coupon_bar_background_color_hex',
                                'coupon_bar_font_color_hex',
                                'coupon_bar_font_size',
                                'coupon_bar_text_transform',
                                'coupon_bar_font_weight',
                                'coupon_bar_text_alignment',
                                'coupon_bar_desktop_positionOffset',
                                'coupon_bar_mobile_positionOffset',
                            )
                            ->where('customer_id', $customer->id)
                            ->first();



                        /* $sql = $additional_settings->toSql();
                        Log::debug('additional_settings');
                        Log::debug($sql); */
                        /*
                        

                        $shipping_protection = Shipping::where('customer_id', $customer['id'])->first();
                        $terms_conditions = TermsConditions::where('customer_id', $customer['id'])->first();
                        $checkout_button = Checkout::where('customer_id', $customer['id'])->first();
                        $cart_button = GoToCart::where('customer_id', $customer['id'])->first();
                        $continue_shopping = ContinueShop::where('customer_id', $customer['id'])->first();
                        $payment_badges = PaymentBadges::where('customer_id', $customer['id'])->first();

                        $customize = Customize::where('customer_id', $customer['id'])->first();

                        $integrations = Integrations::where('customer_id', $customer['id'])->first();
                        $cart_bar = CartBar::where('customer_id', $customer['id'])->first();
                        $sticky_cart = StickyCart::where('customer_id', $customer['id'])->first();
                        $quick_buy = QuickBuy::where('customer_id', $customer['id'])->first();
                        $cart_animator = CartAnimator::where('customer_id', $customer['id'])->first();
                        $coupon_bar = CouponBar::where('customer_id', $customer['id'])->first(); */

                        /*$dashboard = 'Dashboard:customer_id,dashboard_general_app';
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
                        $coupon_bar = 'cli_coupon_bar'; */

                        /*  $arr_data = Customer::with(
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
                        )->where("shop_url", $shop)->first(); */

                        //Log::debug("CLIENT_FILE: " . json_encode($arr_data, JSON_PRETTY_PRINT));
                        /* $dashboard = $arr_data->Dashboard;
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
                        $coupon_bar = $arr_data->cli_coupon_bar; */

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
        } catch (QueryException $e) {
            // Si ocurre un error en la consulta SQL
            return response()->json([
                'error' => true,
                'message' =>  $e->getMessage(),
                'error_line' => $e->getLine(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine(),
            ]);
        }
    }
}
