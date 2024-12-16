import React from "react";
import {
    Card,
    Divider,
    Button,
    InlineStack,
    Spinner,
    ResourceList,
    Thumbnail,
    Tag,
    Modal,
    Icon,
    Text,
    Select,
    InlineGrid,
    TextField,
    Toast,
    BlockStack,
    hsbToHex,
    rgbToHsb,
    InlineCode
} from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { currencyShop } from '@utils/functionUtils';
import { PlayIcon } from '@shopify/polaris-icons';
import { giftWrap } from "../../assets";
import colorconvert from 'color-convert';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_radius,
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
} from '@utils/global'

class GiftWrap extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.yourRef = React.createRef();
        this.state = {
            money_format: null,
            resourcePicker: false,
            popoverGWIcon: false,
            popoverGWOfferName: false,
            popoverGWOfferPrice: false,
            popoverGWOfferComparePrice: false,
            messageError: '',
            loading: true,
            toast: false,
            modal_video_gift: false,
            modalIcon: false,
            dataGiftWrap: null,
            enabled_gift_wrap: null,
            product_type: null,
            gift_wrap_icon: null,
            gift_wrap_icon_svg: null,
            gift_wrap_icon_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            gift_wrap_icon_color_hex: null,
            offer_name: null,
            offer_name_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            offer_name_color_hex: null,
            offer_price: '',
            offer_price_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            offer_price_color_hex: null,
            offer_compare_price: '',
            offer_compare_price_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            offer_compare_price_color_hex: null,
            featured_product_shopify_id: null,
            featured_product_shopify_handle: null,
            featured_product_shopify_title: null,
            featured_product_shopify_originalSrc: null,
            featured_product_shopify_id_variants: null,
            featured_product_shopify_title_variants: null,
            featured_product_title: null,
            featured_product_title_bold: null,
            featured_product_show_image: null,
            display_selling_color: {
                hue: null,
                saturation: null,
                brightness: null
            },

            display_selling_color_hex: null,
            display_compare_price_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            display_compare_price_color_hex: null,
            offer_font_size: null,
            graphqlProduct: [],
            spinnerProduct: false,
        };
    };

    iconPreview = () => {
        if (this.state.dataGiftWrap !== null) {
            if (typeof this.state.dataGiftWrap.icons_settings !== 'undefined') {
                const a = this.state.gift_wrap_icon_svg;
                const b = '#' + this.state.gift_wrap_icon_color_hex
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

    componentDidMount() {
        this.getGigtWrap();
    };

    getGigtWrap = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_gift_wrap', app);
        if (data && data.gift_wrap !== undefined && data.gift_wrap !== null) {
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
                dataGiftWrap: data
            };
        };
        const settings_gift_wrap = data.gift_wrap;
        const shop = data.money_format;

        const settings_gift_wrap_icon = data.icons_settings.find(element => {
            return element.id === data.gift_wrap.gift_wrap_icon;
        });

        var stateData = {
            resourcePicker: false,
            popoverGWIcon: false,
            popoverGWOfferName: false,
            popoverGWOfferPrice: false,
            popoverGWOfferComparePrice: false,
            messageError: '',
            loading: false,
            toast: false,
            modal_video_gift: false,
            modalIcon: false,
            enabled_gift_wrap: settings_gift_wrap.enabled_gift_wrap,
            product_type: settings_gift_wrap.product_type,
            gift_wrap_icon: settings_gift_wrap.gift_wrap_icon,
            gift_wrap_icon_svg: settings_gift_wrap_icon.icon,
            gift_wrap_icon_color: {
                hue: settings_gift_wrap.gift_wrap_icon_color_h,
                saturation: settings_gift_wrap.gift_wrap_icon_color_s,
                brightness: settings_gift_wrap.gift_wrap_icon_color_b
            },
            gift_wrap_icon_color_hex: settings_gift_wrap.gift_wrap_icon_color_hex.replace(/\#/, ""),
            offer_name: settings_gift_wrap.offer_name,
            offer_name_color: {
                hue: settings_gift_wrap.offer_name_color_h,
                saturation: settings_gift_wrap.offer_name_color_s,
                brightness: settings_gift_wrap.offer_name_color_b
            },
            offer_name_color_hex: settings_gift_wrap.offer_name_color_hex.replace(/\#/, ""),
            offer_price: settings_gift_wrap.offer_price.toString(),
            offer_price_color: {
                hue: settings_gift_wrap.offer_price_color_h,
                brightness: settings_gift_wrap.offer_price_color_b,
                saturation: settings_gift_wrap.offer_price_color_s
            },
            offer_price_color_hex: settings_gift_wrap.offer_price_color_hex.replace(/\#/, ""),
            offer_compare_price: settings_gift_wrap.offer_compare_price.toString(),
            offer_compare_price_color: {
                hue: settings_gift_wrap.offer_compare_price_color_h,
                saturation: settings_gift_wrap.offer_compare_price_color_s,
                brightness: settings_gift_wrap.offer_compare_price_color_b
            },
            offer_compare_price_color_hex: settings_gift_wrap.offer_compare_price_color_hex.replace(/\#/, ""),
            featured_product_shopify_id: settings_gift_wrap.featured_product_shopify_id,
            featured_product_shopify_handle: settings_gift_wrap.featured_product_shopify_handle,
            featured_product_shopify_title: settings_gift_wrap.featured_product_shopify_title,
            featured_product_shopify_originalSrc: settings_gift_wrap.featured_product_shopify_originalSrc,
            featured_product_shopify_id_variants: settings_gift_wrap.featured_product_shopify_id_variants,
            featured_product_shopify_title_variants: settings_gift_wrap.featured_product_shopify_title_variants,
            featured_product_title: settings_gift_wrap.featured_product_title,
            featured_product_title_bold: settings_gift_wrap.featured_product_title_bold,
            featured_product_show_image: settings_gift_wrap.featured_product_show_image,
            display_selling_color: {
                hue: settings_gift_wrap.display_selling_color_h,
                saturation: settings_gift_wrap.display_selling_color_s,
                brightness: settings_gift_wrap.display_selling_color_b
            },
            display_selling_color_hex: settings_gift_wrap.display_selling_color_hex.replace(/\#/, ""),
            display_compare_price_color: {
                hue: settings_gift_wrap.display_compare_price_color_h,
                saturation: settings_gift_wrap.display_compare_price_color_s,
                brightness: settings_gift_wrap.display_compare_price_color_b
            },
            display_compare_price_color_hex: settings_gift_wrap.display_compare_price_color_hex.replace(/\#/, ""),
            offer_font_size: settings_gift_wrap.offer_font_size,
            options_font_size: arr_options_font_size,
            options_transform: arr_options_transform,
            options_weight: arr_options_weight,
            options_border_radius: arr_options_radius,
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
        const stateData = {
            enabled_gift_wrap: +props.enabled_gift_wrap,
            product_type: props.product_type,
            gift_wrap_icon: props.gift_wrap_icon,
            gift_wrap_icon_color_h: props.gift_wrap_icon_color.hue,
            gift_wrap_icon_color_s: props.gift_wrap_icon_color.saturation,
            gift_wrap_icon_color_b: props.gift_wrap_icon_color.brightness,
            offer_name: props.offer_name,
            offer_name_color_h: props.offer_name_color.hue,
            offer_name_color_s: props.offer_name_color.saturation,
            offer_name_color_b: props.offer_name_color.brightness,
            offer_price: props.offer_price.toString(),
            offer_price_color_h: props.offer_price_color.hue,
            offer_price_color_s: props.offer_price_color.saturation,
            offer_price_color_b: props.offer_price_color.brightness,
            offer_compare_price: props.offer_compare_price.toString(),
            offer_compare_price_color_h: props.offer_compare_price_color.hue,
            offer_compare_price_color_s: props.offer_compare_price_color.saturation,
            offer_compare_price_color_b: props.offer_compare_price_color.brightness,
            featured_product_shopify_id: props.featured_product_shopify_id,
            featured_product_shopify_handle: props.featured_product_shopify_handle,
            featured_product_shopify_title: props.featured_product_shopify_title,
            featured_product_shopify_originalSrc: props.featured_product_shopify_originalSrc,
            featured_product_shopify_id_variants: props.featured_product_shopify_id_variants,
            featured_product_shopify_title_variants: props.featured_product_shopify_title_variants,
            featured_product_title: props.featured_product_title,
            featured_product_title_bold: props.featured_product_title_bold,
            featured_product_show_image: props.featured_product_show_image,
            display_selling_color_h: props.display_selling_color.hue,
            display_selling_color_s: props.display_selling_color.saturation,
            display_selling_color_b: props.display_selling_color.brightness,
            display_compare_price_color_h: props.display_compare_price_color.hue,
            display_compare_price_color_s: props.display_compare_price_color.saturation,
            display_compare_price_color_b: props.display_compare_price_color.brightness,
            offer_font_size: props.offer_font_size,
        };
        const dataGiftWrap = props.dataGiftWrap;
        if (dataGiftWrap !== null) {
            const pgw = dataGiftWrap.gift_wrap;
            const arr2 = {
                enabled_gift_wrap: pgw.enabled_gift_wrap,
                product_type: pgw.product_type,
                gift_wrap_icon: pgw.gift_wrap_icon,
                gift_wrap_icon_color_h: pgw.gift_wrap_icon_color_h,
                gift_wrap_icon_color_s: pgw.gift_wrap_icon_color_s,
                gift_wrap_icon_color_b: pgw.gift_wrap_icon_color_b,
                offer_name: pgw.offer_name,
                offer_name_color_h: pgw.offer_name_color_h,
                offer_name_color_s: pgw.offer_name_color_s,
                offer_name_color_b: pgw.offer_name_color_b,
                offer_price: pgw.offer_price.toString(),
                offer_price_color_h: pgw.offer_price_color_h,
                offer_price_color_s: pgw.offer_price_color_s,
                offer_price_color_b: pgw.offer_price_color_b,
                offer_compare_price: pgw.offer_compare_price.toString(),
                offer_compare_price_color_h: pgw.offer_compare_price_color_h,
                offer_compare_price_color_s: pgw.offer_compare_price_color_s,
                offer_compare_price_color_b: pgw.offer_compare_price_color_b,
                featured_product_shopify_id: pgw.featured_product_shopify_id,
                featured_product_shopify_handle: pgw.featured_product_shopify_handle,
                featured_product_shopify_title: pgw.featured_product_shopify_title,
                featured_product_shopify_originalSrc: pgw.featured_product_shopify_originalSrc,
                featured_product_shopify_id_variants: pgw.featured_product_shopify_id_variants,
                featured_product_shopify_title_variants: pgw.featured_product_shopify_title_variants,
                featured_product_title: pgw.featured_product_title,
                featured_product_title_bold: pgw.featured_product_title_bold,
                featured_product_show_image: pgw.featured_product_show_image,
                display_selling_color_h: pgw.display_selling_color_h,
                display_selling_color_s: pgw.display_selling_color_s,
                display_selling_color_b: pgw.display_selling_color_b,
                display_compare_price_color_h: pgw.display_compare_price_color_h,
                display_compare_price_color_s: pgw.display_compare_price_color_s,
                display_compare_price_color_b: pgw.display_compare_price_color_b,
                offer_font_size: pgw.offer_font_size,
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

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ gift_wrap: props.gift_wrap.enabled_gift_wrap });
    };

    updateGiftWrap = async (props) => {
        if (props) {

            if (props.enabled_gift_wrap == 1 && props.product_type === "specificProduct" && props.featured_product_shopify_id === "") {
                this.setState({ toast: true, messageError: 'Select product' })
                return false;
            }

            this.setState({
                loading: true
            });

            var offer_price_string = props.offer_price.replace('+', '').replace('-', '').replace('', '0');
            var offer_compare_price_string = props.offer_compare_price.replace('+', '').replace('-', '').replace('', '0');

            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_gift_wrap: props.enabled_gift_wrap,
                product_type: props.product_type,
                gift_wrap_icon: props.gift_wrap_icon,
                gift_wrap_icon_color_h: props.gift_wrap_icon_color.hue,
                gift_wrap_icon_color_s: props.gift_wrap_icon_color.saturation,
                gift_wrap_icon_color_b: props.gift_wrap_icon_color.brightness,
                gift_wrap_icon_color_hex: '#' + props.gift_wrap_icon_color_hex,
                offer_name: props.offer_name,
                offer_name_color_h: props.offer_name_color.hue,
                offer_name_color_s: props.offer_name_color.saturation,
                offer_name_color_b: props.offer_name_color.brightness,
                offer_name_color_hex: '#' + props.offer_name_color_hex,
                offer_price: offer_price_string,
                offer_price_color_h: props.offer_price_color.hue,
                offer_price_color_s: props.offer_price_color.saturation,
                offer_price_color_b: props.offer_price_color.brightness,
                offer_price_color_hex: '#' + props.offer_price_color_hex,
                offer_compare_price: offer_compare_price_string,
                offer_compare_price_color_h: props.offer_compare_price_color.hue,
                offer_compare_price_color_s: props.offer_compare_price_color.saturation,
                offer_compare_price_color_b: props.offer_compare_price_color.brightness,
                offer_compare_price_color_hex: '#' + props.offer_compare_price_color_hex,
                featured_product_shopify_id: props.featured_product_shopify_id,
                featured_product_shopify_handle: props.featured_product_shopify_handle,
                featured_product_shopify_title: props.featured_product_shopify_title,
                featured_product_shopify_originalSrc: props.featured_product_shopify_originalSrc,
                featured_product_shopify_id_variants: props.featured_product_shopify_id_variants,
                featured_product_shopify_title_variants: props.featured_product_shopify_title_variants,
                featured_product_title: props.featured_product_title,
                featured_product_title_bold: props.featured_product_title_bold,
                featured_product_show_image: props.featured_product_show_image,
                display_selling_color_h: props.display_selling_color.hue,
                display_selling_color_s: props.display_selling_color.saturation,
                display_selling_color_b: props.display_selling_color.brightness,
                display_selling_color_hex: '#' + props.display_selling_color_hex,
                display_compare_price_color_h: props.display_compare_price_color.hue,
                display_compare_price_color_s: props.display_compare_price_color.saturation,
                display_compare_price_color_b: props.display_compare_price_color.brightness,
                display_compare_price_color_hex: '#' + props.display_compare_price_color_hex,
                offer_font_size: props.offer_font_size,
            };

            const updateCartCoupon = await makePutPostRequest('/api/gift_wrap', method, requestBody, app);
            var messageError = '';
            if (updateCartCoupon.error && updateCartCoupon.message) {
                messageError = updateCartCoupon.message;
            };
            await this.getGigtWrap();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {

        this.iconPreview();

        const {
            money_format,
            resourcePicker,
            popoverGWIcon,
            popoverGWOfferName,
            popoverGWOfferPrice,
            popoverGWOfferComparePrice,
            messageError,
            loading,
            toast,
            modal_video_gift,
            modalIcon,
            dataGiftWrap,
            enabled_gift_wrap,
            product_type,
            gift_wrap_icon,
            gift_wrap_icon_svg,
            gift_wrap_icon_color,
            gift_wrap_icon_color_hex,
            offer_name,
            offer_name_color,
            offer_name_color_hex,
            offer_price,
            offer_price_color,
            offer_price_color_hex,
            offer_compare_price,
            offer_compare_price_color,
            offer_compare_price_color_hex,
            featured_product_shopify_id,
            featured_product_shopify_handle,
            featured_product_shopify_title,
            featured_product_shopify_originalSrc,
            featured_product_shopify_id_variants,
            featured_product_shopify_title_variants,
            featured_product_title,
            featured_product_title_bold,
            featured_product_show_image,
            display_selling_color,
            display_selling_color_hex,
            display_compare_price_color,
            display_compare_price_color_hex,
            offer_font_size,
            graphqlProduct,
            spinnerProduct,
            options_font_size,
            options_transform,
            options_weight,
            options_border_radius,
        } = this.state;
        const equals = this.validateData(this.state);

        const resourcePickerGiftWrap = !!resourcePicker ? <ResourcePicker
            resourceType="Product"
            selectMultiple={false}
            showVariants={true}
            allowMultiple={false}
            open={this.state.resourcePicker}
            onSelection={(resources) => this.handleSelection(resources)}
            onCancel={() => this.setState({ resourcePicker: false })}
        /> : null;

        const activatorModal = <div ref={this.yourRef}><Button primary onClick={() => this.changeStateBoolean("modalIcon")}>Select Icon</Button></div>

        const activator_offer_name =
            <ButtonColor click={() => { this.handlePopover("popoverGWOfferName") }} id='button_color_gw_offer_name' background={hsbToHex(offer_name_color)} />;

        const activator_offer_price =
            <ButtonColor click={() => { this.handlePopover("popoverGWOfferPrice") }} id='button_color_gw_offer_price' background={hsbToHex(offer_price_color)} />;

        const activator_offer_compare_price =
            <ButtonColor click={() => { this.handlePopover("popoverGWOfferComparePrice") }} id='button_color_gw_offer_compare_price' background={hsbToHex(offer_compare_price_color)} />;


        const activator_gift_wrap_icon_color =
            <ButtonColor click={() => { this.handlePopover("popoverGWIcon") }} id='button_color_gw_icon_color' background={hsbToHex(gift_wrap_icon_color)} />;


        const tagGiftWrap = !!featured_product_shopify_title_variants ? featured_product_shopify_title_variants.split(',').map((option) => (
            <Tag key={option}>
                {option}
            </Tag>
        )) : '';

        const selectProduct = featured_product_shopify_id === '' && spinnerProduct == false ? (
            <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                <Button fullWidth={true} onClick={() => this.setState({ resourcePicker: true })}>Select Product</Button>
            </InlineStack>) : (
            <div>
                <InlineStack align="end"><Button onClick={() => this.setState({ resourcePicker: true })} variant="plain">Change Product</Button></InlineStack>
                {spinnerProduct ?
                    <Spinner accessibilityLabel="Spinner" size="large" /> :
                    <BlockStack gap={500}>
                        <ResourceList
                            resourceName={{ singular: 'Product', plural: 'Products' }}
                            items={[
                                {
                                    id: featured_product_shopify_id,
                                    title: featured_product_shopify_title,
                                    image: featured_product_shopify_originalSrc
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
                                    <ResourceList.Item
                                        id={item.id}
                                        media={media}
                                        onClick={() => {
                                            this.setState({ resourcePicker: true })
                                        }}
                                    >
                                        {item.title}
                                    </ResourceList.Item>
                                );
                            }}
                        />
                    </BlockStack>
                }
                <InlineStack gap="400" wrap={false} /* blockAlign="center" align="center" */>
                    {tagGiftWrap}
                </InlineStack>
            </div>
        );

        const product_gift_wrap =
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Gift Wrap</Text>
                    <BlockStack gap={500}>
                        {product_type === 'customProduct' ? (
                            <div className='icon'>
                                <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                                    <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                                        <div id='content'>
                                        </div>
                                        <Modal
                                            activator={activatorModal}
                                            open={modalIcon}
                                            onClose={() => this.changeStateBoolean("modalIcon")}
                                            title="Select the icon of your preference"
                                            secondaryActions={[
                                                {
                                                    content: 'Cancel',
                                                    onAction: () => this.changeStateBoolean("modalIcon"),
                                                },
                                            ]}
                                        >
                                            <Modal.Section>
                                                <InlineGrid gap="400" columns={11}>
                                                    {dataGiftWrap.icons_settings.map((el, i) => (
                                                        <Button key={i} id={'button' + i} icon={el.icon} onClick={() => this.iconChange(el.icon, el.id)}></Button>
                                                    ))}
                                                </InlineGrid>
                                            </Modal.Section>
                                        </Modal>
                                    </InlineStack>
                                    <FieldColor
                                        labelColor={<Titles text='Quick Buy Button Icon Color' />}
                                        textValue={gift_wrap_icon_color_hex || '000000'}
                                        changeColorText={(value) => { this.handleOnChangeColor(value, "gift_wrap_icon_color_hex", "gift_wrap_icon_color") }}
                                        activePop={popoverGWIcon}
                                        activadorPop={activator_gift_wrap_icon_color}
                                        closePop={() => { this.handlePopover("popoverGWIcon", 0) }}
                                        changeColorPicker={(value) => { this.handleColors(value, "gift_wrap_icon_color", "gift_wrap_icon_color_hex") }}
                                        colorPicker={gift_wrap_icon_color}
                                    />
                                </InlineStack >
                            </div>) :
                            selectProduct
                        }
                    </BlockStack>
                </BlockStack>
            </Card>;

        const propertie_offer_name =
            <FieldColor
                labelColor={<Titles text={product_type === 'customProduct' ? 'Offer Name Color' : 'Title Color'} />}
                textValue={offer_name_color_hex || '000000'}
                changeColorText={(value) => { this.handleOnChangeColor(value, "offer_name_color_hex", "offer_name_color") }}
                activePop={popoverGWOfferName}
                activadorPop={activator_offer_name}
                closePop={() => { this.handlePopover("popoverGWOfferName", 0) }}
                changeColorPicker={(value) => { this.handleColors(value, "offer_name_color", "offer_name_color_hex") }}
                colorPicker={offer_name_color}
            />;



        const content_gift_wrap = <BlockStack gap={300}>
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">Product</Text>
                    <Select
                        label={<Titles text="Product type" />}
                        options={[
                            { label: 'Specific Product ', value: 'specificProduct' },
                            { label: 'Custom Product ', value: 'customProduct' }
                        ]}
                        value={product_type}
                        onChange={(value) => { this.handleChange(value, "product_type") }}
                    />
                </BlockStack>
            </Card>
            {product_gift_wrap}
        </BlockStack>;

        const text_title_gift_wrap = <div>The text in the middle of <InlineCode variation="code"> {"{{ Product-title "}{"}}"}
        </InlineCode> (curly suspenders), is the title of the product; do not delete.</div>

        const properties_gift_wrap =
            <BlockStack gap={500}>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Gift Wrap Text</Text>
                        <BlockStack gap={400}>
                            <TextField
                                label={<Titles text={product_type !== 'customProduct' ? 'Title' : 'Offer Name'} />}
                                autoComplete='false'
                                value={product_type !== 'customProduct' ? featured_product_title : offer_name}
                                onChange={(value) => { this.handleChange(value, product_type !== 'customProduct' ? 'featured_product_title' : 'offer_name') }}
                                helpText={product_type !== 'customProduct' ? text_title_gift_wrap : ''}
                            />
                            {propertie_offer_name}
                        </BlockStack>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Gift Wrap Offer Price</Text>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <TextField
                                label={<Titles text='Price' />}
                                inputMode="numeric"
                                min='1'
                                pattern="^[0-9]+"
                                autoComplete='false'
                                type='number'
                                prefix={currencyShop(money_format)}
                                value={this.state.offer_price.toString()}
                                onChange={(value) => { this.handleChange(value, "offer_price") }}
                            />
                            <FieldColor
                                labelColor={<Titles text='Price Color' />}
                                textValue={offer_price_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "offer_price_color_hex", "offer_price_color") }}
                                activePop={popoverGWOfferPrice}
                                activadorPop={activator_offer_price}
                                closePop={() => { this.handlePopover("popoverGWOfferPrice", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "offer_price_color", "offer_price_color_hex") }}
                                colorPicker={offer_price_color}
                            />
                        </InlineGrid>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Gift Wrap Offer Compare Price</Text>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <TextField
                                label={<Titles text='Compare Price' />}
                                inputMode="numeric"
                                min='1'
                                pattern="^[0-9]+"
                                autoComplete='false'
                                type='number'
                                prefix={currencyShop(money_format)}
                                value={offer_compare_price.toString()}
                                onChange={(value) => { this.handleChange(value, "offer_compare_price") }}
                            />
                            <FieldColor
                                labelColor={<Titles text='Compare Price Color' />}
                                textValue={offer_compare_price_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "offer_compare_price_color_hex", "offer_compare_price_color") }}
                                activePop={popoverGWOfferComparePrice}
                                activadorPop={activator_offer_compare_price}
                                closePop={() => { this.handlePopover("popoverGWOfferComparePrice", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "offer_compare_price_color", "offer_compare_price_color_hex") }}
                                colorPicker={offer_compare_price_color}
                            />
                        </InlineGrid>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">Font</Text>
                        <Select
                            label={<Titles text="Font Size" />}
                            options={options_font_size}
                            value={offer_font_size}
                            onChange={(value) => { this.handleChange(value, "offer_font_size") }}
                        />
                    </BlockStack>
                </Card>
            </BlockStack>;


        const activator_modal_video_gift = <div ref={this.yourRef}><Button icon={<Icon source={PlayIcon} />} onClick={() => {
            this.setState({ modal_video_gift: 1 });
        }}>Watch</Button></div>

        const modal_video_gift_wrap = modal_video_gift ?
            <div>
                <Modal
                    size="large"
                    activator={activator_modal_video_gift}
                    open={modal_video_gift}
                    onClose={() => { this.setState({ modal_video_gift: false }) }}
                    title="Gift Wrap"
                >
                    <Modal.Section>
                        <video width="100%" height="auto" controls autoPlay muted>
                            <source src={giftWrap} type='video/mp4' />
                            Your browser does not support HTML5.
                        </video>
                    </Modal.Section>
                </Modal>
            </div> : null;


        const title_toogle = <InlineStack gap="200" align="start" blockAlign="baseline">
            Gift Wrap
            <InlineStack gap="200" align="center" blockAlign="center">
                <Button icon={<Icon source={PlayIcon} />} onClick={() => {
                    this.setState({ modal_video_gift: 1 });
                }}>Watch</Button>
            </InlineStack>
        </InlineStack>

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
                {dataGiftWrap !== null ?
                    <BlockStack gap={500}>
                        <Toogle enabled={enabled_gift_wrap} title={title_toogle} description="You can offer a gift wrapping service to your clients. You can charge a flat fee or charge per product." stateText='The gift wrap is' activeToogle={() => this.changeStateBoolean('enabled_gift_wrap')}></Toogle>
                        {content_gift_wrap}
                        {properties_gift_wrap}
                        <ThisToast />
                        {modal_video_gift_wrap}
                        {resourcePickerGiftWrap}
                        <SaveBar equals={equals} loading={loading} action={() => this.updateGiftWrap(this.state)} discard={() => { this.discard(dataGiftWrap) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ gift_wrap: !stateNow });
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
    handleSelection = (resources) => {
        var arr_variants_ids = [], arr_variants_titles = [];
        this.setState({ resourcePicker: false, featured_product_shopify_title_variants: '', spinnerProduct: true });
        const idsFromResources = resources.selection.map((product) => product.id);
        resources.selection[0].variants.forEach(function (val) {
            arr_variants_ids.push(val.id.slice(-14));
            arr_variants_titles.push(val.title)
        });

        this.setState({
            graphqlProduct: resources.selection,
            featured_product_shopify_id: idsFromResources,
            featured_product_shopify_handle: resources.selection[0].handle,
            featured_product_shopify_title: resources.selection[0].title,
            featured_product_shopify_originalSrc: resources.selection[0].images.length > 0 ? resources.selection[0].images[0].originalSrc : 'https://cdn.shopify.com/s/files/1/3067/1988/t/11/assets/hs-no-image.gif',
            featured_product_shopify_id_variants: arr_variants_ids.toString(),
            featured_product_shopify_title_variants: arr_variants_titles.toString(),
            spinnerProduct: false
        })

        /* this.getSettingsGraphql(idsFromResources,arr_variants_ids,arr_variants_titles); */
    };
    iconChange = (icon_svg, icon_id) => {
        this.setState({
            modalIcon: 0,
            gift_wrap_icon: icon_id,
            gift_wrap_icon_svg: icon_svg
        });
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
export default GiftWrap;