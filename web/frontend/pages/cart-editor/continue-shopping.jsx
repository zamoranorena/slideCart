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
import { data } from "@shopify/app-bridge/actions/Modal";

class ContinueShopping extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverEnabled: 0,
            popoverContinue: false,
            popoverContinue2: false,
            messageError: '',
            loading: true,
            toast: false,
            dataContinueShopping: null,
            enabled_continue_shopping: null,
            continue_shopping_text: null,
            continue_shopping_text_font_size: null,
            continue_shopping_text_transform: null,
            continue_shopping_text_weight: null,
            continue_shopping_text_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            continue_shopping_text_color_hex: null,
            continue_shopping_text_colorHover: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            continue_shopping_text_colorHover_hex: null,
            continue_shopping_button_url: null,
            options_font_size: [],
            options_transform: [],
            options_weight: [],
            options_border_radius: [],
        };
    };

    componentDidMount() {
        this.getContinueShopping();
    };

    getContinueShopping = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_continue_shopping', app);
        if (data && data.continue_shopping !== undefined && data.continue_shopping !== null) {
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
                dataContinueShopping: data
            };
        };
        const continueShopping = data.continue_shopping;

        var stateData = {
            popoverContinue: false,
            popoverContinue2: false,
            messageError: '',
            loading: false,
            toast: false,
            enabled_continue_shopping: continueShopping.enabled_continue_shopping,
            continue_shopping_text: continueShopping.continue_shopping_text,
            continue_shopping_text_font_size: continueShopping.continue_shopping_text_font_size,
            continue_shopping_text_transform: continueShopping.continue_shopping_text_transform,
            continue_shopping_text_weight: continueShopping.continue_shopping_text_weight,
            continue_shopping_text_color: {
                hue: continueShopping.continue_shopping_text_color_h,
                saturation: continueShopping.continue_shopping_text_color_s,
                brightness: continueShopping.continue_shopping_text_color_b
            },
            continue_shopping_text_color_hex: continueShopping.continue_shopping_text_color_hex.replace(/\#/, ""),
            continue_shopping_text_colorHover: {
                hue: continueShopping.continue_shopping_text_colorHover_h,
                saturation: continueShopping.continue_shopping_text_colorHover_s,
                brightness: continueShopping.continue_shopping_text_colorHover_b
            },
            continue_shopping_text_colorHover_hex: continueShopping.continue_shopping_text_colorHover_hex.replace(/\#/, ""),
            continue_shopping_button_url: continueShopping.continue_shopping_button_url,
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
            enabled_continue_shopping: +props.enabled_continue_shopping,
            continue_shopping_text: props.continue_shopping_text,
            continue_shopping_text_font_size: props.continue_shopping_text_font_size,
            continue_shopping_text_transform: props.continue_shopping_text_transform,
            continue_shopping_text_weight: props.continue_shopping_text_weight,
            continue_shopping_text_color_h: props.continue_shopping_text_color.hue,
            continue_shopping_text_color_s: props.continue_shopping_text_color.saturation,
            continue_shopping_text_color_b: props.continue_shopping_text_color.brightness,
            continue_shopping_text_colorHover_h: props.continue_shopping_text_colorHover.hue,
            continue_shopping_text_colorHover_s: props.continue_shopping_text_colorHover.saturation,
            continue_shopping_text_colorHover_b: props.continue_shopping_text_colorHover.brightness,
            continue_shopping_button_url: props.continue_shopping_button_url,
        };
        const dataContinueShopping = props.dataContinueShopping;
        if (dataContinueShopping !== null) {
            const pcs = dataContinueShopping.continue_shopping;
            const data_continue_shopping = {
                enabled_continue_shopping: +pcs.enabled_continue_shopping,
                continue_shopping_text: pcs.continue_shopping_text,
                continue_shopping_text_font_size: pcs.continue_shopping_text_font_size,
                continue_shopping_text_transform: pcs.continue_shopping_text_transform,
                continue_shopping_text_weight: pcs.continue_shopping_text_weight,
                continue_shopping_text_color_h: pcs.continue_shopping_text_color_h,
                continue_shopping_text_color_s: pcs.continue_shopping_text_color_s,
                continue_shopping_text_color_b: pcs.continue_shopping_text_color_b,
                continue_shopping_text_colorHover_h: pcs.continue_shopping_text_colorHover_h,
                continue_shopping_text_colorHover_s: pcs.continue_shopping_text_colorHover_s,
                continue_shopping_text_colorHover_b: pcs.continue_shopping_text_colorHover_b,
                continue_shopping_button_url: pcs.continue_shopping_button_url,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_continue_shopping;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ continue_shopping: props.continue_shopping.enabled_continue_shopping });
    };

    updateContinueShopping = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_continue_shopping: props.enabled_continue_shopping,
                continue_shopping_text: props.continue_shopping_text,
                continue_shopping_text_font_size: props.continue_shopping_text_font_size,
                continue_shopping_text_transform: props.continue_shopping_text_transform,
                continue_shopping_text_weight: props.continue_shopping_text_weight,
                continue_shopping_text_color_h: props.continue_shopping_text_color.hue,
                continue_shopping_text_color_s: props.continue_shopping_text_color.saturation,
                continue_shopping_text_color_b: props.continue_shopping_text_color.brightness,
                continue_shopping_text_color_hex: '#' + props.continue_shopping_text_color_hex,
                continue_shopping_text_colorHover_h: props.continue_shopping_text_colorHover.hue,
                continue_shopping_text_colorHover_s: props.continue_shopping_text_colorHover.saturation,
                continue_shopping_text_colorHover_b: props.continue_shopping_text_colorHover.brightness,
                continue_shopping_text_colorHover_hex: '#' + props.continue_shopping_text_colorHover_hex,
                continue_shopping_button_url: props.continue_shopping_button_url,

            };

            const updateContinueShopping = await makePutPostRequest('/api/continue_shopping', method, requestBody, app);
            var messageError = '';
            if (updateContinueShopping.error && updateContinueShopping.message) {
                messageError = updateContinueShopping.message;
            };
            await this.getContinueShopping();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {

        const {
            popoverEnabled,
            popoverContinue,
            popoverContinue2,
            messageError,
            loading,
            toast,
            dataContinueShopping,
            enabled_continue_shopping,
            continue_shopping_text,
            continue_shopping_text_font_size,
            continue_shopping_text_transform,
            continue_shopping_text_weight,
            continue_shopping_text_color,
            continue_shopping_text_color_hex,
            continue_shopping_text_colorHover,
            continue_shopping_text_colorHover_hex,
            continue_shopping_button_url,
            options_font_size,
            options_transform,
            options_weight,
        } = this.state;

        const equals = this.validateData(this.state);

        const activator_continue_shopping_text_color =
            <ButtonColor click={() => { this.handlePopover("popoverContinue") }} id='continue_shopping_button' background={hsbToHex(continue_shopping_text_color)} />;

        const activator_continue_shopping_text_colorHover =
            <ButtonColor click={() => { this.handlePopover("popoverContinue2") }} id='continue_shopping_button' background={hsbToHex(continue_shopping_text_colorHover)} />;


        const content_continue_shopping = (
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">
                        Properties
                    </Text>
                    <BlockStack gap={400}>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <TextField
                                label={<Titles text='Button name ( Continue Shopping )' />}
                                value={continue_shopping_text}
                                onChange={(value) => { this.handleChange(value, "continue_shopping_text") }}
                                maxLength={250}
                            />
                            <Select
                                label={<Titles text='Continue Shopping Font Size:' />}
                                options={options_font_size}
                                value={continue_shopping_text_font_size}
                                onChange={(value) => { this.handleChange(value, "continue_shopping_text_font_size") }}
                            />
                            <Select
                                label={<Titles text='Continue Shopping Text transform:' />}
                                options={options_transform}
                                value={continue_shopping_text_transform}
                                onChange={(value) => { this.handleChange(value, "continue_shopping_text_transform") }}
                            />
                            <Select
                                label={<Titles text='Continue Shopping Font weight:' />}
                                options={options_weight}
                                value={continue_shopping_text_weight}
                                onChange={(value) => { this.handleChange(value, "continue_shopping_text_weight") }}
                            />
                            <FieldColor
                                labelColor={<Titles text='Continue Shopping - Text Color' />}
                                textValue={continue_shopping_text_color_hex || '737373'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "continue_shopping_text_color_hex", "continue_shopping_text_color") }}
                                activePop={popoverContinue}
                                activadorPop={activator_continue_shopping_text_color}
                                closePop={() => { this.handlePopover("popoverContinue", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "continue_shopping_text_color", "continue_shopping_text_color_hex") }}
                                colorPicker={continue_shopping_text_color}
                            />
                            <FieldColor
                                labelColor={<Titles text='Continue Shopping - Text Color Hover' />}
                                textValue={continue_shopping_text_colorHover_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "continue_shopping_text_colorHover_hex", "continue_shopping_text_colorHover") }}
                                activePop={popoverContinue2}
                                activadorPop={activator_continue_shopping_text_colorHover}
                                closePop={() => { this.handlePopover("popoverContinue2", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "continue_shopping_text_colorHover", "continue_shopping_text_colorHover_hex") }}
                                colorPicker={continue_shopping_text_colorHover}
                            />
                        </InlineGrid>
                        <TextField
                            label={<Titles text='Link Continue Shopping' />}
                            helpText='( example: https://sticky-cart-cart-drawer.myshopify.com/collections/all )'
                            value={continue_shopping_button_url}
                            onChange={(value) => { this.handleChange(value, "continue_shopping_button_url") }}
                            maxLength={250}
                        />
                    </BlockStack>
                </BlockStack>
            </Card>
        );

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Continue Shopping updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataContinueShopping !== null ?
                    <BlockStack gap={500}>
                        {/* <Toogle enabled={enabled_continue_shopping} title='Continue Shopping' description="Continue shopping is available in the sliding cart so that buyers can go to the link you provide, if you do not add any links, the button will only serve to close the slide cart." stateText='The Continue Shopping is' activeToogle={() => this.changeStateBoolean('enabled_continue_shopping')}></Toogle> */}
                        <StatusModule module='continue_shopping' enabled={enabled_continue_shopping} popoverEnabled={popoverEnabled} onActionEnabledItem={() => { this.setState({ enabled_continue_shopping: 1, popoverEnabled: !popoverEnabled }) }} onActionDisabledItem={() => { this.setState({ enabled_continue_shopping: 0, popoverEnabled: !popoverEnabled }) }} actionPopOver={() => this.setState({ popoverEnabled: !popoverEnabled })} />
                        {!enabled_continue_shopping ?
                            <StatusModuleBanner module='continue_shopping' onAction={() => { this.setState({ enabled_continue_shopping: 1 }) }} />
                            : null}
                        {content_continue_shopping}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateContinueShopping(this.state)} discard={() => { this.discard(dataContinueShopping) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ continue_shopping: !stateNow });
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
export default ContinueShopping;