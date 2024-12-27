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

class Cart_Button extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverEnabled: 0,
            messageError: '',
            loading: true,
            popoverCart: false,
            popoverCart2: false,
            popoverCart3: false,
            popoverCart4: false,
            toast: false,
            dataCartButton: null,
            enabled_cart_button: null,
            cart_button_text: null,
            cart_button_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            cart_button_text_color_hex: null,

            cart_button_text_colorHover: {
                hue: null,
                saturation: null,
                brightness: null
            },
            cart_button_text_colorHover_hex: null,
            cart_button_text_font_size: null,
            cart_button_text_transform: null,
            cart_button_text_weight: null,
            cart_button_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            cart_button_background_color_hex: null,
            cart_button_background_colorHover: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            cart_button_background_colorHover_hex: null,
            cart_button_border: null,
            options_font_size: [],
            options_transform: [],
            options_weight: [],
            options_border_radius: [],
        };
    };
    componentDidMount() {
        this.getCartButton();
    };

    getCartButton = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_cart_button', app);
        if (data && data.cart_button !== undefined && data.cart_button !== null) {
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
                dataCartButton: data
            };
        };
        const cartButton = data.cart_button;

        var stateData = {
            messageError: '',
            loading: false,
            popoverCart: false,
            popoverCart2: false,
            popoverCart3: false,
            popoverCart4: false,
            toast: false,
            enabled_cart_button: cartButton.enabled_cart_button,
            cart_button_text: cartButton.cart_button_text,
            cart_button_text_color: {
                hue: cartButton.cart_button_text_color_h,
                saturation: cartButton.cart_button_text_color_s,
                brightness: cartButton.cart_button_text_color_b
            },
            cart_button_text_color_hex: cartButton.cart_button_text_color_hex.replace(/\#/, ""),

            cart_button_text_colorHover: {
                hue: cartButton.cart_button_text_colorHover_h,
                saturation: cartButton.cart_button_text_colorHover_s,
                brightness: cartButton.cart_button_text_colorHover_b
            },
            cart_button_text_colorHover_hex: cartButton.cart_button_text_colorHover_hex.replace(/\#/, ""),

            cart_button_text_font_size: cartButton.cart_button_text_font_size,
            cart_button_text_transform: cartButton.cart_button_text_transform,
            cart_button_text_weight: cartButton.cart_button_text_weight,

            cart_button_background_color: {
                hue: cartButton.cart_button_background_color_h,
                saturation: cartButton.cart_button_background_color_s,
                brightness: cartButton.cart_button_background_color_b
            },
            cart_button_background_color_hex: cartButton.cart_button_background_color_hex.replace(/\#/, ""),

            cart_button_background_colorHover: {
                hue: cartButton.cart_button_background_colorHover_h,
                saturation: cartButton.cart_button_background_colorHover_s,
                brightness: cartButton.cart_button_background_colorHover_b,
            },
            cart_button_background_colorHover_hex: cartButton.cart_button_background_colorHover_hex.replace(/\#/, ""),
            cart_button_border: cartButton.cart_button_border,
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
            enabled_cart_button: +props.enabled_cart_button,
            cart_button_text: props.cart_button_text,
            cart_button_text_color_h: props.cart_button_text_color.hue,
            cart_button_text_color_s: props.cart_button_text_color.saturation,
            cart_button_text_color_b: props.cart_button_text_color.brightness,
            cart_button_text_colorHover_h: props.cart_button_text_colorHover.hue,
            cart_button_text_colorHover_s: props.cart_button_text_colorHover.saturation,
            cart_button_text_colorHover_b: props.cart_button_text_colorHover.brightness,
            cart_button_text_font_size: props.cart_button_text_font_size,
            cart_button_text_transform: props.cart_button_text_transform,
            cart_button_text_weight: props.cart_button_text_weight,
            cart_button_background_color_h: props.cart_button_background_color.hue,
            cart_button_background_color_s: props.cart_button_background_color.saturation,
            cart_button_background_color_b: props.cart_button_background_color.brightness,
            cart_button_background_colorHover_h: props.cart_button_background_colorHover.hue,
            cart_button_background_colorHover_s: props.cart_button_background_colorHover.saturation,
            cart_button_background_colorHover_b: props.cart_button_background_colorHover.brightness,
            cart_button_border: props.cart_button_border,
        };
        const dataCartButton = props.dataCartButton;
        if (dataCartButton !== null) {
            const pcb2 = dataCartButton.cart_button;
            const data_cart_button = {
                enabled_cart_button: +pcb2.enabled_cart_button,
                cart_button_text: pcb2.cart_button_text,
                cart_button_text_color_h: pcb2.cart_button_text_color_h,
                cart_button_text_color_s: pcb2.cart_button_text_color_s,
                cart_button_text_color_b: pcb2.cart_button_text_color_b,
                cart_button_text_colorHover_h: pcb2.cart_button_text_colorHover_h,
                cart_button_text_colorHover_s: pcb2.cart_button_text_colorHover_s,
                cart_button_text_colorHover_b: pcb2.cart_button_text_colorHover_b,
                cart_button_text_font_size: pcb2.cart_button_text_font_size,
                cart_button_text_transform: pcb2.cart_button_text_transform,
                cart_button_text_weight: pcb2.cart_button_text_weight,
                cart_button_background_color_h: pcb2.cart_button_background_color_h,
                cart_button_background_color_s: pcb2.cart_button_background_color_s,
                cart_button_background_color_b: pcb2.cart_button_background_color_b,
                cart_button_background_colorHover_h: pcb2.cart_button_background_colorHover_h,
                cart_button_background_colorHover_s: pcb2.cart_button_background_colorHover_s,
                cart_button_background_colorHover_b: pcb2.cart_button_background_colorHover_b,
                cart_button_border: pcb2.cart_button_border,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_cart_button;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ cart_button: props.cart_button.enabled_cart_button });
    };

    updateCartButton = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_cart_button: props.enabled_cart_button,
                cart_button_text: props.cart_button_text,
                cart_button_text_color_h: props.cart_button_text_color.hue,
                cart_button_text_color_s: props.cart_button_text_color.saturation,
                cart_button_text_color_b: props.cart_button_text_color.brightness,
                cart_button_text_color_hex: '#' + props.cart_button_text_color_hex,
                cart_button_text_colorHover_h: props.cart_button_text_colorHover.hue,
                cart_button_text_colorHover_s: props.cart_button_text_colorHover.saturation,
                cart_button_text_colorHover_b: props.cart_button_text_colorHover.brightness,
                cart_button_text_colorHover_hex: '#' + props.cart_button_text_colorHover_hex,
                cart_button_text_font_size: props.cart_button_text_font_size,
                cart_button_text_transform: props.cart_button_text_transform,
                cart_button_text_weight: props.cart_button_text_weight,
                cart_button_background_color_h: props.cart_button_background_color.hue,
                cart_button_background_color_s: props.cart_button_background_color.saturation,
                cart_button_background_color_b: props.cart_button_background_color.brightness,
                cart_button_background_color_hex: '#' + props.cart_button_background_color_hex,
                cart_button_background_colorHover_h: props.cart_button_background_colorHover.hue,
                cart_button_background_colorHover_s: props.cart_button_background_colorHover.saturation,
                cart_button_background_colorHover_b: props.cart_button_background_colorHover.brightness,
                cart_button_background_colorHover_hex: '#' + props.cart_button_background_colorHover_hex,
                cart_button_border: props.cart_button_border,
            };

            const updateCartButton = await makePutPostRequest('/api/cart_button', method, requestBody, app);
            var messageError = '';
            if (updateCartButton.error && updateCartButton.message) {
                messageError = updateCartButton.message;
            };
            await this.getCartButton();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            popoverEnabled,
            messageError,
            loading,
            toast,
            popoverCart,
            popoverCart2,
            popoverCart3,
            popoverCart4,
            dataCartButton,
            enabled_cart_button,
            cart_button_text,
            cart_button_text_color,
            cart_button_text_color_hex,
            cart_button_text_colorHover,
            cart_button_text_colorHover_hex,
            cart_button_text_font_size,
            cart_button_text_transform,
            cart_button_text_weight,
            cart_button_background_color,
            cart_button_background_color_hex,
            cart_button_background_colorHover,
            cart_button_background_colorHover_hex,
            cart_button_border,
            options_font_size,
            options_transform,
            options_weight,
            options_border_radius
        } = this.state;
        const equals = this.validateData(this.state);

        const activator_cart_button_text_color =
            <ButtonColor click={() => { this.handlePopover("popoverCart") }} id='cart_button_color' background={hsbToHex(cart_button_text_color)} />;

        const activator_cart_button_text_colorHover =
            <ButtonColor click={() => { this.handlePopover("popoverCart2") }} id='cart_button_color2' background={hsbToHex(cart_button_text_colorHover)} />;

        const activator_cart_button_background_color =
            <ButtonColor click={() => { this.handlePopover("popoverCart3") }} id='cart_button_color3' background={hsbToHex(cart_button_background_color)} />;

        const activator_cart_button_background_colorHover =
            <ButtonColor click={() => { this.handlePopover("popoverCart4") }} id='cart_button_color4' background={hsbToHex(cart_button_background_colorHover)} />;

        const content_cart_button = (
            <BlockStack gap={500}>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">
                            Text Properties
                        </Text>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                            <TextField
                                label={<Titles text='Button name ( Cart )' />}
                                value={cart_button_text}
                                onChange={(value) => { this.handleChange(value, "cart_button_text") }}
                                maxLength={250}
                            />
                            <Select
                                label={<Titles text='Cart Button Text Font Size:' />}
                                options={options_font_size}
                                value={cart_button_text_font_size}
                                onChange={(value) => { this.handleChange(value, "cart_button_text_font_size") }}
                            />
                            <Select
                                label={<Titles text='Cart Button Text transform' />}
                                options={options_transform}
                                value={cart_button_text_transform}
                                onChange={(value) => { this.handleChange(value, "cart_button_text_transform") }}
                            />
                            <Select
                                label={<Titles text='Cart Button Text Font weight:' />}
                                options={options_weight}
                                value={cart_button_text_weight}
                                onChange={(value) => { this.handleChange(value, "cart_button_text_weight") }}
                            />
                            <FieldColor
                                labelColor={<Titles text='Cart Button - Text Color' />}
                                textValue={cart_button_text_color_hex || 'ffffff'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "cart_button_text_color_hex", "cart_button_text_color") }}
                                activePop={popoverCart}
                                activadorPop={activator_cart_button_text_color}
                                closePop={() => { this.handlePopover("popoverCart", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "cart_button_text_color", "cart_button_text_color_hex") }}
                                colorPicker={cart_button_text_color}
                            />
                            <FieldColor
                                labelColor={<Titles text='Cart Button - Text Color Hover' />}
                                textValue={cart_button_text_colorHover_hex || 'ffffff'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "cart_button_text_colorHover_hex", "cart_button_text_colorHover") }}
                                activePop={popoverCart2}
                                activadorPop={activator_cart_button_text_colorHover}
                                closePop={() => { this.handlePopover("popoverCart2", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "cart_button_text_colorHover", "cart_button_text_colorHover_hex") }}
                                colorPicker={cart_button_text_colorHover}
                            />
                        </InlineGrid>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">
                            Button Properties
                        </Text>
                        <BlockStack gap={400}>
                            <Select
                                label={<Titles text='Cart Button Border Radius:' />}
                                options={options_border_radius}
                                value={cart_button_border}
                                onChange={(value) => { this.handleChange(value, "cart_button_border") }}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                                <FieldColor
                                    labelColor={<Titles text='Cart Button Background Color' />}
                                    textValue={cart_button_background_color_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "cart_button_background_color_hex", "cart_button_background_color") }}
                                    activePop={popoverCart3}
                                    activadorPop={activator_cart_button_background_color}
                                    closePop={() => { this.handlePopover("popoverCart3", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "cart_button_background_color", "cart_button_background_color_hex") }}
                                    colorPicker={cart_button_background_color}
                                />
                                <FieldColor
                                    labelColor={<Titles text='Cart Button Background Color Hover' />}
                                    textValue={cart_button_background_colorHover_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "cart_button_background_colorHover_hex", "cart_button_background_colorHover") }}
                                    activePop={popoverCart4}
                                    activadorPop={activator_cart_button_background_colorHover}
                                    closePop={() => { this.handlePopover("popoverCart4", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "cart_button_background_colorHover", "cart_button_background_colorHover_hex") }}
                                    colorPicker={cart_button_background_colorHover}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </BlockStack>
                </Card>
            </BlockStack>);

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Cart Button updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataCartButton !== null ?
                    <BlockStack gap={500}>
                        {/* <Toogle enabled={enabled_cart_button} title='Cart Button' description="The cart button is available on the sliding cart so that buyers can go to the cart page." stateText='The Cart Button is' activeToogle={() => this.changeStateBoolean('enabled_cart_button')}></Toogle> */}
                        <StatusModule module='cart_button' enabled={enabled_cart_button} popoverEnabled={popoverEnabled} onActionEnabledItem={() => { this.setState({ enabled_cart_button: 1, popoverEnabled: !popoverEnabled }) }} onActionDisabledItem={() => { this.setState({ enabled_cart_button: 0, popoverEnabled: !popoverEnabled }) }} actionPopOver={() => this.setState({ popoverEnabled: !popoverEnabled })} />
                        {!enabled_cart_button ?
                            <StatusModuleBanner module='cart_button' onAction={() => { this.setState({ enabled_cart_button: 1 }) }} />
                            : null}
                        {content_cart_button}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateCartButton(this.state)} discard={() => { this.discard(dataCartButton) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ cart_button: !stateNow });
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
export default Cart_Button;