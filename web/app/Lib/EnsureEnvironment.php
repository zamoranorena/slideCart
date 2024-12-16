<?php

declare(strict_types=1);

namespace App\Lib;

use App\Exceptions\ShopifyBillingException;
use Illuminate\Support\Facades\Log;
use Shopify\Auth\Session;
use Shopify\Clients\Graphql;
use Shopify\Context;
use App\Models\Customer;
use App\Models\AssingIcon;
use App\Models\IntegrationsApp;

class EnsureEnvironment
{
    public static function icon_assign($module)
    {
        $assign_icon = AssingIcon::select('icons.id')
            ->leftJoin('modules', 'modules.id', '=', 'assing_icon.id_module')
            ->leftJoin('icons', 'icons.id', '=', 'assing_icon.id_icon')
            ->where('modules.module', '=', $module)
            ->where('assing_icon.default_icon', '=', 1)
            ->get();
        if ($assign_icon) {
            $assign_icon = $assign_icon[0]->id;
        };
        return $assign_icon;
    }
    public static function create_environment($customerId, $money_format)
    {
        try {
            $customer = Customer::with(
                'Dashboard',
                'Settings',
                'AdditionalSettings',
                'CartEmpty',
                'CountDown',
                'Announcement',
                'AnnouncementTiers',
                'Rewards',
                'RewardsAllTiers',
                'RewardsSpecificTiers',
                'AutomaticProducts',
                'ManuallyProducts',
                'StaticProducts',
                'SpecialOffer',
                'SpecialOfferTiers',
                'MinimumOrder',
                'CartCoupon',
                'CartNote',
                'AdditionalCheckout',
                'Language',
                'GiftWrap',
                'Shipping',
                'TermsConditions',
                'Checkout',
                'GoToCart',
                'ContinueShop',
                'PaymentBadges',
                'Customize',
                'Integrations',
                'CartBar',
                'StickyCart',
                'QuickBuy',
                'CartAnimator',
                'CouponBar'
            )->where('id', $customerId)->first();
            if ($customer) {
                if (!$customer->Dashboard) {
                    $customer->Dashboard()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->Settings) {
                    $customer->Settings()->create([
                        'customer_id' => $customerId,
                        'money_format' => $money_format
                    ]);
                } else {
                    $customer->Settings()->update([
                        'customer_id' => $customerId,
                        'money_format' => $money_format
                    ]);
                };

                if (!$customer->AdditionalSettings) {
                    $customer->AdditionalSettings()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->CartEmpty) {
                    $customer->CartEmpty()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->CountDown) {
                    $customer->CountDown()->create([
                        'customer_id' => $customerId
                    ]);
                };

                $announcementID = null;
                if (!$customer->Announcement) {
                    $announcementID = $customer->Announcement()->create([
                        'customer_id' => $customerId
                    ]);
                };
                if (!$customer->AnnouncementTiers) {
                    if (!$announcementID) {
                        if ($customer->Announcement) {
                            $announcementID = $customer->Announcement['id'];
                        };
                    } else {
                        $announcementID = $announcementID["id"];
                    }
                    if ($announcementID) {
                        $customer->AnnouncementTiers()->create([
                            'settings_announcement_id' => $announcementID,
                            'customer_id' => $customerId
                        ]);
                    };
                };

                $rewardsID = null;
                if (!$customer->Rewards) {
                    $rewardsID = $customer->Rewards()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$rewardsID) {
                    if ($customer->Rewards) {
                        $rewardsID = $customer->Rewards['id'];
                    };
                } else {
                    $rewardsID = $rewardsID["id"];
                };

                if (!$customer->RewardsAllTiers) {
                    if ($rewardsID) {
                        $customer->RewardsAllTiers()->create([
                            'settings_rewards_id' => $rewardsID,
                            'customer_id' => $customerId
                        ]);
                    };
                };
                if (!$customer->RewardsSpecificTiers) {
                    if ($rewardsID) {
                        $customer->RewardsSpecificTiers()->create([
                            'settings_rewards_id' => $rewardsID,
                            'customer_id' => $customerId
                        ]);
                    };
                };

                if (!$customer->AutomaticProducts) {
                    $customer->AutomaticProducts()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->ManuallyProducts) {
                    $customer->ManuallyProducts()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->StaticProducts) {
                    $customer->StaticProducts()->create([
                        'customer_id' => $customerId
                    ]);
                };

                $specialOfferID = null;
                if (!$customer->SpecialOffer) {
                    $specialOfferID = $customer->SpecialOffer()->create([
                        'customer_id' => $customerId
                    ]);
                };
                if (!$customer->SpecialOfferTiers) {
                    if (!$specialOfferID) {
                        if ($customer->SpecialOffer) {
                            $specialOfferID = $customer->SpecialOffer['id'];
                        };
                    } else {
                        $specialOfferID = $specialOfferID["id"];
                    }
                    if ($specialOfferID) {
                        $customer->SpecialOfferTiers()->create([
                            'settings_special_offer_notification_id' => $specialOfferID,
                            'customer_id' => $customerId
                        ]);
                    };
                };

                /* ///////// */

                if (!$customer->MinimumOrder) {
                    $customer->MinimumOrder()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->CartCoupon) {
                    $customer->CartCoupon()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->CartNote) {
                    $customer->CartNote()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->AdditionalCheckout) {
                    $customer->AdditionalCheckout()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->Language) {
                    $customer->Language()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->GiftWrap) {
                    $assign_icon = self::icon_assign('settings');
                    if ($assign_icon) {
                        $customer->GiftWrap()->create([
                            'gift_wrap_icon' => $assign_icon,
                            'customer_id' => $customerId
                        ]);
                    };
                };

                if (!$customer->Shipping) {
                    $customer->Shipping()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->TermsConditions) {
                    $customer->TermsConditions()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->Checkout) {
                    $customer->Checkout()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->GoToCart) {
                    $customer->GoToCart()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->ContinueShop) {
                    $customer->ContinueShop()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->PaymentBadges) {
                    $customer->PaymentBadges()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->Customize) {
                    $customer->Customize()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->Integrations) {
                    $integration_app = IntegrationsApp::select('id', 'status_default')->get();
                    if (count($integration_app) > 0) {
                        $PresetData = [];
                        for ($i = 0; $i < count($integration_app); $i++) {
                            $employee = array(
                                'enabled_app' => $integration_app[$i]["status_default"],
                                'integrations_app_id' => $integration_app[$i]["id"],
                                'customer_id' => $customerId,
                            );
                            array_push($PresetData, $employee);
                        };
                        $customer->Integrations()->createMany($PresetData); //bulk insert
                    };
                };

                if (!$customer->CartBar) {
                    $customer->CartBar()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->StickyCart) {
                    $assign_icon = self::icon_assign('sticky-cart');
                    if ($assign_icon) {
                        $customer->StickyCart()->create([
                            'sticky_cart_icon' => $assign_icon,
                            'customer_id' => $customerId
                        ]);
                    };
                };

                if (!$customer->QuickBuy) {
                    $assign_icon = self::icon_assign('quick-buy');
                    if ($assign_icon) {
                        $customer->QuickBuy()->create([
                            'quick_buy_button_icon' => $assign_icon,
                            'customer_id' => $customerId
                        ]);
                    };
                };

                if (!$customer->CartAnimator) {
                    $customer->CartAnimator()->create([
                        'customer_id' => $customerId
                    ]);
                };

                if (!$customer->CouponBar) {
                    $customer->CouponBar()->create([
                        'customer_id' => $customerId
                    ]);
                };
            };
        } catch (\Exception $e) {
            //throw $th;
            Log::debug($e->getMessage());
        }
    }
}
