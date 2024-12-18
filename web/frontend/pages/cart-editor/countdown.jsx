import { Component } from "react";
import {
    Card,
    Box,
    Text,
    Select,
    Checkbox,
    Button,
    InlineGrid,
    TextField,
    InlineStack,
    Toast,
    Icon,
    LegacyCard,
    InlineCode,
    BlockStack,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';
import colorconvert from 'color-convert';
import { hsbToHexOutPrefix } from '@utils/functionUtils';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_minutes,
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
    arr_options_alignment
} from '@utils/global'

class Countdown extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            dataCountdown: null,
            loading: true,
            toast: false,
            messageError: null,
            popoverCountdownBackground: null,
            popoverCountdownBorder: null,
            popoverCountdownFont: null,
            enabled_countdown: null,
            countdown_minutes_reservation: null,
            countdown_reset: null,
            countdown_text: null,
            countdown_text_expire: null,
            countdown_expire_clear_cart: null,
            countdown_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            countdown_background_color_hex: null,
            countdown_border_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            countdown_border_color_hex: null,
            countdown_font_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            countdown_font_color_hex: null,
            countdown_font_size: null,
            countdown_text_transform: null,
            countdown_font_weight: null,
            countdown_text_alignment: null,
            options_minutes: arr_options_minutes,
            options_font_size: arr_options_font_size,
            options_weight: arr_options_weight,
            options_transform: arr_options_transform,
            options_alignment: arr_options_alignment
        };
    };

    originalData = (identify, data) => {
        var myData = {};
        if (!identify) {
            myData = {
                dataCountdown: data
            };
        };
        const countdown = data.countdown;

        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            popoverCountdownBackground: null,
            popoverCountdownBorder: null,
            popoverCountdownFont: null,
            enabled_countdown: countdown.enabled_countdown,
            countdown_minutes_reservation: countdown.countdown_minutes_reservation,
            countdown_reset: countdown.countdown_reset,
            countdown_text: countdown.countdown_text,
            countdown_text_expire: countdown.countdown_text_expire,
            countdown_expire_clear_cart: countdown.countdown_expire_clear_cart,
            countdown_background_color: {
                hue: countdown.countdown_background_color_h,
                saturation: countdown.countdown_background_color_s,
                brightness: countdown.countdown_background_color_b
            },
            countdown_background_color_hex: hsbToHexOutPrefix({
                hue: countdown.countdown_background_color_h,
                saturation: countdown.countdown_background_color_s,
                brightness: countdown.countdown_background_color_b
            }),
            countdown_border_color: {
                hue: countdown.countdown_border_color_h,
                saturation: countdown.countdown_border_color_s,
                brightness: countdown.countdown_border_color_b
            },
            countdown_border_color_hex:hsbToHexOutPrefix({
                hue: countdown.countdown_border_color_h,
                saturation: countdown.countdown_border_color_s,
                brightness: countdown.countdown_border_color_b
            }),
            countdown_font_color:{
                hue: countdown.countdown_font_color_h,
                saturation: countdown.countdown_font_color_s,
                brightness: countdown.countdown_font_color_b
            },
            countdown_font_color_hex: hsbToHexOutPrefix({
                hue: countdown.countdown_font_color_h,
                saturation: countdown.countdown_font_color_s,
                brightness: countdown.countdown_font_color_b
            }),
            countdown_font_size: countdown.countdown_font_size,
            countdown_text_transform: countdown.countdown_text_transform,
            countdown_font_weight: countdown.countdown_font_weight,
            countdown_text_alignment: countdown.countdown_text_alignment,
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

    getCountdown = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_countdown', app);
        if (data && data.countdown !== undefined && data.countdown !== null) {
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

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ countdown: props.countdown.enabled_countdown });
    };

    updateCountdown = async (props) =>{
        if(props){
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_countdown: props.enabled_countdown,
                countdown_minutes_reservation: props.countdown_minutes_reservation,
                countdown_reset: props.countdown_reset,
                countdown_text: props.countdown_text,
                countdown_text_expire: props.countdown_text_expire,
                countdown_expire_clear_cart: props.countdown_expire_clear_cart,
                countdown_background_color_h: props.countdown_background_color.hue,
                countdown_background_color_s: props.countdown_background_color.saturation,
                countdown_background_color_b: props.countdown_background_color.brightness,
                countdown_background_color_hex: '#' + props.countdown_background_color_hex,
                countdown_border_color_h: props.countdown_border_color.hue,
                countdown_border_color_s: props.countdown_border_color.saturation,
                countdown_border_color_b: props.countdown_border_color.brightness,
                countdown_border_color_hex: '#' + props.countdown_border_color_hex,
                countdown_font_color_h: props.countdown_font_color.hue,
                countdown_font_color_s: props.countdown_font_color.saturation,
                countdown_font_color_b: props.countdown_font_color.brightness,
                countdown_font_color_hex: '#' + props.countdown_font_color_hex,
                countdown_font_size: props.countdown_font_size,
                countdown_text_transform: props.countdown_text_transform,
                countdown_font_weight: props.countdown_font_weight,
                countdown_text_alignment: props.countdown_text_alignment,
            };

            const updateCountdown = await makePutPostRequest('/api/countdown', method, requestBody, app);
            var messageError = '';
            if (updateCountdown.error && updateCountdown.message) {
                messageError = updateCountdown.message;
            };
            await this.getCountdown();
            this.setState({ toast: true, messageError: messageError })
        };
    };

    validateData = (props) => {
        var thisEquals = true;
        if(props){
            const stateData = {
                enabled_countdown: +props.enabled_countdown,
                countdown_reset: +props.countdown_reset,
                countdown_minutes_reservation: props.countdown_minutes_reservation,
                countdown_text: props.countdown_text,
                countdown_text_expire: props.countdown_text_expire,
                countdown_expire_clear_cart: +props.countdown_expire_clear_cart,
                countdown_background_color_h: props.countdown_background_color.hue,
                countdown_background_color_s: props.countdown_background_color.saturation,
                countdown_background_color_b: props.countdown_background_color.brightness,
                countdown_border_color_h: props.countdown_border_color.hue,
                countdown_border_color_s: props.countdown_border_color.saturation,
                countdown_border_color_b: props.countdown_border_color.brightness,
                countdown_font_color_h: props.countdown_font_color.hue,
                countdown_font_color_s: props.countdown_font_color.saturation,
                countdown_font_color_b: props.countdown_font_color.brightness,
                countdown_font_size: props.countdown_font_size,
                countdown_text_transform: props.countdown_text_transform,
                countdown_font_weight: props.countdown_font_weight,
                countdown_text_alignment: props.countdown_text_alignment,
            };

            const dataCountdown = props.dataCountdown;
            if (dataCountdown !== null) {
                const c = dataCountdown.countdown;
                const data_countdown = {
                    enabled_countdown: +c.enabled_countdown,
                    countdown_reset: +c.countdown_reset,
                    countdown_minutes_reservation: c.countdown_minutes_reservation,
                    countdown_text: c.countdown_text,
                    countdown_text_expire: c.countdown_text_expire,
                    countdown_expire_clear_cart: +c.countdown_expire_clear_cart,
                    countdown_background_color_h: c.countdown_background_color_h,
                    countdown_background_color_s: c.countdown_background_color_s,
                    countdown_background_color_b: c.countdown_background_color_b,
                    countdown_border_color_h: c.countdown_border_color_h,
                    countdown_border_color_s: c.countdown_border_color_s,
                    countdown_border_color_b: c.countdown_border_color_b,
                    countdown_font_color_h: c.countdown_font_color_h,
                    countdown_font_color_s: c.countdown_font_color_s,
                    countdown_font_color_b: c.countdown_font_color_b,
                    countdown_font_size: c.countdown_font_size,
                    countdown_text_transform: c.countdown_text_transform,
                    countdown_font_weight: c.countdown_font_weight,
                    countdown_text_alignment: c.countdown_text_alignment,
                }
                const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
                const a = data_countdown;
                const b = stateData;
                if (!equals(a, b)) {
                    thisEquals = false;
                };
            };
        };
        return thisEquals;
    };
    componentDidMount() {
        this.getCountdown();
    };

    render() {
        const { dataCountdown,
            loading,
            toast,
            messageError,
            popoverCountdownBackground,
            popoverCountdownBorder,
            popoverCountdownFont,
            enabled_countdown,
            countdown_minutes_reservation,
            countdown_reset,
            countdown_text,
            countdown_text_expire,
            countdown_expire_clear_cart,
            countdown_background_color,
            countdown_background_color_hex,
            countdown_border_color,
            countdown_border_color_hex,
            countdown_font_color,
            countdown_font_color_hex,
            countdown_font_size,
            countdown_text_transform,
            countdown_font_weight,
            countdown_text_alignment,
            options_minutes,
            options_font_size,
            options_weight,
            options_transform,
            options_alignment } = this.state;

        var equals = this.validateData(this.state);

        const text_countdown = <div>Do not delete this text: <InlineCode> {"{{time_remaining"}{"}}"}</InlineCode> which is where the minutes I select will go.</div>;

        const activator_countdown_background =
            <ButtonColor click={() => { this.handlePopover("popoverCountdownBackground") }} id='countdown_button_color' background={hsbToHex(countdown_background_color)} />;

        const activator_countdown_border =
            <ButtonColor click={() => { this.handlePopover("popoverCountdownBorder") }} id='countdown_button_color2' background={hsbToHex(countdown_border_color)} />;

        const activator_countdown_font =
            <ButtonColor click={() => { this.handlePopover("popoverCountdownFont") }} id='countdown_button_color3' background={hsbToHex(this.state.countdown_font_color)} />;

        const countdown =
            <BlockStack gap={500}>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Settings</Text>
                        <BlockStack gap={400}>
                            <InlineStack align="left" gap={200}>
                                <Checkbox
                                    label={<Titles text="Reset countdown?" />}
                                    checked={countdown_reset}
                                    onChange={() => this.changeStateBoolean("countdown_reset")}
                                />
                            </InlineStack>
                            <TextField
                                label={<Titles text="After the countdown expires, what text would you like to show?" />}
                                value={countdown_text_expire}
                                onChange={(value) => { this.handleChange(value, "countdown_text_expire") }}
                                autoComplete="false"
                                disabled={countdown_reset}
                            />
                            <Checkbox
                                label={<Titles text="When the countdown expires, would you like to clear the cart?" />}
                                checked={countdown_expire_clear_cart}
                                onChange={() => this.changeStateBoolean("countdown_expire_clear_cart")}
                                disabled={countdown_reset}
                            />
                            <Select
                                label={<Titles text="How many minutes is your cart reservation timer for?" />}
                                options={options_minutes}
                                value={countdown_minutes_reservation}
                                onChange={(value) => { this.handleChange(value, "countdown_minutes_reservation") }}
                            />
                            <TextField
                                label={<Titles text="What would you like your countdown text to show?" />}
                                value={countdown_text}
                                helpText={text_countdown}
                                onChange={(value) => { this.handleChange(value, "countdown_text") }}
                                autoComplete="false"
                            />
                        </BlockStack>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Properties</Text>
                        <BlockStack gap={400}>
                            <FieldColor
                                labelColor={<Titles text='Countdown Background Color' />}
                                textValue={countdown_background_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "countdown_background_color_hex", "countdown_background_color") }}
                                activePop={popoverCountdownBackground}
                                activadorPop={activator_countdown_background}
                                closePop={() => { this.handlePopover("popoverCountdownBackground", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "countdown_background_color", "countdown_background_color_hex") }}
                                colorPicker={countdown_background_color}
                            />
                            <FieldColor
                                labelColor={<Titles text='Countdown Border Color' />}
                                textValue={countdown_border_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "countdown_border_color_hex", "countdown_border_color") }}
                                activePop={popoverCountdownBorder}
                                activadorPop={activator_countdown_border}
                                closePop={() => { this.handlePopover("popoverCountdownBorder", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "countdown_border_color", "countdown_border_color_hex") }}
                                colorPicker={countdown_border_color}
                            />
                            <FieldColor
                                labelColor={<Titles text="Countdown Font Color" />}
                                textValue={countdown_font_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "countdown_font_color_hex", "countdown_font_color") }}
                                activePop={popoverCountdownFont}
                                activadorPop={activator_countdown_font}
                                closePop={() => { this.handlePopover("popoverCountdownFont", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "countdown_font_color", "countdown_font_color_hex") }}
                                colorPicker={countdown_font_color}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Titles text='Font Size' />}
                                    options={options_font_size}
                                    value={countdown_font_size}
                                    onChange={(value) => { this.handleChange(value, "countdown_font_size") }}
                                />
                                <Select
                                    label={<Titles text='Font weight' />}
                                    options={options_weight}
                                    value={countdown_font_weight}
                                    onChange={(value) => { this.handleChange(value, "countdown_font_weight") }}
                                />
                                <Select
                                    label={<Titles text='Text transform' />}
                                    options={options_transform}
                                    value={countdown_text_transform}
                                    onChange={(value) => { this.handleChange(value, "countdown_text_transform") }}
                                />
                                <Select
                                    label={<Titles text='Text Alignment' />}
                                    options={options_alignment}
                                    value={countdown_text_alignment}
                                    onChange={(value) => { this.handleChange(value, "countdown_text_alignment") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </BlockStack>
                </Card>
            </BlockStack>;

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Countdown updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataCountdown !== null ?
                    <Box paddingBlockEnd="400">
                        <BlockStack gap={500}>
                            <Toogle enabled={enabled_countdown} title='Countdown' description="Reduce cart abandonments by adding urgency to your store and watch your sales increase." stateText='The Countdown is' activeToogle={() => this.changeStateBoolean('enabled_countdown')}></Toogle>
                            {countdown}
                            <ThisToast />
                        </BlockStack>
                    </Box> : <ToogleSkeleton />}
                    <SaveBar equals={equals} loading={loading} action={() =>  this.updateCountdown(this.state)} discard={() => { this.discard(dataCountdown) }} />
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {

        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        if(thisSate === 'enabled_countdown'){
            this.props.updateGridItems({ countdown: !stateNow });
        };
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
    handleChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
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
export default Countdown;