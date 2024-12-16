import { ActionList, Frame, Grid, Icon, Card, Page, Badge, InlineGrid, Text, Layout, BlockStack, SkeletonBodyText, TextContainer, LegacyCard, SkeletonDisplayText, Box, TopBar, Modal } from '@shopify/polaris';
import React from 'react';

import {
    PaintBrushFlatIcon, ConfettiIcon, ClockIcon, CashDollarIcon, DeliveryIcon, NoteIcon, DiscountIcon,
    OrderRepeatIcon, LockIcon, CreditCardIcon, AppsIcon, ContractIcon, SettingsIcon, LanguageTranslateIcon,
    MarketsIcon, ViewIcon, HideIcon, CodeIcon
} from '@shopify/polaris-icons';
import { useBreakpoints } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { useCallback, useState, useEffect } from "react";
import { makeGetRequest, makePutPostRequest } from '../utils/Services';
import { ModalUpdateUser/* , HeaderPage */ } from '@components/';
import { disable } from '@shopify/app-bridge/actions/LeaveConfirmation';
export function GridLayout({ children, paths = 0, gridItems, updateGridItems }) {
    const { mdDown } = useBreakpoints();
    const [activeSettings, setActiveSettings] = useState(false);
    const [activeCustomize, setActiveCustomize] = useState(false);
    const [activeCountdown, setActiveCountdown] = useState(false);
    const [activeAnnouncements, setActiveAnnouncement] = useState(false);
    const [activeRewards, setActiveRewards] = useState(false);
    const [activeUpsells, setActiveUpsells] = useState(false);
    const [activeTiered, setActiveTiered] = useState(false);
    const [activeGiftWrap, setActiveGiftWrap] = useState(false);
    const [activeAddOns, setActiveAddOns] = useState(false);
    const [activeAdditionalNote, setActiveAdditionalNote] = useState(false);
    const [activeDiscountCode, setActiveDiscountCode] = useState(false);
    const [activeSubscriptionUp, setActiveSubscriptionUp] = useState(false);
    const [activeTerms, setActiveTerms] = useState(false);
    const [activeMinimunOrder, setActiveMinimunOrder] = useState(false);
    const [activeCheckoutButton, setActiveCheckoutButton] = useState(false);
    const [activeCartButton, setActiveCartButton] = useState(false);
    const [activeContinueShopping, setActiveContinueShopping] = useState(false);
    const [activeTrustBadges, setActiveTrustBadges] = useState(false);
    const [activeExpressPayments, setActiveExpressPayments] = useState(false);
    const [activeIntegrations, setActiveIntegrations] = useState(false);
    const [activeTranslator, setActiveTranslator] = useState(false);
    const [activeCustomCss, setActiveCustomCss] = useState(false);
    const [activeCustomJs, setActiveCustomJs] = useState(false);
    const [activeAdditionalSettings, setActiveAdditionalSettings] = useState(false);
    const [activeNav, setActiveNav] = useState(false);

    const [generalApp, setGeneralApp] = useState(1);
    const [myShop, setShop] = useState(false);
    const [userold, setuserold] = useState(true);
    const app = useAppBridge();

    const update_user = async () => {
        const arr =
        {
            status_user: 0
        }
        const get = await makePutPostRequest('/api/put_client_data', 'PUT', arr, app);

        if (!!get.status_user) {
            redirectToPage(`/`);
        }
    };


    const mobileNavItem = () => {
        setActiveNav((current) => !current);
        var app = document.querySelector('#app') || '';
        var main = document.querySelector('main#AppFrameMain') || '';
        if (app && main) {
            var app_body = document.querySelector('body') || '';
            var polarisBackdrop = document.querySelector('.Polaris-Backdrop') || '';
            if (mdDown) {
                app_body.setAttribute("data-lock-scrolling", "");
                app_body.setAttribute("data-lock-scrolling-hidden", "");
                app.setAttribute("data-lock-scrolling-wrapper", "");

                //!polarisBackdrop ? main.insertAdjacentHTML("beforebegin", '') : '';
            } else {
                app_body.removeAttribute("data-lock-scrolling");
                app_body.removeAttribute("data-lock-scrolling-hidden");
                app.removeAttribute("data-lock-scrolling-wrapper");
                if (polarisBackdrop) {
                    polarisBackdrop.remove();
                };
            };
        };
    };

    const mobileNav = () => {
        var app = document.querySelector('#app') || '';
        var main = document.querySelector('main#AppFrameMain') || '';
        if (app && main) {
            if (!mdDown || !activeNav) {
                if (activeNav) {
                    setActiveNav(false);
                };
                var app_body = document.querySelector('body') || '';
                var polarisBackdrop = document.querySelector('.Polaris-Backdrop') || '';
                app_body.removeAttribute("data-lock-scrolling");
                app_body.removeAttribute("data-lock-scrolling-hidden");
                app.removeAttribute("data-lock-scrolling-wrapper");
                /* if (polarisBackdrop) {
                    polarisBackdrop.remove();
                }; */
            };
        }

    };

    const mobileCloseNav = () => {
        setActiveNav(false);
    };


    const redirectToPage = (path) => {
        /* const history = History.create(app);
        history.dispatch(History.Action.PUSH,path ); */
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, { path: path, });
        mobileCloseNav();
        updateGridItems({ paths: path })

    };

    const activeItems = () => {
        setActiveSettings(false);
        setActiveCustomize(false);
        setActiveAnnouncement(false);
        setActiveRewards(false);
        setActiveCountdown(false);
        setActiveTiered(false);
        setActiveGiftWrap(false);
        setActiveAddOns(false);
        setActiveAdditionalNote(false);
        setActiveDiscountCode(false);
        setActiveTerms(false)
        setActiveMinimunOrder(false);
        setActiveCheckoutButton(false)
        setActiveCartButton(false);
        setActiveContinueShopping(false);
        setActiveIntegrations(false);
        setActiveTranslator(false);
        setActiveCustomCss(false);
        setActiveCustomJs(false);
        setActiveTrustBadges(false);
        setActiveExpressPayments(false);
        setActiveAdditionalSettings(false);
        /* setActiveStickyCart(false)
        setActiveQuickBuy(false)
        setActiveCartAnimator(false)
        setActiveCouponBar(false) */
    };

    const validatePath = path => {
        switch (path) {
            case '/cart-editor/settings':
                activeItems();
                setActiveSettings(true);
                break;
            case '/cart-editor/customize':
                activeItems();
                setActiveCustomize(true);
                break;
            case '/cart-editor/countdown':
                activeItems();
                setActiveCountdown(true);
                break;
            case '/cart-editor/cart-note':
                activeItems();
                setActiveAdditionalNote(true);
                break;
            case '/cart-editor/cart-coupon':
                activeItems();
                setActiveDiscountCode(true);
                break;
            case '/cart-editor/announcement':
                activeItems();
                setActiveAnnouncement(true);
                break;
            case '/cart-editor/rewards':
                activeItems();
                setActiveRewards(true);
                break;
            case '/cart-editor/free-items':
                activeItems();
                setActiveTiered(true);
                break;
            case '/cart-editor/gift-wrap':
                activeItems();
                setActiveGiftWrap(true);
                break;
            case '/cart-editor/shipping-protections':
                activeItems();
                setActiveAddOns(true);
                break;
            case '/cart-editor/terms-conditions':
                activeItems();
                setActiveTerms(true);
                break;
            case '/cart-editor/minimum-order':
                activeItems();
                setActiveMinimunOrder(true);
                break;
            case '/cart-editor/checkout-button':
                activeItems();
                setActiveCheckoutButton(true);
                break;
            case '/cart-editor/cart-button':
                activeItems();
                setActiveCartButton(true);
                break;
            case '/cart-editor/continue-shopping':
                activeItems();
                setActiveContinueShopping(true);
                break;
            case '/cart-editor/payment-badges':
                activeItems();
                setActiveTrustBadges(true);
                break;
            case '/cart-editor/express-payments':
                activeItems();
                setActiveExpressPayments(true);
                break;
            case '/cart-editor/integrations':
                activeItems();
                setActiveIntegrations(true);
                break;
            case '/cart-editor/translator':
                activeItems();
                setActiveTranslator(true);
                break;
            case '/cart-editor/custom-css':
                activeItems();
                setActiveCustomCss(true);
                break;
            case '/cart-editor/custom-js':
                activeItems();
                setActiveCustomJs(true);
                break;
            case '/cart-editor/additional-settings':
                activeItems();
                setActiveAdditionalSettings(true);
                break;
        }
    };

    const getPlan = async () => {
        const response = await makeGetRequest("/api/get_client_data", app);
        if (response.shop) {
            updateGridItems({
                customize: response.cart_editor.customize_enabled_loading ? true : false,
                countdown: response.cart_editor.enabled_countdown ? true : false,
                announcement: response.cart_editor.enabled_announcement ? true : false,
                rewards: response.cart_editor.enabled_rewards ? true : false,
                free_items: response.cart_editor.enabled_tiered_free_items ? true : false,
                gift_wrap: response.cart_editor.enabled_gift_wrap ? true : false,
                shipping_protections: response.cart_editor.enabled_shipping_protection ? true : false,
                cart_note: response.cart_editor.enabled_cart_note ? true : false,
                cart_coupon: response.cart_editor.enabled_cart_coupon_button ? true : false,
                terms_conditions: response.cart_editor.enabled_terms ? true : false,
                minimum_order: response.cart_editor.enabled_minimum_order ? true : false,
                checkout_button: response.cart_editor.enabled_checkout_button ? true : false,
                cart_button: response.cart_editor.enabled_cart_button ? true : false,
                continue_shopping: response.cart_editor.enabled_continue_shopping ? true : false,
                payment_badges: response.cart_editor.enabled_payment_badges ? true : false,
                express_payments: response.cart_editor.enabled_additional_checkout_buttons ? true : false,
            })
            setShop(response.shop)
            if (response.status_user == 1) {
                setuserold(false);
                return false;
            };

            // if (response.new_user == 1) {
            //     setusernew(true);
            // };
        }
        if (typeof response.dashboard !== 'undefined') {
            if (typeof response.dashboard.dashboard_general_app !== 'undefined') {
                setGeneralApp(response.dashboard.dashboard_general_app);
            };
        }

        if (typeof response.plan_status !== 'undefined') {
            if (!response.plan_status) {
                redirectToPage(`/plans?status=0`);
                return false;
            };
        };
    };

    const markup = useCallback(
        (paths) => {
            return paths;
        },
        [paths]
    );

    useEffect(() => {
        if (!myShop) {
            getPlan();
        };
        updateGridItems({ paths: paths })
        setTimeout(function () {
            validatePath(paths);
        }, 200);
    }, [markup]);

    const suffix = (active) => {
        var iconSufix = <Icon source={ViewIcon} />;
        if (!active) {
            iconSufix = <Icon source={HideIcon} />;
        }
        return iconSufix;
    };

    const suffix_countdown = gridItems.countdown ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_announcement = gridItems.announcement ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_rewards = gridItems.rewards ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_free_items = gridItems.free_items ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_gift_wrap = gridItems.gift_wrap ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_shipping_protections = gridItems.shipping_protections ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_cart_note = gridItems.cart_note ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_cart_coupon = gridItems.cart_coupon ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;
    const suffix_terms_conditions = gridItems.terms_conditions ? <Badge tone="success">Active</Badge> : <Badge tone="info">Disabled</Badge>;


    var menuItems = [
        {
            content: 'Design',
            prefix: <Icon source={PaintBrushFlatIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/customize" ? true : false,
            onAction: () => redirectToPage("/cart-editor/customize")
        },
        {
            content: 'Countdown',
            prefix: <Icon source={ClockIcon} />,
            suffix: gridItems.countdown ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/countdown" ? true : false,
            onAction: () => redirectToPage("/cart-editor/countdown")
        },
        {
            content: 'Announcements',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.announcement ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/announcement" ? true : false,
            onAction: () => redirectToPage("/cart-editor/announcement")
        },
        {
            content: 'Rewards',
            prefix: <Icon source={ConfettiIcon} />,
            suffix: gridItems.rewards ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/rewards" ? true : false,
            onAction: () => redirectToPage("/cart-editor/rewards")
        },
        {
            content: 'Upsells',
            prefix: <Icon source={CashDollarIcon} />,
            suffix: <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/test" ? true : false,
            onAction: () => redirectToPage("/cart-editor/test")
        },
        {
            content: 'Tiered Free Items',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.free_items ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/free-items" ? true : false,
            onAction: () => redirectToPage("/cart-editor/free-items")
        },
        {
            content: 'Gift Wrap',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.gift_wrap ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/gift-wrap" ? true : false,
            onAction: () => redirectToPage("/cart-editor/gift-wrap")
        },
        {
            content: 'Add-ons',
            prefix: <Icon source={DeliveryIcon} />,
            suffix: gridItems.shipping_protections ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/shipping-protections" ? true : false,
            onAction: () => redirectToPage("/cart-editor/shipping-protections")
        },
        {
            content: 'Additional Notes',
            prefix: <Icon source={NoteIcon} />,
            suffix: gridItems.cart_note ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/cart-note" ? true : false,
            onAction: () => redirectToPage("/cart-editor/cart-note")
        },
        {
            content: 'Discount Code',
            prefix: <Icon source={DiscountIcon} />,
            suffix: gridItems.cart_coupon ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/cart-coupon" ? true : false,
            onAction: () => redirectToPage("/cart-editor/cart-coupon")
        },
        {
            content: 'Subscription Upgrades',
            prefix: <Icon source={OrderRepeatIcon} />,
            suffix: <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/test" ? true : false,
            onAction: () => redirectToPage("/cart-editor/test")
        },
        {
            content: 'Terms And Conditions',
            prefix: <Icon source={ContractIcon} />,
            suffix: gridItems.terms_conditions ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/terms-conditions" ? true : false,
            onAction: () => redirectToPage("/cart-editor/terms-conditions")
        },
        {
            content: 'Minimun Order',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.minimum_order ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/minimum-order" ? true : false,
            onAction: () => redirectToPage("/cart-editor/minimum-order")
        },
        {
            content: 'Checkout Button',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.checkout_button ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/checkout-button" ? true : false,
            onAction: () => redirectToPage("/cart-editor/checkout-button")
        },
        {
            content: 'Cart Button',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.cart_button ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/cart-button" ? true : false,
            onAction: () => redirectToPage("/cart-editor/cart-button")
        },
        {
            content: 'Continue Shopping',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItems.continue_shopping ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/continue-shopping" ? true : false,
            onAction: () => redirectToPage("/cart-editor/continue-shopping")
        },

        {
            content: 'Trust Badges',
            prefix: <Icon source={LockIcon} />,
            suffix: gridItems.payment_badges ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/payment-badges" ? true : false,
            onAction: () => redirectToPage("/cart-editor/payment-badges")
        },
        {
            content: 'Express Payments',
            prefix: <Icon source={CreditCardIcon} />,
            suffix: gridItems.express_payments ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItems.paths == "/cart-editor/express-payments" ? true : false,
            onAction: () => redirectToPage("/cart-editor/express-payments")
        },
        {
            content: 'Settings',
            prefix: <Icon source={SettingsIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/settings" ? true : false,
            onAction: () => redirectToPage("/cart-editor/settings")
        },
        {
            content: 'Integrations',
            prefix: <Icon source={AppsIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/integrations" ? true : false,
            onAction: () => redirectToPage("/cart-editor/integrations")
        },
        {
            content: 'Translator',
            prefix: <Icon source={LanguageTranslateIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/translator" ? true : false,
            onAction: () => redirectToPage("/cart-editor/translator")
        },
        {
            content: 'Custom Css',
            prefix: <Icon source={CodeIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/custom-css" ? true : false,
            onAction: () => redirectToPage("/cart-editor/custom-css")
        },
        {
            content: 'Custom Javascript',
            prefix: <Icon source={CodeIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/custom-js" ? true : false,
            onAction: () => redirectToPage("/cart-editor/custom-js")
        },
        {
            content: 'Additional Settings',
            prefix: <Icon source={SettingsIcon} />,
            suffix: null,
            active: gridItems.paths == "/cart-editor/additional-settings" ? true : false,
            onAction: () => redirectToPage("/cart-editor/additional-settings")
        },
    ];

    const lineItems =
        <Box>
            <SkeletonBodyText lines={1} />
        </Box>;

    var Object_rows = [];
    for (var i = 0; i < 24; i++) {
        Object_rows.push({
            content: lineItems,
        },);
    }

    const skeletonGridLayout =
        <Page
            title="Cart Editor"
            backAction={{ content: 'To Back' }}
            fullWidth>
            <Frame>
                {/* <Loading /> */}
                <Layout>
                    <Layout.Section>
                        <div className='styles_navigation styles_navigation_cart'>
                            <div className='styles_menu_items'>
                                <Card padding={"100"}>
                                    <BlockStack gap={300}>
                                        <Box paddingInlineStart={"300"} paddingBlockStart="200">
                                            <Text as="h2" variant="headingSm" fontWeight="medium">
                                                Cart Editor Settings
                                            </Text>
                                        </Box>
                                        <ActionList actionRole="menuitem" items={Object_rows}
                                        />
                                    </BlockStack>

                                </Card>
                            </div>
                            <div className='styles_content'>
                                <div>
                                    <Frame>
                                        <Layout>
                                            <Layout.Section>
                                                <BlockStack gap={500}>
                                                    <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
                                                        <Card roundedAbove="xs">
                                                            <Box width="100%">
                                                                <BlockStack gap={{ xs: '500', sm: '600' }}>
                                                                    <SkeletonDisplayText lines={1} />
                                                                    <SkeletonBodyText lines={1} />
                                                                    <SkeletonBodyText lines={1} />
                                                                </BlockStack>
                                                            </Box>
                                                        </Card>
                                                        <Card roundedAbove="xs">
                                                            <Box width="100%">
                                                                <BlockStack gap={{ xs: '500', sm: '600' }}>
                                                                    <SkeletonDisplayText lines={1} />
                                                                    <SkeletonBodyText lines={1} />
                                                                    <SkeletonBodyText lines={1} />
                                                                </BlockStack>
                                                            </Box>
                                                        </Card>
                                                    </InlineGrid>
                                                    <Card roundedAbove="xs">
                                                        <Box width="100%">
                                                            <BlockStack gap={{ xs: '500', sm: '600' }}>
                                                                <SkeletonDisplayText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                            </BlockStack>
                                                        </Box>
                                                    </Card>
                                                    <Card roundedAbove="xs">
                                                        <Box width="100%">
                                                            <BlockStack gap={{ xs: '500', sm: '600' }}>
                                                                <SkeletonDisplayText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                                <SkeletonBodyText lines={1} />
                                                            </BlockStack>
                                                        </Box>
                                                    </Card>

                                                    {/* <Card>
                                                        <Box padding="200">
                                                        <SkeletonDisplayText size="small" />
                                                        <SkeletonBodyText  lines={1}/>
                                                        </Box>
                                                    </Card>
                                                    <Card>
                                                        <Box padding="200">
                                                        <SkeletonDisplayText size="small" />
                                                        <SkeletonBodyText lines={1} />
                                                        </Box>
                                                    </Card> */}
                                                    {/* <Card>
                                                        <Box padding="200">
                                                            <SkeletonBodyText lines={1} />
                                                        </Box>
                                                    </Card>
                                                    <Card>
                                                        <SkeletonBodyText lines={10} />
                                                    </Card> */}
                                                </BlockStack>
                                            </Layout.Section>
                                        </Layout>
                                    </Frame>
                                </div>
                            </div>
                        </div>
                        {/* <Grid columns={{ xs: 1, sm: 4, md: 6, lg: 12, xl: 12 }}>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 3 }}>
                                <Card padding={"100"}>
                                    <Box paddingInlineStart={"300"} paddingBlockStart="200">
                                        <Text as="h2" variant="headingSm" fontWeight="medium">
                                            Cart Editor Settings
                                        </Text>
                                    </Box>
                                    <ActionList actionRole="menuitem" items={Object_rows}
                                    />
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 9, xl: 9 }}>
                                <div>
                                    <Frame>
                                        <Layout>
                                            <Layout.Section>
                                                <BlockStack gap={500}>
                                                    <Card>
                                                        <Box padding="200">
                                                            <SkeletonBodyText lines={1} />
                                                        </Box>
                                                    </Card>
                                                    <Card>
                                                        <SkeletonBodyText lines={10} />
                                                    </Card>7
                                                </BlockStack>
                                            </Layout.Section>
                                        </Layout>
                                    </Frame>
                                </div>
                            </Grid.Cell>
                        </Grid> */}
                    </Layout.Section>
                </Layout>
            </Frame>
        </Page>;

    const grid_columns = { xs: 1, sm: 4, md: 6, lg: 12, xl: 12 };
    const grid_columns_md = { xs: 6, sm: 6, md: 12, lg: 12, xl: 12 };

    /* const grid_cell1 = { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 }; */
    const grid_cell2 = { xs: 6, sm: 6, md: 4, lg: 9, xl: 9 };

    const grid_cell1_md = { xs: 1, sm: 1, md: 2, lg: 3, xl: 3 };
    const grid_cell2_md = { xs: 6, sm: 6, md: 6, lg: 9, xl: 9 };
    const ParentNav = ({ children = null }) => {
        return mdDown ? <Box background="bg-surface" paddingInlineStart={"300"} paddingBlockStart="200">
            {children}
        </Box> : <Card padding={"100"}>
            {children}
        </Card>
    };

    const menu_nav = <Grid.Cell columnSpan={grid_cell1_md}>
        <ParentNav>
            <BlockStack gap={300}>
                <Box background="bg-surface" paddingInlineStart={"300"} paddingBlockStart="200">
                    <Text as="h2" variant="headingSm" fontWeight="medium">
                        Cart Editor Settings
                    </Text>
                </Box>
                <ActionList actionRole="menuitem" items={menuItems} />
            </BlockStack>
        </ParentNav>
    </Grid.Cell>;

    const menu_nav_close = <button onClick={() => mobileCloseNav()} type="button" className="Polaris-Frame__NavigationDismiss" aria-hidden="false" aria-label="Close navigation">
        <span className="Polaris-Icon">
            <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
            </svg>
        </span>
    </button>;

    const secondaryMenuMarkup = (
        <TopBar.Menu
            activatorContent={
                <span>
                </span>
            }

        />
    );

    /* const topBarMarkup = mdDown ? (
        
    ) : null; */

    const nav_mobile = mdDown ? ' hs-nav-mobile' : '';
    const show_nav_mobile = mdDown ? activeNav ? ' hs-show-item' : '' : '';
    const show_backdrop = mdDown ? activeNav ? 'Polaris-Backdrop Polaris-Backdrop--belowNavigation' : '' : '';

    mobileNav();

    const updateUser = <div style={{ height: '500px' }}>
        <Modal
            size='large'
            activator={''}
            open={true}
            title={<strong>Update App</strong>}
            primaryAction={{
                content: 'Accept',
                onAction: update_user,
            }}
        >
            <Modal.Section>
                <BlockStack gap={500}>
                    <p>
                        Due to the changes that Shopify has made to the 2.0 templates, it has been necessary to update the application to a new version, to integrate with these changes.
                    </p>
                    <p>
                        In such a way you have to reconfigure the app, due to the new functions that it includes.
                    </p>
                    <p>
                        <strong>If you have customizations with the app, these will not apply to the new version.</strong>
                    </p>
                    <p>
                        <strong>Note: Once the update is accepted, you will not be able to return to the old version of the app.</strong>
                    </p>
                </BlockStack>
            </Modal.Section>
        </Modal>
    </div>;
    const this_page =
            <Page
                title="Cart Editor"
                /* primaryAction={<HeaderPage generalApp={generalApp} />} */
                backAction={{ content: 'To Back', onAction: () => redirectToPage("/") }}
                fullWidth>
                <div className={show_backdrop} onClick={() => mobileCloseNav()}></div>
                {/* <Frame> */}
                <Layout>
                    <Layout.Section>
                        <div className='styles_navigation styles_navigation_cart'>
                            <div className='styles_menu_items'>
                                <div className={'hs-nav-item ' + nav_mobile + show_nav_mobile}>
                                    {menu_nav}
                                    {menu_nav_close}
                                </div>
                            </div>
                            <div className='styles_content'>
                                {children}
                            </div>
                        </div>
                        {/* <Grid columns={mdDown ? grid_columns_md : grid_columns}>
                                <div className={'hs-nav-item ' + nav_mobile + show_nav_mobile}>
                                    {menu_nav}
                                    {menu_nav_close}
                                </div>
                                <Grid.Cell columnSpan={mdDown ? grid_cell2_md : grid_cell2}>
                                    {children}
                                </Grid.Cell>
                            </Grid> */}
                    </Layout.Section>
                </Layout>
                {/* </Frame> */}
            </Page>;

            const thisPage =   mdDown ? 
                <Frame
                  topBar={
                    <TopBar
                      background-color="bg-surface"
                      showNavigationToggle
                      onNavigationToggle={() => {
                        mobileNavItem();
                      }}
                      secondaryMenu={secondaryMenuMarkup}
                    />
                  }
                >
                {this_page}
                </Frame>
               : this_page;
    return (
        myShop != false ?
            !userold ? <ModalUpdateUser /> : thisPage
            : skeletonGridLayout
    );
}
