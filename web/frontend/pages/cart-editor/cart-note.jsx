import { Component } from "react";
import {
    Card,
    Box,
    InlineGrid,
    Checkbox,
    Text,
    Select,
    TextField,
    Toast,
    BlockStack,
    hsbToHex,
    rgbToHsb,
    InlineStack
} from '@shopify/polaris';
import colorconvert from 'color-convert';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton, Section } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_radius,
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
} from '@utils/global'


class CartNote extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverCNFont: false,
            popoverCANFont: false,
            messageError: '',
            loading: true,
            toast: false,
            dataCartNote: null,
            section_settings_cart_note: 1,
            section_additional_cart_note: 1,
            enabled_cart_note: null,
            cart_note_show_icon: null,
            cart_note_show_ini: null,
            cart_note_heading: null,
            cart_note_heading_close: null,
            cart_note_placeholder: null,
            cart_note_heading_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            cart_note_heading_color_hex: null,
            cart_note_font_size: null,
            cart_note_text_transform: null,
            cart_note_font_weight: null,
            /*  */
            cart_note_additional: null,
            cart_note_additional_text: null,
            cart_note_additional_message: null,
            cart_note_additional_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            cart_note_additional_color_hex: null,
            cart_note_additional_font_size: null,
            options_font_size: [],
            options_transform: [],
            options_weight: [],
            options_border_radius: [],
        };
    };
    componentDidMount() {
        this.getCartNote();
    };

    getCartNote = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_cart_note', app);
        if (data && data.cart_note !== undefined && data.cart_note !== null) {
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
                dataCartNote: data
            };
        };
        const cart_note = data.cart_note;

        var stateData = {
            popoverCNFont: false,
            popoverCANFont: false,
            messageError: '',
            loading: false,
            toast: false,
            enabled_cart_note: cart_note.enabled_cart_note,
            isDirty_cart_note: cart_note.enabled_cart_note == 0 ? false : true,
            cart_note_show_icon: cart_note.cart_note_show_icon,
            cart_note_show_ini: cart_note.cart_note_show_ini,
            cart_note_heading: cart_note.cart_note_heading,
            cart_note_heading_close: cart_note.cart_note_heading_close,
            cart_note_placeholder: cart_note.cart_note_heading_placeholder,
            cart_note_heading_color: {
                hue: cart_note.cart_note_heading_color_h,
                saturation: cart_note.cart_note_heading_color_s,
                brightness: cart_note.cart_note_heading_color_b
            },
            cart_note_heading_color_hex: cart_note.cart_note_heading_color_hex.replace(/\#/, ""),
            cart_note_font_size: cart_note.cart_note_font_size,
            cart_note_text_transform: cart_note.cart_note_text_transform,
            cart_note_font_weight: cart_note.cart_note_font_weight,
            cart_note_additional: cart_note.cart_note_additional,
            cart_note_additional_text: cart_note.cart_note_additional_text,
            cart_note_additional_message: cart_note.cart_note_additional_message,
            cart_note_additional_color: {
                hue: cart_note.cart_note_additional_color_h,
                saturation: cart_note.cart_note_additional_color_s,
                brightness: cart_note.cart_note_additional_color_b
            },
            cart_note_additional_color_hex: cart_note.cart_note_additional_color_hex.replace(/\#/, ""),
            cart_note_additional_font_size: cart_note.cart_note_additional_font_size,
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
            enabled_cart_note: +props.enabled_cart_note,
            cart_note_show_icon: props.cart_note_show_icon,
            cart_note_show_ini: +props.cart_note_show_ini,
            cart_note_heading: props.cart_note_heading,
            cart_note_heading_close: props.cart_note_heading_close,
            cart_note_placeholder: props.cart_note_placeholder,
            cart_note_heading_color_h: props.cart_note_heading_color.hue,
            cart_note_heading_color_s: props.cart_note_heading_color.saturation,
            cart_note_heading_color_b: props.cart_note_heading_color.brightness,
            cart_note_font_size: props.cart_note_font_size,
            cart_note_text_transform: props.cart_note_text_transform,
            cart_note_font_weight: props.cart_note_font_weight,
            cart_note_additional: +props.cart_note_additional,
            cart_note_additional_text: props.cart_note_additional_text,
            cart_note_additional_message: props.cart_note_additional_message,
            cart_note_additional_color_h: props.cart_note_additional_color.hue,
            cart_note_additional_color_s: props.cart_note_additional_color.saturation,
            cart_note_additional_color_b: props.cart_note_additional_color.brightness,
            cart_note_additional_font_size: props.cart_note_additional_font_size,
        };
        const dataCartNote = props.dataCartNote;
        if (dataCartNote !== null) {
            const pcn = dataCartNote.cart_note
            const data_cart_note = {
                enabled_cart_note: +pcn.enabled_cart_note,
                cart_note_show_icon: pcn.cart_note_show_icon,
                cart_note_show_ini: +pcn.cart_note_show_ini,
                cart_note_heading: pcn.cart_note_heading,
                cart_note_heading_close: pcn.cart_note_heading_close,
                cart_note_placeholder: pcn.cart_note_heading_placeholder,
                cart_note_heading_color_h: pcn.cart_note_heading_color_h,
                cart_note_heading_color_s: pcn.cart_note_heading_color_s,
                cart_note_heading_color_b: pcn.cart_note_heading_color_b,
                cart_note_font_size: pcn.cart_note_font_size,
                cart_note_text_transform: pcn.cart_note_text_transform,
                cart_note_font_weight: pcn.cart_note_font_weight,
                cart_note_additional: +pcn.cart_note_additional,
                cart_note_additional_text: pcn.cart_note_additional_text,
                cart_note_additional_message: pcn.cart_note_additional_message,
                cart_note_additional_color_h: pcn.cart_note_additional_color_h,
                cart_note_additional_color_s: pcn.cart_note_additional_color_s,
                cart_note_additional_color_b: pcn.cart_note_additional_color_b,
                cart_note_additional_font_size: pcn.cart_note_additional_font_size,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_cart_note;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ cart_note: props.cart_note.enabled_cart_note });
    };

    updateCartNote = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_cart_note: props.enabled_cart_note,
                cart_note_show_icon: props.cart_note_show_icon,
                cart_note_show_ini: props.cart_note_show_ini,
                cart_note_heading: props.cart_note_heading,
                cart_note_heading_close: props.cart_note_heading_close,
                cart_note_placeholder: props.cart_note_placeholder,
                cart_note_heading_color_h: props.cart_note_heading_color.hue,
                cart_note_heading_color_s: props.cart_note_heading_color.saturation,
                cart_note_heading_color_b: props.cart_note_heading_color.brightness,
                cart_note_heading_color_hex: '#' + props.cart_note_heading_color_hex,
                cart_note_font_size: props.cart_note_font_size,
                cart_note_text_transform: props.cart_note_text_transform,
                cart_note_font_weight: props.cart_note_font_weight,
                cart_note_additional: props.cart_note_additional,
                cart_note_additional_text: props.cart_note_additional_text,
                cart_note_additional_message: props.cart_note_additional_message,
                cart_note_additional_color_h: props.cart_note_additional_color.hue,
                cart_note_additional_color_s: props.cart_note_additional_color.saturation,
                cart_note_additional_color_b: props.cart_note_additional_color.brightness,
                cart_note_additional_color_hex: '#' + props.cart_note_additional_color_hex,
                cart_note_additional_font_size: props.cart_note_additional_font_size,
            };

            const updateCartNote = await makePutPostRequest('/api/cart_note', method, requestBody, app);
            var messageError = '';
            if (updateCartNote.error && updateCartNote.message) {
                messageError = updateCartNote.message;
            };
            await this.getCartNote();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            popoverCNFont,
            popoverCANFont,
            messageError,
            loading,
            toast,
            dataCartNote,
            section_settings_cart_note,
            section_additional_cart_note,
            enabled_cart_note,
            cart_note_show_ini,
            cart_note_heading,
            cart_note_heading_close,
            cart_note_placeholder,
            cart_note_heading_color,
            cart_note_heading_color_hex,
            cart_note_font_size,
            cart_note_text_transform,
            cart_note_font_weight,
            cart_note_additional,
            cart_note_additional_text,
            cart_note_additional_message,
            cart_note_additional_color,
            cart_note_additional_color_hex,
            cart_note_additional_font_size,
            options_font_size,
            options_transform,
            options_weight,
        } = this.state;

        const equals = this.validateData(this.state);

        const activator_cart_note_font =
            <ButtonColor click={() => { this.handlePopover("popoverCNFont") }} id='button_cart_note_color' background={hsbToHex(cart_note_heading_color)} />;

        const activator_cart_additional_note_font =
            <ButtonColor click={() => { this.handlePopover("popoverCANFont") }} id='button_cart_additional_note_color' background={hsbToHex(cart_note_additional_color)} />;


        const content_cart_note = (
            <BlockStack gap={500}>
                <Section title={'Cart Note Properties'} this_section={() => { this.setState({ section_settings_cart_note: !section_settings_cart_note }) }} status_source={section_settings_cart_note}>
                    <Box paddingBlockStart='300' paddingBlockEnd='100' width="100%">
                        <BlockStack gap={400}>
                            <Checkbox
                                label={<Titles text="Select if you want the note to appear open when you start the cart." />}
                                checked={cart_note_show_ini}
                                onChange={() => this.changeStateBoolean("cart_note_show_ini")}
                                helpText='It only applies when starting the cart and if the note is empty, by default if the note has text it will be visible.'
                            />
                            <TextField
                                label={<Titles text='Cart Note Heading (Add an optional note)' />}
                                value={cart_note_heading}
                                onChange={(value) => { this.handleChange(value, "cart_note_heading") }}
                            />
                            <TextField
                                label={<Titles text='Cart Note Heading Close(Close optional note)' />}
                                value={cart_note_heading_close}
                                onChange={(value) => { this.handleChange(value, "cart_note_heading_close") }}
                            />
                            <TextField
                                label={<Titles text='Cart Note Placeholder' />}
                                value={cart_note_placeholder}
                                onChange={(value) => { this.handleChange(value, "cart_note_placeholder") }}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                                <FieldColor
                                    labelColor={<Titles text='Heading Font Color' />}
                                    textValue={cart_note_heading_color_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "cart_note_heading_color_hex", "cart_note_heading_color") }}
                                    activePop={popoverCNFont}
                                    activadorPop={activator_cart_note_font}
                                    closePop={() => { this.handlePopover("popoverCNFont", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "cart_note_heading_color", "cart_note_heading_color_hex") }}
                                    colorPicker={cart_note_heading_color}
                                />
                                <Select
                                    label={<Titles text='Font Size' />}
                                    options={options_font_size}
                                    value={cart_note_font_size}
                                    onChange={(value) => { this.handleChange(value, "cart_note_font_size") }}
                                />
                                <Select
                                    label={<Titles text='Text transform' />}
                                    options={options_transform}
                                    value={cart_note_text_transform}
                                    onChange={(value) => { this.handleChange(value, "cart_note_text_transform") }}
                                />
                                <Select
                                    label={<Titles text='Font weight' />}
                                    options={options_weight}
                                    value={cart_note_font_weight}
                                    onChange={(value) => { this.handleChange(value, "cart_note_font_weight") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </Box>
                </Section>
                <Section title={'Additional Cart Note Static'} this_section={() => { this.setState({ section_additional_cart_note: !section_additional_cart_note }) }} status_source={section_additional_cart_note}>
                    <Box paddingBlockStart='300' paddingBlockEnd='100' width="100%">
                        <BlockStack gap={400}>
                            <InlineStack align="center">
                                <Checkbox
                                    label={<Titles text='Enabled static cart note.' />}
                                    checked={cart_note_additional}
                                    onChange={() => this.changeStateBoolean("cart_note_additional")}
                                    helpText='The indicated text is added to the shopping cart note.'
                                />
                            </InlineStack>
                            <TextField
                                label={<Titles text='Check Text' />}
                                value={cart_note_additional_text}
                                onChange={(value) => { this.handleChange(value, "cart_note_additional_text") }}
                            />
                            <TextField
                                label={<Titles text='Message Note' />}
                                value={cart_note_additional_message}
                                onChange={(value) => { this.handleChange(value, "cart_note_additional_message") }}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Titles text='Font Size' />}
                                    options={options_font_size}
                                    value={cart_note_additional_font_size}
                                    onChange={(value) => { this.handleChange(value, "cart_note_additional_font_size") }}
                                />
                                <FieldColor
                                    labelColor={<Titles text='Check Text Font Color' />}
                                    textValue={cart_note_additional_color_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "cart_note_additional_color_hex", "cart_note_additional_color") }}
                                    activePop={popoverCANFont}
                                    activadorPop={activator_cart_additional_note_font}
                                    closePop={() => { this.handlePopover("popoverCANFont", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "cart_note_additional_color", "cart_note_additional_color_hex") }}
                                    colorPicker={cart_note_additional_color}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </Box>
                </Section>
            </BlockStack>
        );
        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Cart Note updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataCartNote !== null ?
                    <BlockStack gap={500}>
                        <Toogle enabled={enabled_cart_note} title='Cart Note' description="Add the option to have a note field to your slide cart. The use of this function is very flexible." stateText='The cart note is' activeToogle={() => this.changeStateBoolean('enabled_cart_note')}></Toogle>
                        {content_cart_note}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateCartNote(this.state)} discard={() => { this.discard(dataCartNote) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ cart_note: !stateNow });
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
export default CartNote;