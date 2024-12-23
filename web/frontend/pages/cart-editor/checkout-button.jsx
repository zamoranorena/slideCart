import React from "react";
import {
    ActionList,
    Card,
    Box,
    Checkbox,
    Icon,
    Select,
    Button,
    Divider,
    Modal,
    InlineStack,
    Popover,
    Banner,
    InlineGrid,
    RadioButton,
    InlineCode,
    Toast,
    Text,
    TextField,
    BlockStack,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';
import { MarketsIcon } from '@shopify/polaris-icons';
import colorconvert from 'color-convert';
import { ButtonColor, Toogle, ToolInfo, SaveBar, Titles, FieldColor, ToogleSkeleton, Section } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';
import { currencyShop } from '@utils/functionUtils';
import {
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
    arr_options_alignment,
    arr_options_radius,
} from '@utils/global'

class Checkout_Button extends React.Component {

    static contextType = Context;
    constructor(props) {
        super(props);
        this.yourRef = React.createRef();
        this.state = {
            dataCheckoutButton: null,
            /* money_format: null, */
            toas: null,
            messageError: '',
            popoverEnabled: 0,
            popoverCheckout: null,
            popoverCheckout2: null,
            popoverCheckout3: null,
            popoverCheckout4: null,
            checkout_button_settings:1,
            checkout_button_properties:1,
            checkout_button_properties_text:1,
            modal: false,
            loading: true,
            enabled_checkout_button: null,
            checkout_button_icon_enabled: null,
            checkout_button_icon: null,
            checkout_button_icon_svg: null,
            checkout_button_text: null,
            checkout_button_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            checkout_button_text_color_hex: null,

            checkout_button_text_colorHover: {
                hue: null,
                saturation: null,
                brightness: null
            },
            checkout_button_text_colorHover_hex: null,
            checkout_button_text_font_size: null,
            checkout_button_text_transform: null,
            checkout_button_text_weight: null,
            checkout_button_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            checkout_button_background_color_hex: null,
            checkout_button_background_colorHover: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            checkout_button_background_colorHover_hex: null,
            checkout_button_border: null,
            options_font_size: [],
            options_transform: [],
            options_weight: [],
            options_border_radius: []
        };
    };

    componentDidMount() {
        this.getCheckoutButton();
    };

    getCheckoutButton = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_checkout_button', app);
        if (data && data.checkout_button !== undefined && data.checkout_button !== null) {
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
                dataCheckoutButton: data
            };
        };

        const checkoutButton = data.checkout_button;
        //const shop = data.money_format;
        //console.log(announcemenTiers)

        const settings_checkout_button_icon = data.icons.find(element => {
            return element.id === parseInt(checkoutButton.checkout_button_icon);
        });


        var stateData = {
            messageError: '',
            loading: false,
            popoverCheckout: false,
            popoverCheckout2: false,
            popoverCheckout3: false,
            popoverCheckout4: false,
            modal: false,
            toast: false,
            enabled_checkout_button: checkoutButton.enabled_checkout_button,
            checkout_button_icon: checkoutButton.checkout_button_icon,
            checkout_button_icon_enabled: checkoutButton.checkout_button_icon_enabled,
            checkout_button_icon_svg: settings_checkout_button_icon ? settings_checkout_button_icon.icon : '',
            checkout_button_text: checkoutButton.checkout_button_text,
            checkout_button_text_color: {
                hue: checkoutButton.checkout_button_text_color_h,
                saturation: checkoutButton.checkout_button_text_color_s,
                brightness: checkoutButton.checkout_button_text_color_b
            },
            checkout_button_text_color_hex: checkoutButton.checkout_button_text_color_hex.replace(/\#/, ""),
            checkout_button_text_colorHover: {
                hue: checkoutButton.checkout_button_text_colorHover_h,
                saturation: checkoutButton.checkout_button_text_colorHover_s,
                brightness: checkoutButton.checkout_button_text_colorHover_b
            },
            checkout_button_text_colorHover_hex: checkoutButton.checkout_button_text_colorHover_hex.replace(/\#/, ""),

            checkout_button_text_font_size: checkoutButton.checkout_button_text_font_size,
            checkout_button_text_transform: checkoutButton.checkout_button_text_transform,
            checkout_button_text_weight: checkoutButton.checkout_button_text_weight,

            checkout_button_background_color: {
                hue: checkoutButton.checkout_button_background_color_h,
                saturation: checkoutButton.checkout_button_background_color_s,
                brightness: checkoutButton.checkout_button_background_color_b
            },
            checkout_button_background_color_hex: checkoutButton.checkout_button_background_color_hex.replace(/\#/, ""),

            checkout_button_background_colorHover: {
                hue: checkoutButton.checkout_button_background_colorHover_h,
                saturation: checkoutButton.checkout_button_background_colorHover_s,
                brightness: checkoutButton.checkout_button_background_colorHover_b,
            },
            checkout_button_background_colorHover_hex: checkoutButton.checkout_button_background_colorHover_hex.replace(/\#/, ""),
            checkout_button_border: checkoutButton.checkout_button_border,
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

    iconPreview = (props) => {
        if (props.dataCheckoutButton !== null) {
            if (props.dataCheckoutButton.icons !== undefined) {
                /* const sticky_cart_icon = this.state.data.iconsStickyCart.find(element => {
                    return element.id === (this.state.data.dataStickyCart[0].sticky_cart_icon)
                });
                console.log(this.state.sticky_cart_icon_svg) */
                const a = props.checkout_button_icon_svg;
                const b = '#' + props.checkout_button_text_color_hex
                /*const sticky_cart_icon = this.state.data.dataStickyCart[0].sticky_cart_icon - 1;
                const a = this.state.data.iconsStickyCart[sticky_cart_icon.icon].icon */
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
                            /* const icon_svg_color = document.querySelector("#content svg path");
                            icon_svg_color.setAttribute("fill",b) */

                            const paths = document.querySelectorAll("#content svg path");
                            for (let i = 0; i < paths.length; i++) {
                                paths[i].setAttribute("style", "fill:" + b + ";")
                                paths[i].setAttribute("fill", b)
                            };
                            const paths2 = document.querySelectorAll("#content svg circle");
                            for (let i = 0; i < paths2.length; i++) {
                                paths2[i].setAttribute("style", "fill:" + b + ";");
                            };

                        }
                    }
                }, 50);
            };
        };
    };
    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ checkout_button: props.checkout_button.enabled_checkout_button });
    };

    validateData = (props) => {
        var thisEquals = true;
        const stateData = {
            enabled_checkout_button: +props.enabled_checkout_button,
            checkout_button_icon: parseInt(props.checkout_button_icon),
            checkout_button_icon_enabled: +props.checkout_button_icon_enabled,
            checkout_button_text: props.checkout_button_text,
            checkout_button_text_color_h: props.checkout_button_text_color.hue,
            checkout_button_text_color_s: props.checkout_button_text_color.saturation,
            checkout_button_text_color_b: props.checkout_button_text_color.brightness,
            checkout_button_text_colorHover_h: props.checkout_button_text_colorHover.hue,
            checkout_button_text_colorHover_s: props.checkout_button_text_colorHover.saturation,
            checkout_button_text_colorHover_b: props.checkout_button_text_colorHover.brightness,
            checkout_button_text_font_size: props.checkout_button_text_font_size,
            checkout_button_text_transform: props.checkout_button_text_transform,
            checkout_button_text_weight: props.checkout_button_text_weight,
            checkout_button_background_color_h: props.checkout_button_background_color.hue,
            checkout_button_background_color_s: props.checkout_button_background_color.saturation,
            checkout_button_background_color_b: props.checkout_button_background_color.brightness,
            checkout_button_background_colorHover_h: props.checkout_button_background_colorHover.hue,
            checkout_button_background_colorHover_s: props.checkout_button_background_colorHover.saturation,
            checkout_button_background_colorHover_b: props.checkout_button_background_colorHover.brightness,
            checkout_button_border: props.checkout_button_border,
        };
        const dataCheckoutButton = props.dataCheckoutButton;
        if (dataCheckoutButton !== null) {
            const pcb = dataCheckoutButton.checkout_button;
            const data_checkout_button = {
                enabled_checkout_button: +pcb.enabled_checkout_button,
                checkout_button_icon: parseInt(pcb.checkout_button_icon),
                checkout_button_icon_enabled: +pcb.checkout_button_icon_enabled,
                checkout_button_text: pcb.checkout_button_text,
                checkout_button_text_color_h: pcb.checkout_button_text_color_h,
                checkout_button_text_color_s: pcb.checkout_button_text_color_s,
                checkout_button_text_color_b: pcb.checkout_button_text_color_b,
                checkout_button_text_colorHover_h: pcb.checkout_button_text_colorHover_h,
                checkout_button_text_colorHover_s: pcb.checkout_button_text_colorHover_s,
                checkout_button_text_colorHover_b: pcb.checkout_button_text_colorHover_b,
                checkout_button_text_font_size: pcb.checkout_button_text_font_size,
                checkout_button_text_transform: pcb.checkout_button_text_transform,
                checkout_button_text_weight: pcb.checkout_button_text_weight,
                checkout_button_background_color_h: pcb.checkout_button_background_color_h,
                checkout_button_background_color_s: pcb.checkout_button_background_color_s,
                checkout_button_background_color_b: pcb.checkout_button_background_color_b,
                checkout_button_background_colorHover_h: pcb.checkout_button_background_colorHover_h,
                checkout_button_background_colorHover_s: pcb.checkout_button_background_colorHover_s,
                checkout_button_background_colorHover_b: pcb.checkout_button_background_colorHover_b,
                checkout_button_border: pcb.checkout_button_border,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_checkout_button;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    updateCheckoutButton = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_checkout_button: props.enabled_checkout_button,
                checkout_button_icon: props.checkout_button_icon,
                checkout_button_icon_enabled: props.checkout_button_icon_enabled,
                checkout_button_text: props.checkout_button_text,
                checkout_button_text_color_h: props.checkout_button_text_color.hue,
                checkout_button_text_color_s: props.checkout_button_text_color.saturation,
                checkout_button_text_color_b: props.checkout_button_text_color.brightness,
                checkout_button_text_color_hex: '#' + props.checkout_button_text_color_hex,
                checkout_button_text_colorHover_h: props.checkout_button_text_colorHover.hue,
                checkout_button_text_colorHover_s: props.checkout_button_text_colorHover.saturation,
                checkout_button_text_colorHover_b: props.checkout_button_text_colorHover.brightness,
                checkout_button_text_colorHover_hex: '#' + props.checkout_button_text_colorHover_hex,
                checkout_button_text_font_size: props.checkout_button_text_font_size,
                checkout_button_text_transform: props.checkout_button_text_transform,
                checkout_button_text_weight: props.checkout_button_text_weight,
                checkout_button_background_color_h: props.checkout_button_background_color.hue,
                checkout_button_background_color_s: props.checkout_button_background_color.saturation,
                checkout_button_background_color_b: props.checkout_button_background_color.brightness,
                checkout_button_background_color_hex: '#' + props.checkout_button_background_color_hex,
                checkout_button_background_colorHover_h: props.checkout_button_background_colorHover.hue,
                checkout_button_background_colorHover_s: props.checkout_button_background_colorHover.saturation,
                checkout_button_background_colorHover_b: props.checkout_button_background_colorHover.brightness,
                checkout_button_background_colorHover_hex: '#' + props.checkout_button_background_colorHover_hex,
                checkout_button_border: props.checkout_button_border,
            };

            const updateCheckoutButton = await makePutPostRequest('/api/checkout_button', method, requestBody, app);
            var messageError = '';
            if (updateCheckoutButton.error && updateCheckoutButton.message) {
                messageError = updateCheckoutButton.message;
            };
            await this.getCheckoutButton();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            dataCheckoutButton,
            toast,
            messageError,
            popoverEnabled,
            popoverCheckout,
            popoverCheckout2,
            popoverCheckout3,
            popoverCheckout4,
            checkout_button_settings,
            checkout_button_properties,
            checkout_button_properties_text,
            modal,
            loading,
            enabled_checkout_button,
            checkout_button_icon_enabled,
            checkout_button_text,
            checkout_button_text_color,
            checkout_button_text_color_hex,
            checkout_button_text_colorHover,
            checkout_button_text_colorHover_hex,
            checkout_button_text_font_size,
            checkout_button_text_transform,
            checkout_button_text_weight,
            checkout_button_background_color,
            checkout_button_background_color_hex,
            checkout_button_background_colorHover,
            checkout_button_background_colorHover_hex,
            checkout_button_border,
            options_font_size,
            options_transform,
            options_weight,
            options_border_radius,
        } = this.state;

        const equals = this.validateData(this.state);


        this.iconPreview(this.state);

        const activator_checkout_button_text_color =
            <ButtonColor click={() => { this.handlePopover("popoverCheckout") }} id='checkout_button_color' background={hsbToHex(checkout_button_text_color)} />;

        const activator_checkout_button_text_colorHover =
            <ButtonColor click={() => { this.handlePopover("popoverCheckout2") }} id='checkout_button_color2' background={hsbToHex(checkout_button_text_colorHover)} />;

        const activator_checkout_button_background_color =
            <ButtonColor click={() => { this.handlePopover("popoverCheckout3") }} id='checkout_button_color3' background={hsbToHex(checkout_button_background_color)} />;

        const activator_checkout_button_background_colorHover =
            <ButtonColor click={() => { this.handlePopover("popoverCheckout4") }} id='checkout_button_color4' background={hsbToHex(checkout_button_background_colorHover)} />;

        const activator = <div ref={this.yourRef} ><Button variant='primary' tone="success" onClick={() => this.changeStateBoolean("modal")}>Select Icon</Button></div>;

        const content_checkout_button =
            <BlockStack gap={500}>
                <Section title={'General Settings'} this_section={() => { this.setState({ checkout_button_settings: !checkout_button_settings }) }} status_source={checkout_button_settings}>
                    <InlineStack gap={500} align="center">
                        <Checkbox
                            label={<ToolInfo title={<Titles text="Show lock icon" />} description='The icon will take the same color as the configured text.' />}
                            checked={checkout_button_icon_enabled}
                            onChange={() => this.changeStateBoolean("checkout_button_icon_enabled")}
                        />
                        <div className='icon'>
                            <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                                <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                                    <div id='content' style={{ background: '#' + checkout_button_background_color_hex, display: 'inherit', padding: '2px' }}>
                                    </div>
                                    <Modal
                                        activator={activator}
                                        open={modal}
                                        onClose={() => this.changeStateBoolean("modal")}
                                        title="Select the icon of your preference"
                                        secondaryActions={[
                                            {
                                                content: 'Cancel',
                                                onAction: () => this.changeStateBoolean("modal"),
                                            },
                                        ]}
                                    >
                                        <Modal.Section>
                                            <InlineGrid gap="400" columns={11}>
                                                {dataCheckoutButton !== null ? dataCheckoutButton.icons.map((el, i) => (
                                                    <Button key={i} id={'button' + i} icon={el.icon} onClick={() => this.iconChange(el.icon, el.id)}></Button>
                                                )) : ''}
                                            </InlineGrid>
                                        </Modal.Section>
                                    </Modal>
                                </InlineStack>
                            </InlineStack >
                        </div>
                    </InlineStack>
                </Section>
                <Section title={'Text Properties'} this_section={() => { this.setState({ checkout_button_properties_text: !checkout_button_properties_text }) }} status_source={checkout_button_properties_text}>
                    <TextField
                        label={<Titles text='Button name ( Checkout )' />}
                        value={checkout_button_text}
                        onChange={(value) => { this.handleChange(value, "checkout_button_text") }}
                        maxLength={250}
                    />
                    <Select
                        label={<Titles text='Checkout Button Text Font Size:' />}
                        options={options_font_size}
                        value={checkout_button_text_font_size}
                        onChange={(value) => { this.handleChange(value, "checkout_button_text_font_size") }}
                    />
                    <Select
                        label={<Titles text='Checkout Button Text transform:' />}
                        options={options_transform}
                        value={checkout_button_text_transform}
                        onChange={(value) => { this.handleChange(value, "checkout_button_text_transform") }}
                    />
                    <Select
                        label={<Titles text='Checkout Button Text Font weight:' />}
                        options={options_weight}
                        value={checkout_button_text_weight}
                        onChange={(value) => { this.handleChange(value, "checkout_button_text_weight") }}
                    />
                    <FieldColor
                        labelColor={<Titles text='Checkout Button - Text Color' />}
                        textValue={checkout_button_text_color_hex || 'ffffff'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "checkout_button_text_color_hex", "checkout_button_text_color") }}
                        activePop={popoverCheckout}
                        activadorPop={activator_checkout_button_text_color}
                        closePop={() => { this.handlePopover("popoverCheckout", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "checkout_button_text_color", "checkout_button_text_color_hex") }}
                        colorPicker={checkout_button_text_color}
                    />
                    <FieldColor
                        labelColor={<Titles text='Checkout Button - Text Color Hover' />}
                        textValue={checkout_button_text_colorHover_hex || 'ffffff'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "checkout_button_text_colorHover_hex", "checkout_button_text_colorHover") }}
                        activePop={popoverCheckout2}
                        activadorPop={activator_checkout_button_text_colorHover}
                        closePop={() => { this.handlePopover("popoverCheckout2", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "checkout_button_text_colorHover", "checkout_button_text_colorHover_hex") }}
                        colorPicker={checkout_button_text_colorHover}
                    />
                </Section>
                <Section title={'Button Properties'} this_section={() => { this.setState({ checkout_button_properties: !checkout_button_properties }) }} status_source={checkout_button_properties}>
                    <Select
                        label={<Titles text='Checkout Button Border Radius:' />}
                        options={options_border_radius}
                        value={checkout_button_border}
                        onChange={(value) => { this.handleChange(value, "checkout_button_border") }}
                    />
                    <FieldColor
                        labelColor={<Titles text='Checkout Button Background Color' />}
                        textValue={checkout_button_background_color_hex || '000000'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "checkout_button_background_color_hex", "checkout_button_background_color") }}
                        activePop={popoverCheckout3}
                        activadorPop={activator_checkout_button_background_color}
                        closePop={() => { this.handlePopover("popoverCheckout3", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "checkout_button_background_color", "checkout_button_background_color_hex") }}
                        colorPicker={checkout_button_background_color}
                    />
                    <FieldColor
                        labelColor={<Titles text='Checkout Button Background Color Hover' />}
                        textValue={checkout_button_background_colorHover_hex || '000000'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "checkout_button_background_colorHover_hex", "checkout_button_background_colorHover") }}
                        activePop={popoverCheckout4}
                        activadorPop={activator_checkout_button_background_colorHover}
                        closePop={() => { this.handlePopover("popoverCheckout4", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "checkout_button_background_colorHover", "checkout_button_background_colorHover_hex") }}
                        colorPicker={checkout_button_background_colorHover}
                    />
                </Section>
            </BlockStack>
           
        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Countdown updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        var emptyButton = '';
        var bannerMinimum = null;
        
        if(dataCheckoutButton !== null){
            if(typeof dataCheckoutButton.minimum_order !== 'undefined'){
                if(dataCheckoutButton.minimum_order.enabled_minimum_order){
                    emptyButton = <></>;
                    bannerMinimum = <Banner
                        title="Checkout Button"
                        tone="warning"
                    >
                        <Text>
                                The 'Minimum Order' option is enabled.
                        </Text>
                    </Banner>
                };
            };
        };
