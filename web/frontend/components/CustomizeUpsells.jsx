import { Component } from "react";
import {
    Modal,
    Banner,
    FormLayout,
    Text,
    Button,
    Checkbox,
    Select,
    Toast,
    SkeletonBodyText,
    BlockStack,
    InlineGrid,
    Divider,
    rgbToHsb,
    hsbToHex
} from '@shopify/polaris';
import colorconvert from 'color-convert';
import {
    arr_options_transform,
    arr_options_weight,
    arr_options_font_size,
    arr_options_radius
} from '@utils/global'
import { Titles, FieldColor, ToolInfo, Loading } from "@components/";

import { Context } from '@shopify/app-bridge-react';

import { makeGetRequest, makePutPostRequest } from '@utils/Services';
export class CustomizeUpsells extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            dataCustomize: null,
            loading: false,
            toast: false,
            messageError: false,

            popoverBodyUpsell1: null,
            popoverBodyUpsell2: null,
            popoverBodyUpsell3: null,
            popoverBodyUpsell4: null,
            popoverBodyUpsell5: null,
            popoverBodyUpsell6: null,
            popoverBodyUpsell7: null,
            popoverBodyUpsell8: null,
            popoverBodyUpsell9: null,
            popoverBodyUpsell10: null,
            popoverBodyUpsell11: null,
            popoverBodyUpsell12: null,
            customize_body_upsell_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_background_color_hex: null,
            customize_body_upsell_border_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_border_color_hex: null,
            customize_body_upsell_arrows_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_arrows_color_hex: null,
            customize_body_upsell_prod_title_color_text: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_prod_title_color_text_hex: null,
            customize_body_upsell_prod_title_font_size: null,
            customize_body_upsell_prod_title_font_weigth: null,
            customize_body_upsell_prod_title_text_transform: null,
            customize_body_upsell_var_title_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_var_title_text_color_hex: null,
            customize_body_upsell_var_title_font_size: null,
            customize_body_upsell_var_title_font_weigth: null,
            customize_body_upsell_var_title_text_transform: null,
            customize_body_upsell_price_color_text: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_price_color_text_hex: null,
            customize_body_upsell_price_font_size: null,
            customize_body_upsell_price_font_weigth: null,
            customize_body_upsell_compare_price_color_text: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_compare_price_color_text_hex: null,
            customize_body_upsell_compare_price_font_size: null,
            customize_body_upsell_compare_price_font_weigth: null,
            /* SALE PRICE */
            customize_body_upsell_enabled_sale_price: null,
            customize_body_upsell_sale_price_color_text: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_sale_price_color_text_hex: null,
            customize_body_upsell_sale_price_font_size: null,
            customize_body_upsell_sale_price_font_weigth: null,
            /*  */
            customize_body_upsell_var_options_color_text: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_var_options_color_text_hex: null,
            customize_body_upsell_var_options_font_size: null,
            customize_body_upsell_var_options_font_weigth: null,
            customize_body_upsell_var_options_text_transform: null,
            customize_body_upsell_button_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_button_background_color_hex: null,
            customize_body_upsell_button_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_button_text_color_hex: null,
            customize_body_upsell_button_text_font_size: null,
            customize_body_upsell_button_text_font_weigth: null,
            customize_body_upsell_button_text_transform: null,
            customize_body_upsell_button_border_radius: null,
            customize_body_upsell_button_hov_background_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_button_hov_background_color_hex: null,
            customize_body_upsell_button_hov_text_color: {
                hue: null,
                saturation: null,
                brightness: null
            },
            customize_body_upsell_button_hov_text_color_hex: null,
        }
    }
    originalDataCustomizeUpsell = (identify, data) => {
        var myData = {};
        if (!identify) {
            myData = {
                dataCustomize: data
            };
            data = data.customize[0]
        };
        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            options_weight: arr_options_weight,
            options_transform: arr_options_transform,
            options_font_size: arr_options_font_size,
            options_radius: arr_options_radius,
            customize_body_upsell_background_color: {
                hue: data.customize_body_upsell_background_color_h,
                saturation: data.customize_body_upsell_background_color_s,
                brightness: data.customize_body_upsell_background_color_b
            },
            customize_body_upsell_background_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_background_color_h,
                        saturation: data.customize_body_upsell_background_color_s,
                        brightness: data.customize_body_upsell_background_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_border_color: {
                hue: data.customize_body_upsell_border_color_h,
                saturation: data.customize_body_upsell_border_color_s,
                brightness: data.customize_body_upsell_border_color_b
            },
            customize_body_upsell_border_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_border_color_h,
                        saturation: data.customize_body_upsell_border_color_s,
                        brightness: data.customize_body_upsell_border_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_arrows_color: {
                hue: data.customize_body_upsell_arrows_color_h,
                saturation: data.customize_body_upsell_arrows_color_s,
                brightness: data.customize_body_upsell_arrows_color_b
            },
            customize_body_upsell_arrows_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_arrows_color_h,
                        saturation: data.customize_body_upsell_arrows_color_s,
                        brightness: data.customize_body_upsell_arrows_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_prod_title_color_text: {
                hue: data.customize_body_upsell_prod_title_color_text_h,
                saturation: data.customize_body_upsell_prod_title_color_text_s,
                brightness: data.customize_body_upsell_prod_title_color_text_b
            },
            customize_body_upsell_prod_title_color_text_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_prod_title_color_text_h,
                        saturation: data.customize_body_upsell_prod_title_color_text_s,
                        brightness: data.customize_body_upsell_prod_title_color_text_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_prod_title_font_size: data.customize_body_upsell_prod_title_font_size,
            customize_body_upsell_prod_title_font_weigth: data.customize_body_upsell_prod_title_font_weigth,
            customize_body_upsell_prod_title_text_transform: data.customize_body_upsell_prod_title_text_transform,
            customize_body_upsell_var_title_text_color: {
                hue: data.customize_body_upsell_var_title_text_color_h,
                saturation: data.customize_body_upsell_var_title_text_color_s,
                brightness: data.customize_body_upsell_var_title_text_color_b
            },
            customize_body_upsell_var_title_text_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_var_title_text_color_h,
                        saturation: data.customize_body_upsell_var_title_text_color_s,
                        brightness: data.customize_body_upsell_var_title_text_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_var_title_font_size: data.customize_body_upsell_var_title_font_size,
            customize_body_upsell_var_title_font_weigth: data.customize_body_upsell_var_title_font_weigth,
            customize_body_upsell_var_title_text_transform: data.customize_body_upsell_var_title_text_transform,
            customize_body_upsell_price_color_text: {
                hue: data.customize_body_upsell_price_color_text_h,
                saturation: data.customize_body_upsell_price_color_text_s,
                brightness: data.customize_body_upsell_price_color_text_b
            },
            customize_body_upsell_price_color_text_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_price_color_text_h,
                        saturation: data.customize_body_upsell_price_color_text_s,
                        brightness: data.customize_body_upsell_price_color_text_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_price_font_size: data.customize_body_upsell_price_font_size,
            customize_body_upsell_price_font_weigth: data.customize_body_upsell_price_font_weigth,
            customize_body_upsell_compare_price_color_text: {
                hue: data.customize_body_upsell_compare_price_color_text_h,
                saturation: data.customize_body_upsell_compare_price_color_text_s,
                brightness: data.customize_body_upsell_compare_price_color_text_b
            },
            customize_body_upsell_compare_price_color_text_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_compare_price_color_text_h,
                        saturation: data.customize_body_upsell_compare_price_color_text_s,
                        brightness: data.customize_body_upsell_compare_price_color_text_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_compare_price_font_size: data.customize_body_upsell_compare_price_font_size,
            customize_body_upsell_compare_price_font_weigth: data.customize_body_upsell_compare_price_font_weigth,
            /* SALE PRICE */
            customize_body_upsell_enabled_sale_price: data.customize_body_upsell_enabled_sale_price,
            customize_body_upsell_sale_price_color_text: {
                hue: data.customize_body_upsell_sale_price_color_text_h,
                saturation: data.customize_body_upsell_sale_price_color_text_s,
                brightness: data.customize_body_upsell_sale_price_color_text_b
            },
            customize_body_upsell_sale_price_color_text_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_sale_price_color_text_h,
                        saturation: data.customize_body_upsell_sale_price_color_text_s,
                        brightness: data.customize_body_upsell_sale_price_color_text_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_sale_price_font_size: data.customize_body_upsell_sale_price_font_size,
            customize_body_upsell_sale_price_font_weigth: data.customize_body_upsell_sale_price_font_weigth,
            /*  */
            customize_body_upsell_var_options_color_text: {
                hue: data.customize_body_upsell_var_options_color_text_h,
                saturation: data.customize_body_upsell_var_options_color_text_s,
                brightness: data.customize_body_upsell_var_options_color_text_b
            },
            customize_body_upsell_var_options_color_text_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_var_options_color_text_h,
                        saturation: data.customize_body_upsell_var_options_color_text_s,
                        brightness: data.customize_body_upsell_var_options_color_text_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_var_options_font_size: data.customize_body_upsell_var_options_font_size,
            customize_body_upsell_var_options_font_weigth: data.customize_body_upsell_var_options_font_weigth,
            customize_body_upsell_var_options_text_transform: data.customize_body_upsell_var_options_text_transform,

            customize_body_upsell_button_background_color: {
                hue: data.customize_body_upsell_button_background_color_h,
                saturation: data.customize_body_upsell_button_background_color_s,
                brightness: data.customize_body_upsell_button_background_color_b
            },
            customize_body_upsell_button_background_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_button_background_color_h,
                        saturation: data.customize_body_upsell_button_background_color_s,
                        brightness: data.customize_body_upsell_button_background_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_button_text_color: {
                hue: data.customize_body_upsell_button_text_color_h,
                saturation: data.customize_body_upsell_button_text_color_s,
                brightness: data.customize_body_upsell_button_text_color_b
            },
            customize_body_upsell_button_text_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_button_text_color_h,
                        saturation: data.customize_body_upsell_button_text_color_s,
                        brightness: data.customize_body_upsell_button_text_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_button_text_font_size: data.customize_body_upsell_button_text_font_size,
            customize_body_upsell_button_text_font_weigth: data.customize_body_upsell_button_text_font_weigth,
            customize_body_upsell_button_text_transform: data.customize_body_upsell_button_text_transform,
            customize_body_upsell_button_border_radius: data.customize_body_upsell_button_border_radius,
            customize_body_upsell_button_hov_background_color: {
                hue: data.customize_body_upsell_button_hov_background_color_h,
                saturation: data.customize_body_upsell_button_hov_background_color_s,
                brightness: data.customize_body_upsell_button_hov_background_color_b
            },
            customize_body_upsell_button_hov_background_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_button_hov_background_color_h,
                        saturation: data.customize_body_upsell_button_hov_background_color_s,
                        brightness: data.customize_body_upsell_button_hov_background_color_b
                    }
                ).replace(/\#/, ""),
            customize_body_upsell_button_hov_text_color: {
                hue: data.customize_body_upsell_button_hov_text_color_h,
                saturation: data.customize_body_upsell_button_hov_text_color_s,
                brightness: data.customize_body_upsell_button_hov_text_color_b
            },
            customize_body_upsell_button_hov_text_color_hex:
                hsbToHex(
                    {
                        hue: data.customize_body_upsell_button_hov_text_color_h,
                        saturation: data.customize_body_upsell_button_hov_text_color_s,
                        brightness: data.customize_body_upsell_button_hov_text_color_b
                    }
                ).replace(/\#/, ""),
        };
        switch (identify) {
            case 0:
                stateData = Object.assign({}, stateData, myData);//CONCAT OBJECTS
                break;
            case 1:
                stateData = stateData;
                break;
            case 2:
                var modalSatte = {
                    activadorModalCustomize: false,
                    popoverBodyUpsell1: false
                }
                stateData = Object.assign({}, stateData, modalSatte);
                break;
        };
        this.setState(stateData)
    };
    getDataCustomize = async () => {
        const app = this.context;
        const dataCustomize = await makeGetRequest('/api/get_customize_upsell', app)
        if (dataCustomize && Object.keys(dataCustomize).length > 0) {
            this.originalDataCustomizeUpsell(0, dataCustomize)
            //this.originalDataCustomizeUpsell(0,dataCustomize)
        };
        /* if (!!module) {
            this.setState({
                activadorModalCustomize: true,
                module: module
            })
            if (this.state.dataCustomizeUpsell.length < 1) {
                const dataCustomize = await this.makeGetRequest('/getCustomizeUpsell');
                if (dataCustomize && Object.keys(dataCustomize).length > 0) {
                    this.originalDataCustomizeUpsell(0, dataCustomize)
                };
            }
            this.validateDataCustomizeUpsell();
        }; */

    };
    validateDataCustomizeUpsell = (props) => {
        var eq = true;
        const w = props || this.state;

        if (w.dataCustomize === null) {
            return eq
        }
        if (w.dataCustomize !== null) {
            const stateData = {
                customize_body_upsell_background_color_h: w.customize_body_upsell_background_color.hue,
                customize_body_upsell_background_color_s: w.customize_body_upsell_background_color.saturation,
                customize_body_upsell_background_color_b: w.customize_body_upsell_background_color.brightness,
                customize_body_upsell_border_color_h: w.customize_body_upsell_border_color.hue,
                customize_body_upsell_border_color_s: w.customize_body_upsell_border_color.saturation,
                customize_body_upsell_border_color_b: w.customize_body_upsell_border_color.brightness,
                customize_body_upsell_arrows_color_h: w.customize_body_upsell_arrows_color.hue,
                customize_body_upsell_arrows_color_s: w.customize_body_upsell_arrows_color.saturation,
                customize_body_upsell_arrows_color_b: w.customize_body_upsell_arrows_color.brightness,
                customize_body_upsell_prod_title_color_text_h: w.customize_body_upsell_prod_title_color_text.hue,
                customize_body_upsell_prod_title_color_text_s: w.customize_body_upsell_prod_title_color_text.saturation,
                customize_body_upsell_prod_title_color_text_b: w.customize_body_upsell_prod_title_color_text.brightness,
                customize_body_upsell_prod_title_font_size: w.customize_body_upsell_prod_title_font_size,
                customize_body_upsell_prod_title_font_weigth: w.customize_body_upsell_prod_title_font_weigth,
                customize_body_upsell_prod_title_text_transform: w.customize_body_upsell_prod_title_text_transform,
                customize_body_upsell_var_title_text_color_h: w.customize_body_upsell_var_title_text_color.hue,
                customize_body_upsell_var_title_text_color_s: w.customize_body_upsell_var_title_text_color.saturation,
                customize_body_upsell_var_title_text_color_b: w.customize_body_upsell_var_title_text_color.brightness,
                customize_body_upsell_var_title_font_size: w.customize_body_upsell_var_title_font_size,
                customize_body_upsell_var_title_font_weigth: w.customize_body_upsell_var_title_font_weigth,
                customize_body_upsell_var_title_text_transform: w.customize_body_upsell_var_title_text_transform,
                customize_body_upsell_price_color_text_h: w.customize_body_upsell_price_color_text.hue,
                customize_body_upsell_price_color_text_s: w.customize_body_upsell_price_color_text.saturation,
                customize_body_upsell_price_color_text_b: w.customize_body_upsell_price_color_text.brightness,
                customize_body_upsell_price_font_size: w.customize_body_upsell_price_font_size,
                customize_body_upsell_price_font_weigth: w.customize_body_upsell_price_font_weigth,
                customize_body_upsell_compare_price_color_text_h: w.customize_body_upsell_compare_price_color_text.hue,
                customize_body_upsell_compare_price_color_text_s: w.customize_body_upsell_compare_price_color_text.saturation,
                customize_body_upsell_compare_price_color_text_b: w.customize_body_upsell_compare_price_color_text.brightness,
                customize_body_upsell_compare_price_font_size: w.customize_body_upsell_compare_price_font_size,
                customize_body_upsell_compare_price_font_weigth: w.customize_body_upsell_compare_price_font_weigth,
                /* SALE */
                customize_body_upsell_enabled_sale_price: !!+w.customize_body_upsell_enabled_sale_price,
                customize_body_upsell_sale_price_color_text_h: w.customize_body_upsell_sale_price_color_text.hue,
                customize_body_upsell_sale_price_color_text_s: w.customize_body_upsell_sale_price_color_text.saturation,
                customize_body_upsell_sale_price_color_text_b: w.customize_body_upsell_sale_price_color_text.brightness,
                customize_body_upsell_sale_price_font_size: w.customize_body_upsell_sale_price_font_size,
                customize_body_upsell_sale_price_font_weigth: w.customize_body_upsell_sale_price_font_weigth,
                /*  */
                customize_body_upsell_button_background_color_h: w.customize_body_upsell_button_background_color.hue,
                customize_body_upsell_button_background_color_s: w.customize_body_upsell_button_background_color.saturation,
                customize_body_upsell_button_background_color_b: w.customize_body_upsell_button_background_color.brightness,
                customize_body_upsell_button_text_color_h: w.customize_body_upsell_button_text_color.hue,
                customize_body_upsell_button_text_color_s: w.customize_body_upsell_button_text_color.saturation,
                customize_body_upsell_button_text_color_b: w.customize_body_upsell_button_text_color.brightness,
                customize_body_upsell_button_text_font_size: w.customize_body_upsell_button_text_font_size,
                customize_body_upsell_button_text_font_weigth: w.customize_body_upsell_button_text_font_weigth,
                customize_body_upsell_button_text_transform: w.customize_body_upsell_button_text_transform,
                customize_body_upsell_button_border_radius: w.customize_body_upsell_button_border_radius,
                customize_body_upsell_button_hov_background_color_h: w.customize_body_upsell_button_hov_background_color.hue,
                customize_body_upsell_button_hov_background_color_s: w.customize_body_upsell_button_hov_background_color.saturation,
                customize_body_upsell_button_hov_background_color_b: w.customize_body_upsell_button_hov_background_color.brightness,
                customize_body_upsell_button_hov_text_color_h: w.customize_body_upsell_button_hov_text_color.hue,
                customize_body_upsell_button_hov_text_color_s: w.customize_body_upsell_button_hov_text_color.saturation,
                customize_body_upsell_button_hov_text_color_b: w.customize_body_upsell_button_hov_text_color.brightness,

            };
            const c = this.state.dataCustomize.customize[0];
            const dataCustomize = {
                customize_body_upsell_background_color_h: c.customize_body_upsell_background_color_h,
                customize_body_upsell_background_color_s: c.customize_body_upsell_background_color_s,
                customize_body_upsell_background_color_b: c.customize_body_upsell_background_color_b,
                customize_body_upsell_border_color_h: c.customize_body_upsell_border_color_h,
                customize_body_upsell_border_color_s: c.customize_body_upsell_border_color_s,
                customize_body_upsell_border_color_b: c.customize_body_upsell_border_color_b,
                customize_body_upsell_arrows_color_h: c.customize_body_upsell_arrows_color_h,
                customize_body_upsell_arrows_color_s: c.customize_body_upsell_arrows_color_s,
                customize_body_upsell_arrows_color_b: c.customize_body_upsell_arrows_color_b,
                customize_body_upsell_prod_title_color_text_h: c.customize_body_upsell_prod_title_color_text_h,
                customize_body_upsell_prod_title_color_text_s: c.customize_body_upsell_prod_title_color_text_s,
                customize_body_upsell_prod_title_color_text_b: c.customize_body_upsell_prod_title_color_text_b,
                customize_body_upsell_prod_title_font_size: c.customize_body_upsell_prod_title_font_size,
                customize_body_upsell_prod_title_font_weigth: c.customize_body_upsell_prod_title_font_weigth,
                customize_body_upsell_prod_title_text_transform: c.customize_body_upsell_prod_title_text_transform,
                customize_body_upsell_var_title_text_color_h: c.customize_body_upsell_var_title_text_color_h,
                customize_body_upsell_var_title_text_color_s: c.customize_body_upsell_var_title_text_color_s,
                customize_body_upsell_var_title_text_color_b: c.customize_body_upsell_var_title_text_color_b,
                customize_body_upsell_var_title_font_size: c.customize_body_upsell_var_title_font_size,
                customize_body_upsell_var_title_font_weigth: c.customize_body_upsell_var_title_font_weigth,
                customize_body_upsell_var_title_text_transform: c.customize_body_upsell_var_title_text_transform,
                customize_body_upsell_price_color_text_h: c.customize_body_upsell_price_color_text_h,
                customize_body_upsell_price_color_text_s: c.customize_body_upsell_price_color_text_s,
                customize_body_upsell_price_color_text_b: c.customize_body_upsell_price_color_text_b,
                customize_body_upsell_price_font_size: c.customize_body_upsell_price_font_size,
                customize_body_upsell_price_font_weigth: c.customize_body_upsell_price_font_weigth,
                customize_body_upsell_compare_price_color_text_h: c.customize_body_upsell_compare_price_color_text_h,
                customize_body_upsell_compare_price_color_text_s: c.customize_body_upsell_compare_price_color_text_s,
                customize_body_upsell_compare_price_color_text_b: c.customize_body_upsell_compare_price_color_text_b,
                customize_body_upsell_compare_price_font_size: c.customize_body_upsell_compare_price_font_size,
                customize_body_upsell_compare_price_font_weigth: c.customize_body_upsell_compare_price_font_weigth,
                /* SALE PRICE */
                customize_body_upsell_enabled_sale_price: !!+c.customize_body_upsell_enabled_sale_price,
                customize_body_upsell_sale_price_color_text_h: c.customize_body_upsell_sale_price_color_text_h,
                customize_body_upsell_sale_price_color_text_s: c.customize_body_upsell_sale_price_color_text_s,
                customize_body_upsell_sale_price_color_text_b: c.customize_body_upsell_sale_price_color_text_b,
                customize_body_upsell_sale_price_font_size: c.customize_body_upsell_sale_price_font_size,
                customize_body_upsell_sale_price_font_weigth: c.customize_body_upsell_sale_price_font_weigth,
                /*  */
                customize_body_upsell_button_background_color_h: c.customize_body_upsell_button_background_color_h,
                customize_body_upsell_button_background_color_s: c.customize_body_upsell_button_background_color_s,
                customize_body_upsell_button_background_color_b: c.customize_body_upsell_button_background_color_b,
                customize_body_upsell_button_text_color_h: c.customize_body_upsell_button_text_color_h,
                customize_body_upsell_button_text_color_s: c.customize_body_upsell_button_text_color_s,
                customize_body_upsell_button_text_color_b: c.customize_body_upsell_button_text_color_b,
                customize_body_upsell_button_text_font_size: c.customize_body_upsell_button_text_font_size,
                customize_body_upsell_button_text_font_weigth: c.customize_body_upsell_button_text_font_weigth,
                customize_body_upsell_button_text_transform: c.customize_body_upsell_button_text_transform,
                customize_body_upsell_button_border_radius: c.customize_body_upsell_button_border_radius,
                customize_body_upsell_button_hov_background_color_h: c.customize_body_upsell_button_hov_background_color_h,
                customize_body_upsell_button_hov_background_color_s: c.customize_body_upsell_button_hov_background_color_s,
                customize_body_upsell_button_hov_background_color_b: c.customize_body_upsell_button_hov_background_color_b,
                customize_body_upsell_button_hov_text_color_h: c.customize_body_upsell_button_hov_text_color_h,
                customize_body_upsell_button_hov_text_color_s: c.customize_body_upsell_button_hov_text_color_s,
                customize_body_upsell_button_hov_text_color_b: c.customize_body_upsell_button_hov_text_color_b,
            };
            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = dataCustomize;
            const b = stateData;
            if (equals(a, b)) {
                eq = true
            } else {
                eq = false
            }
            /*  if (!!w.loading) {
                 eq = true
             } */
        }
        return eq
    };
    saveModalUpsell = async () => {
        this.setState({
            loading: true
        });
        const props = this.state;
        const requestBody = {
            customize_body_upsell_background_color_h: props.customize_body_upsell_background_color.hue,
            customize_body_upsell_background_color_s: props.customize_body_upsell_background_color.saturation,
            customize_body_upsell_background_color_b: props.customize_body_upsell_background_color.brightness,
            customize_body_upsell_background_color_hex: '#' + props.customize_body_upsell_background_color_hex,
            customize_body_upsell_border_color_h: props.customize_body_upsell_border_color.hue,
            customize_body_upsell_border_color_s: props.customize_body_upsell_border_color.saturation,
            customize_body_upsell_border_color_b: props.customize_body_upsell_border_color.brightness,
            customize_body_upsell_border_color_hex: '#' + props.customize_body_upsell_border_color_hex,
            customize_body_upsell_arrows_color_h: props.customize_body_upsell_arrows_color.hue,
            customize_body_upsell_arrows_color_s: props.customize_body_upsell_arrows_color.saturation,
            customize_body_upsell_arrows_color_b: props.customize_body_upsell_arrows_color.brightness,
            customize_body_upsell_arrows_color_hex: '#' + props.customize_body_upsell_arrows_color_hex,
            customize_body_upsell_prod_title_color_text_h: props.customize_body_upsell_prod_title_color_text.hue,
            customize_body_upsell_prod_title_color_text_s: props.customize_body_upsell_prod_title_color_text.saturation,
            customize_body_upsell_prod_title_color_text_b: props.customize_body_upsell_prod_title_color_text.brightness,
            customize_body_upsell_prod_title_color_text_hex: '#' + props.customize_body_upsell_prod_title_color_text_hex,
            customize_body_upsell_prod_title_font_size: props.customize_body_upsell_prod_title_font_size,
            customize_body_upsell_prod_title_font_weigth: props.customize_body_upsell_prod_title_font_weigth,
            customize_body_upsell_prod_title_text_transform: props.customize_body_upsell_prod_title_text_transform,
            customize_body_upsell_var_title_text_color_h: props.customize_body_upsell_var_title_text_color.hue,
            customize_body_upsell_var_title_text_color_s: props.customize_body_upsell_var_title_text_color.saturation,
            customize_body_upsell_var_title_text_color_b: props.customize_body_upsell_var_title_text_color.brightness,
            customize_body_upsell_var_title_text_color_hex: '#' + props.customize_body_upsell_var_title_text_color_hex,
            customize_body_upsell_var_title_font_size: props.customize_body_upsell_var_title_font_size,
            customize_body_upsell_var_title_font_weigth: props.customize_body_upsell_var_title_font_weigth,
            customize_body_upsell_var_title_text_transform: props.customize_body_upsell_var_title_text_transform,
            customize_body_upsell_price_color_text_h: props.customize_body_upsell_price_color_text.hue,
            customize_body_upsell_price_color_text_s: props.customize_body_upsell_price_color_text.saturation,
            customize_body_upsell_price_color_text_b: props.customize_body_upsell_price_color_text.brightness,
            customize_body_upsell_price_color_text_hex: '#' + props.customize_body_upsell_price_color_text_hex,
            customize_body_upsell_price_font_size: props.customize_body_upsell_price_font_size,
            customize_body_upsell_price_font_weigth: props.customize_body_upsell_price_font_weigth,
            customize_body_upsell_compare_price_color_text_h: props.customize_body_upsell_compare_price_color_text.hue,
            customize_body_upsell_compare_price_color_text_s: props.customize_body_upsell_compare_price_color_text.saturation,
            customize_body_upsell_compare_price_color_text_b: props.customize_body_upsell_compare_price_color_text.brightness,
            customize_body_upsell_compare_price_color_text_hex: '#' + props.customize_body_upsell_compare_price_color_text_hex,
            customize_body_upsell_compare_price_font_size: props.customize_body_upsell_compare_price_font_size,
            customize_body_upsell_compare_price_font_weigth: props.customize_body_upsell_compare_price_font_weigth,

            customize_body_upsell_enabled_sale_price: props.customize_body_upsell_enabled_sale_price,
            customize_body_upsell_sale_price_color_text_h: props.customize_body_upsell_sale_price_color_text.hue,
            customize_body_upsell_sale_price_color_text_s: props.customize_body_upsell_sale_price_color_text.saturation,
            customize_body_upsell_sale_price_color_text_b: props.customize_body_upsell_sale_price_color_text.brightness,
            customize_body_upsell_sale_price_color_text_hex: '#' + props.customize_body_upsell_sale_price_color_text_hex,
            customize_body_upsell_sale_price_font_size: props.customize_body_upsell_sale_price_font_size,
            customize_body_upsell_sale_price_font_weigth: props.customize_body_upsell_sale_price_font_weigth,

            customize_body_upsell_button_background_color_h: props.customize_body_upsell_button_background_color.hue,
            customize_body_upsell_button_background_color_s: props.customize_body_upsell_button_background_color.saturation,
            customize_body_upsell_button_background_color_b: props.customize_body_upsell_button_background_color.brightness,
            customize_body_upsell_button_background_color_hex: '#' + props.customize_body_upsell_button_background_color_hex,
            customize_body_upsell_button_text_color_h: props.customize_body_upsell_button_text_color.hue,
            customize_body_upsell_button_text_color_s: props.customize_body_upsell_button_text_color.saturation,
            customize_body_upsell_button_text_color_b: props.customize_body_upsell_button_text_color.brightness,
            customize_body_upsell_button_text_color_hex: '#' + props.customize_body_upsell_button_text_color_hex,
            customize_body_upsell_button_text_font_size: props.customize_body_upsell_button_text_font_size,
            customize_body_upsell_button_text_font_weigth: props.customize_body_upsell_button_text_font_weigth,
            customize_body_upsell_button_text_transform: props.customize_body_upsell_button_text_transform,
            customize_body_upsell_button_border_radius: props.customize_body_upsell_button_border_radius,
            customize_body_upsell_button_hov_background_color_h: props.customize_body_upsell_button_hov_background_color.hue,
            customize_body_upsell_button_hov_background_color_s: props.customize_body_upsell_button_hov_background_color.saturation,
            customize_body_upsell_button_hov_background_color_b: props.customize_body_upsell_button_hov_background_color.brightness,
            customize_body_upsell_button_hov_background_color_hex: '#' + props.customize_body_upsell_button_hov_background_color_hex,
            customize_body_upsell_button_hov_text_color_h: props.customize_body_upsell_button_hov_text_color.hue,
            customize_body_upsell_button_hov_text_color_s: props.customize_body_upsell_button_hov_text_color.saturation,
            customize_body_upsell_button_hov_text_color_b: props.customize_body_upsell_button_hov_text_color.brightness,
            customize_body_upsell_button_hov_text_color_hex: '#' + props.customize_body_upsell_button_hov_text_color_hex,
        };
        var messageError = '';
        const method = 'PUT';
        const app = this.context;
        const updateCustomizeUpsell = await makePutPostRequest('/api/update_customize_upsell', method, requestBody, app);
        var messageError = '';
        if (updateCustomizeUpsell.error && updateCustomizeUpsell.message) {
            messageError = updateCustomizeUpsell.message;
        };
        await this.getDataCustomize();
        this.setState({ toast: true, messageError: messageError })
    };
    componentDidMount() {
        this.getDataCustomize()
    };

    render() {
        const { active, closeModal } = this.props;
        const { dataCustomize,
            loading,
            toast,
            messageError,
            options_weight,
            options_transform,
            options_font_size,
            options_radius,
            popoverBodyUpsell1,
            popoverBodyUpsell2,
            popoverBodyUpsell3,
            popoverBodyUpsell5,
            popoverBodyUpsell6,
            popoverBodyUpsell8,
            popoverBodyUpsell9,
            popoverBodyUpsell10,
            popoverBodyUpsell11,
            popoverBodyUpsell12,
            popoverBodyUpsell13,//SALE PRICE
            customize_body_upsell_background_color,
            customize_body_upsell_background_color_hex,
            customize_body_upsell_border_color,
            customize_body_upsell_border_color_hex,
            customize_body_upsell_arrows_color,
            customize_body_upsell_arrows_color_hex,
            customize_body_upsell_prod_title_color_text,
            customize_body_upsell_prod_title_color_text_hex,
            customize_body_upsell_prod_title_font_size,
            customize_body_upsell_prod_title_font_weigth,
            customize_body_upsell_prod_title_text_transform,

            customize_body_upsell_price_color_text,
            customize_body_upsell_price_color_text_hex,
            customize_body_upsell_price_font_size,
            customize_body_upsell_price_font_weigth,
            customize_body_upsell_compare_price_color_text,
            customize_body_upsell_compare_price_color_text_hex,
            customize_body_upsell_compare_price_font_size,
            customize_body_upsell_compare_price_font_weigth,
            /* SALE PRICE */
            customize_body_upsell_enabled_sale_price,
            customize_body_upsell_sale_price_color_text,
            customize_body_upsell_sale_price_color_text_hex,
            customize_body_upsell_sale_price_font_size,
            customize_body_upsell_sale_price_font_weigth,
            /*  */

            customize_body_upsell_button_background_color,
            customize_body_upsell_button_background_color_hex,
            customize_body_upsell_button_text_color,
            customize_body_upsell_button_text_color_hex,
            customize_body_upsell_button_text_font_size,
            customize_body_upsell_button_text_font_weigth,
            customize_body_upsell_button_text_transform,
            customize_body_upsell_button_border_radius,
            customize_body_upsell_button_hov_background_color,
            customize_body_upsell_button_hov_background_color_hex,
            customize_body_upsell_button_hov_text_color,
            customize_body_upsell_button_hov_text_color_hex, } = this.state;

        const equals = this.validateDataCustomizeUpsell(this.state);
        const skeleton = <SkeletonBodyText lines={70} />;

        const ButtonColor = ({ height = '100%', width = '100%', background = '#000000', border = "1px solid #898f94", borderRadius = "0.3rem", }) => {
            return (
                <div
                    style={{
                        background: background,
                        height: height,
                        width: width,
                        borderRadius: borderRadius,
                        border: border,
                    }}
                />
            );
        };

        const hexcolor_cartBody_upsell_BK = hsbToHex(customize_body_upsell_background_color);
        const activator_cartBody_upsell_BK = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell1") }} id='customizeBody9'>
                <ButtonColor background={hexcolor_cartBody_upsell_BK} />
            </Button>
        );

        const hexcolor_cartBody_upsell_Border = hsbToHex(customize_body_upsell_border_color);
        const activator_cartBody_upsell_Border = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell2") }} id='customizeBody10'>
                <ButtonColor background={hexcolor_cartBody_upsell_Border} />
            </Button>
        );

        const hexcolor_cartBody_upsell_Arrows = hsbToHex(customize_body_upsell_arrows_color);
        const activator_cartBody_upsell_Arrows = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell12") }} id='customizeBody20'>
                <ButtonColor background={hexcolor_cartBody_upsell_Arrows} />
            </Button>
        );

        const hexcolor_cartBody_upsell_prod_Title = hsbToHex(customize_body_upsell_prod_title_color_text);
        const activator_cartBody_upsell_prod_Title = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell3") }} id='customizeBody11'>
                <ButtonColor background={hexcolor_cartBody_upsell_prod_Title} />
            </Button>
        );

        const hexcolor_cartBody_upsell_var_Price = hsbToHex(customize_body_upsell_price_color_text);
        const activator_cartBody_upsell_var_Price = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell5") }} id='customizeBody13'>
                <ButtonColor background={hexcolor_cartBody_upsell_var_Price} />
            </Button>
        );

        const hexcolor_cartBody_upsell_var_ComparePrice = hsbToHex(customize_body_upsell_compare_price_color_text);
        const activator_cartBody_upsell_var_ComparePrice = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell6") }} id='customizeBody14'>
                <ButtonColor background={hexcolor_cartBody_upsell_var_ComparePrice} />
            </Button>
        );

        const hexcolor_cartBody_upsell_var_SalePrice = hsbToHex(customize_body_upsell_sale_price_color_text);
        const activator_cartBody_upsell_var_SalePrice = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell13") }} id='customizeBody22'>
                <ButtonColor background={hexcolor_cartBody_upsell_var_SalePrice} />
            </Button>
        );

        const hexcolor_cartBody_upsell_button_normal_BK = hsbToHex(customize_body_upsell_button_background_color);
        const activator_cartBody_upsell_button_normal_BK = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell8") }} id='customizeBody16'>
                <ButtonColor background={hexcolor_cartBody_upsell_button_normal_BK} />
            </Button>
        );

        const hexcolor_cartBody_upsell_button_normal_Text = hsbToHex(customize_body_upsell_button_text_color);
        const activator_cartBody_upsell_button_normal_Text = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell9") }} id='customizeBody17'>
                <ButtonColor background={hexcolor_cartBody_upsell_button_normal_Text} />
            </Button>
        );

        const hexcolor_cartBody_upsell_button_hov_BK = hsbToHex(customize_body_upsell_button_hov_background_color);
        const activator_cartBody_upsell_button_hov_BK = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell10") }} id='customizeBody18'>
                <ButtonColor background={hexcolor_cartBody_upsell_button_hov_BK} />
            </Button>
        );

        const hexcolor_cartBody_upsell_button_hov_Text = hsbToHex(customize_body_upsell_button_hov_text_color);
        const activator_cartBody_upsell_button_hov_Text = (
            <Button onClick={() => { this.handlePopover("popoverBodyUpsell11") }} id='customizeBody19'>
                <ButtonColor background={hexcolor_cartBody_upsell_button_hov_Text} />
            </Button>
        );

        const customize = dataCustomize !== null ?
            <FormLayout>
                <Banner
                    title="A single customization"
                    tone="warning"
                >
                    <p>
                        Although each module of the available upsells and the Tiered Free Items module has a button to customize, the same customization will be applied to all of them.
                    </p>
                </Banner>
                <BlockStack gap={500}>
                    <FormLayout>
                        <Text variant="headingLg" as="h5">General</Text>
                        <BlockStack gap={400}>
                            <FieldColor
                                labelColor={<Text variant="headingSm" as="h3">Background Color</Text>}
                                textValue={customize_body_upsell_background_color_hex || 'f7f8f9'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_background_color_hex", "customize_body_upsell_background_color") }}
                                activePop={popoverBodyUpsell1}
                                activadorPop={activator_cartBody_upsell_BK}
                                closePop={() => { this.handlePopover("popoverBodyUpsell1", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_background_color", "customize_body_upsell_background_color_hex") }}
                                colorPicker={customize_body_upsell_background_color}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <FieldColor
                                    labelColor={<Text variant="headingSm" as="h3">Border Color (Separation - Stacked)</Text>}
                                    textValue={customize_body_upsell_border_color_hex || 'e5e5e5'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_border_color_hex", "customize_body_upsell_border_color") }}
                                    activePop={popoverBodyUpsell2}
                                    activadorPop={activator_cartBody_upsell_Border}
                                    closePop={() => { this.handlePopover("popoverBodyUpsell2", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_border_color", "customize_body_upsell_border_color_hex") }}
                                    colorPicker={customize_body_upsell_border_color}
                                />
                                <FieldColor
                                    labelColor={<Text variant="headingSm" as="h3">Arrows Color (Slide)</Text>}
                                    textValue={customize_body_upsell_arrows_color_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_arrows_color_hex", "customize_body_upsell_arrows_color") }}
                                    activePop={popoverBodyUpsell12}
                                    activadorPop={activator_cartBody_upsell_Arrows}
                                    closePop={() => { this.handlePopover("popoverBodyUpsell12", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_arrows_color", "customize_body_upsell_arrows_color_hex") }}
                                    colorPicker={customize_body_upsell_arrows_color}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </FormLayout>

                    <Divider borderColor='border-hover' />
                    <FormLayout>
                        <Text variant="headingLg" as="h5">Product Title</Text>
                        <BlockStack gap={400}>
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <FieldColor
                                    labelColor={<Text variant="headingSm" as="h3">Text Color</Text>}
                                    textValue={customize_body_upsell_prod_title_color_text_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_prod_title_color_text_hex", "customize_body_upsell_prod_title_color_text") }}
                                    activePop={popoverBodyUpsell3}
                                    activadorPop={activator_cartBody_upsell_prod_Title}
                                    closePop={() => { this.handlePopover("popoverBodyUpsell3", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_prod_title_color_text", "customize_body_upsell_prod_title_color_text_hex") }}
                                    colorPicker={customize_body_upsell_prod_title_color_text}
                                />
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                                    options={options_weight}
                                    value={customize_body_upsell_prod_title_font_weigth}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_prod_title_font_weigth") }}
                                />
                            </InlineGrid>
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                                    options={options_transform}
                                    value={customize_body_upsell_prod_title_text_transform}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_prod_title_text_transform") }}
                                />
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Size</Text>}
                                    options={options_font_size}
                                    value={customize_body_upsell_prod_title_font_size}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_prod_title_font_size") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </FormLayout>

                    <Divider borderColor='border-hover' />
                    <FormLayout>
                        <Text variant="headingLg" as="h5">Price</Text>
                        <BlockStack gap={400}>
                            <FieldColor
                                labelColor={<Text variant="headingSm" as="h3">Text Color</Text>}
                                textValue={customize_body_upsell_price_color_text_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_price_color_text_hex", "customize_body_upsell_price_color_text") }}
                                activePop={popoverBodyUpsell5}
                                activadorPop={activator_cartBody_upsell_var_Price}
                                closePop={() => { this.handlePopover("popoverBodyUpsell5", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_price_color_text", "customize_body_upsell_price_color_text_hex") }}
                                colorPicker={customize_body_upsell_price_color_text}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                                    options={options_weight}
                                    value={customize_body_upsell_price_font_weigth}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_price_font_weigth") }}
                                />
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Size</Text>}
                                    options={options_font_size}
                                    value={customize_body_upsell_price_font_size}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_price_font_size") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </FormLayout>

                    <Divider borderColor='border-hover' />
                    <FormLayout>
                        <Text variant="headingLg" as="h5">Compare Price</Text>
                        <BlockStack gap={400}>
                            <FieldColor
                                labelColor={<Text variant="headingSm" as="h3">Text Color</Text>}
                                textValue={customize_body_upsell_compare_price_color_text_hex || '737373'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_compare_price_color_text_hex", "customize_body_upsell_compare_price_color_text") }}
                                activePop={popoverBodyUpsell6}
                                activadorPop={activator_cartBody_upsell_var_ComparePrice}
                                closePop={() => { this.handlePopover("popoverBodyUpsell6", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_compare_price_color_text", "customize_body_upsell_compare_price_color_text_hex") }}
                                colorPicker={customize_body_upsell_compare_price_color_text}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                                    options={options_weight}
                                    value={customize_body_upsell_compare_price_font_weigth}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_compare_price_font_weigth") }}
                                />
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Size</Text>}
                                    options={options_font_size}
                                    value={customize_body_upsell_compare_price_font_size}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_compare_price_font_size") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </FormLayout>

                    <Divider borderColor='border-hover' />
                    <FormLayout>
                        <Text variant="headingLg" as="h5">Sale Price</Text>
                        <BlockStack gap={400}>
                            <Checkbox
                                label={<ToolInfo title={<Text variant="headingSm" as="h3">Enabled Sale Price</Text>} description="Is applied to the price when you have to compare the price." />}
                                checked={customize_body_upsell_enabled_sale_price}
                                onChange={() => { this.changeStateBoolean("customize_body_upsell_enabled_sale_price") }}
                            />
                            <FieldColor
                                labelColor={<Text variant="headingSm" as="h3">Text Color</Text>}
                                textValue={customize_body_upsell_sale_price_color_text_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_sale_price_color_text_hex", "customize_body_upsell_sale_price_color_text") }}
                                activePop={popoverBodyUpsell13}
                                activadorPop={activator_cartBody_upsell_var_SalePrice}
                                closePop={() => { this.handlePopover("popoverBodyUpsell13", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_sale_price_color_text", "customize_body_upsell_sale_price_color_text_hex") }}
                                colorPicker={customize_body_upsell_sale_price_color_text}
                            />
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                                    options={options_weight}
                                    value={customize_body_upsell_sale_price_font_weigth}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_sale_price_font_weigth") }}
                                />
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Size</Text>}
                                    options={options_font_size}
                                    value={customize_body_upsell_sale_price_font_size}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_sale_price_font_size") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </FormLayout>

                    <Divider borderColor='border-hover' />
                    <FormLayout>
                        <Text variant="headingLg" as="h5">Button Add Cart</Text>
                        <Text variant="headingLg" as="h6">Normal</Text>
                        <BlockStack gap={400}>
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <FieldColor
                                    labelColor={<Text variant="headingSm" as="h3">Background Color</Text>}
                                    textValue={customize_body_upsell_button_background_color_hex || '000000'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_background_color_hex", "customize_body_upsell_button_background_color") }}
                                    activePop={popoverBodyUpsell8}
                                    activadorPop={activator_cartBody_upsell_button_normal_BK}
                                    closePop={() => { this.handlePopover("popoverBodyUpsell8", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_button_background_color", "customize_body_upsell_button_background_color_hex") }}
                                    colorPicker={customize_body_upsell_button_background_color}
                                />
                                <FieldColor
                                    labelColor={<Text variant="headingSm" as="h3">Text Color</Text>}
                                    textValue={customize_body_upsell_button_text_color_hex || 'ffffff'}
                                    changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_text_color_hex", "customize_body_upsell_button_text_color") }}
                                    activePop={popoverBodyUpsell9}
                                    activadorPop={activator_cartBody_upsell_button_normal_Text}
                                    closePop={() => { this.handlePopover("popoverBodyUpsell9", 0) }}
                                    changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_button_text_color", "customize_body_upsell_button_text_color_hex") }}
                                    colorPicker={customize_body_upsell_button_text_color_hex}
                                />
                            </InlineGrid>
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                                    options={options_transform}
                                    value={customize_body_upsell_button_text_transform}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_button_text_transform") }}
                                />
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Size</Text>}
                                    options={options_font_size}
                                    value={customize_body_upsell_button_text_font_size}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_button_text_font_size") }}
                                />
                            </InlineGrid>
                            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                                <Select
                                    label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                                    options={options_weight}
                                    value={customize_body_upsell_button_text_font_weigth}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_button_text_font_weigth") }}
                                />
                                <Select
                                    label='Border Raius'
                                    options={options_radius}
                                    value={customize_body_upsell_button_border_radius}
                                    onChange={(value) => { this.handleChange(value, "customize_body_upsell_button_border_radius") }}
                                />
                            </InlineGrid>
                        </BlockStack>
                    </FormLayout>

                    <FormLayout>
                        <Text variant="headingLg" as="h6">Hover</Text>
                        <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                            <FieldColor
                                labelColor={<Text variant="headingSm" as="h3">Background Color</Text>}
                                textValue={customize_body_upsell_button_hov_background_color_hex || '000000'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_hov_background_color_hex", "customize_body_upsell_button_hov_background_color") }}
                                activePop={popoverBodyUpsell10}
                                activadorPop={activator_cartBody_upsell_button_hov_BK}
                                closePop={() => { this.handlePopover("popoverBodyUpsell10", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_button_hov_background_color", "customize_body_upsell_button_hov_background_color_hex") }}
                                colorPicker={customize_body_upsell_button_hov_background_color}
                            />
                            <FieldColor
                                labelColor={<Text variant="headingSm" as="h3">Text Color</Text>}
                                textValue={customize_body_upsell_button_hov_text_color_hex || 'ffffff'}
                                changeColorText={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_hov_text_color_hex", "customize_body_upsell_button_hov_text_color") }}
                                activePop={popoverBodyUpsell11}
                                activadorPop={activator_cartBody_upsell_button_hov_Text}
                                closePop={() => { this.handlePopover("popoverBodyUpsell11", 0) }}
                                changeColorPicker={(value) => { this.handleColors(value, "customize_body_upsell_button_hov_text_color", "customize_body_upsell_button_hov_text_color_hex") }}
                                colorPicker={customize_body_upsell_button_hov_text_color}
                            />
                        </InlineGrid>
                    </FormLayout>
                </BlockStack>
            </FormLayout>
            : skeleton;

        let buttonProps = !equals ? {
            primaryAction: {
                loading: loading,
                content: 'Save',
                onAction: () => { this.saveModalUpsell() },
            },
            secondaryActions: [
                {
                    destructive: true,
                    content: 'Discard',
                    onAction: () => {
                        const c = this.state.dataCustomize.customize[0];
                        this.originalDataCustomizeUpsell(1, c);
                    },
                },
            ]
        } : {};

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Customize updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        return (
            active ?
                <Modal
                    {...buttonProps}
                    open={true}
                    onClose={!loading ? closeModal : null}
                    title="Customize Upsell and Tiered Free Items"
                >
                    <Loading active={loading} />
                    <Modal.Section>
                        {customize}
                    </Modal.Section>
                    <ThisToast />
                </Modal> : null
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
    };
    handleChange = (value, thisSate) => {
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
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
}