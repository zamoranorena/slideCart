import { Component } from "react";
import {
    Card,
    Text,
    Select,
    Button,
    InlineGrid,
    Collapsible,
    Toast,
    Checkbox,
    ResourceList,
    ResourceItem,
    BlockStack,
    InlineStack,
    Thumbnail,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import colorconvert from 'color-convert';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton, StatusModule, StatusModuleBanner } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
} from '@utils/global'

class ShippingProtections extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverEnabled: 0,
            resourcePicker: false,
            popOverShipping1: false,
            popOverShipping2: false,
            popOverShipping3: false,
            popOverShipping4: false,
            popOverShipping5: false,
            loading:true,
            dataShippingProtection: null,
            enabled_shipping_protection: null,
            sp_featured_product_shopify_id: null,
            sp_featured_product_shopify_handle: null,
            sp_featured_product_shopify_title: null,
            sp_featured_product_shopify_originalSrc: null,
            sp_featured_product_shopify_id_variant: null,
            sp_show_image: null,
            sp_auto_add: null,
            sp_title_color: { hue: null, saturation: null, brightness: null },
            sp_title_color_hex: null,
            sp_title_font_size: null,
            sp_title_transform: null,
            sp_title_font_weight: null,
            sp_description_color: { hue: null, saturation: null, brightness: null },
            sp_description_color_hex: null,
            sp_description_font_size: null,
            sp_description_transform: null,
            sp_description_font_weight: null,
            sp_price_color: { hue: null, saturation: null, brightness: null },
            sp_price_color_hex: null,
            sp_price_font_size: null,
            sp_price_font_weight: null,
            sp_compare_price_color: { hue: null, saturation: null, brightness: null },
            sp_compare_price_color_hex: null,
            sp_compare_price_font_size: null,
            sp_compare_price_font_weight: null,
            sp_toggle_color: { hue: null, saturation: null, brightness: null },
            sp_toggle_color_hex: null,
        };
    };

    componentDidMount() {
        this.getShipping();
    };

    getShipping = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_shipping_protection', app);
        if (data && data.shipping_protection !== undefined && data.shipping_protection !== null) {
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
                dataShippingProtection: data
            };
        };
        const settings_shipping_protection = data.shipping_protection;

        var stateData = {
            resourcePicker: false,
            popOverShipping1: false,
            popOverShipping2: false,
            popOverShipping3: false,
            popOverShipping4: false,
            popOverShipping5: false,
            messageError: '',
            loading: false,
            toast: false,
            enabled_shipping_protection: settings_shipping_protection.enabled_shipping_protection,
            sp_featured_product_shopify_id: settings_shipping_protection.sp_featured_product_shopify_id,
            sp_featured_product_shopify_handle: settings_shipping_protection.sp_featured_product_shopify_handle,
            sp_featured_product_shopify_title: settings_shipping_protection.sp_featured_product_shopify_title,
            sp_featured_product_shopify_originalSrc: settings_shipping_protection.sp_featured_product_shopify_originalSrc,
            sp_featured_product_shopify_id_variant: settings_shipping_protection.sp_featured_product_shopify_id_variant,
            sp_show_image: settings_shipping_protection.sp_show_image,
            sp_auto_add: settings_shipping_protection.sp_auto_add,
            sp_title_color: {
                hue: settings_shipping_protection.sp_title_color_h,
                saturation: settings_shipping_protection.sp_title_color_s,
                brightness: settings_shipping_protection.sp_title_color_b,
            },
            sp_title_color_hex: settings_shipping_protection.sp_title_color_hex.replace(/\#/, ""),
            sp_title_font_size: settings_shipping_protection.sp_title_font_size,
            sp_title_transform: settings_shipping_protection.sp_title_transform,
            sp_title_font_weight: settings_shipping_protection.sp_title_font_weight,
            sp_description_color: {
                hue: settings_shipping_protection.sp_description_color_h,
                saturation: settings_shipping_protection.sp_description_color_s,
                brightness: settings_shipping_protection.sp_description_color_b,
            },
            sp_description_color_hex: settings_shipping_protection.sp_description_color_hex.replace(/\#/, ""),
            sp_description_font_size: settings_shipping_protection.sp_description_font_size,
            sp_description_transform: settings_shipping_protection.sp_description_transform,
            sp_description_font_weight: settings_shipping_protection.sp_description_font_weight,
            sp_price_color: {
                hue: settings_shipping_protection.sp_price_color_h,
                saturation: settings_shipping_protection.sp_price_color_s,
                brightness: settings_shipping_protection.sp_price_color_b,
            },
            sp_price_color_hex: settings_shipping_protection.sp_price_color_hex.replace(/\#/, ""),
            sp_price_font_size: settings_shipping_protection.sp_price_font_size,
            sp_price_font_weight: settings_shipping_protection.sp_price_font_weight,
            sp_compare_price_color: {
                hue: settings_shipping_protection.sp_compare_price_color_h,
                saturation: settings_shipping_protection.sp_compare_price_color_s,
                brightness: settings_shipping_protection.sp_compare_price_color_b
            },
            sp_compare_price_color_hex: settings_shipping_protection.sp_compare_price_color_hex.replace(/\#/, ""),
            sp_compare_price_font_size: settings_shipping_protection.sp_compare_price_font_size,
            sp_compare_price_font_weight: settings_shipping_protection.sp_compare_price_font_weight,
            sp_toggle_color: {
                hue: settings_shipping_protection.sp_toggle_color_h,
                saturation: settings_shipping_protection.sp_toggle_color_s,
                brightness: settings_shipping_protection.sp_toggle_color_b
            },
            sp_toggle_color_hex: settings_shipping_protection.sp_toggle_color_hex.replace(/\#/, ""),
            options_font_size: arr_options_font_size,
            options_transform: arr_options_transform,
            options_weight: arr_options_weight,
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
            enabled_shipping_protection: +props.enabled_shipping_protection,
            sp_featured_product_shopify_id: props.sp_featured_product_shopify_id,
            sp_featured_product_shopify_handle: props.sp_featured_product_shopify_handle,
            sp_featured_product_shopify_title: props.sp_featured_product_shopify_title,
            sp_featured_product_shopify_originalSrc: props.sp_featured_product_shopify_originalSrc,
            sp_featured_product_shopify_id_variant: props.sp_featured_product_shopify_id_variant,
            sp_show_image: +props.sp_show_image,
            sp_auto_add: +props.sp_auto_add,
            sp_title_color: {
                hue: props.sp_title_color.hue,
                saturation: props.sp_title_color.saturation,
                brightness: props.sp_title_color.brightness,
            },
            sp_title_font_size: props.sp_title_font_size,
            sp_title_transform: props.sp_title_transform,
            sp_title_font_weight: props.sp_title_font_weight,
            sp_description_color: {
                hue: props.sp_description_color.hue,
                saturation: props.sp_description_color.saturation,
                brightness: props.sp_description_color.brightness,
            },
            sp_description_font_size: props.sp_description_font_size,
            sp_description_transform: props.sp_description_transform,
            sp_description_font_weight: props.sp_description_font_weight,
            sp_price_color: {
                hue: props.sp_price_color.hue,
                saturation: props.sp_price_color.saturation,
                brightness: props.sp_price_color.brightness,
            },
            sp_price_font_size: props.sp_price_font_size,
            sp_price_font_weight: props.sp_price_font_weight,
            sp_compare_price_color: {
                hue: props.sp_compare_price_color.hue,
                saturation: props.sp_compare_price_color.saturation,
                brightness: props.sp_compare_price_color.brightness
            },
            sp_compare_price_font_size: props.sp_compare_price_font_size,
            sp_compare_price_font_weight: props.sp_compare_price_font_weight,
            sp_toggle_color: {
                hue: props.sp_toggle_color.hue,
                saturation: props.sp_toggle_color.saturation,
                brightness: props.sp_toggle_color.brightness
            },
        };
        const dataShippingProtection = props.dataShippingProtection;
        if (dataShippingProtection !== null) {
            const pspr = dataShippingProtection.shipping_protection;
            const data_shipping_protection = {
                enabled_shipping_protection: +pspr.enabled_shipping_protection,
                sp_featured_product_shopify_id: pspr.sp_featured_product_shopify_id,
                sp_featured_product_shopify_handle: pspr.sp_featured_product_shopify_handle,
                sp_featured_product_shopify_title: pspr.sp_featured_product_shopify_title,
                sp_featured_product_shopify_originalSrc: pspr.sp_featured_product_shopify_originalSrc,
                sp_featured_product_shopify_id_variant: pspr.sp_featured_product_shopify_id_variant,
                sp_show_image: +pspr.sp_show_image,
                sp_auto_add: +pspr.sp_auto_add,
                sp_title_color: {
                    hue: pspr.sp_title_color_h,
                    saturation: pspr.sp_title_color_s,
                    brightness: pspr.sp_title_color_b,
                },
                sp_title_font_size: pspr.sp_title_font_size,
                sp_title_transform: pspr.sp_title_transform,
                sp_title_font_weight: pspr.sp_title_font_weight,
                sp_description_color: {
                    hue: pspr.sp_description_color_h,
                    saturation: pspr.sp_description_color_s,
                    brightness: pspr.sp_description_color_b,
                },
                sp_description_font_size: pspr.sp_description_font_size,
                sp_description_transform: pspr.sp_description_transform,
                sp_description_font_weight: pspr.sp_description_font_weight,
                sp_price_color: {
                    hue: pspr.sp_price_color_h,
                    saturation: pspr.sp_price_color_s,
                    brightness: pspr.sp_price_color_b,
                },
                sp_price_font_size: pspr.sp_price_font_size,
                sp_price_font_weight: pspr.sp_price_font_weight,
                sp_compare_price_color: {
                    hue: pspr.sp_compare_price_color_h,
                    saturation: pspr.sp_compare_price_color_s,
                    brightness: pspr.sp_compare_price_color_b
                },
                sp_compare_price_font_size: pspr.sp_compare_price_font_size,
                sp_compare_price_font_weight: pspr.sp_compare_price_font_weight,
                sp_toggle_color: {
                    hue: pspr.sp_toggle_color_h,
                    saturation: pspr.sp_toggle_color_s,
                    brightness: pspr.sp_toggle_color_b
                },
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_shipping_protection;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ shipping_protections: props.shipping_protection.enabled_shipping_protection });
    };

    updateShippingProtection = async (props) => {
        if (props) {
            if (props.enabled_shipping_protection == 1 && props.sp_featured_product_shopify_id === "") {
                this.setState({ toast: true, messageError: 'Select product' })
                return false;
            }
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_shipping_protection: props.enabled_shipping_protection,
                sp_featured_product_shopify_id: props.sp_featured_product_shopify_id,
                sp_featured_product_shopify_handle: props.sp_featured_product_shopify_handle,
                sp_featured_product_shopify_title: props.sp_featured_product_shopify_title,
                sp_featured_product_shopify_originalSrc: props.sp_featured_product_shopify_originalSrc,
                sp_featured_product_shopify_id_variant: props.sp_featured_product_shopify_id_variant,
                sp_show_image: props.sp_show_image,
                sp_auto_add: props.sp_auto_add,
                sp_title_color_h: props.sp_title_color.hue,
                sp_title_color_s: props.sp_title_color.saturation,
                sp_title_color_b: props.sp_title_color.brightness,
                sp_title_color_hex: '#' + props.sp_title_color_hex,
                sp_title_font_size: props.sp_title_font_size,
                sp_title_transform: props.sp_title_transform,
                sp_title_font_weight: props.sp_title_font_weight,
                sp_description_color_h: props.sp_description_color.hue,
                sp_description_color_s: props.sp_description_color.saturation,
                sp_description_color_b: props.sp_description_color.brightness,
                sp_description_color_hex: '#' + props.sp_description_color_hex,
                sp_description_font_size: props.sp_description_font_size,
                sp_description_transform: props.sp_description_transform,
                sp_description_font_weight: props.sp_description_font_weight,
                sp_price_color_h: props.sp_price_color.hue,
                sp_price_color_s: props.sp_price_color.saturation,
                sp_price_color_b: props.sp_price_color.brightness,
                sp_price_color_hex: '#' + props.sp_price_color_hex,
                sp_price_font_size: props.sp_price_font_size,
                sp_price_font_weight: props.sp_price_font_weight,
                sp_compare_price_color_h: props.sp_compare_price_color.hue,
                sp_compare_price_color_s: props.sp_compare_price_color.saturation,
                sp_compare_price_color_b: props.sp_compare_price_color.brightness,
                sp_compare_price_color_hex: '#' + props.sp_compare_price_color_hex,
                sp_compare_price_font_size: props.sp_compare_price_font_size,
                sp_compare_price_font_weight: props.sp_compare_price_font_weight,
                sp_toggle_color_h: props.sp_toggle_color.hue,
                sp_toggle_color_s: props.sp_toggle_color.saturation,
                sp_toggle_color_b: props.sp_toggle_color.brightness,
                sp_toggle_color_hex: '#' + props.sp_toggle_color_hex,
            };

            const updateShippingProtection = await makePutPostRequest('/api/shipping_protection', method, requestBody, app);
            var messageError = '';
            if (updateShippingProtection.error && updateShippingProtection.message) {
                messageError = updateShippingProtection.message;
            };
            await this.getShipping();
            this.setState({ toast: true, messageError: messageError })
        };
    };

    render() {
        const {
            popoverEnabled,
            popOverShipping1,
            popOverShipping2,
            popOverShipping3,
            popOverShipping4,
            popOverShipping5,
            resourcePicker,
            dataShippingProtection,
            messageError,
            loading,
            toast,
            enabled_shipping_protection,
            sp_featured_product_shopify_id,
            sp_featured_product_shopify_title,
            sp_featured_product_shopify_originalSrc,
            sp_show_image,
            sp_auto_add,
            sp_title_color,
            sp_title_color_hex,
            sp_title_font_size,
            sp_title_transform,
            sp_title_font_weight,
            sp_description_color,
            sp_description_color_hex,
            sp_description_font_size,
            sp_description_transform,
            sp_description_font_weight,
            sp_price_color,
            sp_price_color_hex,
            sp_price_font_size,
            sp_price_font_weight,
            sp_compare_price_color,
            sp_compare_price_color_hex,
            sp_compare_price_font_size,
            sp_compare_price_font_weight,
            sp_toggle_color,
            sp_toggle_color_hex,
            options_font_size,
            options_transform,
            options_weight,
        } = this.state;
        const equals = this.validateData(this.state);

        const resourcePickerShipping = resourcePicker ? <ResourcePicker
            resourceType="Product"
            selectMultiple={false}
            showVariants={false}
            open={resourcePicker}
            onSelection={
                (resource) => {
                    this.setState({ resourcePicker: false });
                    this.shippingProtectionProd(resource);
                }
            }
            onCancel={() => this.setState({ resourcePicker: false })}
        /> : null;

        const content_featured_product = (
            <BlockStack gap={500}>
                {!!sp_featured_product_shopify_id ? <InlineStack align="end"><Button onClick={() => this.setState({ resourcePicker: true })} variant="plain">Change Product</Button></InlineStack> : ''}
                {!sp_featured_product_shopify_id ?
                    <Button fullWidth={true} onClick={() => this.setState({ resourcePicker: true })}>Select Product</Button> :
                    <div>
                        <ResourceList
                            resourceName={{ singular: 'Product', plural: 'Products' }}
                            items={[
                                {
                                    id: sp_featured_product_shopify_id,
                                    title: sp_featured_product_shopify_title,
                                    image: sp_featured_product_shopify_originalSrc
                                }
                            ]}
                            renderItem={item => {
                                const media = (
                                    <Thumbnail
                                        source={item.image}
                                        alt={item.image}
                                    />
                                );
                                return (
                                    <ResourceItem
                                        id={item.id}
                                        media={media}
                                        onClick={() => {
                                            this.setState({ resourcePicker: true })
                                        }}
                                    >
                                        <Text as="h1" variant="headingMd">{item.title}</Text>
                                    </ResourceItem>
                                );
                            }}
                        />
                        <InlineStack gap={500} align='center'>
                            <Checkbox
                                label={<Titles text="Show Image" />}
                                checked={sp_show_image}
                                onChange={() => this.changeStateBoolean("sp_show_image")}
                            />
                            <Checkbox
                                label={<Titles text="Auto Add" />}
                                checked={sp_auto_add}
                                onChange={() => this.changeStateBoolean("sp_auto_add")}
                            />
                        </InlineStack>
                    </div>
                }
            </BlockStack>

        );

        const activator_shipping_text_color =
            <ButtonColor click={() => { this.handlePopover("popOverShipping1") }} id='shipping_protection1' background={hsbToHex(sp_title_color)} />;

        const activator_shipping_desc_color =
            <ButtonColor click={() => { this.handlePopover("popOverShipping2") }} id='shipping_protection2' background={hsbToHex(sp_description_color)} />;

        const activator_shipping_price_color =
            <ButtonColor click={() => { this.handlePopover("popOverShipping3") }} id='shipping_protection3' background={hsbToHex(sp_price_color)} />;

        const activator_shipping_compare_price_color =
            <ButtonColor click={() => { this.handlePopover("popOverShipping4") }} id='shipping_protection4' background={hsbToHex(sp_compare_price_color)} />;

        const activator_shipping_toggle_color =
            <ButtonColor click={() => { this.handlePopover("popOverShipping5") }} id='shipping_protection5' background={hsbToHex(sp_toggle_color)} />;



        const title_properties =
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Title Properties</Text>
                    <BlockStack gap={400}>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                            <FieldColor
                                labelColor={<Titles text='Title Text Color' />}
                                textValue={sp_title_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "sp_title_color_hex", "sp_title_color") }}
                                activePop={popOverShipping1}
                                activadorPop={activator_shipping_text_color}
                                closePop={() => { this.handlePopover("popOverShipping1", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "sp_title_color", "sp_title_color_hex") }}
                                colorPicker={sp_title_color}
                            />
                            <Select
                                label={<Titles text='Title Text Font Size:' />}//NEW
                                options={options_font_size}//NEW
                                value={sp_title_font_size}//NEW
                                onChange={(value) => { this.handleOnChange(value, "sp_title_font_size") }}//NEW
                            />
                            <Select
                                label={<Titles text='Title Text Transform' />}
                                options={options_transform}
                                value={sp_title_transform}
                                onChange={(value) => { this.handleOnChange(value, "sp_title_transform") }}
                            />
                            <Select
                                label={<Titles text='Title Text Font Weight' />}
                                options={options_weight}
                                value={sp_title_font_weight}
                                onChange={(value) => { this.handleOnChange(value, "sp_title_font_weight") }}
                            />
                        </InlineGrid>
                    </BlockStack>
                </BlockStack>
            </Card>;


        const description_properties =
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Description Properties</Text>
                    <BlockStack gap={400}>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                            <FieldColor
                                labelColor={<Titles text='Description Text Color' />}
                                textValue={sp_description_color_hex || '737373'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "sp_description_color_hex", "sp_description_color") }}
                                activePop={popOverShipping2}
                                activadorPop={activator_shipping_desc_color}
                                closePop={() => { this.handlePopover("popOverShipping2", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "sp_description_color", "sp_description_color_hex") }}
                                colorPicker={sp_description_color}
                            />
                            <Select
                                label={<Titles text='Description Text Font Size:' />} //NEW 
                                options={options_font_size}//NEW
                                value={sp_description_font_size}//NEW
                                onChange={(value) => { this.handleOnChange(value, "sp_description_font_size") }}//NEW
                            />
                            <Select
                                label={<Titles text='Description Text Transform' />}
                                options={options_transform}
                                value={sp_description_transform}
                                onChange={(value) => { this.handleOnChange(value, "sp_description_transform") }}
                            />
                            <Select
                                label={<Titles text='Description Text Font Weight' />}
                                options={options_weight}
                                value={sp_description_font_weight}
                                onChange={(value) => { this.handleOnChange(value, "sp_description_font_weight") }}
                            />
                        </InlineGrid>
                    </BlockStack>
                </BlockStack>
            </Card>;

        const price_properties =
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Price Properties</Text>
                    <BlockStack gap={400}>
                        <FieldColor
                            labelColor={<Titles text='Price Text Color' />}
                            textValue={sp_price_color_hex || '000000'}
                            changeColorText={(value) => { this.handleOnChangeColor(value, "sp_price_color_hex", "sp_price_color") }}
                            activePop={popOverShipping3}
                            activadorPop={activator_shipping_price_color}
                            closePop={() => { this.handlePopover("popOverShipping3", 0) }}
                            changeColorPicker={(value) => { this.handleColors(value, "sp_price_color", "sp_price_color_hex") }}
                            colorPicker={sp_price_color}
                        />
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                            <Select
                                label={<Titles text='Price Text Font Size:' />}//NEW
                                options={options_font_size}//NEW
                                value={sp_price_font_size}//NEW
                                onChange={(value) => { this.handleOnChange(value, "sp_price_font_size") }}//NEW
                            />
                            <Select
                                label={<Titles text='Price Text Font Weight' />}
                                options={options_weight}
                                value={sp_price_font_weight}
                                onChange={(value) => { this.handleOnChange(value, "sp_price_font_weight") }}
                            />
                        </InlineGrid>
                    </BlockStack>
                </BlockStack>
            </Card>;

        const compare_price_properties =
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Compare Price Properties</Text>
                    <BlockStack gap={400}>
                        <FieldColor
                            labelColor={<Titles text='Compare Price Text Color' />}
                            textValue={sp_compare_price_color_hex || '737373'}
                            changeColorText={(value) => { this.handleOnChangeColor(value, "sp_compare_price_color_hex", "sp_compare_price_color") }}
                            activePop={popOverShipping4}
                            activadorPop={activator_shipping_compare_price_color}
                            closePop={() => { this.handlePopover("popOverShipping4", 0) }}
                            changeColorPicker={(value) => { this.handleColors(value, "sp_compare_price_color", "sp_compare_price_color_hex") }}
                            colorPicker={sp_compare_price_color}
                        />
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                            <Select
                                label={<Titles text='Compare Price Text Font Size:' />}//NEW
                                options={options_font_size}//NEW
                                value={sp_compare_price_font_size}//NEW
                                onChange={(value) => { this.handleOnChange(value, "sp_compare_price_font_size") }}//NEW
                            />
                            <Select
                                label={<Titles text='Compare Price Text Font Weight' />}
                                options={options_weight}
                                value={sp_compare_price_font_weight}
                                onChange={(value) => { this.handleOnChange(value, "sp_compare_price_font_weight") }}
                            />
                        </InlineGrid>
                    </BlockStack>
                </BlockStack>
            </Card>;


        const toggle_properties =
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Toggle Propertie</Text>
                    <BlockStack gap={400}>
                        <FieldColor
                            labelColor={<Titles text='Toggle Color' />}
                            textValue={sp_toggle_color_hex || '008060'}
                            changeColorText={(value) => { this.handleOnChangeColor(value, "sp_toggle_color_hex", "sp_toggle_color") }}
                            activePop={popOverShipping5}
                            activadorPop={activator_shipping_toggle_color}
                            closePop={() => { this.handlePopover("popOverShipping5", 0) }}
                            changeColorPicker={(value) => { this.handleColors(value, "sp_toggle_color", "sp_toggle_color_hex") }}
                            colorPicker={sp_toggle_color}
                        />
                    </BlockStack>
                </BlockStack>
            </Card>;
            
        const content_shipping_protection =
            /* <Collapsible
                open={enabled_shipping_protection}
                id="basic-collapsible0"
                transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                expandOnPrint
            > */
                <BlockStack gap={300}>
                    <Card>
                        <BlockStack gap={500}>
                            <Text as="h1" variant="headingMd">Product</Text>
                            {content_featured_product}
                        </BlockStack>
                    </Card>
                </BlockStack>
            /* </Collapsible> */;

        const content_shipping_protection1 = /* <Collapsible
            open={sp_featured_product_shopify_id && enabled_shipping_protection}
            id="basic-collapsible2"
            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
            expandOnPrint
        > */
            <BlockStack gap={300}>
                {title_properties}
                {description_properties}
                {price_properties}
                {compare_price_properties}
                {toggle_properties}
                {resourcePickerShipping}
            </BlockStack>
        /* </Collapsible> */

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Shipping Protection updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataShippingProtection !== null ?
                    <BlockStack gap={500}>
                        {/* <Toogle enabled={enabled_shipping_protection} title='Shipping Protection' description="Offer shipping protection." stateText='The shipping protection are' activeToogle={() => this.changeStateBoolean('enabled_shipping_protection')}></Toogle> */}
                        <StatusModule module='shipping_protections' enabled={enabled_shipping_protection} popoverEnabled={popoverEnabled} onActionEnabledItem={() => { this.setState({ enabled_shipping_protection: 1, popoverEnabled: !popoverEnabled }) }} onActionDisabledItem={() => { this.setState({ enabled_shipping_protection: 0, popoverEnabled: !popoverEnabled }) }} actionPopOver={() => this.setState({ popoverEnabled: !popoverEnabled })} />
                        {!enabled_shipping_protection ?
                            <StatusModuleBanner module='shipping_protections' onAction={() => { this.setState({ enabled_shipping_protection: 1 }) }} />
                            : null}
                        {content_shipping_protection}
                        {content_shipping_protection1}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateShippingProtection(this.state)} discard={() => { this.discard(dataShippingProtection) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ shipping_protections: !stateNow });
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
    handleColors = (value, colorhsb, colorhex) => {
        this.setState({ [colorhsb]: value, [colorhex]: hsbToHex(value).replace(/\#/, "") });
        /* this.setState({ [colorhex]:hsbToHex(value).replace(/\#/, "")}) */
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
    handleOnChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
    };
    shippingProtectionProd(resource) {
        var id = '', handle = '', title = '', idVariant = '', description = '', originalSrc = '';
        if (typeof resource !== 'undefined') {
            if (typeof resource.selection !== 'undefined') {
                if (resource.selection.length > 0) {
                    resource = resource.selection[0];
                    id = resource.id.replace("gid://shopify/Product/", "");
                    handle = resource.handle;
                    title = resource.title;
                    idVariant = resource.variants[0].id.replace("gid://shopify/ProductVariant/", "");
                    description = resource.descriptionHtml !== null ? resource.descriptionHtml.replace(/(<([^>]+)>)/gi, "") : '';
                    originalSrc = 'https://cdn.shopify.com/s/files/1/3067/1988/t/11/assets/hs-no-image.gif';
                    if (resource.images.length > 0) {
                        originalSrc = resource.images[0].originalSrc;
                    } else if (typeof resource.variants[0].image !== 'undefined') {
                        if (!!resource.variants[0].image.originalSrc) {
                            originalSrc = resource.variants[0].originalSrc
                        }
                    }
                };
            };
        };
        this.setState({
            sp_featured_product_shopify_id: id,
            sp_featured_product_shopify_handle: handle,
            sp_featured_product_shopify_title: title,
            sp_featured_product_shopify_originalSrc: originalSrc,
            sp_featured_product_shopify_id_variant: idVariant,
        });
        //var found = resource.find(e => e.title === 'Default Title');
    }
}
export default ShippingProtections;