/* 
        const banner = isDirty_minimum_order == true ?
      <div className='bannerSettings'>
      
      </div>: null; */

      const items =[
          {
              active: enabled_checkout_button,
              content: 'Enabled',
              /* icon: ImportIcon,
              suffix: <Icon source={CheckSmallIcon} />, */
          },
          {
              active: !enabled_checkout_button,
              content: 'Disabled',
              /* icon: ImportIcon,
              suffix: <Icon source={CheckSmallIcon} />, */
          }
      ];

      const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataCheckoutButton !== null ?
                    <BlockStack gap={500}>
                        {/* <Toogle enabled={enabled_checkout_button} title='Checkout Button' description="The checkout button is available on the slide cart to give buyers a way to enter the checkout process." stateText='The Checkout Button is' action={emptyButton} activeToogle={() => this.changeStateBoolean('enabled_checkout_button')}></Toogle> */}
                        <InlineStack
                            gap="1200"
                            align="space-between"
                            blockAlign="start"
                            wrap={false}
                        >
                            <InlineStack gap={50}>
                                <Icon source={MarketsIcon} />
                                <Text variant="headingSm" as="h6">Chekcout Button</Text>
                            </InlineStack>
                            <Popover
                                active={popoverEnabled}
                                activator={<Button variant="monochromePlain" disclosure onClick={() => {this.setState({popoverEnabled: !popoverEnabled}) }}>
                                    View Sales
                                </Button>}
                                onClose={() => { }}
                            >
                                <ActionList items={items} />
                            </Popover>
                        </InlineStack>
                        {bannerMinimum}
                        {content_checkout_button}
                        <SaveBar equals={equals} loading={loading} action={() => this.updateCheckoutButton(this.state)} discard={() => { this.discard(dataCheckoutButton) }} />
                        <ThisToast />
                    </BlockStack>
                    : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ checkout_button: !stateNow });
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
    iconChange = (icon_svg, icon_id) => {
        this.setState({
            modal: 0,
            checkout_button_icon: icon_id,
            checkout_button_icon_svg: icon_svg
        });
        /* const color = '#'+this.state.sticky_cart_icon_color_hex;
        setTimeout(function(){ 
            const icon_svg_color = document.querySelector("#content svg path");
            icon_svg_color.setAttribute("fill",color)
        }, 80); */

    };
}
export default Checkout_Button;