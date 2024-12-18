<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    const CREATED_AT = 'date';
    const UPDATED_AT = null;

    protected $hidden = [
        'token'
    ];

    protected $fillable = [
        'old_user',
        'customer_id',
    ];

    public function Payment()
    {
        return $this->hasMany(Payment::class);
    }
    public function Settings()
    {
        return $this->hasOne(Settings::class);
    }
    public function Dashboard()
    {
        return $this->hasOne(Dashboard::class);
    }
    public function AdditionalSettings()
    {
        return $this->hasOne(AdditionalSettings::class);
    }
    public function CartEmpty()
    {
        return $this->hasOne(CartEmpty::class);
    }
    public function CountDown()
    {
        return $this->hasOne(CountDown::class);
    }
    public function Announcement()
    {
        return $this->hasOne(Announcement::class);
    }
    public function AnnouncementTiers()
    {
        return $this->hasOne(AnnouncementTiers::class);
    }
    public function Rewards()
    {
        return $this->hasOne(Rewards::class);
    }
    public function RewardsAllTiers()
    {
        return $this->hasOne(RewardsAllTiers::class);
    }
    public function RewardsSpecificTiers()
    {
        return $this->hasOne(RewardsSpecificTiers::class);
    }
    public function AutomaticProducts()
    {
        return $this->hasOne(AutomaticProducts::class);
    }
    public function ManuallyProducts()
    {
        return $this->hasOne(ManuallyProducts::class);
    }
    public function StaticProducts()
    {
        return $this->hasOne(StaticProducts::class);
    }
    public function FreeItems()
    {
        return $this->hasOne(FreeItems::class);
    }
    public function SpecialOffer()
    {
        return $this->hasOne(SpecialOffer::class);
    }
    public function SpecialOfferTiers()
    {
        return $this->hasOne(SpecialOfferTiers::class);
    }
    public function MinimumOrder()
    {
        return $this->hasOne(MinimumOrder::class);
    }
    public function CartCoupon()
    {
        return $this->hasOne(CartCoupon::class);
    }
    public function CartNote()
    {
        return $this->hasOne(CartNote::class);
    }
    public function AdditionalCheckout()
    {
        return $this->hasOne(AdditionalCheckout::class);
    }
    public function Language()
    {
        return $this->hasOne(Language::class);
    }
    public function GiftWrap()
    {
        return $this->hasOne(GiftWrap::class);
    }
    public function Shipping()
    {
        return $this->hasOne(Shipping::class);
    }
    public function TermsConditions()
    {
        return $this->hasOne(TermsConditions::class);
    }
    public function Checkout()
    {
        return $this->hasOne(Checkout::class);
    }
    public function GoToCart()
    {
        return $this->hasOne(GoToCart::class);
    }
    public function ContinueShop()
    {
        return $this->hasOne(ContinueShop::class);
    }
    public function PaymentBadges()
    {
        return $this->hasOne(PaymentBadges::class);
    }
    public function Customize()
    {
        return $this->hasOne(Customize::class);
    }
    public function Integrations()
    {
        return $this->hasOne(Integrations::class);
    }
    public function CartBar()
    {
        return $this->hasOne(CartBar::class);
    }
    public function StickyCart()
    {
        return $this->hasOne(StickyCart::class);
    }
    public function QuickBuy()
    {
        return $this->hasOne(QuickBuy::class);
    }
    public function CartAnimator()
    {
        return $this->hasOne(CartAnimator::class);
    }
    public function CouponBar()
    {
        return $this->hasOne(CouponBar::class);
    }

    /* CLIENT DATA */
    public function cli_cart_empty()
    {
        return $this->hasOne(CartEmpty::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_countdown()
    {
        return $this->hasOne(CountDown::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_announcement()
    {
        return $this->hasOne(Announcement::class)->select([
            'customer_id',
            'enabled_announcement',
            'announcement_background_color_hex',
            'announcement_border_color_hex',
            'announcement_font_color_hex',
            'announcement_font_size',
            'announcement_text_transform',
            'announcement_font_weight',
            'announcement_text_alignment',
            'announcement_autoplay_time',
        ]);
    }



    public function cli_announcement_tiers()
    {
        return $this->hasMany(AnnouncementTiers::class)->select([
            'customer_id', 'announcement_text', 'settings_announcement_id'
        ]);
    }

    public function cli_rewards()
    {
        return $this->hasOne(Rewards::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_rewards_all_countries_tiers()
    {
        return $this->hasMany(RewardsAllTiers::class)->select([
            'customer_id', 'settings_rewards_id', 'rewards_title', 'rewards_congratulations', 'rewards_amount', 'rewards_confetti_time', 'rewards_confetti',
        ]);
    }

    public function cli_rewards_specific_countries_tiers()
    {
        return $this->hasMany(RewardsSpecificTiers::class)->select([
            'customer_id', 'settings_rewards_id', 'rewards_title_specific_countries', 'rewards_congratulations_specific_countries', 'rewards_amount_specific_countries', 'rewards_confetti_time_specific_countries', 'rewards_confetti_specific_countries', 'rewards_specific_country',
        ]);
    }

    public function cli_tiered_free_items()
    {
        return $this->hasOne(FreeItems::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_tiered_free_items_tiers()
    {
        return $this->hasMany(FreeItemsTiers::class)->select([
            'customer_id', 'tfi_tier_amount_from', 'tfi_tier_products', 'tfi_tier_name', 'tfi_tier_max_item', 'tfi_tier_hide_when_in_cart',
        ]);
    }

    public function cli_special_offer_notification()
    {
        return $this->hasOne(SpecialOffer::class)->select([
            'customer_id',
            'enabled_special_offer_notification',
            'offer_based_notification',
            'max_offers_show_notification',
            'qualified_background_color_hex_notification',
            'qualified_text_color_hex_notification',
            'qualified_bold_font_notification',
            'unqualified_background_color_hex_notification',
            'unqualified_text_color_hex_notification',
            'unqualified_bold_font_notification',
        ]);
    }

    public function cli_special_offer_notification_tier()
    {
        return $this->hasMany(SpecialOfferTiers::class)->select([
            'customer_id', 'settings_special_offer_notification_id', 'num_special_offer_notification_tier', 'min_val_qualify', 'special_offer_message_qualify', 'special_offer_message_not_qualify', 'tier_name',
        ]);
    }

    public function cli_minimum_order()
    {
        return $this->hasOne(MinimumOrder::class)->select([
            'customer_id', 'enabled_minimum_order', 'minimum_order', 'minimum_order_option', 'minimum_order_text', 'minimum_font_size', 'minimum_color_hex',
        ]);
    }

    public function cli_cart_coupon()
    {
        return $this->hasOne(CartCoupon::class)->select([
            'customer_id', 'enabled_cart_coupon_button', 'name_cart_coupon_button', 'placeholder_cart_coupon_button', 'button_background_color_hex', 'button_font_color_hex', 'button_font_size', 'button_text_transform', 'button_font_weight', 'button_border_radius',
        ]);
    }

    public function cli_cart_note()
    {
        return $this->hasOne(CartNote::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_additional_check()
    {
        return $this->hasOne(AdditionalCheckout::class)->select([
            'customer_id', 'enabled_additional_checkout_buttons',
        ]);
    }

    public function cli_language_settings()
    {
        return $this->hasOne(Language::class)->select([
            'customer_id',
            'cart_title_language_settings',
            'cart_empty_text_language_settings',
            'add_to_cart_language_settings',
            'add_in_upsell_language_settings',
            'rc_withOutSub_in_upsell_language_settings',
            'rc_withSub_in_upsell_language_settings',
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
            'shipping_taxes_discounts_language_settings',
        ]);
    }

    public function cli_gift_wrap()
    {
        return $this->hasOne(GiftWrap::class)->select([
            'customer_id',
            'enabled_gift_wrap',
            'product_type',
            'gift_wrap_icon',
            'gift_wrap_icon_color_hex',
            'offer_name',
            'offer_name_color_hex',
            'offer_price',
            'offer_price_color_hex',
            'offer_compare_price',
            'offer_compare_price_color_hex',
            'offer_icon_url_img_host',
            'offer_icon_url_img_shopify',
            'featured_product_shopify_handle',
            'featured_product_shopify_title',
            'featured_product_shopify_originalSrc',
            'featured_product_shopify_id_variants',
            'featured_product_title',
            'featured_product_title_bold',
            'featured_product_show_image',
            'display_selling_color_hex',
            'display_compare_price_color_hex',
            'offer_font_size',
            'icons.icon'
        ])->leftJoin('icons', 'settings_gift_wrap.gift_wrap_icon', '=', 'icons.id');
    }

    public function cli_shipping_protection()
    {
        return $this->hasOne(Shipping::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_terms_conditions()
    {
        return $this->hasOne(TermsConditions::class)->select([
            'customer_id', 'enabled_terms', 'text_terms', 'font_size_terms', 'url_terms', 'notify_terms',
        ]);
    }

    public function cli_checkout_button()
    {
        return $this->hasOne(Checkout::class)->select([
            'customer_id',
            'enabled_checkout_button',
            'checkout_button_icon',
            'checkout_button_icon_enabled',
            'checkout_button_text',
            'checkout_button_text_color_hex',
            'checkout_button_text_colorHover_hex',
            'checkout_button_text_font_size',
            'checkout_button_text_transform',
            'checkout_button_text_weight',
            'checkout_button_background_color_hex',
            'checkout_button_background_colorHover_hex',
            'checkout_button_border',
            'icons.icon as checkout_button_icon_svg'
        ])->leftJoin('icons', 'settings_checkout_button.checkout_button_icon', '=', 'icons.id');
    }

    public function cli_cart_button()
    {
        return $this->hasOne(GoToCart::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_continue_shopping()
    {
        return $this->hasOne(ContinueShop::class)->select([
            'customer_id',
            'enabled_continue_shopping',
            'continue_shopping_text',
            'continue_shopping_text_font_size',
            'continue_shopping_text_transform',
            'continue_shopping_text_weight',
            'continue_shopping_text_color_hex',
            'continue_shopping_text_colorHover_hex',
            'continue_shopping_button_url',
        ]);
    }
    public function cli_payment_badges()
    {
        return $this->hasOne(PaymentBadges::class)->select([
            'customer_id',
            'enabled_payment_badges',
            'url_img_host',
            'url_img_shopify',
        ]);
    }

    public function cli_customize()
    {
        return $this->hasOne(Customize::class)->select([
            'customer_id',
            'customize_slidecart_design',
            'customize_slidecart_size',
            'customize_slidecart_position',
            'customize_slidecart_animation_mobile',
            'customize_slidecart_rtl',
            'customize_slidecart_margin_left',
            'customize_enabled_loading',
            'customize_loading_background_rgb',
            'customize_loading_icon_hex',
            'customize_header_background_color_hex',
            'customize_header_text_color_hex',
            'customize_header_text_font_size',
            'customize_header_text_transform',
            'customize_header_icon_color_hex',
            'customize_header_icon_color_hov_hex',
            'customize_header_icon_size',
            'customize_body_background_color_hex',
            'customize_body_text_color_hex',
            'customize_body_border_color_hex',
            'customize_body_prod_icon_remove_color_hex',
            'customize_body_design_qty',
            'customize_body_prod_remove_enabled',
            'customize_body_prod_remove_text',
            'customize_body_prod_icon_remove_size',
            'customize_body_prod_icon_remove_color_hov_hex',
            'customize_body_prod_title_color_text_hex',
            'customize_body_prod_title_font_size',
            'customize_body_prod_title_font_weigth',
            'customize_body_prod_title_text_transform',
            'customize_body_var_title_color_text_hex',
            'customize_body_var_title_font_size',
            'customize_body_var_title_font_weigth',
            'customize_body_var_title_text_transform',
            'customize_body_price_color_text_hex',
            'customize_body_price_font_size',
            'customize_body_price_font_weigth',
            'customize_body_compare_price_color_text_hex',
            'customize_body_compare_price_font_size',
            'customize_body_compare_price_font_weigth',
            'customize_body_enabled_sale_price',
            'customize_body_sale_price_color_text_hex',
            'customize_body_sale_price_font_size',
            'customize_body_sale_price_font_weigth',
            'customize_body_discount_color_text_hex',
            'customize_body_discount_font_size',
            'customize_body_discount_font_weigth',
            'customize_body_upsell_background_color_hex',
            'customize_body_upsell_border_color_hex',
            'customize_body_upsell_arrows_color_hex',
            'customize_body_upsell_prod_title_color_text_hex',
            'customize_body_upsell_prod_title_font_size',
            'customize_body_upsell_prod_title_font_weigth',
            'customize_body_upsell_prod_title_text_transform',
            'customize_body_upsell_var_title_text_color_hex',
            'customize_body_upsell_var_title_font_size',
            'customize_body_upsell_var_title_font_weigth',
            'customize_body_upsell_var_title_text_transform',
            'customize_body_upsell_price_color_text_hex',
            'customize_body_upsell_price_font_size',
            'customize_body_upsell_price_font_weigth',
            'customize_body_upsell_compare_price_color_text_hex',
            'customize_body_upsell_compare_price_font_size',
            'customize_body_upsell_compare_price_font_weigth',
            'customize_body_upsell_enabled_sale_price',
            'customize_body_upsell_sale_price_color_text_hex',
            'customize_body_upsell_sale_price_font_size',
            'customize_body_upsell_sale_price_font_weigth',
            'customize_body_upsell_var_options_color_text_hex',
            'customize_body_upsell_var_options_font_size',
            'customize_body_upsell_var_options_font_weigth',
            'customize_body_upsell_var_options_text_transform',
            'customize_body_upsell_button_background_color_hex',
            'customize_body_upsell_button_text_color_hex',
            'customize_body_upsell_button_text_font_size',
            'customize_body_upsell_button_text_font_weigth',
            'customize_body_upsell_button_text_transform',
            'customize_body_upsell_button_border_radius',
            'customize_body_upsell_button_hov_background_color_hex',
            'customize_body_upsell_button_hov_text_color_hex',
            'customize_popup_background_color_hex',
            'customize_popup_border_color_hex',
            'customize_popup_title_text_color_hex',
            'customize_popup_title_font_size',
            'customize_popup_title_font_weigth',
            'customize_popup_title_text_transform',
            'customize_popup_price_text_color_hex',
            'customize_popup_price_font_size',
            'customize_popup_price_font_weigth',
            'customize_popup_compare_price_text_color_hex',
            'customize_popup_compare_price_font_size',
            'customize_popup_compare_price_font_weigth',
            'customize_popup_enabled_sale_price',
            'customize_popup_sale_price_text_color_hex',
            'customize_popup_sale_price_font_size',
            'customize_popup_sale_price_font_weigth',
            'customize_popup_var_options_design',
            'customize_popup_button_background_color_hex',
            'customize_popup_button_text_color_hex',
            'customize_popup_button_border_radius',
            'customize_popup_button_text_font_size',
            'customize_popup_button_text_font_weigth',
            'customize_popup_button_text_transform',
            'customize_popup_button_hov_background_color_hex',
            'customize_popup_button_hov_text_color_hex',
            'customize_footer_total_price_text_color_hex',
            'customize_footer_total_price_font_size',
            'customize_footer_total_price_font_weigth',
            'customize_footer_compare_price_text_color_hex',
            'customize_footer_compare_price_font_size',
            'customize_footer_compare_price_font_weigth',
            'customize_footer_discount_text_color_hex',
            'customize_footer_discount_font_size',
            'customize_footer_discount_font_weigth',
            'customize_footer_background_color_hex',
            'customize_footer_text_color_hex',
            'icons.icon'
        ])->leftJoin('icons', 'customize.customize_body_prod_icon_remove', '=', 'icons.id');
    }

    public function cli_integrations()
    {
        return $this->hasMany(Integrations::class)->select([
            'customer_id', 'integrations.enabled_app', 'integrations_app.automatic', 'integrations.integrations_app_id'
        ])
            ->leftJoin('integrations_app', 'integrations_app.id', '=', 'integrations.integrations_app_id')
            ->where('integrations_app.new', '>', 0);
    }

    public function cli_cart_bar()
    {
        return $this->hasOne(CartBar::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_sticky_cart()
    {
        return $this->hasOne(StickyCart::class)->select([
            'customer_id',
            'enabled_sticky_cart',
            'sticky_cart_show_mobile',
            'sticky_cart_show_desktop',
            'sticky_cart_hide_page',
            'sticky_cart_hide_empty',
            'sticky_cart_show_countdown',
            'sticky_cart_position',
            'sticky_cart_distance',
            'sticky_cart_redirect',
            'sticky_cart_icon',
            'sticky_cart_total_color_hex',
            'sticky_cart_total_background_color_hex',
            'sticky_cart_icon_color_hex',
            'sticky_cart_background_color_hex',
            'sticky_cart_countdown_color_hex',
            'sticky_cart_countdown_background_color_hex',
            'icons.icon',
        ])->leftJoin('icons','sticky_cart.sticky_cart_icon','=','icons.id');
    }

    public function cli_quick_buy()
    {
        return $this->hasOne(QuickBuy::class)->select([
            'customer_id',
            'enabled_quick_buy',
            'quick_buy_button_type',
            'quick_buy_button_show_mobile',
            'quick_buy_button_show_desktop',
            'quick_buy_button_show_quantity_selector',
            'quick_buy_button_size',
            'quick_buy_button_position',
            'quick_buy_button_redirect',
            'quick_buy_button_background_color_hex',
            'quick_buy_button_icon',
            'quick_buy_button_icon_color_hex',
            'icons.icon',
        ])->leftJoin('icons','quick_buy.quick_buy_button_icon','=','icons.id');
    }

    public function cli_cart_animator()
    {
        return $this->hasOne(CartAnimator::class)->select([
            'customer_id',
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
        ]);
    }

    public function cli_coupon_bar()
    {
        return $this->hasOne(CouponBar::class)->select([
            'customer_id',
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
        ]);
    }
}
