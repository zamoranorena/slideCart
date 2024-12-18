import { Component } from "react";
import {
    Card,
    Divider,
    Text,
    Banner,
    Tag,
    Select,
    Button,
    ButtonGroup,
    Icon,
    InlineGrid,
    Checkbox,
    TextField,
    Toast,
    Box,
    BlockStack,
    InlineStack,
    hsbToHex,
    rgbToHsb,
    InlineCode
} from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { ProductIcon, DeleteIcon } from '@shopify/polaris-icons';
import colorconvert from 'color-convert';
import { CustomizeUpsells, ButtonColor, Toogle, SaveBar, Titles, ToolInfo, FieldColor, ToogleSkeleton, Section } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_radius,
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
    arr_options_mode_upsell,
    arr_options_upsell_qty,
    arr_options_upsell_autoplay_time,
    arr_options_mode_add_to_cart_upsell
} from '@utils/global'

class FreeItems extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverTiered: false,
            popoverTiered2: false,
            popoverTiered3: false,
            popoverTiered4: false,
            popoverTiered5: false,
            resourcePickerTiered: false,
            indiceTired: 0,
            activeModalCustomize: 0,
            dataCustomize: null,
            messageError: '',
            loading: true,
            toast: false,
            dataFreeItems: null,
            section_settings_free_items: 1,
            section_tiers_free_items: 1,
            enabled_tiered_free_items: null,
            tfi_mode_view: '',
            tfi_slides_per_view: null,
            tfi_slides_autoplay_time: null,
            tfi_mode_add_to_cart: '',
            tfi_section_heading: null,
            tfi_heading_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            tfi_heading_background_color_hex: null,
            tfi_heading_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            tfi_heading_text_color_hex: null,
            tfi_heading_bold_font: null,
            tfi_product_url_automatic: null,
            tfi_heading_font_size: null,

            tfi_lock_method: null,
            tfi_unlock_text: null,
            tfi_unlock_text_show: null,
            tfi_unlock_text_transform: null,
            tfi_unlock_text_font_size: null,
            tfi_unlock_text_font_weight: null,
            tfi_unlock_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            tfi_unlock_text_color_hex: null,
            tfi_unlock_bar_color_primary: {
                hue: null,
                saturation: null,
                brightness: null
            },
            tfi_unlock_bar_color_primary_hex: null,
            tfi_unlock_bar_color_secondary: {
                hue: null,
                saturation: null,
                brightness: null
            },
            tfi_unlock_bar_color_secondary_hex: null,
            tfi_unlock_bar_border_radius: null,


            tfi_calculate_based_on: null,
            tfi_locked_limit: '',
            tfi_unlocked_limit: '',
            tfi_show_quantity_box: null,
            tif_auto_add: null,
            tfi_only_product_tier: null,
            options_mode_upsell: [],
            options_upsell_qty: [],
            options_upsell_autoplay_time: [],
            options_mode_add_to_cart_upsell: [],
            values_tiered_free_items_tiers: [],
        };
    };

    componentDidMount() {
        this.getTiered();
    };

    getTiered = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_free_items', app);
        if (data && data.tiered_free_items !== undefined && data.tiered_free_items !== null) {
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
                dataFreeItems: data
            };
        };
        const tiered_free_items = data.tiered_free_items;
        const tiered_free_items_tiers = data.tiered_free_items_tiers;

        var labelTier = '';
        switch (tiered_free_items.tfi_calculate_based_on) {
            case 'cart_total_price':
                labelTier = 'Minimum cart value (in your stores default currency) to qualify for the offer'
                break;
            case 'cart_item_count':
                labelTier = 'Minimum quantity in cart'
                break;
            case 'cart_paid_items_count':
                labelTier = 'Minimum quantity in cart'
                break;
        };

        var values_tiered_free_items_tiers = [];
        if (tiered_free_items_tiers.length > 0) {
            for (let i = 0; i < tiered_free_items_tiers.length; i++) {
                values_tiered_free_items_tiers.push({
                    tfi_tier_amount_from: tiered_free_items_tiers[i].tfi_tier_amount_from,
                    tfi_tier_products: tiered_free_items_tiers[i].tfi_tier_products !== '' ? JSON.parse(tiered_free_items_tiers[i].tfi_tier_products) : [],
                    tfi_tier_name: tiered_free_items_tiers[i].tfi_tier_name,
                    tfi_tier_max_item: tiered_free_items_tiers[i].tfi_tier_max_item,
                    tfi_tier_hide_when_in_cart: tiered_free_items_tiers[i].tfi_tier_hide_when_in_cart,
                });
            };
        };

        var stateData = {
            popoverTiered: false,
            popoverTiered2: false,
            popoverTiered3: false,
            popoverTiered4: false,
            popoverTiered5: false,
            indiceTired: 0,
            messageError: '',
            loading: false,
            toast: false,
            enabled_tiered_free_items: tiered_free_items.enabled_tiered_free_items,
            tfi_mode_view: tiered_free_items.tfi_mode_view.toString(),
            tfi_slides_per_view: tiered_free_items.tfi_slides_per_view,
            tfi_slides_autoplay_time: tiered_free_items.tfi_slides_autoplay_time,
            tfi_mode_add_to_cart: tiered_free_items.tfi_mode_add_to_cart.toString(),
            tfi_section_heading: tiered_free_items.tfi_section_heading,
            tfi_heading_background_color:
            {
                hue: tiered_free_items.tfi_heading_background_color_h,
                saturation: tiered_free_items.tfi_heading_background_color_s,
                brightness: tiered_free_items.tfi_heading_background_color_b
            },
            tfi_heading_background_color_hex: tiered_free_items.tfi_heading_background_color_hex.replace(/\#/, ""),
            tfi_heading_text_color:
            {
                hue: tiered_free_items.tfi_heading_text_color_h,
                saturation: tiered_free_items.tfi_heading_text_color_s,
                brightness: tiered_free_items.tfi_heading_text_color_b
            },
            tfi_heading_text_color_hex: tiered_free_items.tfi_heading_text_color_hex.replace(/\#/, ""),
            tfi_heading_bold_font: tiered_free_items.tfi_heading_bold_font,
            tfi_product_url_automatic: tiered_free_items.tfi_product_url_automatic,
            tfi_heading_font_size: tiered_free_items.tfi_heading_font_size,

            tfi_lock_method: tiered_free_items.tfi_lock_method.toString(),
            tfi_unlock_text: tiered_free_items.tfi_unlock_text,
            tfi_unlock_text_show: tiered_free_items.tfi_unlock_text_show.toString(),
            tfi_unlock_text_transform: tiered_free_items.tfi_unlock_text_transform,
            tfi_unlock_text_font_size: tiered_free_items.tfi_unlock_text_font_size,
            tfi_unlock_text_font_weight: tiered_free_items.tfi_unlock_text_font_weight,
            tfi_unlock_text_color: {
                hue: tiered_free_items.tfi_unlock_text_color_h,
                saturation: tiered_free_items.tfi_unlock_text_color_s,
                brightness: tiered_free_items.tfi_unlock_text_color_b
            },
            tfi_unlock_text_color_hex: tiered_free_items.tfi_unlock_text_color_hex.replace(/\#/, ""),
            tfi_unlock_bar_color_primary: {
                hue: tiered_free_items.tfi_unlock_bar_color_primary_h,
                saturation: tiered_free_items.tfi_unlock_bar_color_primary_s,
                brightness: tiered_free_items.tfi_unlock_bar_color_primary_b
            },
            tfi_unlock_bar_color_primary_hex: tiered_free_items.tfi_unlock_bar_color_primary_hex.replace(/\#/, ""),
            tfi_unlock_bar_color_secondary: {
                hue: tiered_free_items.tfi_unlock_bar_color_secondary_h,
                saturation: tiered_free_items.tfi_unlock_bar_color_secondary_s,
                brightness: tiered_free_items.tfi_unlock_bar_color_secondary_b
            },
            tfi_unlock_bar_color_secondary_hex: tiered_free_items.tfi_unlock_bar_color_secondary_hex.replace(/\#/, ""),
            tfi_unlock_bar_border_radius: tiered_free_items.tfi_unlock_bar_border_radius,
            tfi_calculate_based_on: tiered_free_items.tfi_calculate_based_on,
            tfi_locked_limit: tiered_free_items.tfi_locked_limit.toString(),
            tfi_unlocked_limit: tiered_free_items.tfi_unlocked_limit.toString(),
            tfi_show_quantity_box: tiered_free_items.tfi_show_quantity_box,
            tif_auto_add: tiered_free_items.tif_auto_add,
            tfi_only_product_tier: tiered_free_items.tfi_only_product_tier,
            labelTier: labelTier,
            options_mode_upsell: arr_options_mode_upsell,
            options_upsell_qty: arr_options_upsell_qty,
            options_upsell_autoplay_time: arr_options_upsell_autoplay_time,
            options_mode_add_to_cart_upsell: arr_options_mode_add_to_cart_upsell,
            options_font_size: arr_options_font_size,
            options_transform: arr_options_transform,
            options_weight: arr_options_weight,
            options_border_radius: arr_options_radius,
            values_tiered_free_items_tiers: values_tiered_free_items_tiers
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
            enabled_tiered_free_items: +props.enabled_tiered_free_items,
            tfi_mode_view: props.tfi_mode_view.toString(),
            tfi_slides_per_view: parseInt(props.tfi_slides_per_view),
            tfi_slides_autoplay_time: parseInt(props.tfi_slides_autoplay_time),
            tfi_mode_add_to_cart: props.tfi_mode_add_to_cart.toString(),
            tfi_section_heading: props.tfi_section_heading,
            tfi_heading_background_color_h: props.tfi_heading_background_color.hue,
            tfi_heading_background_color_s: props.tfi_heading_background_color.saturation,
            tfi_heading_background_color_b: props.tfi_heading_background_color.brightness,
            tfi_heading_text_color_h: props.tfi_heading_text_color.hue,
            tfi_heading_text_color_s: props.tfi_heading_text_color.saturation,
            tfi_heading_text_color_b: props.tfi_heading_text_color.brightness,
            tfi_heading_bold_font: props.tfi_heading_bold_font,
            tfi_product_url_automatic: props.tfi_product_url_automatic,
            tfi_heading_font_size: props.tfi_heading_font_size,
            tfi_lock_method: props.tfi_lock_method,
            tfi_unlock_text: props.tfi_unlock_text,
            tfi_unlock_text_show: props.tfi_unlock_text_show,
            tfi_unlock_text_transform: props.tfi_unlock_text_transform,
            tfi_unlock_text_font_size: props.tfi_unlock_text_font_size,
            tfi_unlock_text_font_weight: props.tfi_unlock_text_font_weight,
            tfi_unlock_text_color_h: props.tfi_unlock_text_color.hue,
            tfi_unlock_text_color_s: props.tfi_unlock_text_color.saturation,
            tfi_unlock_text_color_b: props.tfi_unlock_text_color.brightness,
            tfi_unlock_bar_color_primary_h: props.tfi_unlock_bar_color_primary.hue,
            tfi_unlock_bar_color_primary_s: props.tfi_unlock_bar_color_primary.saturation,
            tfi_unlock_bar_color_primary_b: props.tfi_unlock_bar_color_primary.brightness,
            tfi_unlock_bar_color_secondary_h: props.tfi_unlock_bar_color_secondary.hue,
            tfi_unlock_bar_color_secondary_s: props.tfi_unlock_bar_color_secondary.saturation,
            tfi_unlock_bar_color_secondary_b: props.tfi_unlock_bar_color_secondary.brightness,
            tfi_unlock_bar_border_radius: props.tfi_unlock_bar_border_radius,
            tfi_calculate_based_on: props.tfi_calculate_based_on,
            tfi_locked_limit: props.tfi_locked_limit.toString(),
            tfi_unlocked_limit: props.tfi_unlocked_limit.toString(),
            tfi_show_quantity_box: props.tfi_show_quantity_box,
            tif_auto_add: props.tif_auto_add,
            tfi_only_product_tier: props.tfi_only_product_tier,
        };
        const dataFreeItems = props.dataFreeItems;
        if (dataFreeItems !== null) {
            const ptf = dataFreeItems.tiered_free_items;
            const data_tiered_free_items = {
                enabled_tiered_free_items: +ptf.enabled_tiered_free_items,
                tfi_mode_view: ptf.tfi_mode_view.toString(),
                tfi_slides_per_view: ptf.tfi_slides_per_view,
                tfi_slides_autoplay_time: ptf.tfi_slides_autoplay_time,
                tfi_mode_add_to_cart: ptf.tfi_mode_add_to_cart.toString(),
                tfi_section_heading: ptf.tfi_section_heading,
                tfi_heading_background_color_h: ptf.tfi_heading_background_color_h,
                tfi_heading_background_color_s: ptf.tfi_heading_background_color_s,
                tfi_heading_background_color_b: ptf.tfi_heading_background_color_b,
                tfi_heading_text_color_h: ptf.tfi_heading_text_color_h,
                tfi_heading_text_color_s: ptf.tfi_heading_text_color_s,
                tfi_heading_text_color_b: ptf.tfi_heading_text_color_b,
                tfi_heading_bold_font: ptf.tfi_heading_bold_font,
                tfi_product_url_automatic: ptf.tfi_product_url_automatic,
                tfi_heading_font_size: ptf.tfi_heading_font_size,

                tfi_lock_method: ptf.tfi_lock_method.toString(),
                tfi_unlock_text: ptf.tfi_unlock_text,
                tfi_unlock_text_show: ptf.tfi_unlock_text_show.toString(),
                tfi_unlock_text_transform: ptf.tfi_unlock_text_transform,
                tfi_unlock_text_font_size: ptf.tfi_unlock_text_font_size,
                tfi_unlock_text_font_weight: ptf.tfi_unlock_text_font_weight,
                tfi_unlock_text_color_h: ptf.tfi_unlock_text_color_h,
                tfi_unlock_text_color_s: ptf.tfi_unlock_text_color_s,
                tfi_unlock_text_color_b: ptf.tfi_unlock_text_color_b,
                tfi_unlock_bar_color_primary_h: ptf.tfi_unlock_bar_color_primary_h,
                tfi_unlock_bar_color_primary_s: ptf.tfi_unlock_bar_color_primary_s,
                tfi_unlock_bar_color_primary_b: ptf.tfi_unlock_bar_color_primary_b,
                tfi_unlock_bar_color_secondary_h: ptf.tfi_unlock_bar_color_secondary_h,
                tfi_unlock_bar_color_secondary_s: ptf.tfi_unlock_bar_color_secondary_s,
                tfi_unlock_bar_color_secondary_b: ptf.tfi_unlock_bar_color_secondary_b,
                tfi_unlock_bar_border_radius: ptf.tfi_unlock_bar_border_radius,


                tfi_calculate_based_on: ptf.tfi_calculate_based_on,
                tfi_locked_limit: ptf.tfi_locked_limit.toString(),
                tfi_unlocked_limit: ptf.tfi_unlocked_limit.toString(),
                tfi_show_quantity_box: ptf.tfi_show_quantity_box,
                tif_auto_add: ptf.tif_auto_add,
                tfi_only_product_tier: ptf.tfi_only_product_tier,
            };

            const stateData6 = this.state.values_tiered_free_items_tiers;
            var arr_tiered_free_items_tiers = [];
            for (let i = 0; i < dataFreeItems.tiered_free_items_tiers.length; i++) {
                arr_tiered_free_items_tiers.push(
                    {
                        tfi_tier_amount_from: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_amount_from,
                        tfi_tier_products: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_products,
                        tfi_tier_name: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_name,
                        tfi_tier_max_item: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_max_item,
                        tfi_tier_hide_when_in_cart: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_hide_when_in_cart,
                    }
                )
            };

            const k = stateData6;
            const l = arr_tiered_free_items_tiers;
            const arraysAreIdentical = this.arraysAreIdentical(k, l);

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_tiered_free_items;
            const b = stateData;

            if (!equals(a, b) || !arraysAreIdentical) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };
    arraysAreIdentical(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (var i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i].tfi_tier_amount_from !== arr2[i].tfi_tier_amount_from) {
                return false;
            }
            if (JSON.stringify(arr1[i].tfi_tier_products) !== arr2[i].tfi_tier_products) {
                return false;
            }
            if (arr1[i].tfi_tier_name !== arr2[i].tfi_tier_name) {
                return false;
            }
            if (+arr1[i].tfi_tier_max_item !== +arr2[i].tfi_tier_max_item) {
                return false;
            }
            if (+arr1[i].tfi_tier_hide_when_in_cart !== +arr2[i].tfi_tier_hide_when_in_cart) {
                return false;
            }
        };
        return true;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ free_items: props.tiered_free_items.enabled_tiered_free_items });
    };

    updateTierFreeItems = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;

            var values_tiered_free_items_tiers = props.values_tiered_free_items_tiers;
            var values_tiered_free_items_tiers_string = [];
            for (let i = 0; i < values_tiered_free_items_tiers.length; i++) {
                values_tiered_free_items_tiers_string.push({
                    tfi_tier_amount_from: values_tiered_free_items_tiers[i].tfi_tier_amount_from,
                    tfi_tier_products: JSON.stringify(values_tiered_free_items_tiers[i].tfi_tier_products),
                    tfi_tier_name: values_tiered_free_items_tiers[i].tfi_tier_name,
                    tfi_tier_max_item: values_tiered_free_items_tiers[i].tfi_tier_max_item,
                    tfi_tier_hide_when_in_cart: values_tiered_free_items_tiers[i].tfi_tier_hide_when_in_cart,
                });
            };

            const requestBody = {
                enabled_tiered_free_items: props.enabled_tiered_free_items,
                tfi_mode_view: parseInt(props.tfi_mode_view),
                tfi_slides_per_view: parseInt(props.tfi_slides_per_view),
                tfi_slides_autoplay_time: parseInt(props.tfi_slides_autoplay_time),
                tfi_mode_add_to_cart: parseInt(props.tfi_mode_add_to_cart),
                tfi_section_heading: props.tfi_section_heading,
                tfi_heading_background_color_h: props.tfi_heading_background_color.hue,
                tfi_heading_background_color_s: props.tfi_heading_background_color.saturation,
                tfi_heading_background_color_b: props.tfi_heading_background_color.brightness,
                tfi_heading_background_color_hex: '#' + props.tfi_heading_background_color_hex,
                tfi_heading_text_color_h: props.tfi_heading_text_color.hue,
                tfi_heading_text_color_s: props.tfi_heading_text_color.saturation,
                tfi_heading_text_color_b: props.tfi_heading_text_color.brightness,
                tfi_heading_text_color_hex: '#' + props.tfi_heading_text_color_hex,
                tfi_heading_bold_font: props.tfi_heading_bold_font,
                tfi_product_url_automatic: props.tfi_product_url_automatic,
                tfi_heading_font_size: props.tfi_heading_font_size,

                tfi_lock_method: props.tfi_lock_method,
                tfi_unlock_text: props.tfi_unlock_text,
                tfi_unlock_text_show: props.tfi_unlock_text_show,
                tfi_unlock_text_transform: props.tfi_unlock_text_transform,
                tfi_unlock_text_font_size: props.tfi_unlock_text_font_size,
                tfi_unlock_text_font_weight: props.tfi_unlock_text_font_weight,
                tfi_unlock_text_color_h: props.tfi_unlock_text_color.hue,
                tfi_unlock_text_color_s: props.tfi_unlock_text_color.saturation,
                tfi_unlock_text_color_b: props.tfi_unlock_text_color.brightness,
                tfi_unlock_text_color_hex: '#' + props.tfi_unlock_text_color_hex,
                tfi_unlock_bar_color_primary_h: props.tfi_unlock_bar_color_primary.hue,
                tfi_unlock_bar_color_primary_s: props.tfi_unlock_bar_color_primary.saturation,
                tfi_unlock_bar_color_primary_b: props.tfi_unlock_bar_color_primary.brightness,
                tfi_unlock_bar_color_primary_hex: '#' + props.tfi_unlock_bar_color_primary_hex,
                tfi_unlock_bar_color_secondary_h: props.tfi_unlock_bar_color_secondary.hue,
                tfi_unlock_bar_color_secondary_s: props.tfi_unlock_bar_color_secondary.saturation,
                tfi_unlock_bar_color_secondary_b: props.tfi_unlock_bar_color_secondary.brightness,
                tfi_unlock_bar_color_secondary_hex: '#' + props.tfi_unlock_bar_color_secondary_hex,
                tfi_unlock_bar_border_radius: props.tfi_unlock_bar_border_radius,
                tfi_calculate_based_on: props.tfi_calculate_based_on,
                tfi_locked_limit: parseInt(props.tfi_locked_limit),
                tfi_unlocked_limit: parseInt(props.tfi_unlocked_limit),
                tfi_show_quantity_box: props.tfi_show_quantity_box,
                tif_auto_add: props.tif_auto_add,
                tfi_only_product_tier: props.tfi_only_product_tier,
                update_tiered_free_items_tiers: !this.equalsTiered(),
                values_tiered_free_items_tiers: values_tiered_free_items_tiers_string,
            };
            console.log(props)
            const updateFreeItems = await makePutPostRequest('/api/free_items', method, requestBody, app);
            var messageError = '';
            if (updateFreeItems.error && updateFreeItems.message) {
                messageError = updateFreeItems.message;
            };
            await this.getTiered();
            this.setState({ toast: true, messageError: messageError })
        };
    };


    render() {
        const {
            popoverTiered,
            popoverTiered2,
            popoverTiered3,
            popoverTiered4,
            popoverTiered5,
            resourcePickerTiered,
            activeModalCustomize,
            messageError,
            loading,
            toast,
            dataFreeItems,
            section_settings_free_items,
            section_tiers_free_items,
            enabled_tiered_free_items,
            tfi_mode_view,
            tfi_slides_per_view,
            tfi_slides_autoplay_time,
            tfi_mode_add_to_cart,
            tfi_section_heading,
            tfi_heading_background_color,
            tfi_heading_background_color_hex,
            tfi_heading_text_color,
            tfi_heading_text_color_hex,
            tfi_heading_bold_font,
            tfi_product_url_automatic,
            tfi_heading_font_size,
            tfi_lock_method,
            tfi_unlock_text,
            tfi_unlock_text_show,
            tfi_unlock_text_transform,
            tfi_unlock_text_font_size,
            tfi_unlock_text_font_weight,
            tfi_unlock_text_color,
            tfi_unlock_text_color_hex,
            tfi_unlock_bar_color_primary,
            tfi_unlock_bar_color_primary_hex,
            tfi_unlock_bar_color_secondary,
            tfi_unlock_bar_color_secondary_hex,
            tfi_unlock_bar_border_radius,
            tfi_calculate_based_on,
            tfi_locked_limit,
            tfi_unlocked_limit,
            tfi_show_quantity_box,
            tif_auto_add,
            tfi_only_product_tier,
            labelTier,
            options_mode_upsell,
            options_upsell_qty,
            options_upsell_autoplay_time,
            options_mode_add_to_cart_upsell,
            options_font_size,
            options_transform,
            options_weight,
            options_border_radius,
            values_tiered_free_items_tiers
        } = this.state;

        const equals = this.validateData(this.state);

        const buttonCustomize = <Button /* fullWidth */ variant="primary" tone="success" onClick={() => { this.functionModal() }}>Customize</Button>

        const text_tiered = <div>
            Do not delete this text: <InlineCode> {"{{amount"}{"}}"}
            </InlineCode> which is where the amount to unlock will go.</div>;

        const activator_tfi_heading_background =
            <ButtonColor click={() => { this.handlePopover("popoverTiered") }} id='tiered1' background={hsbToHex(tfi_heading_background_color)} />;

        const activator_tfi_heading_text =
            <ButtonColor click={() => { this.handlePopover("popoverTiered2") }} id='tiered2' background={hsbToHex(tfi_heading_text_color)} />;

        const activator_tfi_unlock_text_color =
            <ButtonColor click={() => { this.handlePopover("popoverTiered3") }} id='tiered3' background={hsbToHex(tfi_unlock_text_color)} />;

        const activator_tfi_unlock_bar_color_primary =
            <ButtonColor click={() => { this.handlePopover("popoverTiered4") }} id='tiered4' background={hsbToHex(tfi_unlock_bar_color_primary)} />;

        const activator_tfi_unlock_bar_color_secondary =
            <ButtonColor click={() => { this.handlePopover("popoverTiered5") }} id='tiered5' background={hsbToHex(tfi_unlock_bar_color_secondary)} />;


        const content_tiered_free_items =
            <Section title={'Tiered Properties'} this_section={() => { this.setState({ section_settings_free_items: !section_settings_free_items }) }} status_source={section_settings_free_items}>
                <Box paddingBlockStart='300' paddingBlockEnd='200' width="100%">
                    <BlockStack gap={400}>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <TextField
                                autoComplete='off'
                                maxLength={250}
                                label={<Titles text='Section Heading' />}
                                value={tfi_section_heading}
                                onChange={(value) => { this.handleChange(value, "tfi_section_heading") }}
                            />
                            <Select
                                label={<Titles text='Title Text Font Size:' />}//NEW 
                                options={options_font_size}//NEW
                                value={tfi_heading_font_size}//NEW
                                onChange={(value) => { this.handleChange(value, "tfi_heading_font_size") }}//NEW
                            />
                        </InlineGrid>

                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <Select
                                label={<Titles text='Add To Cart Mode' />}
                                options={options_mode_add_to_cart_upsell}
                                value={tfi_mode_add_to_cart}
                                onChange={(value) => { this.handleChange(value, "tfi_mode_add_to_cart") }}
                            />
                            <Select
                                label={<Titles text='View Mode Tiered' />}
                                options={options_mode_upsell}
                                value={tfi_mode_view}
                                onChange={(value) => { this.handleChange(value, "tfi_mode_view") }}
                            />
                            {!parseInt(this.state.tfi_mode_view) ?
                                <Select
                                    label={<Titles text='Quantity of upsell products for each frame' />}
                                    options={options_upsell_qty}
                                    value={parseInt(tfi_slides_per_view)}
                                    onChange={(value) => { this.handleChange(value, "tfi_slides_per_view") }}
                                />
                                : ''}
                            {!parseInt(tfi_mode_view) ?
                                <Select
                                    label={<ToolInfo title={<Titles text='Upsell AutoPlay Time' />} description="If 0 is selected, autoplay does not start." />}
                                    options={options_upsell_autoplay_time}
                                    value={parseInt(tfi_slides_autoplay_time)}
                                    onChange={(value) => { this.handleChange(value, "tfi_slides_autoplay_time") }}
                                /> : ''}
                            <FieldColor
                                labelColor={<Titles text='Heading background color' />}
                                textValue={tfi_heading_background_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "tfi_heading_background_color_hex", "tfi_heading_background_color") }}
                                activePop={popoverTiered}
                                activadorPop={activator_tfi_heading_background}
                                closePop={() => { this.handlePopover("popoverTiered", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "tfi_heading_background_color", "tfi_heading_background_color_hex") }}
                                colorPicker={tfi_heading_background_color}
                            />
                            <FieldColor
                                labelColor={<Titles text='Heading text color' />}
                                textValue={tfi_heading_text_color_hex || 'ffffff'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "tfi_heading_text_color_hex", "tfi_heading_text_color") }}
                                activePop={popoverTiered2}
                                activadorPop={activator_tfi_heading_text}
                                closePop={() => { this.handlePopover("popoverTiered2", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "tfi_heading_text_color", "tfi_heading_text_color_hex") }}
                                colorPicker={tfi_heading_text_color}
                            />
                            <Checkbox
                                label={<Titles text='Add bold font for heading' />}
                                checked={tfi_heading_bold_font}
                                onChange={() => this.changeStateBoolean("tfi_heading_bold_font")}
                            />
                            <Checkbox
                                label={<Titles text='Add url to product title' />}
                                checked={tfi_product_url_automatic}
                                onChange={() => this.changeStateBoolean("tfi_product_url_automatic")}
                            />
                        </InlineGrid>

                        <Divider borderColor='border-hover' />
                        <Text as="h1" variant="headingMd">Unlock Bar</Text>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <Select
                                label={<Titles text='Lock Design:' />}
                                options={[
                                    { label: 'Progress Bar', value: '0' },
                                    { label: 'Circle Progress', value: '1' }
                                ]}
                                value={tfi_lock_method}
                                onChange={(value) => { this.handleChange(value, "tfi_lock_method") }}
                            />
                            <Select
                                label={<Titles text='Show price:' />}
                                options={[
                                    { label: 'See text total unlock', value: '0' },
                                    { label: 'See text remaining unlock', value: '1' }
                                ]}
                                value={tfi_unlock_text_show}
                                onChange={(value) => { this.handleChange(value, "tfi_unlock_text_show") }}
                            />
                        </InlineGrid>
                        <TextField
                            autoComplete='off'
                            maxLength={250}
                            label={<Titles text='Text that accompanies the bar (do not place quantity/price)' />}
                            helpText={text_tiered}
                            value={tfi_unlock_text}
                            onChange={(value) => { this.handleChange(value, "tfi_unlock_text") }}
                        />
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 3 }}>
                            <Select
                                label={<Titles text='Text Transform:' />}//NEW
                                options={options_transform}//NEW
                                value={tfi_unlock_text_transform}//NEW
                                onChange={(value) => { this.handleChange(value, "tfi_unlock_text_transform") }}//NEW
                            />
                            <Select
                                label={<Titles text='Font Size:' />}//NEW
                                options={options_font_size}//NEW
                                value={tfi_unlock_text_font_size}//NEW
                                onChange={(value) => { this.handleChange(value, "tfi_unlock_text_font_size") }}//NEW
                            />
                            <Select
                                label={<Titles text='Font Weight:' />}//NEW
                                options={options_weight}//NEW
                                value={tfi_unlock_text_font_weight}//NEW
                                onChange={(value) => { this.handleChange(value, "tfi_unlock_text_font_weight") }}//NEW
                            />
                        </InlineGrid>
                        <FieldColor
                            labelColor={<Titles text='Bar Text Color:' />}
                            textValue={tfi_unlock_text_color_hex || '000000'}
                            changeColorText={(value) => { this.handleOnChangeColor(value, "tfi_unlock_text_color_hex", "tfi_unlock_text_color") }}
                            activePop={popoverTiered3}
                            activadorPop={activator_tfi_unlock_text_color}
                            closePop={() => { this.handlePopover("popoverTiered3", 0) }}
                            changeColorPicker={(value) => { this.handleColors(value, "tfi_unlock_text_color", "tfi_unlock_text_color_hex") }}
                            colorPicker={tfi_unlock_text_color}
                        />
                        <FieldColor
                            labelColor={<Titles text='Main Bar Color:' />}
                            textValue={tfi_unlock_bar_color_primary_hex || '000000'}
                            changeColorText={(value) => { this.handleOnChangeColor(value, "tfi_unlock_bar_color_primary_hex", "tfi_unlock_bar_color_primary") }}
                            activePop={popoverTiered4}
                            activadorPop={activator_tfi_unlock_bar_color_primary}
                            closePop={() => { this.handlePopover("popoverTiered4", 0) }}
                            changeColorPicker={(value) => { this.handleColors(value, "tfi_unlock_bar_color_primary", "tfi_unlock_bar_color_primary_hex") }}
                            colorPicker={tfi_unlock_bar_color_primary}
                        />
                        <FieldColor
                            labelColor={<Titles text='Bar Background Color:' />}
                            textValue={tfi_unlock_bar_color_secondary_hex || 'cccccc'}
                            changeColorText={(value) => { this.handleOnChangeColor(value, "tfi_unlock_bar_color_secondary_hex", "tfi_unlock_bar_color_secondary") }}
                            activePop={popoverTiered5}
                            activadorPop={activator_tfi_unlock_bar_color_secondary}
                            closePop={() => { this.handlePopover("popoverTiered5", 0) }}
                            changeColorPicker={(value) => { this.handleColors(value, "tfi_unlock_bar_color_secondary", "tfi_unlock_bar_color_secondary_hex") }}
                            colorPicker={tfi_unlock_bar_color_secondary}
                        />
                        <Select
                            label={<Titles text='Bar Border Radius' />}
                            options={options_border_radius}
                            value={tfi_unlock_bar_border_radius}
                            onChange={(value) => this.handleChange(value, "tfi_unlock_bar_border_radius")}
                        />
                        <Divider borderColor='border-hover' />
                        <Select
                            label={<Titles text='Calculate free products based on' />}
                            options={[
                                { label: 'SubTotal Cart', value: 'cart_total_price' },
                                { label: 'Total QTY of all items in cart', value: 'cart_item_count' },
                                { label: 'Total QTY of items in cart over $0 only', value: 'cart_paid_items_count' },
                            ]}
                            value={tfi_calculate_based_on}
                            onChange={(value) => { this.handleChange(value, "tfi_calculate_based_on") }}
                        />
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                            <TextField
                                type="number"
                                inputMode="numeric"
                                min='1'
                                autoComplete='off'
                                pattern="^[0-9]+"
                                label={<Titles text='Limit no. of unqualified products to display' />}
                                value={tfi_locked_limit.toString() || 1}
                                onChange={(value) => { this.handleChange(value, "tfi_locked_limit") }}
                            />
                            <TextField
                                autoComplete='off'
                                type='number'
                                inputMode="numeric"
                                pattern="^[0-9]+"
                                min='1'
                                label={<Titles text='Limit no. of qualified products to display' />}
                                value={tfi_unlocked_limit.toString() || 1}
                                onChange={(value) => { this.handleChange(value, "tfi_unlocked_limit") }}
                            />
                            <Checkbox
                                label={<Titles text='Show Quantity Box In Tiered' />}
                                checked={tfi_show_quantity_box}
                                onChange={() => { this.changeStateBoolean("tfi_show_quantity_box") }}
                            />
                            <Checkbox
                                label={<Titles text="Automatically add the qualified product(s) to customer's cart?" />}
                                checked={tif_auto_add}
                                onChange={() => { this.changeStateBoolean("tif_auto_add") }}
                            />
                            <Checkbox
                                label={<Titles text="You can only add a single product from the entire tier" />}
                                helpText='You should not have the automatic add option activated.'
                                checked={tfi_only_product_tier}
                                onChange={() => { this.changeStateBoolean("tfi_only_product_tier") }}
                            />
                        </InlineGrid>
                        {buttonCustomize}
                    </BlockStack>
                </Box>
            </Section>;

        const resourcePicker = resourcePickerTiered ? <ResourcePicker
            resourceType="Product"
            selectMultiple={true}
            showVariants={true}
            open={resourcePickerTiered}
            onSelection={(resources) => this.handleSelectionTiered(resources)}
            onCancel={() => this.setState({ resourcePickerTiered: false })}
        /> : null;

        const button_add_tier = <Button onClick={() => this.addClick()} tone='success' variant="primary">
            {values_tiered_free_items_tiers.length > 0 ? 'Add new Tier' : 'Create a Tier'}
        </Button>;

        const content_tiered_free_items_tiers =
            <Section title={'Free items Tiers'} this_section={() => { this.setState({ section_tiers_free_items: !section_tiers_free_items }) }} status_source={section_tiers_free_items}>
                <Box paddingBlockStart='300' paddingBlockEnd='200' width="100%">
                    <BlockStack gap={200}>
                        <Box width="100%">
                            <InlineStack
                                gap="1200"
                                align="space-between"
                                blockAlign="center"
                                wrap={false}
                            >
                                {values_tiered_free_items_tiers.length < 1 ?
                                    <Box minWidth="fit-content">
                                        <InlineStack align="end">
                                            {button_add_tier}
                                        </InlineStack>
                                    </Box> : ''}

                            </InlineStack>
                        </Box>
                        {this.state.values_tiered_free_items_tiers.length > 0 ? this.state.values_tiered_free_items_tiers.map((el, i) => (
                            <Box key={i}>
                                <Box paddingBlockStart='100' /* paddingBlockEnd='300' */ width="100%">
                                    <InlineStack
                                        gap="600"
                                        align="space-between"
                                        blockAlign="start"
                                        wrap={false}
                                    >
                                        <Text as="h1" variant="headingMd">{`Tier  ` + parseInt(i + 1, 10)}</Text>
                                        <Box minWidth="fit-content">
                                            <InlineStack align="end">
                                                <ButtonGroup><div onClick={() => this.setState({ resourcePickerTiered: true, indiceTired: i })} ><Button icon={<Icon source={ProductIcon} tone="success" />} variant="plain" tone="success"></Button></div></ButtonGroup>
                                                <ButtonGroup><div onClick={() => this.removeClick(i)}><Button icon={<Icon source={DeleteIcon} tone="critical" />} variant="plain" tone="critical"></Button></div>
                                                </ButtonGroup>
                                            </InlineStack>
                                        </Box>
                                    </InlineStack>
                                </Box>

                                <BlockStack key={i} gap={400}>
                                    <TextField
                                        autoComplete='off'
                                        type='number'
                                        maxLength={250}
                                        min={1}
                                        label={<Titles text={labelTier} />}
                                        value={el.tfi_tier_amount_from || 1}
                                        onChange={(value) => { this.handleChanges(value, i, "tfi_tier_amount_from") }}
                                    />
                                    <TextField
                                        autoComplete='off'
                                        label={<Titles text='Tier Name' />}
                                        maxLength={250}
                                        min={1}
                                        value={el.tfi_tier_name || "0"}
                                        onChange={(value) => { this.handleChanges(value, i, "tfi_tier_name") }}
                                    />
                                    {el.tfi_tier_products.length > 0 ?
                                        <InlineStack wrap>
                                            {el.tfi_tier_products.map((tag, x) => <Box key={tag} padding={200}><Tag onRemove={() => this.removeTagCart(x, i)} key={tag}>{tag}</Tag></Box>)}
                                        </InlineStack>
                                        : ''
                                    }
                                    <Checkbox
                                        label={<Titles text='Customer can only pick 1 item from this tier.' />}
                                        helpText='If ticked, none of the item from this tier will show up when any of the above item is present in cart.'
                                        checked={el.tfi_tier_max_item}
                                        onChange={(value) => { this.handleChanges(value, i, "tfi_tier_max_item") }}
                                    />
                                    <Checkbox
                                        label={<Titles text="Don't show an item if it is already in cart." />}
                                        helpText='Note: The item is always hidden if the price of item in cart is zero.'
                                        checked={el.tfi_tier_hide_when_in_cart}
                                        onChange={(value) => { this.handleChanges(value, i, "tfi_tier_hide_when_in_cart") }}
                                    />
                                    {el.tfi_tier_products.length < 1 ?
                                        <Banner
                                            tone="warning"
                                        >
                                            <p>
                                                You haven't selected any product for this tier. <Button variant="plain" onClick={() => this.setState({ resourcePickerTiered: true, indiceTired: i })} plain>Click here</Button> to select now.
                                            </p>
                                        </Banner>
                                        : ''}
                                    {this.state.values_tiered_free_items_tiers.length > 1 && i != (this.state.values_tiered_free_items_tiers.length - 1) ? <Divider borderColor='border-hover' /> : ''}
                                </BlockStack>
                            </Box>
                        )) : ''}
                        {values_tiered_free_items_tiers.length >= 1 ?
                            < InlineStack align="end" >
                                {button_add_tier}
                            </InlineStack > : ''}
                    </BlockStack>
                </Box>
            </Section>


        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Tiered Free Items updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataFreeItems !== null ?
                    <BlockStack gap={500}>
                        <Toogle enabled={enabled_tiered_free_items} title='Tiered Free Items ( BETA )' description="Offer free items. This function will only show the items for which they are selectable in the cart drawer. Important: For the item to show for free, you need to set the offer to Shopify Automatic Discounts." stateText='The Tiered Free Items are' activeToogle={() => this.changeStateBoolean('enabled_tiered_free_items')}>
                        </Toogle>
                        {content_tiered_free_items_tiers}
                        {content_tiered_free_items}
                        <ThisToast />
                        <SaveBar
                            equals={equals}
                            loading={loading}
                            action={() => this.updateTierFreeItems(this.state)}
                            discard={() => { this.discard(dataFreeItems) }}
                        />
                        {resourcePicker}
                        {activeModalCustomize ? <CustomizeUpsells active={activeModalCustomize} closeModal={() => { this.setState({ activeModalCustomize: 0 }) }} /> : null}
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        if (thisSate === 'tfi_only_product_tier') {
            if (this.state.tif_auto_add) {
                this.setState({ tif_auto_add: 0 });
            };
        };
        if (thisSate === 'tif_auto_add') {
            if (this.state.tfi_only_product_tier) {
                this.setState({ tfi_only_product_tier: 0 });
            };
        };
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ free_items: !stateNow });
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
    handleChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        if (thisSate === 'tfi_calculate_based_on') {
            switch (value) {
                case 'cart_total_price':
                    stateData['labelTier'] = 'Minimum cart value (in your stores default currency) to qualify for the offer';
                    break;
                case 'cart_item_count':
                case 'cart_paid_items_count':
                    stateData['labelTier'] = 'Minimum quantity in cart';
                    break;
            }
        }

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
    functionModal = async () => {
        this.setState({
            activeModalCustomize: true,
        })
        if (this.state.dataCustomize === null) {
            const app = this.context;
            const dataCustomize = await makeGetRequest('/api/get_customize_upsell', app)
            if (dataCustomize && Object.keys(dataCustomize).length > 0) {
                this.setState({ dataCustomize: dataCustomize });
                //this.originalDataCustomizeUpsell(0,dataCustomize)
            };
        }

    };
    handleSelectionTiered = (resources) => {
        var arr_variants_ids = [];
        this.setState({ resourcePickerTiered: false });
        resources.selection.forEach(function (product) {
            var ids = '', handles = product.handle;
            product.variants.forEach(function (variants, indice) {
                var separator = indice + 1 == product.variants.length ? '' : ','
                ids = ids.concat(variants.id.replace('gid://shopify/ProductVariant/', '') + separator);
            })
            ids = handles.concat(':' + ids)
            arr_variants_ids.push(ids)
        });
        let values_tiered_free_items_tiers = [...this.state.values_tiered_free_items_tiers];
        const products = values_tiered_free_items_tiers[this.state.indiceTired]['tfi_tier_products'];
        var count = 0;
        var arr_products_fn = [];
        /*products.forEach(function(val){
         arr_variants_ids.forEach(function(variants){
           if(variants !== val)
           {
             arr_products_fn.push(variants)
           }
         });
        }); */
        arr_variants_ids.forEach(function (val) {
            if (products.includes(val) != true) {
                products.push(val)
                //arr_variants_ids.push(val)
            }
        });
        /* console.log('VALIDAR SI EL PRODUCTO YA ESTA INCLUIDO NO AGREGARLO') */
        values_tiered_free_items_tiers[this.state.indiceTired]['tfi_tier_products'] = products;
        this.setState({ values_tiered_free_items_tiers });
    };

    addClick = () => {
        this.setState(prevState => ({
            values_tiered_free_items_tiers: [...prevState.values_tiered_free_items_tiers, {
                tfi_tier_amount_from: '0',
                tfi_tier_products: [],
                tfi_tier_name: 'Tiered 1',
                tfi_tier_max_item: 0,
                tfi_tier_hide_when_in_cart: 0,
            }]
        }));
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 0)
    };

    removeClick = (i) => {
        if (this.state.values_tiered_free_items_tiers.length > 0) {
            let values_tiered_free_items_tiers = [...this.state.values_tiered_free_items_tiers];
            values_tiered_free_items_tiers.splice(i, 1);
            this.setState({ values_tiered_free_items_tiers });
        }
    };
    removeTagCart(x, i) {
        let values_tiered_free_items_tiers = [...this.state.values_tiered_free_items_tiers];
        values_tiered_free_items_tiers[i].tfi_tier_products.splice(x, 1);
        /* values_tiered_free_items_tiers.splice(i, 1);*/
        this.setState({ values_tiered_free_items_tiers });
    };

    handleChanges(value, indice, state) {
        let values_tiered_free_items_tiers = [...this.state.values_tiered_free_items_tiers];
        values_tiered_free_items_tiers[indice][state] = value;
        this.setState({ values_tiered_free_items_tiers });

    };
    equalsTiered = () => {
        var updateTiers = false;

        const dataFreeItems = this.state.dataFreeItems;
        if (dataFreeItems !== null) {
            const stateData = this.state.values_tiered_free_items_tiers;
            var arr_tiered_free_items_tiers = [];
            for (let i = 0; i < dataFreeItems.tiered_free_items_tiers.length; i++) {
                arr_tiered_free_items_tiers.push(
                    {
                        tfi_tier_amount_from: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_amount_from,
                        tfi_tier_products: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_products,
                        tfi_tier_name: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_name,
                        tfi_tier_max_item: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_max_item,
                        tfi_tier_hide_when_in_cart: dataFreeItems.tiered_free_items_tiers[i].tfi_tier_hide_when_in_cart,
                    }
                )
            };
            const k = stateData;
            const l = arr_tiered_free_items_tiers;
            const arraysAreIdentical = this.arraysAreIdentical(k, l);
            updateTiers = arraysAreIdentical
        }
        return updateTiers;
    };

}
export default FreeItems;