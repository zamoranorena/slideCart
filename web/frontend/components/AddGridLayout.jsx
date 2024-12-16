import { ActionList, Frame, Grid, Icon, Card, Badge, Page, Text, Layout, BlockStack, SkeletonBodyText, Box } from '@shopify/polaris';
import { MarketsIcon, ViewIcon, HideIcon, CartSaleIcon } from '@shopify/polaris-icons';
import { History, Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { useCallback, useState, useEffect } from "react";
import { makeGetRequest } from '../utils/Services';
import { ModalUpdateUser } from '../components/ModalUpdateUser';

export function AddGridLayout({ children, paths = 0, gridItemsAddOns, updateGridItemsAddOns }) {
    const [activeCartBar, setActiveCartBar] = useState(false);
    const [activeStickyCart, setActiveStickyCart] = useState(false);
    const [activeQuickBuy, setActiveQuickBuy] = useState(false);
    const [activeCartAnimator, setActiveCartAnimator] = useState(false);
    const [activeCouponBar, setActiveCouponBar] = useState(false);

    const [newUser, setNewUser] = useState('');

    const [myShop, setShop] = useState(false);
    const [userold, setuserold] = useState(true);

    const app = useAppBridge();

    const redirectToPage = (path) => {
        /* const history = History.create(app);
        history.dispatch(History.Action.PUSH,path ); */
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, { path: path, });
        updateGridItemsAddOns({ paths: path })
    };
    const activeItems = () => {
        setActiveCartBar(false)
        setActiveStickyCart(false)
        setActiveQuickBuy(false)
        setActiveCartAnimator(false)
        setActiveCouponBar(false)
    };

    const validatePath = path => {
        switch (path) {
            case '/additional-functions/cart-bar':
                activeItems();
                setActiveCartBar(true);
                break;
            case '/additional-functions/sticky-cart':
                activeItems();
                setActiveStickyCart(true);
                break;
            case '/additional-functions/quick-buy':
                activeItems();
                setActiveQuickBuy(true);
                break;
            case '/additional-functions/cart-animator':
                activeItems();
                setActiveCartAnimator(true);
                break;
            case '/additional-functions/coupon-bar':
                activeItems();
                setActiveCouponBar(true);
                break;
        }
    };

    const getPlan = async () => {
        const response = await makeGetRequest("/api/get_client_data", app);
        if (response.shop) {
            setShop(response.shop);
            setNewUser(response.new_user);
            updateGridItemsAddOns({
                cart_bar: response.additional_add_ons.enabled_cart_bar ? true : false,
                sticky_cart: response.additional_add_ons.enabled_sticky_cart ? true : false,
                quick_buy: response.additional_add_ons.enabled_quick_buy ? true : false,
                cart_animator: response.additional_add_ons.enabled_cart_animator ? true : false,
                coupon_bar: response.additional_add_ons.enabled_coupon_bar ? true : false
            })

            if (response.status_user == 1) {
                setuserold(false);
                return false;
            };

            if (response.new_user == 1) {
                setusernew(true);
            };
        };

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
        updateGridItemsAddOns({ paths: paths })
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


    var menuItems = [
        {
            content: 'Sticky Cart',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItemsAddOns.sticky_cart ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItemsAddOns.paths == "/additional-functions/sticky-cart" ? true : false,
            onAction: () => redirectToPage("/additional-functions/sticky-cart")
        },
        {
            content: 'Quick Buy',
            prefix: <Icon source={CartSaleIcon} />,
            suffix: gridItemsAddOns.quick_buy ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItemsAddOns.paths == "/additional-functions/quick-buy" ? true : false,
            onAction: () => redirectToPage("/additional-functions/quick-buy")
        },
        {
            content: 'Cart Animator',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItemsAddOns.cart_animator ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItemsAddOns.paths == "/additional-functions/cart-animator" ? true : false,
            onAction: () => redirectToPage("/additional-functions/cart-animator")
        },
        {
            content: 'Coupon Bar',
            prefix: <Icon source={MarketsIcon} />,
            suffix: gridItemsAddOns.coupon_bar ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
            active: gridItemsAddOns.paths == "/additional-functions/coupon-bar" ? true : false,
            onAction: () => redirectToPage("/additional-functions/coupon-bar")
        },
    ];
    const add_to_cart_bar = {
        content: 'Add To Cart Bar',
        prefix: <Icon source={MarketsIcon} />,
        //suffix: suffix(activeCartBar),
        suffix: gridItemsAddOns.cart_bar ? <div className="active-dot"></div> : <div className="deactive-dot"></div>,
        active: activeCartBar,
        onAction: () => redirectToPage("/additional-functions/cart-bar")
    };
    if (!newUser) {
        menuItems.unshift(add_to_cart_bar);
    };

    const lineItems =
        <Box>
            <SkeletonBodyText lines={1} />
        </Box>;

    const skeletonGridLayout =
        <Page
            title="Additional Add-ons"
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
                                                    Additional Function Settings
                                                </Text>
                                            </Box>
                                            <ActionList actionRole="menuitem" items={[
                                                {
                                                    content: lineItems,
                                                },
                                                {
                                                    content: lineItems,
                                                },
                                                {
                                                    content: lineItems,
                                                },
                                                {
                                                    content: lineItems,
                                                },
                                                {
                                                    content: lineItems,
                                                },
                                            ]}
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
                                                    <Card>
                                                        <Box padding="200">
                                                            <SkeletonBodyText lines={1} />
                                                        </Box>
                                                    </Card>
                                                    <Card>
                                                        <SkeletonBodyText lines={10} />
                                                    </Card>
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
                                                    </Card>
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

    function isNewUser() {
        return newUser;
    };

    const thisPage = <Page
        title="Additional Add-ons"
        backAction={{ content: 'To Back', onAction: () => redirectToPage("/") }}
        fullWidth>
            <Layout>
                <Layout.Section>
                    <div className='styles_navigation styles_navigation_cart'>
                        <div className='styles_menu_items'>
                            <Card padding={"100"}>
                                <BlockStack gap={300}>
                                    <Box paddingInlineStart={"300"} paddingBlockStart="200">
                                        <Text as="h2" variant="headingSm" fontWeight="medium">
                                            Additional Function Settings
                                        </Text>
                                    </Box>
                                    <ActionList actionRole="menuitem" items={menuItems}
                                    />
                                </BlockStack>
                            </Card>
                        </div>
                        <div className='styles_content'>
                            {children(isNewUser)}
                        </div>
                    </div>

                    {/* <Grid columns={{ xs: 1, sm: 4, md: 6, lg: 12, xl: 12 }}>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 3 }}>
                            <Card padding={"100"}>
                                <Box paddingInlineStart={"300"} paddingBlockStart="200">
                                    <Text as="h2" variant="headingSm" fontWeight="medium">
                                        Additional Function Settings
                                    </Text>
                                </Box>
                                <ActionList actionRole="menuitem" items={menuItems}
                                />
                            </Card>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 9, xl: 9 }}>
                            {children(isNewUser)}
                        </Grid.Cell>
                    </Grid> */}
                </Layout.Section>
            </Layout>
    </Page>;

    return (
        myShop !== false ?
            !userold ? <ModalUpdateUser /> : thisPage : skeletonGridLayout
    );
}
