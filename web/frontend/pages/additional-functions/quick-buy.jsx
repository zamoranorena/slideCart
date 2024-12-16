import React from 'react';
import { TitleBar } from '@shopify/app-bridge/actions';
import {
    Collapsible,
    Toast,
    Badge,
    Box,
    Card,
    InlineGrid,
    BlockStack,
    Checkbox,
    Select,
    Modal,
    Button,
    TextField,
    Popover,
    ColorPicker,
    hexToRgb,
    hsbToHex,
    rgbToHsb,
    FormLayout,
    Banner,
    Text,
    InlineCode,
    InlineStack,
} from "@shopify/polaris";
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { SkeletonLoad } from '../../components';
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';
//import colorconvert from 'color-convert';
//import BannerHead from '../components/BannerHead';
class QuickBuy extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.yourRef = React.createRef();
        this.state = {
            data: [],
            modal: 0,
            loading: false,
            toastMarkup: null,
            toastError: null,
            messageError: '',
            popover1: null,
            popover2: null,
            arr_options_size: [],
            arr_options_type: [],
            arr_options_position: [],
            arr_options_redirect: [],
            enabled_quick_buy: null,
            quick_buy_button_type: null,
            quick_buy_button_show_mobile: null,
            quick_buy_button_show_desktop: null,
            quick_buy_button_show_quantity_selector: null,
            quick_buy_button_size: null,
            quick_buy_button_position: null,
            quick_buy_button_redirect: null,
            quick_buy_button_background_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            quick_buy_button_background_color_hex: null,
            quick_buy_button_icon: null,
            quick_buy_button_icon_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            quick_buy_button_icon_color_hex: null,
            quick_buy_button_icon_svg: null
        };
    };
    getQuickBuyData = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_quick_buy', app);
        if (data.dataQuickBuy && Object.keys(data).length > 0 && data.dataQuickBuy !== undefined && data.dataStickyCart !== null) {
            /*  const statusPlan = data.statusPlan.data[0].status;
             if (statusPlan == 0) {
                 const redirect = Redirect.create(app);
                 redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
                 return false;
             }; */
            var arr_options_size = [
                { label: 'Normal', value: '35' },
                { label: 'Medium', value: '45' },
                { label: 'Big', value: '50' }
            ];
            var arr_options_type = [
                { label: 'Automatic', value: '0' },
                { label: 'Manual', value: '1' }
            ];
            var arr_options_position = [
                { label: 'Top Right', value: 'hs-top-right' },
                { label: 'Top Left', value: 'hs-top-left' }
            ];
            var arr_options_redirect = [
                { label: 'Go To Slide Cart', value: 'no-redirect' },
                { label: 'Go To Cart', value: 'cart' },
                { label: 'Go To Checkout', value: 'checkout' },
            ];
            const quick_buy = data.dataQuickBuy[0];
            const quick_buy_icon = data.iconsQuickBuy.find(element => {
                return element.id === data.dataQuickBuy[0].quick_buy_button_icon;
            });
            this.setState({
                data: data,
                loading: false,
                arr_options_size: arr_options_size,
                arr_options_type: arr_options_type,
                arr_options_position: arr_options_position,
                arr_options_redirect: arr_options_redirect,
                enabled_quick_buy: quick_buy.enabled_quick_buy,
                quick_buy_button_type: quick_buy.quick_buy_button_type.toString(),
                quick_buy_button_show_mobile: quick_buy.quick_buy_button_show_mobile,
                quick_buy_button_show_desktop: quick_buy.quick_buy_button_show_desktop,
                quick_buy_button_show_quantity_selector: quick_buy.quick_buy_button_show_quantity_selector,
                quick_buy_button_size: quick_buy.quick_buy_button_size,
                quick_buy_button_position: quick_buy.quick_buy_button_position,
                quick_buy_button_redirect: quick_buy.quick_buy_button_redirect,
                quick_buy_button_background_color: {
                    hue: quick_buy.quick_buy_button_background_color_h,
                    saturation: quick_buy.quick_buy_button_background_color_s,
                    brightness: quick_buy.quick_buy_button_background_color_b,
                },
                quick_buy_button_background_color_hex: quick_buy.quick_buy_button_background_color_hex.replace(/\#/, ""),
                quick_buy_button_icon: quick_buy.quick_buy_button_icon,
                quick_buy_button_icon_color: {
                    hue: quick_buy.quick_buy_button_icon_color_h,
                    saturation: quick_buy.quick_buy_button_icon_color_s,
                    brightness: quick_buy.quick_buy_button_icon_color_b,
                },
                quick_buy_button_icon_color_hex: quick_buy.quick_buy_button_icon_color_hex.replace(/\#/, ""),
                quick_buy_button_icon_svg: quick_buy_icon.icon
            });
            //this.titles();
        } else {
            if (typeof data.plan_status !== 'undefined') {
                if (!data.plan_status) {
                    const app = this.context;
                    const redirect = Redirect.create(app);
                    redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
                    return false;
                };
            };
        }
    };

    titles = () => {
        const app = this.context;
        const datas = { title: 'Quick Buy' };
        const titleBarOptions = {
            title: datas.title
        };
        TitleBar.create(app, titleBarOptions);
    };

    validateData = () => {
        const w = this.state;
        const stateData = {
            enabled_quick_buy: w.enabled_quick_buy,
            quick_buy_button_type: w.quick_buy_button_type,
            quick_buy_button_show_mobile: w.quick_buy_button_show_mobile,
            quick_buy_button_show_desktop: w.quick_buy_button_show_desktop,
            quick_buy_button_show_quantity_selector: w.quick_buy_button_show_quantity_selector,
            quick_buy_button_size: w.quick_buy_button_size,
            quick_buy_button_position: w.quick_buy_button_position,
            quick_buy_button_redirect: w.quick_buy_button_redirect,
            quick_buy_button_background_color_h: w.quick_buy_button_background_color.hue,
            quick_buy_button_background_color_s: w.quick_buy_button_background_color.saturation,
            quick_buy_button_background_color_b: w.quick_buy_button_background_color.brightness,
            quick_buy_button_icon: w.quick_buy_button_icon,
            quick_buy_button_icon_color_h: w.quick_buy_button_icon_color.hue,
            quick_buy_button_icon_color_s: w.quick_buy_button_icon_color.saturation,
            quick_buy_button_icon_color_b: w.quick_buy_button_icon_color.brightness
        };
        const posts = this.state.data.dataQuickBuy;
        if (typeof posts !== 'undefined') {
            const ps = posts[0];
            const arr2 = {
                enabled_quick_buy: ps.enabled_quick_buy,
                quick_buy_button_type: ps.quick_buy_button_type.toString(),
                quick_buy_button_show_mobile: ps.quick_buy_button_show_mobile,
                quick_buy_button_show_desktop: ps.quick_buy_button_show_desktop,
                quick_buy_button_show_quantity_selector: ps.quick_buy_button_show_quantity_selector,
                quick_buy_button_size: ps.quick_buy_button_size,
                quick_buy_button_position: ps.quick_buy_button_position,
                quick_buy_button_redirect: ps.quick_buy_button_redirect,
                quick_buy_button_background_color_h: ps.quick_buy_button_background_color_h,
                quick_buy_button_background_color_s: ps.quick_buy_button_background_color_s,
                quick_buy_button_background_color_b: ps.quick_buy_button_background_color_b,
                quick_buy_button_icon: ps.quick_buy_button_icon,
                quick_buy_button_icon_color_h: ps.quick_buy_button_icon_color_h,
                quick_buy_button_icon_color_s: ps.quick_buy_button_icon_color_s,
                quick_buy_button_icon_color_b: ps.quick_buy_button_icon_color_b
            };
            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = arr2;
            const b = stateData;
            if (equals(a, b)) {
                return true;
            } else {
                return false;
            }
        }
    };

    discard = () => {
        const posts = this.state.data.dataQuickBuy[0];
        const sticky_cart_icon = this.state.data.iconsQuickBuy.find(element => {
            return element.id === (this.state.data.dataQuickBuy[0].quick_buy_button_icon)
        });
        this.setState({
            loading: false,
            enabled_quick_buy: posts.enabled_quick_buy,
            quick_buy_button_type: posts.quick_buy_button_type.toString(),
            quick_buy_button_show_mobile: posts.quick_buy_button_show_mobile,
            quick_buy_button_show_desktop: posts.quick_buy_button_show_desktop,
            quick_buy_button_show_quantity_selector: posts.quick_buy_button_show_quantity_selector,
            quick_buy_button_size: posts.quick_buy_button_size,
            quick_buy_button_position: posts.quick_buy_button_position,
            quick_buy_button_redirect: posts.quick_buy_button_redirect,
            quick_buy_button_background_color: {
                hue: posts.quick_buy_button_background_color_h,
                saturation: posts.quick_buy_button_background_color_s,
                brightness: posts.quick_buy_button_background_color_b
            },
            quick_buy_button_background_color_hex: hsbToHex({
                hue: posts.quick_buy_button_background_color_h,
                saturation: posts.quick_buy_button_background_color_s,
                brightness: posts.quick_buy_button_background_color_b
            }).replace(/\#/, ""),
            quick_buy_button_icon: posts.quick_buy_button_icon,
            quick_buy_button_icon_color: {
                hue: posts.quick_buy_button_icon_color_h,
                saturation: posts.quick_buy_button_icon_color_s,
                brightness: posts.quick_buy_button_icon_color_b
            },
            quick_buy_button_icon_color_hex: hsbToHex({
                hue: posts.quick_buy_button_icon_color_h,
                saturation: posts.quick_buy_button_icon_color_s,
                brightness: posts.quick_buy_button_icon_color_b
            }).replace(/\#/, ""),
            quick_buy_button_icon_svg: sticky_cart_icon.icon,
            popover1: false,
            popover2: false
        });
        this.props.updateGridItemsAddOns({ quick_buy: posts.enabled_quick_buy });
    };

    save = async () => {
        this.setState({
            loading: true
        });
        const {
            enabled_quick_buy,
            quick_buy_button_type,
            quick_buy_button_show_mobile,
            quick_buy_button_show_desktop,
            quick_buy_button_show_quantity_selector,
            quick_buy_button_size,
            quick_buy_button_position,
            quick_buy_button_redirect,
            quick_buy_button_background_color,
            quick_buy_button_background_color_hex,
            quick_buy_button_icon,
            quick_buy_button_icon_color,
            quick_buy_button_icon_color_hex
        } = this.state

        const requestBody = {
            enabled_quick_buy: enabled_quick_buy,
            quick_buy_button_type: quick_buy_button_type,
            quick_buy_button_show_mobile: quick_buy_button_show_mobile,
            quick_buy_button_show_desktop: quick_buy_button_show_desktop,
            quick_buy_button_show_quantity_selector: quick_buy_button_show_quantity_selector,
            quick_buy_button_size: quick_buy_button_size,
            quick_buy_button_position: quick_buy_button_position,
            quick_buy_button_redirect: quick_buy_button_redirect,
            quick_buy_button_background_color_h: quick_buy_button_background_color.hue,
            quick_buy_button_background_color_s: quick_buy_button_background_color.saturation,
            quick_buy_button_background_color_b: quick_buy_button_background_color.brightness,
            quick_buy_button_background_color_hex: '#' + quick_buy_button_background_color_hex,
            quick_buy_button_icon: quick_buy_button_icon,
            quick_buy_button_icon_color_h: quick_buy_button_icon_color.hue,
            quick_buy_button_icon_color_s: quick_buy_button_icon_color.saturation,
            quick_buy_button_icon_color_b: quick_buy_button_icon_color.brightness,
            quick_buy_button_icon_color_hex: '#' + quick_buy_button_icon_color_hex,
        };
        const method = 'PUT';
        const app = this.context;
        await makePutPostRequest('/api/quick_buy', method, requestBody, app).then(response => {
            if (response) {
                this.getQuickBuyData();
                this.setState({ toastMarkup: true });
            }
        }).catch(err => {
            this.notifyError(err, 'updateQuickBuy');
        });
    };

    iconPreview = () => {
        if (this.state.data.iconsQuickBuy != undefined) {
            console.log(this.state.data.iconsQuickBuy)
                if (this.state.quick_buy_button_show_mobile || this.state.quick_buy_button_show_desktop) {
                    const a = this.state.quick_buy_button_icon_svg;
                    const b = '#' + this.state.quick_buy_button_icon_color_hex
                    setTimeout(function () {
                        if (document.getElementById('content') != null) {
                            document.getElementById('content').innerHTML = "";
                            var doc = new DOMParser().parseFromString(a, 'application/xml');
                            var el = document.getElementById("content")
                            var isEmpty = document.getElementById('content').innerHTML === "";
                            if (isEmpty) {
                                el.appendChild(
                                    el.ownerDocument.importNode(doc.documentElement, true)
                                )
                                const icon_svg_color = document.querySelector("#content svg");
                                icon_svg_color.setAttribute("style", "fill:" + b + ";")
                                const paths = document.querySelectorAll("#content svg path");
                                for (let i = 0; i < paths.length; i++) {
                                    paths[i].setAttribute("style", "fill:" + b + ";")
                                    paths[i].setAttribute("fill", b)
                                };
                                const paths2 = document.querySelectorAll("#content svg circle");
                                for (let i = 0; i < paths2.length; i++) {
                                    /* paths2[i].setAttribute("fill",b) */
                                    paths2[i].setAttribute("style", "fill:" + b + ";");
                                };
                                /* icon_svg_color.setAttribute("fill",b) */
                            };
                        };
                    }, 50);
                };
        };
    };

    async componentDidMount() {
        this.getQuickBuyData();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    };

    render() {
        const ButtonColor = ({ height = '100%', width = '100%', background = '#000000', border = "1px solid #898f94", borderRadius = "0.3rem", }) => {
            return (
                <div
                    style={{
                        background: background,
                        height: height,
                        width: width,
                        borderRadius: borderRadius,
                        border: border,
                    }}
                />
            );
        };

        this.iconPreview();
        const {
            data,
            loading,
            modal,
            popover1,
            popover2,
            arr_options_size,
            arr_options_type,
            arr_options_position,
            arr_options_redirect,
            enabled_quick_buy,
            quick_buy_button_type,
            quick_buy_button_show_mobile,
            quick_buy_button_show_desktop,
            quick_buy_button_show_quantity_selector,
            quick_buy_button_size,
            quick_buy_button_position,
            quick_buy_button_redirect,
            quick_buy_button_background_color,
            quick_buy_button_background_color_hex,
            quick_buy_button_icon_color,
            quick_buy_button_icon_color_hex
        } = this.state

        const loadingPage = loading ? (
            <div>
                <Loading />
            </div>
        ) : null;

        var active = this.validateData();
        const contextualSaveBarMarkup = !active ? (
            <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    loading: loading,
                    onAction: () => this.save(),
                }}
                discardAction={{
                    onAction: () => this.discard(),
                }}
                visible
                alignContentFlush
                fullWidth={true}
            />
        ) : null;

        const banner = quick_buy_button_type === '1' ?
            <div className='bannerQuickBuy'>
                <Banner
                    title="Quick Buy Button Manual"
                    tone="warning"
                >
                    <BlockStack gap={500}>
                        <p>
                            The installation of this module will be manual and you must follow these steps:
                        </p>
                        <p>
                            You should go to the snippets/product-card-grid file of your template, then inside the <mark>{"<a></a>"}</mark> tag you should paste this line of code: <Text variant="bodyMd" as="span"><InlineCode> {"{ % render 'hs-quick-buy-button', product: product % "}{"}"}</InlineCode></Text>
                        </p>
                        <p>
                            If you do not understand these steps you can contact our support, we will do the setup for you immediately.
                        </p>
                    </BlockStack>
                </Banner>
            </div> : null

        const activatorModal = <div ref={this.yourRef} ><Button variant='primary' tone="success" onClick={() => this.handleChange("modal")}>Select Icon</Button></div>;
        const hexcolor_quick_buy_button_icon_color = hsbToHex(quick_buy_button_icon_color);
        const activator_quick_buy_button_icon_color = (
            <Button onClick={() => { this.handlePopover("popover1") }} id='quick_buy_button_color'>
                <ButtonColor background={hexcolor_quick_buy_button_icon_color} />
            </Button>
        );
        const hexcolor_quick_buy_button_background_color = hsbToHex(quick_buy_button_background_color);
        const activator_quick_buy_button_background_color = (
            <Button onClick={() => { this.handlePopover("popover2") }} id='quick_buy_button_color2'>
                <ButtonColor background={hexcolor_quick_buy_button_background_color} />
            </Button>
        );
        
        const quickBuyIcon = quick_buy_button_show_mobile || quick_buy_button_show_desktop ?
            <Card>
                <div>
                    <Text as="h1" variant="headingMd">
                        Quick Buy Button Icon
                    </Text>
                    <div className='icon'>
                        <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                            <InlineStack gap="400" wrap={false} blockAlign="center" align="center">

                                <div id='content'>
                                </div>
                                <Modal
                                    activator={activatorModal}
                                    open={modal}
                                    onClose={() => this.handleChange("modal")}
                                    title="Select the icon of your preference"
                                    secondaryActions={[
                                        {
                                            content: 'Cancel',
                                            onAction: () => this.handleChange("modal"),
                                        },
                                    ]}
                                >
                                    <Modal.Section>
                                        <InlineGrid gap="400" columns={11}>
                                            {data.iconsQuickBuy.map((el, i) => (
                                                <Button key={i} id={'button' + i} icon={el.icon} onClick={() => this.iconChange(el.icon, el.id)}></Button>
                                            ))}
                                        </InlineGrid>
                                    </Modal.Section>
                                </Modal>
                            </InlineStack>
                            <TextField
                                label="Quick Buy Button Icon Color"
                                value={quick_buy_button_icon_color_hex || '000000'}
                                onChange={(value) => { this.handleOnChangeColor(value, "quick_buy_button_icon_color_hex", "quick_buy_button_icon_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={popover1}
                                        activator={activator_quick_buy_button_icon_color}
                                        onClose={() => { this.handlePopover("popover1", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "quick_buy_button_icon_color", "quick_buy_button_icon_color_hex") }}
                                                color={quick_buy_button_icon_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_quick_buy_button_icon_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                        </InlineStack >
                    </div>
                </div>
            </Card> : null;

        const quickBuyProperties = quick_buy_button_show_mobile || quick_buy_button_show_desktop ?
            <Card>
                <div>
                    <Text as="h1" variant="headingMd">
                        Quick Buy Button Properties
                    </Text>
                    <FormLayout>
                        <BlockStack align='center' inlineAlign='center'>
                            <Checkbox
                                label="Show Quantity selector"
                                checked={quick_buy_button_show_quantity_selector}
                                onChange={() => this.handleChange("quick_buy_button_show_quantity_selector")}
                            />

                        </BlockStack>
                        <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                            <TextField
                                label="Quick Buy Button Background"
                                value={quick_buy_button_background_color_hex || '000000'}
                                onChange={(value) => { this.handleOnChangeColor(value, "quick_buy_button_background_color_hex", "quick_buy_button_background_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={popover2}
                                        activator={activator_quick_buy_button_background_color}
                                        onClose={() => { this.handlePopover("popover2", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "quick_buy_button_background_color", "quick_buy_button_background_color_hex") }}
                                                color={quick_buy_button_background_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_quick_buy_button_background_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                            <Select
                                label="Quick Buy Size"
                                options={arr_options_size}
                                value={quick_buy_button_size}
                                onChange={(value) => { this.handleOnChange(value, "quick_buy_button_size") }}
                            />
                            <Select
                                label="Select Quick Buy Button position"
                                options={arr_options_position}
                                value={quick_buy_button_position}
                                onChange={(value) => { this.handleOnChange(value, "quick_buy_button_position") }}
                            />
                            <Select
                                label="Click in quick buy button, redirect"
                                options={arr_options_redirect}
                                value={quick_buy_button_redirect}
                                onChange={(value) => { this.handleOnChange(value, "quick_buy_button_redirect") }}
                            />
                        </InlineGrid>

                        {/* <Select
                label="Quick Buy Button Type"
                options={arr_options_type}
                value={quick_buy_button_type}
                onChange={(value)=>{this.handleOnChange(value,"quick_buy_button_type")}}
            /> */}
                    </FormLayout>
                </div>
            </Card> : null;

        const quickBuy = (
               
            <BlockStack gap={400}>
                <Card>
                    <Text as="h1" variant="headingMd">
                        Quick Buy Button
                    </Text>
                    <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                        <Checkbox
                            label="Show on tablets and mobile devices"
                            checked={quick_buy_button_show_mobile}
                            onChange={() => this.handleChange("quick_buy_button_show_mobile")}
                        />
                        <Checkbox
                            label="Show on desktop computers"
                            checked={quick_buy_button_show_desktop}
                            onChange={() => this.handleChange("quick_buy_button_show_desktop")}
                        />
                    </InlineGrid>
                </Card>
                {quickBuyIcon}
                {quickBuyProperties}
                </BlockStack>);

        const toastMarkup = this.state.toastMarkup ? <Toast content="Quick Buy updated successfully!" onDismiss={() => { this.handlePopover("toastMarkup", 0) }} duration={2500} /> : null;
        const toastError = this.state.toastError ? <Toast content={this.state.messageError} error onDismiss={() => { this.handlePopover("toastError", 0) }} duration={2500} /> : null;

        const banner_hidden_quick = 
            <div className='bannerQuickBuy'>
                <Banner
                    title="Quick Buy Button Hidden"
                    status="info"
                >
                    <Text>
                            To hide the quick buy button you will have to add the following tag to the product: <Text variant="bodyMd" as="span"><InlineCode> {"HS_QUICK_BUY_HIDDEN_PRODUCT"}</InlineCode></Text>
                    </Text>
                </Banner>
            </div>;

const quickBuyToogle =
            <InlineStack gap="200" wrap={false}>
                <InlineStack gap="200" align="start" blockAlign="baseline">
                    <label htmlFor="hs-active">
                        <Text as="p" fontWeight="medium" tone={enabled_quick_buy ? "success" : 'critical'}>The Quick Buy is {enabled_quick_buy ? 'enabled' : 'disabled'}.</Text>
                    </label>
                </InlineStack>
            </InlineStack>;


        const actionMarkup = (
            <Button
                role="switch"
                id="hs-active"
                ariaChecked={enabled_quick_buy ? 'false' : 'true'}
                onClick={() => this.toggleIsDirty("enabled_quick_buy")}
                size="slim"
                variant="primary"
                tone={!enabled_quick_buy ? "success" : "critical"}
            >
                {!enabled_quick_buy ? "Turn on" : "Turn off"}
            </Button>
        );
        return typeof data.dataQuickBuy === 'undefined' ? <SkeletonLoad></SkeletonLoad> :
            <div>
                {loadingPage}
                {/* {<BannerHead {...this.props}/>} */}
                <BlockStack gap="500">
                    <Card roundedAbove="xs">
                        <BlockStack gap={{ xs: '400', sm: '500' }}>
                            <Box width="100%">
                                <BlockStack gap={{ xs: '200', sm: '400' }}>
                                    <Box width="100%">
                                        <InlineStack
                                            gap="1200"
                                            align="space-between"
                                            blockAlign="center"
                                            wrap={false}
                                        >
                                            {quickBuyToogle}
                                            <Box minWidth="fit-content">
                                                <InlineStack align="end">{actionMarkup}</InlineStack>
                                            </Box>
                                        </InlineStack>
                                    </Box>
                                </BlockStack>
                            </Box>
                        </BlockStack>
                    </Card>
                    {/* <Collapsible
                        open={this.state.enabled_quick_buy}
                        id="basic-collapsible"
                        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                    >
                    </Collapsible> */}
                    <Box paddingBlockEnd="400">
                        <BlockStack gap="500">
                            {banner}
                            {banner_hidden_quick}
                            {quickBuy}
                        </BlockStack>
                    </Box>
                    {contextualSaveBarMarkup}
                    {toastMarkup}
                    {toastError}
                </BlockStack>
            </div>
    }
    toggleIsDirty = (toggle) => {
        const isDirty = this.state[`${toggle}`];
        if (isDirty == 1) {
            this.setState({ [`${toggle}`]: 0, });
            this.props.updateGridItemsAddOns({ quick_buy: false });
        } else {
            this.setState({ [`${toggle}`]: 1, });
            this.props.updateGridItemsAddOns({ quick_buy: true });
        }
    };
    handleChange = (id) => {
        var validate = this.state[id];
        if (validate) {
            validate = 0;
        } else {
            validate = 1;
        }
        this.setState({ [id]: validate });
    };

    handleOnChange = (value, second) => {
        this.setState({ [second]: value });
    };

    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };

    handleOnChangeColor = (value, hex, hsb) => {
        //const hextorgb = colorconvert.hex.rgb(value)
        //const rgbtohsb = rgbToHsb({ red: hextorgb[0], green: hextorgb[1], blue: hextorgb[2] })
        const hextorgb = hexToRgb('#' + value);
        const rgbtohsb = rgbToHsb({ red: hextorgb.red, green: hextorgb.green, blue: hextorgb.blue })
        this.setState({
            [hex]: value,
            [hsb]: {
                hue: rgbtohsb.hue,
                saturation: rgbtohsb.saturation,
                brightness: rgbtohsb.brightness
            }
        })
    };

    handleColors = (value, colorhsb, colorhex) => {
        this.setState({ [colorhsb]: value, [colorhex]: hsbToHex(value).replace(/\#/, "") });
    };

    iconChange = (icon_svg, icon_id) => {
        this.setState({
            modal: 0,
            quick_buy_button_icon: icon_id,
            quick_buy_button_icon_svg: icon_svg
        });
    };

    notifyError = (err, name) => {
        switch (name) {
            case 'updateQuickBuy':
                this.setState({ toastError: true, messageError: JSON.stringify(err) });
                break;
        }
    };

}

export default QuickBuy;