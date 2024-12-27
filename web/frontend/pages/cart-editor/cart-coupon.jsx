import { Component } from "react";
import {
    Card,
    Divider,
    Text,
    Select,
    InlineGrid,
    TextField,
    Toast,
    BlockStack,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';
import colorconvert from 'color-convert';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton, StatusModule, StatusModuleBanner } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_radius,
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
} from '@utils/global'
class CartCoupon extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverEnabled: 0,
            popoverCCBackground: false,
            popoverCCFont: false,
            messageError: '',
            loading: true,
            toast: false,
            dataCartCoupon: null,
            enabled_cart_coupon_button: null,
            name_cart_coupon_button: null,
            placeholder_cart_coupon_button: null,
            button_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            button_background_color_hex: null,
            button_font_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            button_font_color_hex: null,
            button_font_size: null,
            button_text_transform: null,
            button_font_weight: null,
            button_border_radius: null,
            options_font_size: [],
            options_transform: [],
            options_weight: [],
            options_border_radius: [],
        };
    };
    componentDidMount() {
        this.getCartCoupon();
    };

    getCartCoupon = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_cart_coupon', app);
        if (data && data.cart_coupon !== undefined && data.cart_coupon !== null) {
            this.originalData(0, data);
        } else {
            if (typeof data.plan_status !== 'undefined') {
                if (!data.plan_status) {
                    const app = this.context;
                    const redirect = Redirect.create(app);
                    redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
                    return false;
                };
            };
        };
    };

    originalData = (identify, data) => {
        var myData = {};
        if (!identify) {
            myData = {
                dataCartCoupon: data
            };
        };
        const settings_cart_coupon = data.cart_coupon;

        var stateData = {
            popoverCCBackground: false,
            popoverCCFont: false,
            messageError: '',
            loading: false,
            toast: false,
            enabled_cart_coupon_button: settings_cart_coupon.enabled_cart_coupon_button,
            name_cart_coupon_button: settings_cart_coupon.name_cart_coupon_button,
            placeholder_cart_coupon_button: settings_cart_coupon.placeholder_cart_coupon_button,
            button_background_color: {
                hue: settings_cart_coupon.button_background_color_h,
                saturation: settings_cart_coupon.button_background_color_s,
                brightness: settings_cart_coupon.button_background_color_b
            },
            button_background_color_hex: settings_cart_coupon.button_background_color_hex.replace(/\#/, ""),
            button_font_color: {
                hue: settings_cart_coupon.button_font_color_h,
                saturation: settings_cart_coupon.button_font_color_s,
                brightness: settings_cart_coupon.button_font_color_b
            },
            button_font_color_hex: settings_cart_coupon.button_font_color_hex.replace(/\#/, ""),
            button_font_size: settings_cart_coupon.button_font_size,
            button_text_transform: settings_cart_coupon.button_text_transform,
            button_font_weight: settings_cart_coupon.button_font_weight,
            button_border_radius: settings_cart_coupon.button_border_radius,
            options_font_size: arr_options_font_size,
            options_transform: arr_options_transform,
            options_weight: arr_options_weight,
            options_border_radius: arr_options_radius
        };
        switch (identify) {
            case 0:
                stateData = Object.assign({}, stateData, myData);//CONCAT OBJECTS
                break;
            case 1:
                stateData = stateData;
                break;
        };
        this.setState(stateData)
    };

    validateData = (props) => {
        var thisEquals = true;
        const stateData = {
            enabled_cart_coupon_button: +props.enabled_cart_coupon_button,
            name_cart_coupon_button: props.name_cart_coupon_button,
            placeholder_cart_coupon_button: props.placeholder_cart_coupon_button,
            button_background_color_h: props.button_background_color.hue,
            button_background_color_s: props.button_background_color.saturation,
            button_background_color_b: props.button_background_color.brightness,
            button_font_color_h: props.button_font_color.hue,
            button_font_color_s: props.button_font_color.saturation,
            button_font_color_b: props.button_font_color.brightness,
            button_font_size: props.button_font_size,
            button_text_transform: props.button_text_transform,
            button_font_weight: props.button_font_weight,
            button_border_radius: props.button_border_radius,
        };
        const dataCartCoupon = props.dataCartCoupon;
        if (dataCartCoupon !== null) {
            const pc = dataCartCoupon.cart_coupon;
            const data_cart_coupon = {
                enabled_cart_coupon_button: +pc.enabled_cart_coupon_button,
                name_cart_coupon_button: pc.name_cart_coupon_button,
                placeholder_cart_coupon_button: pc.placeholder_cart_coupon_button,
                button_background_color_h: pc.button_background_color_h,
                button_background_color_s: pc.button_background_color_s,
                button_background_color_b: pc.button_background_color_b,
                button_font_color_h: pc.button_font_color_h,
                button_font_color_s: pc.button_font_color_s,
                button_font_color_b: pc.button_font_color_b,
                button_font_size: pc.button_font_size,
                button_text_transform: pc.button_text_transform,
                button_font_weight: pc.button_font_weight,
                button_border_radius: pc.button_border_radius,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_cart_coupon;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ cart_coupon: props.cart_coupon.enabled_cart_coupon_button });
    };

    updateCartCoupon = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_cart_coupon_button: props.enabled_cart_coupon_button,
                name_cart_coupon_button: props.name_cart_coupon_button,
                placeholder_cart_coupon_button: props.placeholder_cart_coupon_button,
                button_background_color_h: props.button_background_color.hue,
                button_background_color_s: props.button_background_color.saturation,
                button_background_color_b: props.button_background_color.brightness,
                button_background_color_hex: '#' + props.button_background_color_hex,
                button_font_color_h: props.button_font_color.hue,
                button_font_color_s: props.button_font_color.saturation,
                button_font_color_b: props.button_font_color.brightness,
                button_font_color_hex: '#' + props.button_font_color_hex,
                button_font_size: props.button_font_size,
                button_text_transform: props.button_text_transform,
                button_font_weight: props.button_font_weight,
                button_border_radius: props.button_border_radius,
            };

            const updateCartCoupon = await makePutPostRequest('/api/cart_coupon', method, requestBody, app);
            var messageError = '';
            if (updateCartCoupon.error && updateCartCoupon.message) {
                messageError = updateCartCoupon.message;
            };
            await this.getCartCoupon();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            popoverEnabled,
            popoverCCBackground,
            popoverCCFont,
            messageError,
            loading,
            toast,
            dataCartCoupon,
            enabled_cart_coupon_button,
            name_cart_coupon_button,
            placeholder_cart_coupon_button,
            button_background_color,
            button_background_color_hex,
            button_font_color,
            button_font_color_hex,
            button_font_size,
            button_text_transform,
            button_font_weight,
            button_border_radius,
            options_font_size,
            options_transform,
            options_weight,
            options_border_radius,
        } = this.state;

        const equals = this.validateData(this.state);


        const activator_cart_coupon =
            <ButtonColor click={() => { this.handlePopover("popoverCCBackground") }} id='button_cart_coupon_color' background={hsbToHex(button_background_color)} />;

        const activator_cart_coupon_font =
            <ButtonColor click={() => { this.handlePopover("popoverCCFont") }} id='button_cart_coupon_color2' background={hsbToHex(button_font_color)} />;


        const content_cart_coupon = (
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">
                        Cart Coupon Button Properties
                    </Text>
                    <BlockStack gap={400}>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <TextField
                                label={<Titles text='Button name ( Apply )' />}
                                value={name_cart_coupon_button}
                                onChange={(value) => { this.handleChange(value, "name_cart_coupon_button") }}
                                maxLength={250}
                            />
                            <TextField
                                label={<Titles text='Button Placeholder ( eg. Discount Code )' />}
                                value={placeholder_cart_coupon_button}
                                onChange={(value) => { this.handleChange(value, "placeholder_cart_coupon_button") }}
                                maxLength={250}
                            />
                            <Select
                                label={<Titles text='Font Size' />}
                                options={options_font_size}
                                value={button_font_size}
                                onChange={(value) => { this.handleChange(value, "button_font_size") }}
                            />
                            <Select
                                label={<Titles text='Text transform' />}
                                options={options_transform}
                                value={button_text_transform}
                                onChange={(value) => { this.handleChange(value, "button_text_transform") }}
                            />
                            <Select
                                label={<Titles text='Font weight' />}
                                options={options_weight}
                                value={button_font_weight}
                                onChange={(value) => { this.handleChange(value, "button_font_weight") }}
                            />
                            <Select
                                label={<Titles text='Border Radius' />}
                                options={options_border_radius}
                                value={button_border_radius}
                                onChange={(value) => this.handleChange(value, "button_border_radius")}
                            />
                            <FieldColor
                                labelColor={<Titles text='Button Background Color' />}
                                textValue={button_background_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "button_background_color_hex", "button_background_color") }}
                                activePop={popoverCCBackground}
                                activadorPop={activator_cart_coupon}
                                closePop={() => { this.handlePopover("popoverCCBackground", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "button_background_color", "button_background_color_hex") }}
                                colorPicker={button_background_color}
                            />
                            <FieldColor
                                labelColor={<Titles text='Button Font Color' />}
                                textValue={button_font_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "button_font_color_hex", "button_font_color") }}
                                activePop={popoverCCFont}
                                activadorPop={activator_cart_coupon_font}
                                closePop={() => { this.handlePopover("popoverCCFont", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "button_font_color", "button_font_color_hex") }}
                                colorPicker={button_font_color}
                            />
                        </InlineGrid>
                    </BlockStack>
                </BlockStack>
            </Card>
        );

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Cart Coupon Button updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataCartCoupon !== null ?
                    <BlockStack gap={500}>
                        {/* <Toogle enabled={enabled_cart_coupon_button} title='Cart Coupon Button' description="Coupons are a great way to offer discounts and rewards to your customers, and can help promote sales across your shop." stateText='The cart coupon button are' activeToogle={() => this.changeStateBoolean('enabled_cart_coupon_button')}></Toogle> */}
                        <StatusModule module='cart_coupon' enabled={enabled_cart_coupon_button} popoverEnabled={popoverEnabled} onActionEnabledItem={() => { this.setState({ enabled_cart_coupon_button: 1, popoverEnabled: !popoverEnabled }) }} onActionDisabledItem={() => { this.setState({ enabled_cart_coupon_button: 0, popoverEnabled: !popoverEnabled }) }} actionPopOver={() => this.setState({ popoverEnabled: !popoverEnabled })} />
                        {!enabled_cart_coupon_button ?
                            <StatusModuleBanner module='cart_coupon' onAction={() => { this.setState({ enabled_cart_coupon_button: 1 }) }} />
                            : null}
                        {content_cart_coupon}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateCartCoupon(this.state)} discard={() => { this.discard(dataCartCoupon) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ cart_coupon: !stateNow });
    };
    handleChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
    handleOnChangeColor = (value, hex, hsb) => {
        value = value.replace(/\#/, "");
        const hextorgb = colorconvert.hex.rgb(value)
        const rgbtohsb = rgbToHsb({ red: hextorgb[0], green: hextorgb[1], blue: hextorgb[2] })
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
        /* this.setState({ [colorhex]:hsbToHex(value).replace(/\#/, "")}) */
    };
}
export default CartCoupon;