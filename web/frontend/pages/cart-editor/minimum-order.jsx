import { Component } from "react";
import {
    Card,
    Text,
    Select,
    InlineGrid,
    InlineStack,
    ButtonGroup,
    Button,
    RadioButton,
    InlineCode,
    Toast,
    TextField,
    BlockStack,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';

import colorconvert from 'color-convert';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';
import { currencyShop } from '@utils/functionUtils';
import { arr_options_font_size} from '@utils/global'

class Minimum_Order extends Component {

    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            messageError: '',
            loading: true,
            toast: false,
            popoverActive: false,
            money_format: null,
            dataMinimum: null,
            enabled_minimum_order: null,
            minimum_order: '',
            minimum_order_option: null,
            minimum_order_text: '',
            minimum_font_size: null,
            color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            minimum_order_color: null,

        }
    };

    componentDidMount() {
        this.getMinimum();
    };

    getMinimum = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_minimum', app);
        if (data && data.minimum !== undefined && data.minimum !== null) {
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
                dataMinimum: data
            };
        };
        const minimum_order = data.minimum;
        const shop = data.money_format;
        var stateData = {
            messageError: '',
            popoverActive: false,
            loading: false,
            toast: false,
            enabled_minimum_order: minimum_order.enabled_minimum_order,
            minimum_order: minimum_order.minimum_order.toString(),
            minimum_order_option: minimum_order.minimum_order_option,
            minimum_order_text: minimum_order.minimum_order_text,
            minimum_font_size: minimum_order.minimum_font_size,
            color: {
                hue: minimum_order.minimum_color_h,
                brightness: minimum_order.minimum_color_b,
                saturation: minimum_order.minimum_color_s
            },
            minimum_order_color: minimum_order.minimum_color_hex.replace(/\#/, ""),
            options_font_size: arr_options_font_size,
            money_format: shop.money_format || '$',
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
        if (props) {
            if (props.dataMinimum) {
                const stateData = {
                    enabled_minimum_order: +props.enabled_minimum_order,
                    minimum_order: props.minimum_order.toString(),
                    minimum_order_option: props.minimum_order_option,
                    minimum_order_text: props.minimum_order_text,
                    minimum_font_size: props.minimum_font_size,
                    minimum_color_h: props.color.hue,
                    minimum_color_s: props.color.saturation,
                    minimum_color_b: props.color.brightness,
                };

                const dataMinimum = props.dataMinimum;
                if (dataMinimum !== null) {
                    const c = dataMinimum.minimum;
                    const data_minimum = {
                        enabled_minimum_order: c.enabled_minimum_order,
                        minimum_order: c.minimum_order.toString(),
                        minimum_order_option: c.minimum_order_option,
                        minimum_order_text: c.minimum_order_text,
                        minimum_font_size: c.minimum_font_size,
                        minimum_color_h: c.minimum_color_h,
                        minimum_color_s: c.minimum_color_s,
                        minimum_color_b: c.minimum_color_b,
                    };

                    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
                    const a = data_minimum;
                    const b = stateData;
                    if (!equals(a, b)) {
                        thisEquals = false;
                    };
                };
            };
        };
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ minimum_order: props.minimum.enabled_minimum_order });
    };

    updateMinimum = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;

            var minium_order_string = props.minimum_order.replace('+','').replace('-','').replace('','0');

            const requestBody = {
                enabled_minimum_order: props.enabled_minimum_order,
                minimum_order: minium_order_string,
                minimum_order_option: props.minimum_order_option,
                minimum_order_text: props.minimum_order_text,
                minimum_font_size: props.minimum_font_size,
                minimum_color_h: props.color.hue,
                minimum_color_s: props.color.saturation,
                minimum_color_b: props.color.brightness,
                minimum_color_hex: '#' + props.minimum_order_color,  
            };
            const updateMinimum = await makePutPostRequest('/api/minimum', method, requestBody, app);
            var messageError = '';
            if (updateMinimum.error && updateMinimum.message) {
                messageError = updateMinimum.message;
            };
            await this.getMinimum();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            messageError,
            loading,
            toast,
            popoverActive,
            money_format,
            dataMinimum,
            enabled_minimum_order,
            minimum_order,
            minimum_order_option,
            minimum_order_text,
            minimum_font_size,
            color,
            minimum_order_color,
            options_font_size,
        } = this.state;

        const equals = this.validateData(this.state);

        var currency = !parseInt(minimum_order_option) ? currencyShop(money_format) + ' ' : '';
        const text_minium_order = <div>
            The text that is in the middle of double <InlineCode> {"{{"}{"}}"}
            </InlineCode> (curly suspenders),is the minimum order (do not change). <p>Example: {minimum_order_text.replace("{{ money }}", currency + (!parseInt(minimum_order_option) ? minimum_order : parseInt(minimum_order)))}</p>
        </div>;


        const activator =
            <ButtonColor click={() => { this.handlePopover("popoverActive") }} id='button_color3' background={hsbToHex(color)} />;

        const content_minimum_order = (
            <BlockStack gap={500}>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Settings</Text>
                        <BlockStack gap={400}>
                            <ButtonGroup variant="segmented">
                                <Button pressed={parseInt(minimum_order_option) == 0} onClick={() => this.handleChange(0, "minimum_order_option")}>
                                    Money
                                </Button>
                                <Button pressed={parseInt(minimum_order_option) == 1} onClick={() => this.handleChange(1, "minimum_order_option")}>
                                    Quantity
                                </Button>
                            </ButtonGroup>
                            {/* <InlineStack align="center" gap={200}>
                                <RadioButton
                                    label="Money"
                                    checked={parseInt(minimum_order_option) == 0}
                                    name="accounts"
                                    onChange={() => { this.handleChange(0, "minimum_order_option") }}
                                />
                                <RadioButton
                                    label="Quantity"
                                    checked={parseInt(minimum_order_option) == 1}
                                    name="accounts"
                                    onChange={() => { this.handleChange(1, "minimum_order_option") }}
                                />
                            </InlineStack> */}
                            <TextField
                                label={<Titles text='Enter minimum order' />}
                                type="number"
                                inputMode="numeric"
                                min='1'
                                pattern="^[0-9]+"
                                value={!parseInt(minimum_order_option) ? minimum_order.toString() : parseInt(minimum_order).toString()}
                                onChange={(value) => { this.handleChange(value, "minimum_order") }}
                                prefix={!parseInt(minimum_order_option) ? currencyShop(money_format) : ''}
                            />
                            <TextField
                                label={<Titles text='Minimum Order' />}
                                value={!parseInt(minimum_order_option) ? minimum_order_text.replace('{{ amount }}', '{{ money }}') : minimum_order_text.replace('{{ money }}', '{{ amount }}')}
                                onChange={(value) => { this.handleChange(value, "minimum_order_text") }}
                                helpText={text_minium_order}
                            />
                        </BlockStack>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Properties</Text>
                        <BlockStack gap={500}>
                        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                            <FieldColor
                                labelColor={<Titles text='Text Color' />}
                                textValue={minimum_order_color || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "minimum_order_color", "color") }}
                                activePop={popoverActive}
                                activadorPop={activator}
                                closePop={() => { this.handlePopover("popoverActive", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "color", "minimum_order_color") }}
                                colorPicker={color}
                            />
                            <Select
                                label={<Titles text='Font Size' />}
                                options={options_font_size}
                                value={minimum_font_size}
                                onChange={(value) => { this.handleChange(value, "minimum_font_size") }}
                            />
                            </InlineGrid>
                        </BlockStack>
                    </BlockStack>
                </Card>
            </BlockStack>
        );

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Minimum Order updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataMinimum != null ?
                    <BlockStack gap={500}>
                        <Toogle enabled={enabled_minimum_order} title='Minimum Order' description="Show a minimum order message according to the amount entered, until reaching the amount of the basket." stateText='The Minimum Order is' activeToogle={() => this.changeStateBoolean('enabled_minimum_order')}></Toogle>
                        {content_minimum_order}
                        <SaveBar equals={equals} loading={loading} action={() => this.updateMinimum(this.state)} discard={() => { this.discard(dataMinimum) }} />
                        <ThisToast />
                    </BlockStack>
                    : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ minimum_order: !stateNow });
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
export default Minimum_Order;