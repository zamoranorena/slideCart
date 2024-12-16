import React, { useContext } from 'react';
import colorconvert from 'color-convert';
import { Collapsible, Divider, Badge, Tooltip, Card, LegacyCard, InlineStack, Box, RadioButton, Icon, Tabs, TextField, Text, FormLayout, Select, Button, Popover, Toast, ColorPicker, hsbToHex, rgbToHex, rgbToHsb, hsbToRgb, rgbString, Form, Checkbox, Modal, RangeSlider, BlockStack, InlineGrid } from '@shopify/polaris';
import { InfoIcon } from '@shopify/polaris-icons';
import { TitleBar } from '@shopify/app-bridge/actions';
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';


import { makeGetRequest, makePutPostRequest } from '../../utils/Services';
import { SkeletonLoad } from '../../components';
import { slideCart1_popup, slideCart1, slideCart2_popup, slideCart2 } from "../../assets";
import { CartEditorContext } from '../../components/providers/CartEditor';
/* import BannerHead from '../components/BannerHead';
import Skeleton from '../components/Skeleton'; 
import { parse } from 'dotenv';*/
class Customize extends React.Component {

  static contextType = Context;
  // static contextType = CartEditorContext;

  constructor(props) {
    super(props);
    this.yourRef = React.createRef();
    this.state = {
      tabSlideCartDesign: 0,
      activeSettings: false,
      activeCustomize: false,
      dataCustomize: [],
      loading: true,
      toast: null,
      toastError: null,
      messageError: null,
      options_font_size: [],
      options_transform: [],
      options_weight: [],
      options_radius: [],
      /*********** CART HEADER ***********/
      tabCartHeader: 0,
      popoverHeaderBk: null,
      popoverHeaderText: null,
      popoverHeaderIcon: null,
      popoverHeaderIcon1: null,
      customize_slidecart_design: null,
      customize_slidecart_size: null,
      customize_slidecart_position: null,
      customize_slidecart_animation_mobile: null,
      customize_slidecart_footer_fixed: null,
      customize_slidecart_rtl: null,
      customize_slidecart_margin_left: null,
      customize_enabled_loading: null,
      customize_loading_background: {
        hue: null,
        saturation: null,
        brightness: null,
        alpha: null
      },
      customize_loading_background_rgb: null,
      customize_loading_icon: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_loading_icon_hex: null,
      customize_header_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_header_background_color_hex: null,
      customize_header_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_header_text_color_hex: null,
      customize_header_text_font_size: null,
      customize_header_text_transform: null,
      customize_header_icon_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_header_icon_color_hex: null,
      customize_header_icon_color_hov: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_header_icon_color_hov_hex: null,
      customize_header_icon_size: null,
      /***********************************/
      /************ CART BODY ************/
      /******** CART BODY GENERAL *******/
      tabCartBody: 0,
      popoverLoading1: null,
      popoverLoading2: null,
      popoverBodyBk: null,
      popoverBodyText: null,
      popoverBodyBorder: null,
      popoverBodyIcon: null,
      popoverBodyProd0: null,
      popoverBodyProd1: null,
      popoverBodyProd2: null,
      popoverBodyProd3: null,
      popoverBodyProd4: null,
      popoverBodyProd5: null,
      popoverBodyProd6: null,
      popoverBodyProd7: null,
      popoverBodyProd8: null,
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
      customize_body_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_background_color_hex: null,
      customize_body_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_text_color_hex: null,
      customize_body_border_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_border_color_hex: null,
      customize_body_prod_icon_remove_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_prod_icon_remove_color_hex: null,
      customize_body_design_qty: null,
      customize_body_prod_remove_enabled: null,
      customize_body_prod_remove_text: null,
      customize_body_prod_icon_remove: null,
      customize_body_prod_icon_remove_size: null,
      customize_body_prod_icon_remove_color_hov: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_prod_icon_remove_color_hov_hex: null,
      /***********************************/
      /***********CART BODY PRODUCT******/
      customize_body_prod_title_color_text: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_prod_title_color_text_hex: null,
      customize_body_prod_title_font_size: null,
      customize_body_prod_title_font_weigth: null,
      customize_body_prod_title_text_transform: null,
      customize_body_var_title_color_text: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_var_title_color_text_hex: null,
      customize_body_var_title_font_size: null,
      customize_body_var_title_font_weigth: null,
      customize_body_var_title_text_transform: null,
      customize_body_price_color_text: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_price_color_text_hex: null,
      customize_body_price_font_size: null,
      customize_body_price_font_weigth: null,
      customize_body_compare_price_color_text: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_compare_price_color_text_hex: null,
      customize_body_compare_price_font_size: null,
      customize_body_compare_price_font_weigth: null,
      /* SALE PRICE */
      customize_body_enabled_sale_price: null,
      customize_body_sale_price_color_text: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_sale_price_color_text_hex: null,
      customize_body_sale_price_font_size: null,
      customize_body_sale_price_font_weigth: null,
      /*  */
      customize_body_discount_color_text: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_discount_color_text_hex: null,
      customize_body_discount_font_size: null,
      customize_body_discount_font_weigth: null,

      customize_body_upgrade_button_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_upgrade_button_background_color_hex: null,
      customize_body_upgrade_button_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_body_upgrade_button_text_color_hex: null,
      customize_body_upgrade_button_text_transform: null,
      customize_body_upgrade_button_text_font_size: null,
      customize_body_upgrade_button_text_font_weigth: null,
      customize_body_upgrade_button_border_radius: null,
      /* ********************************** */
      /* ***********CART BODY UPSELL******* */
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
      /********************************************/
      /* ***************CART POPUP ************* */
      tabCartPopUp: 0,
      popoverPopUp1: null,
      popoverPopUp2: null,
      popoverPopUp3: null,
      popoverPopUp4: null,
      popoverPopUp5: null,
      popoverPopUp6: null,
      popoverPopUp7: null,
      popoverPopUp8: null,
      customize_popup_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_background_color_hex: null,
      customize_popup_border_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_border_color_hex: null,
      customize_popup_title_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_title_text_color_hex: null,
      customize_popup_title_font_size: null,
      customize_popup_title_font_weigth: null,
      customize_popup_title_text_transform: null,
      customize_popup_price_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_price_text_color_hex: null,
      customize_popup_price_font_size: null,
      customize_popup_price_font_weigth: null,
      customize_popup_compare_price_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_compare_price_text_color_hex: null,
      customize_popup_compare_price_font_size: null,
      customize_popup_compare_price_font_weigth: null,
      /* SALE PRICE */
      customize_popup_enabled_sale_price: null,
      customize_popup_sale_price_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_sale_price_text_color_hex: null,
      customize_popup_sale_price_font_size: null,
      customize_popup_sale_price_font_weigth: null,
      customize_popup_var_options_design: null,
      /*  */
      customize_popup_button_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_button_background_color_hex: null,
      customize_popup_button_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_button_text_color_hex: null,
      customize_popup_button_border_radius: null,
      customize_popup_button_text_font_size: null,
      customize_popup_button_text_font_weigth: null,
      customize_popup_button_text_transform: null,
      customize_popup_button_hov_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_button_hov_background_color_hex: null,
      customize_popup_button_hov_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_popup_button_hov_text_color_hex: null,
      /* *************************************** */
      /* ************ CART FOOTER ************* */
      tabCartFooter: 0,
      customize_footer_total_price_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_footer_total_price_text_color_hex: null,
      customize_footer_total_price_font_size: null,
      customize_footer_total_price_font_weigth: null,
      customize_footer_compare_price_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_footer_compare_price_text_color_hex: null,
      customize_footer_compare_price_font_size: null,
      customize_footer_compare_price_font_weigth: null,
      customize_footer_discount_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_footer_discount_text_color_hex: null,
      customize_footer_discount_font_size: null,
      customize_footer_discount_font_weigth: null,
      customize_footer_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_footer_background_color_hex: null,
      customize_footer_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      customize_footer_text_color_hex: null,
    };
  };

  originalData = (identify, data) => {
    var cutomize_remove_icon = {};
    var myData = {};
    if (!identify) {
      var arr_options_font_size = [];
      for (let i = 1; i <= 30; i++) {
        arr_options_font_size.push(
          { label: i + 'px', value: i + 'px' }
        );
      };

      var arr_options_transform = [
        { label: 'none', value: 'none' },
        { label: 'capitalize', value: 'capitalize' },
        { label: 'uppercase', value: 'uppercase' },
        { label: 'lowercase', value: 'lowercase' },
        { label: 'initial', value: 'initial' },
        { label: 'inherit', value: 'inherit' }
      ];

      var arr_options_weight = [
        { label: 'normal', value: 'normal' },
        { label: 'bold', value: 'bold' },
        { label: 'lighter', value: 'lighter' },
        { label: 'bolder', value: 'bolder' },
        { label: '100', value: '100' },
        { label: '200', value: '200' },
        { label: '300', value: '300' },
        { label: '400', value: '400' },
        { label: '500', value: '500' },
        { label: '600', value: '600' },
        { label: '700', value: '700' },
        { label: '800', value: '800' },
        { label: '900', value: '900' },
        { label: 'inherit', value: 'inherit' },
        { label: 'initial', value: 'initial' },
        { label: 'unset', value: 'unset' }
      ];
      var arr_options_border_radius = [];
      for (let i = 0; i <= 100; i++) {
        arr_options_border_radius.push(
          { label: i + 'px', value: i + 'px' }
        );
      };

      cutomize_remove_icon = data.iconsCustomize.find(element => {
        return element.id === data.customize[0].customize_body_prod_icon_remove;
      });

      myData = {
        dataCustomize: data,
        options_font_size: arr_options_font_size,
        options_transform: arr_options_transform,
        options_weight: arr_options_weight,
        options_radius: arr_options_border_radius
      };
      data = data.customize[0];
    } else {
      cutomize_remove_icon = data.iconsCustomize.find(element => {
        return element.id === data.customize[0].customize_body_prod_icon_remove;
      });
      data = data.customize[0];
    }
    var stateData = {
      loading: false,
      customize_slidecart_design: data.customize_slidecart_design.toString(),
      customize_slidecart_size: data.customize_slidecart_size.toString(),
      customize_slidecart_position: data.customize_slidecart_position.toString(),
      customize_slidecart_animation_mobile: data.customize_slidecart_animation_mobile.toString(),
      customize_slidecart_footer_fixed: data.customize_slidecart_footer_fixed,
      customize_slidecart_rtl: data.customize_slidecart_rtl,
      customize_slidecart_margin_left: data.customize_slidecart_margin_left,
      customize_enabled_loading: !!data.customize_enabled_loading ? true : false,
      customize_loading_background: {
        hue: data.customize_loading_background_h,
        saturation: data.customize_loading_background_s,
        brightness: data.customize_loading_background_b,
        alpha: data.customize_loading_background_alpha
      },
      customize_loading_background_rgb: data.customize_loading_background_rgb,
      customize_loading_icon: {
        hue: data.customize_loading_icon_h,
        saturation: data.customize_loading_icon_s,
        brightness: data.customize_loading_icon_b
      },
      customize_loading_icon_hex: hsbToHex(
        {
          hue: data.customize_loading_icon_h,
          saturation: data.customize_loading_icon_s,
          brightness: data.customize_loading_icon_b
        }).replace(/\#/, ""),
      customize_header_background_color: {
        hue: data.customize_header_background_color_h,
        saturation: data.customize_header_background_color_s,
        brightness: data.customize_header_background_color_b
      },
      customize_header_background_color_hex:
        hsbToHex(
          {
            hue: data.customize_header_background_color_h,
            saturation: data.customize_header_background_color_s,
            brightness: data.customize_header_background_color_b
          }).replace(/\#/, ""),
      customize_header_text_color: {
        hue: data.customize_header_text_color_h,
        saturation: data.customize_header_text_color_s,
        brightness: data.customize_header_text_color_b
      },
      customize_header_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_header_text_color_h,
            saturation: data.customize_header_text_color_s,
            brightness: data.customize_header_text_color_b
          }
        ).replace(/\#/, ""),
      customize_header_text_font_size: data.customize_header_text_font_size,
      customize_header_text_transform: data.customize_header_text_transform,
      customize_header_icon_color: {
        hue: data.customize_header_icon_color_h,
        saturation: data.customize_header_icon_color_s,
        brightness: data.customize_header_icon_color_b
      },
      customize_header_icon_color_hex:
        hsbToHex(
          {
            hue: data.customize_header_icon_color_h,
            saturation: data.customize_header_icon_color_s,
            brightness: data.customize_header_icon_color_b
          }
        ).replace(/\#/, ""),
      customize_header_icon_color_hov: {
        hue: data.customize_header_icon_color_hov_h,
        saturation: data.customize_header_icon_color_hov_s,
        brightness: data.customize_header_icon_color_hov_b
      },
      customize_header_icon_color_hov_hex:
        hsbToHex(
          {
            hue: data.customize_header_icon_color_hov_h,
            saturation: data.customize_header_icon_color_hov_s,
            brightness: data.customize_header_icon_color_hov_b
          }
        ).replace(/\#/, ""),
      customize_header_icon_size: data.customize_header_icon_size,
      customize_body_background_color: {
        hue: data.customize_body_background_color_h,
        saturation: data.customize_body_background_color_s,
        brightness: data.customize_body_background_color_b
      },
      customize_body_background_color_hex:
        hsbToHex(
          {
            hue: data.customize_body_background_color_h,
            saturation: data.customize_body_background_color_s,
            brightness: data.customize_body_background_color_b
          }
        ).replace(/\#/, ""),
      customize_body_text_color: {
        hue: data.customize_body_text_color_h,
        saturation: data.customize_body_text_color_s,
        brightness: data.customize_body_text_color_b
      },
      customize_body_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_body_text_color_h,
            saturation: data.customize_body_text_color_s,
            brightness: data.customize_body_text_color_b
          }
        ).replace(/\#/, ""),
      customize_body_border_color: {
        hue: data.customize_body_border_color_h,
        saturation: data.customize_body_border_color_s,
        brightness: data.customize_body_border_color_b
      },
      customize_body_border_color_hex:
        hsbToHex(
          {
            hue: data.customize_body_border_color_h,
            saturation: data.customize_body_border_color_s,
            brightness: data.customize_body_border_color_b
          }
        ).replace(/\#/, ""),
      customize_body_prod_icon_remove_color: {
        hue: data.customize_body_prod_icon_remove_color_h,
        saturation: data.customize_body_prod_icon_remove_color_s,
        brightness: data.customize_body_prod_icon_remove_color_b
      },
      customize_body_prod_icon_remove_color_hex:
        hsbToHex(
          {
            hue: data.customize_body_prod_icon_remove_color_h,
            saturation: data.customize_body_prod_icon_remove_color_s,
            brightness: data.customize_body_prod_icon_remove_color_b
          }
        ).replace(/\#/, ""),
      customize_body_design_qty: data.customize_body_design_qty,
      customize_body_prod_remove_enabled: data.customize_body_prod_remove_enabled,
      customize_body_prod_remove_text: data.customize_body_prod_remove_text,
      customize_body_prod_icon_remove_svg: cutomize_remove_icon.icon,
      customize_body_prod_icon_remove: data.customize_body_prod_icon_remove,
      customize_body_prod_icon_remove_size: data.customize_body_prod_icon_remove_size,
      customize_body_prod_icon_remove_color_hov: {
        hue: data.customize_body_prod_icon_remove_color_hov_h,
        saturation: data.customize_body_prod_icon_remove_color_hov_s,
        brightness: data.customize_body_prod_icon_remove_color_hov_b
      },
      customize_body_prod_icon_remove_color_hov_hex: hsbToHex(
        {
          hue: data.customize_body_prod_icon_remove_color_hov_h,
          saturation: data.customize_body_prod_icon_remove_color_hov_s,
          brightness: data.customize_body_prod_icon_remove_color_hov_b
        }
      ).replace(/\#/, ""),
      customize_body_prod_title_color_text: {
        hue: data.customize_body_prod_title_color_text_h,
        saturation: data.customize_body_prod_title_color_text_s,
        brightness: data.customize_body_prod_title_color_text_b
      },
      customize_body_prod_title_color_text_hex:
        hsbToHex(
          {
            hue: data.customize_body_prod_title_color_text_h,
            saturation: data.customize_body_prod_title_color_text_s,
            brightness: data.customize_body_prod_title_color_text_b
          }
        ).replace(/\#/, ""),
      customize_body_prod_title_font_size: data.customize_body_prod_title_font_size,
      customize_body_prod_title_font_weigth: data.customize_body_prod_title_font_weigth,
      customize_body_prod_title_text_transform: data.customize_body_prod_title_text_transform,
      customize_body_var_title_color_text: {
        hue: data.customize_body_var_title_color_text_h,
        saturation: data.customize_body_var_title_color_text_s,
        brightness: data.customize_body_var_title_color_text_b
      },
      customize_body_var_title_color_text_hex:
        hsbToHex(
          {
            hue: data.customize_body_var_title_color_text_h,
            saturation: data.customize_body_var_title_color_text_s,
            brightness: data.customize_body_var_title_color_text_b
          }
        ).replace(/\#/, ""),
      customize_body_var_title_font_size: data.customize_body_var_title_font_size,
      customize_body_var_title_font_weigth: data.customize_body_var_title_font_weigth,
      customize_body_var_title_text_transform: data.customize_body_var_title_text_transform,
      customize_body_price_color_text: {
        hue: data.customize_body_price_color_text_h,
        saturation: data.customize_body_price_color_text_s,
        brightness: data.customize_body_price_color_text_b
      },
      customize_body_price_color_text_hex:
        hsbToHex(
          {
            hue: data.customize_body_price_color_text_h,
            saturation: data.customize_body_price_color_text_s,
            brightness: data.customize_body_price_color_text_b
          }
        ).replace(/\#/, ""),
      customize_body_price_font_size: data.customize_body_price_font_size,
      customize_body_price_font_weigth: data.customize_body_price_font_weigth,
      customize_body_compare_price_color_text: {
        hue: data.customize_body_compare_price_color_text_h,
        saturation: data.customize_body_compare_price_color_text_s,
        brightness: data.customize_body_compare_price_color_text_b
      },
      customize_body_compare_price_color_text_hex:
        hsbToHex(
          {
            hue: data.customize_body_compare_price_color_text_h,
            saturation: data.customize_body_compare_price_color_text_s,
            brightness: data.customize_body_compare_price_color_text_b
          }
        ).replace(/\#/, ""),
      customize_body_compare_price_font_size: data.customize_body_compare_price_font_size,
      customize_body_compare_price_font_weigth: data.customize_body_compare_price_font_weigth,
      /* SALE PRICE */
      customize_body_enabled_sale_price: data.customize_body_enabled_sale_price,
      customize_body_sale_price_color_text: {
        hue: data.customize_body_sale_price_color_text_h,
        saturation: data.customize_body_sale_price_color_text_s,
        brightness: data.customize_body_sale_price_color_text_b
      },
      customize_body_sale_price_color_text_hex:
        hsbToHex(
          {
            hue: data.customize_body_sale_price_color_text_h,
            saturation: data.customize_body_sale_price_color_text_s,
            brightness: data.customize_body_sale_price_color_text_b
          }
        ).replace(/\#/, ""),
      customize_body_sale_price_font_size: data.customize_body_sale_price_font_size,
      customize_body_sale_price_font_weigth: data.customize_body_sale_price_font_weigth,
      /*  */
      customize_body_discount_color_text: {
        hue: data.customize_body_discount_color_text_h,
        saturation: data.customize_body_discount_color_text_s,
        brightness: data.customize_body_discount_color_text_b
      },
      customize_body_discount_color_text_hex:
        hsbToHex(
          {
            hue: data.customize_body_discount_color_text_h,
            saturation: data.customize_body_discount_color_text_s,
            brightness: data.customize_body_discount_color_text_b
          }
        ).replace(/\#/, ""),
      customize_body_discount_font_size: data.customize_body_discount_font_size,
      customize_body_discount_font_weigth: data.customize_body_discount_font_weigth,


      customize_body_upgrade_button_background_color: {
        hue: data.customize_body_upgrade_button_background_color_h,
        saturation: data.customize_body_upgrade_button_background_color_s,
        brightness: data.customize_body_upgrade_button_background_color_b
      },
      customize_body_upgrade_button_background_color_hex: hsbToHex(
        {
          hue: data.customize_body_upgrade_button_background_color_h,
          saturation: data.customize_body_upgrade_button_background_color_s,
          brightness: data.customize_body_upgrade_button_background_color_b
        }
      ).replace(/\#/, ""),
      customize_body_upgrade_button_text_color: {
        hue: data.customize_body_upgrade_button_text_color_h,
        saturation: data.customize_body_upgrade_button_text_color_s,
        brightness: data.customize_body_upgrade_button_text_color_b
      },
      customize_body_upgrade_button_text_color_hex: hsbToHex(
        {
          hue: data.customize_body_upgrade_button_text_color_h,
          saturation: data.customize_body_upgrade_button_text_color_s,
          brightness: data.customize_body_upgrade_button_text_color_b
        }
      ).replace(/\#/, ""),
      customize_body_upgrade_button_text_transform: data.customize_body_upgrade_button_text_transform,
      customize_body_upgrade_button_text_font_size: data.customize_body_upgrade_button_text_font_size,
      customize_body_upgrade_button_text_font_weigth: data.customize_body_upgrade_button_text_font_weigth,
      customize_body_upgrade_button_border_radius: data.customize_body_upgrade_button_border_radius,


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


      customize_popup_background_color: {
        hue: data.customize_popup_background_color_h,
        saturation: data.customize_popup_background_color_s,
        brightness: data.customize_popup_background_color_b
      },
      customize_popup_background_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_background_color_h,
            saturation: data.customize_popup_background_color_s,
            brightness: data.customize_popup_background_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_border_color: {
        hue: data.customize_popup_border_color_h,
        saturation: data.customize_popup_border_color_s,
        brightness: data.customize_popup_border_color_b
      },
      customize_popup_border_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_border_color_h,
            saturation: data.customize_popup_border_color_s,
            brightness: data.customize_popup_border_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_title_text_color: {
        hue: data.customize_popup_title_text_color_h,
        saturation: data.customize_popup_title_text_color_s,
        brightness: data.customize_popup_title_text_color_b
      },
      customize_popup_title_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_title_text_color_h,
            saturation: data.customize_popup_title_text_color_s,
            brightness: data.customize_popup_title_text_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_title_font_size: data.customize_popup_title_font_size,
      customize_popup_title_font_weigth: data.customize_popup_title_font_weigth,
      customize_popup_title_text_transform: data.customize_popup_title_text_transform,
      customize_popup_price_text_color: {
        hue: data.customize_popup_price_text_color_h,
        saturation: data.customize_popup_price_text_color_s,
        brightness: data.customize_popup_price_text_color_b
      },
      customize_popup_price_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_price_text_color_h,
            saturation: data.customize_popup_price_text_color_s,
            brightness: data.customize_popup_price_text_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_price_font_size: data.customize_popup_price_font_size,
      customize_popup_price_font_weigth: data.customize_popup_price_font_weigth,
      customize_popup_compare_price_text_color: {
        hue: data.customize_popup_compare_price_text_color_h,
        saturation: data.customize_popup_compare_price_text_color_s,
        brightness: data.customize_popup_compare_price_text_color_b
      },
      customize_popup_compare_price_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_compare_price_text_color_h,
            saturation: data.customize_popup_compare_price_text_color_s,
            brightness: data.customize_popup_compare_price_text_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_compare_price_font_size: data.customize_popup_compare_price_font_size,
      customize_popup_compare_price_font_weigth: data.customize_popup_compare_price_font_weigth,
      /* SALE PRICE */
      customize_popup_enabled_sale_price: data.customize_popup_enabled_sale_price,
      customize_popup_sale_price_text_color: {
        hue: data.customize_popup_sale_price_text_color_h,
        saturation: data.customize_popup_sale_price_text_color_s,
        brightness: data.customize_popup_sale_price_text_color_b
      },
      customize_popup_sale_price_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_sale_price_text_color_h,
            saturation: data.customize_popup_sale_price_text_color_s,
            brightness: data.customize_popup_sale_price_text_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_sale_price_font_size: data.customize_popup_sale_price_font_size,
      customize_popup_sale_price_font_weigth: data.customize_popup_sale_price_font_weigth,
      customize_popup_var_options_design: data.customize_popup_var_options_design,
      /*  */
      customize_popup_button_background_color: {
        hue: data.customize_popup_button_background_color_h,
        saturation: data.customize_popup_button_background_color_s,
        brightness: data.customize_popup_button_background_color_b
      },
      customize_popup_button_background_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_button_background_color_h,
            saturation: data.customize_popup_button_background_color_s,
            brightness: data.customize_popup_button_background_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_button_text_color: {
        hue: data.customize_popup_button_text_color_h,
        saturation: data.customize_popup_button_text_color_s,
        brightness: data.customize_popup_button_text_color_b
      },
      customize_popup_button_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_button_text_color_h,
            saturation: data.customize_popup_button_text_color_s,
            brightness: data.customize_popup_button_text_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_button_border_radius: data.customize_popup_button_border_radius,
      customize_popup_button_text_font_size: data.customize_popup_button_text_font_size,
      customize_popup_button_text_font_weigth: data.customize_popup_button_text_font_weigth,
      customize_popup_button_text_transform: data.customize_popup_button_text_transform,
      customize_popup_button_hov_background_color: {
        hue: data.customize_popup_button_hov_background_color_h,
        saturation: data.customize_popup_button_hov_background_color_s,
        brightness: data.customize_popup_button_hov_background_color_b
      },
      customize_popup_button_hov_background_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_button_hov_background_color_h,
            saturation: data.customize_popup_button_hov_background_color_s,
            brightness: data.customize_popup_button_hov_background_color_b
          }
        ).replace(/\#/, ""),
      customize_popup_button_hov_text_color: {
        hue: data.customize_popup_button_hov_text_color_h,
        saturation: data.customize_popup_button_hov_text_color_s,
        brightness: data.customize_popup_button_hov_text_color_b
      },
      customize_popup_button_hov_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_popup_button_hov_text_color_h,
            saturation: data.customize_popup_button_hov_text_color_s,
            brightness: data.customize_popup_button_hov_text_color_b
          }
        ).replace(/\#/, ""),

      customize_footer_total_price_text_color: {
        hue: data.customize_footer_total_price_text_color_h,
        saturation: data.customize_footer_total_price_text_color_s,
        brightness: data.customize_footer_total_price_text_color_b
      },
      customize_footer_total_price_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_footer_total_price_text_color_h,
            saturation: data.customize_footer_total_price_text_color_s,
            brightness: data.customize_footer_total_price_text_color_b
          }
        ).replace(/\#/, ""),
      customize_footer_total_price_font_size: data.customize_footer_total_price_font_size,
      customize_footer_total_price_font_weigth: data.customize_footer_total_price_font_weigth,
      customize_footer_compare_price_text_color: {
        hue: data.customize_footer_compare_price_text_color_h,
        saturation: data.customize_footer_compare_price_text_color_s,
        brightness: data.customize_footer_compare_price_text_color_b
      },
      customize_footer_compare_price_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_footer_compare_price_text_color_h,
            saturation: data.customize_footer_compare_price_text_color_s,
            brightness: data.customize_footer_compare_price_text_color_b
          }
        ).replace(/\#/, ""),
      customize_footer_compare_price_font_size: data.customize_footer_compare_price_font_size,
      customize_footer_compare_price_font_weigth: data.customize_footer_compare_price_font_weigth,
      customize_footer_discount_text_color: {
        hue: data.customize_footer_discount_text_color_h,
        saturation: data.customize_footer_discount_text_color_s,
        brightness: data.customize_footer_discount_text_color_b
      },
      customize_footer_discount_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_footer_discount_text_color_h,
            saturation: data.customize_footer_discount_text_color_s,
            brightness: data.customize_footer_discount_text_color_b
          }
        ).replace(/\#/, ""),
      customize_footer_discount_font_size: data.customize_footer_discount_font_size,
      customize_footer_discount_font_weigth: data.customize_footer_discount_font_weigth,
      customize_footer_background_color: {
        hue: data.customize_footer_background_color_h,
        saturation: data.customize_footer_background_color_s,
        brightness: data.customize_footer_background_color_b
      },
      customize_footer_background_color_hex:
        hsbToHex(
          {
            hue: data.customize_footer_background_color_h,
            saturation: data.customize_footer_background_color_s,
            brightness: data.customize_footer_background_color_b
          }
        ).replace(/\#/, ""),
      customize_footer_text_color: {
        hue: data.customize_footer_text_color_h,
        saturation: data.customize_footer_text_color_s,
        brightness: data.customize_footer_text_color_b
      },
      customize_footer_text_color_hex:
        hsbToHex(
          {
            hue: data.customize_footer_text_color_h,
            saturation: data.customize_footer_text_color_s,
            brightness: data.customize_footer_text_color_b
          }
        ).replace(/\#/, ""),

      popoverLoading1: false,
      popoverLoading2: false,
      popoverHeaderBk: false,
      popoverHeaderText: false,
      popoverHeaderIcon: false,
      popoverHeaderIcon1: false,
      popoverBodyBk: false,
      popoverBodyBorder: false,
      popoverBodyText: false,
      popoverBodyIcon: false,
      popoverBodyProd0: false,
      popoverBodyProd1: false,
      popoverBodyProd2: false,
      popoverBodyProd3: false,
      popoverBodyProd4: false,
      popoverBodyProd5: false,
      popoverBodyProd6: false,
      popoverBodyProd7: false,
      popoverBodyProd8: false,
      popoverBodyUpsell1: false,
      popoverBodyUpsell2: false,
      popoverBodyUpsell3: false,
      popoverBodyUpsell4: false,
      popoverBodyUpsell5: false,
      popoverBodyUpsell6: false,
      popoverBodyUpsell12: false,
      popoverBodyUpsell13: false,
      popoverBodyUpsell8: false,
      popoverBodyUpsell9: false,
      popoverBodyUpsell10: false,
      popoverBodyUpsell11: false,
      popoverPopUp1: false,
      popoverPopUp2: false,
      popoverPopUp3: false,
      popoverPopUp4: false,
      popoverPopUp5: false,
      popoverPopUp6: false,
      popoverPopUp7: false,
      popoverPopUp8: false,
      popoverPopUp9: false,
      popoverPopUp10: false,
      popoverBodyUpsell7: false,
      popoverFooter1: false,
      popoverFooter2: false,
      popoverFooter3: false,
      popoverFooter4: false,
      popoverFooter5: false
    };
    switch (identify) {
      case 0:
        stateData = Object.assign({}, stateData, myData);//CONCAT OBJECTS
        /*  stateData = JSON.stringify(stateData).substring(1).slice(0,-1);//STRING WITH OUT {} */
        break;
      case 1:
        stateData = stateData;
        /* stateData = JSON.stringify(stateData).substring(1).slice(0,-1);//STRING WITH OUT {} */
        break;
    };
    /*  stateData = eval(
       `({
         ${stateData}
       })`
     ); */
    this.setState(stateData)
  };

  getCustomize = async () => {
    const app = this.context;
    const dataCustomize = await makeGetRequest('/api/get_customize', app);

    if (dataCustomize && Object.keys(dataCustomize).length > 0 && dataCustomize.customize !== undefined && dataCustomize.customize !== null) {
      //------------------------------ STATUS PLAN -------------------------------------------//
      /* const statusPlan = dataCustomize.statusPlan.data[0].status;
      if (statusPlan == 0) {
        const app = this.context;
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
        return false;
      }; */
      //--------------------------------------------------------------------------------------//
      /* const customize = dataCustomize.customize[0]; */
      this.originalData(0, dataCustomize);
      //this.titles();
    } else {
      if (typeof dataCustomize.plan_status !== 'undefined') {
        if (!dataCustomize.plan_status) {
          const app = this.context;
          const redirect = Redirect.create(app);
          redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
          return false;
        };
      };
    }
  };

  titles = () => {
    const app = this.context;
    const datas = { title: 'Customize' };
    const titleBarOptions = {
      title: datas.title
    };
    TitleBar.create(app, titleBarOptions);
  };

  validateData = () => {
    const w = this.state;
    const stateData = {
      customize_slidecart_design: w.customize_slidecart_design,
      customize_slidecart_size: w.customize_slidecart_size,
      customize_slidecart_position: w.customize_slidecart_position,
      customize_slidecart_animation_mobile: w.customize_slidecart_animation_mobile,
      customize_slidecart_footer_fixed: w.customize_slidecart_footer_fixed,
      customize_slidecart_rtl: w.customize_slidecart_rtl,
      customize_slidecart_margin_left: w.customize_slidecart_margin_left,
      customize_enabled_loading: w.customize_enabled_loading,
      customize_loading_background_h: w.customize_loading_background.hue,
      customize_loading_background_s: w.customize_loading_background.saturation,
      customize_loading_background_b: w.customize_loading_background.brightness,
      customize_loading_background_alpha: w.customize_loading_background.alpha,
      customize_loading_icon_h: w.customize_loading_icon.hue,
      customize_loading_icon_s: w.customize_loading_icon.saturation,
      customize_loading_icon_b: w.customize_loading_icon.brightness,
      customize_header_background_color_h: w.customize_header_background_color.hue,
      customize_header_background_color_s: w.customize_header_background_color.saturation,
      customize_header_background_color_b: w.customize_header_background_color.brightness,
      customize_header_text_color_h: w.customize_header_text_color.hue,
      customize_header_text_color_s: w.customize_header_text_color.saturation,
      customize_header_text_color_b: w.customize_header_text_color.brightness,
      customize_header_text_font_size: w.customize_header_text_font_size,
      customize_header_text_transform: w.customize_header_text_transform,
      customize_header_icon_color_h: w.customize_header_icon_color.hue,
      customize_header_icon_color_s: w.customize_header_icon_color.saturation,
      customize_header_icon_color_b: w.customize_header_icon_color.brightness,
      customize_header_icon_color_hov_h: w.customize_header_icon_color_hov.hue,
      customize_header_icon_color_hov_s: w.customize_header_icon_color_hov.saturation,
      customize_header_icon_color_hov_b: w.customize_header_icon_color_hov.brightness,
      customize_header_icon_size: w.customize_header_icon_size,
      customize_body_background_color_h: w.customize_body_background_color.hue,
      customize_body_background_color_s: w.customize_body_background_color.saturation,
      customize_body_background_color_b: w.customize_body_background_color.brightness,
      customize_body_text_color_h: w.customize_body_text_color.hue,
      customize_body_text_color_s: w.customize_body_text_color.saturation,
      customize_body_text_color_b: w.customize_body_text_color.brightness,
      customize_body_border_color_h: w.customize_body_border_color.hue,
      customize_body_border_color_s: w.customize_body_border_color.saturation,
      customize_body_border_color_b: w.customize_body_border_color.brightness,
      customize_body_prod_icon_remove_color_h: w.customize_body_prod_icon_remove_color.hue,
      customize_body_prod_icon_remove_color_s: w.customize_body_prod_icon_remove_color.saturation,
      customize_body_prod_icon_remove_color_b: w.customize_body_prod_icon_remove_color.brightness,
      customize_body_design_qty: w.customize_body_design_qty,
      customize_body_prod_remove_enabled: w.customize_body_prod_remove_enabled,
      customize_body_prod_remove_text: w.customize_body_prod_remove_text,
      customize_body_prod_icon_remove: w.customize_body_prod_icon_remove,
      customize_body_prod_icon_remove_size: w.customize_body_prod_icon_remove_size,
      customize_body_prod_icon_remove_color_hov_h: w.customize_body_prod_icon_remove_color_hov.hue,
      customize_body_prod_icon_remove_color_hov_s: w.customize_body_prod_icon_remove_color_hov.saturation,
      customize_body_prod_icon_remove_color_hov_b: w.customize_body_prod_icon_remove_color_hov.brightness,
      customize_body_prod_title_color_text_h: w.customize_body_prod_title_color_text.hue,
      customize_body_prod_title_color_text_s: w.customize_body_prod_title_color_text.saturation,
      customize_body_prod_title_color_text_b: w.customize_body_prod_title_color_text.brightness,
      customize_body_prod_title_font_size: w.customize_body_prod_title_font_size,
      customize_body_prod_title_font_weigth: w.customize_body_prod_title_font_weigth,
      customize_body_prod_title_text_transform: w.customize_body_prod_title_text_transform,
      customize_body_var_title_color_text_h: w.customize_body_var_title_color_text.hue,
      customize_body_var_title_color_text_s: w.customize_body_var_title_color_text.saturation,
      customize_body_var_title_color_text_b: w.customize_body_var_title_color_text.brightness,
      customize_body_var_title_font_size: w.customize_body_var_title_font_size,
      customize_body_var_title_font_weigth: w.customize_body_var_title_font_weigth,
      customize_body_var_title_text_transform: w.customize_body_var_title_text_transform,
      customize_body_price_color_text_h: w.customize_body_price_color_text.hue,
      customize_body_price_color_text_s: w.customize_body_price_color_text.saturation,
      customize_body_price_color_text_b: w.customize_body_price_color_text.brightness,
      customize_body_price_font_size: w.customize_body_price_font_size,
      customize_body_price_font_weigth: w.customize_body_price_font_weigth,
      customize_body_compare_price_color_text_h: w.customize_body_compare_price_color_text.hue,
      customize_body_compare_price_color_text_s: w.customize_body_compare_price_color_text.saturation,
      customize_body_compare_price_color_text_b: w.customize_body_compare_price_color_text.brightness,
      customize_body_compare_price_font_size: w.customize_body_compare_price_font_size,
      customize_body_compare_price_font_weigth: w.customize_body_compare_price_font_weigth,
      /* SALE PRICE */
      customize_body_enabled_sale_price: w.customize_body_enabled_sale_price,
      customize_body_sale_price_color_text_h: w.customize_body_sale_price_color_text.hue,
      customize_body_sale_price_color_text_s: w.customize_body_sale_price_color_text.saturation,
      customize_body_sale_price_color_text_b: w.customize_body_sale_price_color_text.brightness,
      customize_body_sale_price_font_size: w.customize_body_sale_price_font_size,
      customize_body_sale_price_font_weigth: w.customize_body_sale_price_font_weigth,
      /*  */
      customize_body_discount_color_text_h: w.customize_body_discount_color_text.hue,
      customize_body_discount_color_text_s: w.customize_body_discount_color_text.saturation,
      customize_body_discount_color_text_b: w.customize_body_discount_color_text.brightness,
      customize_body_discount_font_size: w.customize_body_discount_font_size,
      customize_body_discount_font_weigth: w.customize_body_discount_font_weigth,
      /*  */
      customize_body_upgrade_button_background_color_h: w.customize_body_upgrade_button_background_color.hue,
      customize_body_upgrade_button_background_color_s: w.customize_body_upgrade_button_background_color.saturation,
      customize_body_upgrade_button_background_color_b: w.customize_body_upgrade_button_background_color.brightness,
      customize_body_upgrade_button_text_color_h: w.customize_body_upgrade_button_text_color.hue,
      customize_body_upgrade_button_text_color_s: w.customize_body_upgrade_button_text_color.saturation,
      customize_body_upgrade_button_text_color_b: w.customize_body_upgrade_button_text_color.brightness,
      customize_body_upgrade_button_text_transform: w.customize_body_upgrade_button_text_transform,
      customize_body_upgrade_button_text_font_size: w.customize_body_upgrade_button_text_font_size,
      customize_body_upgrade_button_text_font_weigth: w.customize_body_upgrade_button_text_font_weigth,
      customize_body_upgrade_button_border_radius: w.customize_body_upgrade_button_border_radius,
      /*  */

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
      customize_body_upsell_enabled_sale_price: w.customize_body_upsell_enabled_sale_price,
      customize_body_upsell_sale_price_color_text_h: w.customize_body_upsell_sale_price_color_text.hue,
      customize_body_upsell_sale_price_color_text_s: w.customize_body_upsell_sale_price_color_text.saturation,
      customize_body_upsell_sale_price_color_text_b: w.customize_body_upsell_sale_price_color_text.brightness,
      customize_body_upsell_sale_price_font_size: w.customize_body_upsell_sale_price_font_size,
      customize_body_upsell_sale_price_font_weigth: w.customize_body_upsell_sale_price_font_weigth,
      /*  */
      customize_body_upsell_var_options_color_text_h: w.customize_body_upsell_var_options_color_text.hue,
      customize_body_upsell_var_options_color_text_s: w.customize_body_upsell_var_options_color_text.saturation,
      customize_body_upsell_var_options_color_text_b: w.customize_body_upsell_var_options_color_text.brightness,
      customize_body_upsell_var_options_font_size: w.customize_body_upsell_var_options_font_size,
      customize_body_upsell_var_options_font_weigth: w.customize_body_upsell_var_options_font_weigth,
      customize_body_upsell_var_options_text_transform: w.customize_body_upsell_var_options_text_transform,
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

      customize_popup_background_color_h: w.customize_popup_background_color.hue,
      customize_popup_background_color_s: w.customize_popup_background_color.saturation,
      customize_popup_background_color_b: w.customize_popup_background_color.brightness,
      customize_popup_border_color_h: w.customize_popup_border_color.hue,
      customize_popup_border_color_s: w.customize_popup_border_color.saturation,
      customize_popup_border_color_b: w.customize_popup_border_color.brightness,
      customize_popup_title_text_color_h: w.customize_popup_title_text_color.hue,
      customize_popup_title_text_color_s: w.customize_popup_title_text_color.saturation,
      customize_popup_title_text_color_b: w.customize_popup_title_text_color.brightness,
      customize_popup_title_font_size: w.customize_popup_title_font_size,
      customize_popup_title_font_weigth: w.customize_popup_title_font_weigth,
      customize_popup_title_text_transform: w.customize_popup_title_text_transform,
      customize_popup_price_text_color_h: w.customize_popup_price_text_color.hue,
      customize_popup_price_text_color_s: w.customize_popup_price_text_color.saturation,
      customize_popup_price_text_color_b: w.customize_popup_price_text_color.brightness,
      customize_popup_price_font_size: w.customize_popup_price_font_size,
      customize_popup_price_font_weigth: w.customize_popup_price_font_weigth,
      customize_popup_compare_price_text_color_h: w.customize_popup_compare_price_text_color.hue,
      customize_popup_compare_price_text_color_s: w.customize_popup_compare_price_text_color.saturation,
      customize_popup_compare_price_text_color_b: w.customize_popup_compare_price_text_color.brightness,
      customize_popup_compare_price_font_size: w.customize_popup_compare_price_font_size,
      customize_popup_compare_price_font_weigth: w.customize_popup_compare_price_font_weigth,
      /* SALE PRICE */
      customize_popup_enabled_sale_price: w.customize_popup_enabled_sale_price,
      customize_popup_sale_price_text_color_h: w.customize_popup_sale_price_text_color.hue,
      customize_popup_sale_price_text_color_s: w.customize_popup_sale_price_text_color.saturation,
      customize_popup_sale_price_text_color_b: w.customize_popup_sale_price_text_color.brightness,
      customize_popup_sale_price_font_size: w.customize_popup_sale_price_font_size,
      customize_popup_sale_price_font_weigth: w.customize_popup_sale_price_font_weigth,
      customize_popup_var_options_design: w.customize_popup_var_options_design,
      /*  */
      customize_popup_button_background_color_h: w.customize_popup_button_background_color.hue,
      customize_popup_button_background_color_s: w.customize_popup_button_background_color.saturation,
      customize_popup_button_background_color_b: w.customize_popup_button_background_color.brightness,
      customize_popup_button_text_color_h: w.customize_popup_button_text_color.hue,
      customize_popup_button_text_color_s: w.customize_popup_button_text_color.saturation,
      customize_popup_button_text_color_b: w.customize_popup_button_text_color.brightness,
      customize_popup_button_border_radius: w.customize_popup_button_border_radius,
      customize_popup_button_text_font_size: w.customize_popup_button_text_font_size,
      customize_popup_button_text_font_weigth: w.customize_popup_button_text_font_weigth,
      customize_popup_button_text_transform: w.customize_popup_button_text_transform,
      customize_popup_button_hov_background_color_h: w.customize_popup_button_hov_background_color.hue,
      customize_popup_button_hov_background_color_s: w.customize_popup_button_hov_background_color.saturation,
      customize_popup_button_hov_background_color_b: w.customize_popup_button_hov_background_color.brightness,
      customize_popup_button_hov_text_color_h: w.customize_popup_button_hov_text_color.hue,
      customize_popup_button_hov_text_color_s: w.customize_popup_button_hov_text_color.saturation,
      customize_popup_button_hov_text_color_b: w.customize_popup_button_hov_text_color.brightness,
      customize_footer_total_price_text_color_h: w.customize_footer_total_price_text_color.hue,
      customize_footer_total_price_text_color_s: w.customize_footer_total_price_text_color.saturation,
      customize_footer_total_price_text_color_b: w.customize_footer_total_price_text_color.brightness,
      customize_footer_total_price_font_size: w.customize_footer_total_price_font_size,
      customize_footer_total_price_font_weigth: w.customize_footer_total_price_font_weigth,
      customize_footer_compare_price_text_color_h: w.customize_footer_compare_price_text_color.hue,
      customize_footer_compare_price_text_color_s: w.customize_footer_compare_price_text_color.saturation,
      customize_footer_compare_price_text_color_b: w.customize_footer_compare_price_text_color.brightness,
      customize_footer_compare_price_font_size: w.customize_footer_compare_price_font_size,
      customize_footer_compare_price_font_weigth: w.customize_footer_compare_price_font_weigth,
      customize_footer_discount_text_color_h: w.customize_footer_discount_text_color.hue,
      customize_footer_discount_text_color_s: w.customize_footer_discount_text_color.saturation,
      customize_footer_discount_text_color_b: w.customize_footer_discount_text_color.brightness,
      customize_footer_discount_font_size: w.customize_footer_discount_font_size,
      customize_footer_discount_font_weigth: w.customize_footer_discount_font_weigth,
      customize_footer_background_color_h: w.customize_footer_background_color.hue,
      customize_footer_background_color_s: w.customize_footer_background_color.saturation,
      customize_footer_background_color_b: w.customize_footer_background_color.brightness,
      customize_footer_text_color_h: w.customize_footer_text_color.hue,
      customize_footer_text_color_s: w.customize_footer_text_color.saturation,
      customize_footer_text_color_b: w.customize_footer_text_color.brightness,
    };

    const myCustomize = this.state.dataCustomize;
    if (typeof myCustomize.customize !== 'undefined' || myCustomize.length > 0) {
      const c = myCustomize.customize[0];
      const dataCustomize = {
        customize_slidecart_design: c.customize_slidecart_design.toString(),
        customize_slidecart_size: c.customize_slidecart_size.toString(),
        customize_slidecart_position: c.customize_slidecart_position.toString(),
        customize_slidecart_animation_mobile: c.customize_slidecart_animation_mobile.toString(),
        customize_slidecart_footer_fixed: c.customize_slidecart_footer_fixed,
        customize_slidecart_rtl: c.customize_slidecart_rtl,
        customize_slidecart_margin_left: c.customize_slidecart_margin_left,
        customize_enabled_loading: !!c.customize_enabled_loading ? true : false,
        customize_loading_background_h: c.customize_loading_background_h,
        customize_loading_background_s: c.customize_loading_background_s,
        customize_loading_background_b: c.customize_loading_background_b,
        customize_loading_background_alpha: c.customize_loading_background_alpha,
        customize_loading_icon_h: c.customize_loading_icon_h,
        customize_loading_icon_s: c.customize_loading_icon_s,
        customize_loading_icon_b: c.customize_loading_icon_b,
        customize_header_background_color_h: c.customize_header_background_color_h,
        customize_header_background_color_s: c.customize_header_background_color_s,
        customize_header_background_color_b: c.customize_header_background_color_b,
        customize_header_text_color_h: c.customize_header_text_color_h,
        customize_header_text_color_s: c.customize_header_text_color_s,
        customize_header_text_color_b: c.customize_header_text_color_b,
        customize_header_text_font_size: c.customize_header_text_font_size,
        customize_header_text_transform: c.customize_header_text_transform,
        customize_header_icon_color_h: c.customize_header_icon_color_h,
        customize_header_icon_color_s: c.customize_header_icon_color_s,
        customize_header_icon_color_b: c.customize_header_icon_color_b,
        customize_header_icon_color_hov_h: c.customize_header_icon_color_hov_h,
        customize_header_icon_color_hov_s: c.customize_header_icon_color_hov_s,
        customize_header_icon_color_hov_b: c.customize_header_icon_color_hov_b,
        customize_header_icon_size: c.customize_header_icon_size,
        customize_body_background_color_h: c.customize_body_background_color_h,
        customize_body_background_color_s: c.customize_body_background_color_s,
        customize_body_background_color_b: c.customize_body_background_color_b,
        customize_body_text_color_h: c.customize_body_text_color_h,
        customize_body_text_color_s: c.customize_body_text_color_s,
        customize_body_text_color_b: c.customize_body_text_color_b,
        customize_body_border_color_h: c.customize_body_border_color_h,
        customize_body_border_color_s: c.customize_body_border_color_s,
        customize_body_border_color_b: c.customize_body_border_color_b,
        customize_body_prod_icon_remove_color_h: c.customize_body_prod_icon_remove_color_h,
        customize_body_prod_icon_remove_color_s: c.customize_body_prod_icon_remove_color_s,
        customize_body_prod_icon_remove_color_b: c.customize_body_prod_icon_remove_color_b,
        customize_body_design_qty: c.customize_body_design_qty,
        customize_body_prod_remove_enabled: c.customize_body_prod_remove_enabled,
        customize_body_prod_remove_text: c.customize_body_prod_remove_text,
        customize_body_prod_icon_remove: c.customize_body_prod_icon_remove,
        customize_body_prod_icon_remove_size: c.customize_body_prod_icon_remove_size,
        customize_body_prod_icon_remove_color_hov_h: c.customize_body_prod_icon_remove_color_hov_h,
        customize_body_prod_icon_remove_color_hov_s: c.customize_body_prod_icon_remove_color_hov_s,
        customize_body_prod_icon_remove_color_hov_b: c.customize_body_prod_icon_remove_color_hov_b,
        customize_body_prod_title_color_text_h: c.customize_body_prod_title_color_text_h,
        customize_body_prod_title_color_text_s: c.customize_body_prod_title_color_text_s,
        customize_body_prod_title_color_text_b: c.customize_body_prod_title_color_text_b,
        customize_body_prod_title_font_size: c.customize_body_prod_title_font_size,
        customize_body_prod_title_font_weigth: c.customize_body_prod_title_font_weigth,
        customize_body_prod_title_text_transform: c.customize_body_prod_title_text_transform,
        customize_body_var_title_color_text_h: c.customize_body_var_title_color_text_h,
        customize_body_var_title_color_text_s: c.customize_body_var_title_color_text_s,
        customize_body_var_title_color_text_b: c.customize_body_var_title_color_text_b,
        customize_body_var_title_font_size: c.customize_body_var_title_font_size,
        customize_body_var_title_font_weigth: c.customize_body_var_title_font_weigth,
        customize_body_var_title_text_transform: c.customize_body_var_title_text_transform,
        customize_body_price_color_text_h: c.customize_body_price_color_text_h,
        customize_body_price_color_text_s: c.customize_body_price_color_text_s,
        customize_body_price_color_text_b: c.customize_body_price_color_text_b,
        customize_body_price_font_size: c.customize_body_price_font_size,
        customize_body_price_font_weigth: c.customize_body_price_font_weigth,
        customize_body_compare_price_color_text_h: c.customize_body_compare_price_color_text_h,
        customize_body_compare_price_color_text_s: c.customize_body_compare_price_color_text_s,
        customize_body_compare_price_color_text_b: c.customize_body_compare_price_color_text_b,
        customize_body_compare_price_font_size: c.customize_body_compare_price_font_size,
        customize_body_compare_price_font_weigth: c.customize_body_compare_price_font_weigth,
        /* SALE PRICE */
        customize_body_enabled_sale_price: c.customize_body_enabled_sale_price,
        customize_body_sale_price_color_text_h: c.customize_body_sale_price_color_text_h,
        customize_body_sale_price_color_text_s: c.customize_body_sale_price_color_text_s,
        customize_body_sale_price_color_text_b: c.customize_body_sale_price_color_text_b,
        customize_body_sale_price_font_size: c.customize_body_sale_price_font_size,
        customize_body_sale_price_font_weigth: c.customize_body_sale_price_font_weigth,
        /*  */
        customize_body_discount_color_text_h: c.customize_body_discount_color_text_h,
        customize_body_discount_color_text_s: c.customize_body_discount_color_text_s,
        customize_body_discount_color_text_b: c.customize_body_discount_color_text_b,
        customize_body_discount_font_size: c.customize_body_discount_font_size,
        customize_body_discount_font_weigth: c.customize_body_discount_font_weigth,
        /*  */

        customize_body_upgrade_button_background_color_h: c.customize_body_upgrade_button_background_color_h,
        customize_body_upgrade_button_background_color_s: c.customize_body_upgrade_button_background_color_s,
        customize_body_upgrade_button_background_color_b: c.customize_body_upgrade_button_background_color_b,
        customize_body_upgrade_button_text_color_h: c.customize_body_upgrade_button_text_color_h,
        customize_body_upgrade_button_text_color_s: c.customize_body_upgrade_button_text_color_s,
        customize_body_upgrade_button_text_color_b: c.customize_body_upgrade_button_text_color_b,
        customize_body_upgrade_button_text_transform: c.customize_body_upgrade_button_text_transform,
        customize_body_upgrade_button_text_font_size: c.customize_body_upgrade_button_text_font_size,
        customize_body_upgrade_button_text_font_weigth: c.customize_body_upgrade_button_text_font_weigth,
        customize_body_upgrade_button_border_radius: c.customize_body_upgrade_button_border_radius,

        /*  */
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
        customize_body_upsell_enabled_sale_price: c.customize_body_upsell_enabled_sale_price,
        customize_body_upsell_sale_price_color_text_h: c.customize_body_upsell_sale_price_color_text_h,
        customize_body_upsell_sale_price_color_text_s: c.customize_body_upsell_sale_price_color_text_s,
        customize_body_upsell_sale_price_color_text_b: c.customize_body_upsell_sale_price_color_text_b,
        customize_body_upsell_sale_price_font_size: c.customize_body_upsell_sale_price_font_size,
        customize_body_upsell_sale_price_font_weigth: c.customize_body_upsell_sale_price_font_weigth,
        /*  */
        customize_body_upsell_var_options_color_text_h: c.customize_body_upsell_var_options_color_text_h,
        customize_body_upsell_var_options_color_text_s: c.customize_body_upsell_var_options_color_text_s,
        customize_body_upsell_var_options_color_text_b: c.customize_body_upsell_var_options_color_text_b,
        customize_body_upsell_var_options_font_size: c.customize_body_upsell_var_options_font_size,
        customize_body_upsell_var_options_font_weigth: c.customize_body_upsell_var_options_font_weigth,
        customize_body_upsell_var_options_text_transform: c.customize_body_upsell_var_options_text_transform,
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
        customize_popup_background_color_h: c.customize_popup_background_color_h,
        customize_popup_background_color_s: c.customize_popup_background_color_s,
        customize_popup_background_color_b: c.customize_popup_background_color_b,
        customize_popup_border_color_h: c.customize_popup_border_color_h,
        customize_popup_border_color_s: c.customize_popup_border_color_s,
        customize_popup_border_color_b: c.customize_popup_border_color_b,
        customize_popup_title_text_color_h: c.customize_popup_title_text_color_h,
        customize_popup_title_text_color_s: c.customize_popup_title_text_color_s,
        customize_popup_title_text_color_b: c.customize_popup_title_text_color_b,
        customize_popup_title_font_size: c.customize_popup_title_font_size,
        customize_popup_title_font_weigth: c.customize_popup_title_font_weigth,
        customize_popup_title_text_transform: c.customize_popup_title_text_transform,
        customize_popup_price_text_color_h: c.customize_popup_price_text_color_h,
        customize_popup_price_text_color_s: c.customize_popup_price_text_color_s,
        customize_popup_price_text_color_b: c.customize_popup_price_text_color_b,
        customize_popup_price_font_size: c.customize_popup_price_font_size,
        customize_popup_price_font_weigth: c.customize_popup_price_font_weigth,
        customize_popup_compare_price_text_color_h: c.customize_popup_compare_price_text_color_h,
        customize_popup_compare_price_text_color_s: c.customize_popup_compare_price_text_color_s,
        customize_popup_compare_price_text_color_b: c.customize_popup_compare_price_text_color_b,
        customize_popup_compare_price_font_size: c.customize_popup_compare_price_font_size,
        customize_popup_compare_price_font_weigth: c.customize_popup_compare_price_font_weigth,
        /* SALE PRICE */
        customize_popup_enabled_sale_price: c.customize_popup_enabled_sale_price,
        customize_popup_sale_price_text_color_h: c.customize_popup_sale_price_text_color_h,
        customize_popup_sale_price_text_color_s: c.customize_popup_sale_price_text_color_s,
        customize_popup_sale_price_text_color_b: c.customize_popup_sale_price_text_color_b,
        customize_popup_sale_price_font_size: c.customize_popup_sale_price_font_size,
        customize_popup_sale_price_font_weigth: c.customize_popup_sale_price_font_weigth,
        customize_popup_var_options_design: c.customize_popup_var_options_design,
        /*  */
        customize_popup_button_background_color_h: c.customize_popup_button_background_color_h,
        customize_popup_button_background_color_s: c.customize_popup_button_background_color_s,
        customize_popup_button_background_color_b: c.customize_popup_button_background_color_b,
        customize_popup_button_text_color_h: c.customize_popup_button_text_color_h,
        customize_popup_button_text_color_s: c.customize_popup_button_text_color_s,
        customize_popup_button_text_color_b: c.customize_popup_button_text_color_b,
        customize_popup_button_border_radius: c.customize_popup_button_border_radius,
        customize_popup_button_text_font_size: c.customize_popup_button_text_font_size,
        customize_popup_button_text_font_weigth: c.customize_popup_button_text_font_weigth,
        customize_popup_button_text_transform: c.customize_popup_button_text_transform,
        customize_popup_button_hov_background_color_h: c.customize_popup_button_hov_background_color_h,
        customize_popup_button_hov_background_color_s: c.customize_popup_button_hov_background_color_s,
        customize_popup_button_hov_background_color_b: c.customize_popup_button_hov_background_color_b,
        customize_popup_button_hov_text_color_h: c.customize_popup_button_hov_text_color_h,
        customize_popup_button_hov_text_color_s: c.customize_popup_button_hov_text_color_s,
        customize_popup_button_hov_text_color_b: c.customize_popup_button_hov_text_color_b,
        customize_footer_total_price_text_color_h: c.customize_footer_total_price_text_color_h,
        customize_footer_total_price_text_color_s: c.customize_footer_total_price_text_color_s,
        customize_footer_total_price_text_color_b: c.customize_footer_total_price_text_color_b,
        customize_footer_total_price_font_size: c.customize_footer_total_price_font_size,
        customize_footer_total_price_font_weigth: c.customize_footer_total_price_font_weigth,
        customize_footer_compare_price_text_color_h: c.customize_footer_compare_price_text_color_h,
        customize_footer_compare_price_text_color_s: c.customize_footer_compare_price_text_color_s,
        customize_footer_compare_price_text_color_b: c.customize_footer_compare_price_text_color_b,
        customize_footer_compare_price_font_size: c.customize_footer_compare_price_font_size,
        customize_footer_compare_price_font_weigth: c.customize_footer_compare_price_font_weigth,
        customize_footer_discount_text_color_h: c.customize_footer_discount_text_color_h,
        customize_footer_discount_text_color_s: c.customize_footer_discount_text_color_s,
        customize_footer_discount_text_color_b: c.customize_footer_discount_text_color_b,
        customize_footer_discount_font_size: c.customize_footer_discount_font_size,
        customize_footer_discount_font_weigth: c.customize_footer_discount_font_weigth,
        customize_footer_background_color_h: c.customize_footer_background_color_h,
        customize_footer_background_color_s: c.customize_footer_background_color_s,
        customize_footer_background_color_b: c.customize_footer_background_color_b,
        customize_footer_text_color_h: c.customize_footer_text_color_h,
        customize_footer_text_color_s: c.customize_footer_text_color_s,
        customize_footer_text_color_b: c.customize_footer_text_color_b,
      };

      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const a = dataCustomize;
      const b = stateData;
      /* console.log('a')
      console.log(a)
      console.log('b')
      console.log(b) */
      if (equals(a, b)) {
        return true;
      } else {
        return false;
      }
    };
  };

  discard = () => {
    var c = this.state.dataCustomize;
    this.originalData(1, c);
    this.props.updateGridItems({ customize: c.customize[0].customize_enabled_loading });
  };

  updateCustomize = async (props) => {
    this.setState({
      loading: true
    });
    if (!!props) {
      const requestBody = {
        customize_slidecart_design: parseInt(props.customize_slidecart_design),
        customize_slidecart_size: parseInt(props.customize_slidecart_size),
        customize_slidecart_position: parseInt(props.customize_slidecart_position),
        customize_slidecart_animation_mobile: parseInt(props.customize_slidecart_animation_mobile),
        customize_slidecart_footer_fixed: props.customize_slidecart_footer_fixed,
        customize_slidecart_rtl: props.customize_slidecart_rtl,
        customize_slidecart_margin_left: props.customize_slidecart_margin_left,
        customize_enabled_loading: props.customize_enabled_loading,
        customize_loading_background_h: props.customize_loading_background.hue,
        customize_loading_background_s: props.customize_loading_background.saturation,
        customize_loading_background_b: props.customize_loading_background.brightness,
        customize_loading_background_alpha: props.customize_loading_background.alpha,
        customize_loading_background_rgb: props.customize_loading_background_rgb,
        customize_loading_icon_h: props.customize_loading_icon.hue,
        customize_loading_icon_s: props.customize_loading_icon.saturation,
        customize_loading_icon_b: props.customize_loading_icon.brightness,
        customize_loading_icon_hex: '#' + props.customize_loading_icon_hex,
        customize_header_background_color_h: props.customize_header_background_color.hue,
        customize_header_background_color_s: props.customize_header_background_color.saturation,
        customize_header_background_color_b: props.customize_header_background_color.brightness,
        customize_header_background_color_hex: '#' + props.customize_header_background_color_hex,
        customize_header_text_color_h: props.customize_header_text_color.hue,
        customize_header_text_color_s: props.customize_header_text_color.saturation,
        customize_header_text_color_b: props.customize_header_text_color.brightness,
        customize_header_text_color_hex: '#' + props.customize_header_text_color_hex,
        customize_header_text_font_size: props.customize_header_text_font_size,
        customize_header_text_transform: props.customize_header_text_transform,
        customize_header_icon_color_h: props.customize_header_icon_color.hue,
        customize_header_icon_color_s: props.customize_header_icon_color.saturation,
        customize_header_icon_color_b: props.customize_header_icon_color.brightness,
        customize_header_icon_color_hex: '#' + props.customize_header_icon_color_hex,
        customize_header_icon_color_hov_h: props.customize_header_icon_color_hov.hue,
        customize_header_icon_color_hov_s: props.customize_header_icon_color_hov.saturation,
        customize_header_icon_color_hov_b: props.customize_header_icon_color_hov.brightness,
        customize_header_icon_color_hov_hex: '#' + props.customize_header_icon_color_hov_hex,
        customize_header_icon_size: props.customize_header_icon_size,
        customize_body_background_color_h: props.customize_body_background_color.hue,
        customize_body_background_color_s: props.customize_body_background_color.saturation,
        customize_body_background_color_b: props.customize_body_background_color.brightness,
        customize_body_background_color_hex: '#' + props.customize_body_background_color_hex,
        customize_body_text_color_h: props.customize_body_text_color.hue,
        customize_body_text_color_s: props.customize_body_text_color.saturation,
        customize_body_text_color_b: props.customize_body_text_color.brightness,
        customize_body_text_color_hex: '#' + props.customize_body_text_color_hex,
        customize_body_border_color_h: props.customize_body_border_color.hue,
        customize_body_border_color_s: props.customize_body_border_color.saturation,
        customize_body_border_color_b: props.customize_body_border_color.brightness,
        customize_body_border_color_hex: '#' + props.customize_body_border_color_hex,
        customize_body_prod_icon_remove_color_h: props.customize_body_prod_icon_remove_color.hue,
        customize_body_prod_icon_remove_color_s: props.customize_body_prod_icon_remove_color.saturation,
        customize_body_prod_icon_remove_color_b: props.customize_body_prod_icon_remove_color.brightness,
        customize_body_prod_icon_remove_color_hex: '#' + props.customize_body_prod_icon_remove_color_hex,
        customize_body_design_qty: props.customize_body_design_qty,
        customize_body_prod_remove_enabled: props.customize_body_prod_remove_enabled,
        customize_body_prod_remove_text: props.customize_body_prod_remove_text,
        customize_body_prod_icon_remove: props.customize_body_prod_icon_remove,
        customize_body_prod_icon_remove_size: props.customize_body_prod_icon_remove_size,
        customize_body_prod_icon_remove_color_hov_h: props.customize_body_prod_icon_remove_color_hov.hue,
        customize_body_prod_icon_remove_color_hov_s: props.customize_body_prod_icon_remove_color_hov.saturation,
        customize_body_prod_icon_remove_color_hov_b: props.customize_body_prod_icon_remove_color_hov.brightness,
        customize_body_prod_icon_remove_color_hov_hex: "#" + props.customize_body_prod_icon_remove_color_hov_hex,
        customize_body_prod_title_color_text_h: props.customize_body_prod_title_color_text.hue,
        customize_body_prod_title_color_text_s: props.customize_body_prod_title_color_text.saturation,
        customize_body_prod_title_color_text_b: props.customize_body_prod_title_color_text.brightness,
        customize_body_prod_title_color_text_hex: '#' + props.customize_body_prod_title_color_text_hex,
        customize_body_prod_title_font_size: props.customize_body_prod_title_font_size,
        customize_body_prod_title_font_weigth: props.customize_body_prod_title_font_weigth,
        customize_body_prod_title_text_transform: props.customize_body_prod_title_text_transform,
        customize_body_var_title_color_text_h: props.customize_body_var_title_color_text.hue,
        customize_body_var_title_color_text_s: props.customize_body_var_title_color_text.saturation,
        customize_body_var_title_color_text_b: props.customize_body_var_title_color_text.brightness,
        customize_body_var_title_color_text_hex: '#' + props.customize_body_var_title_color_text_hex,
        customize_body_var_title_font_size: props.customize_body_var_title_font_size,
        customize_body_var_title_font_weigth: props.customize_body_var_title_font_weigth,
        customize_body_var_title_text_transform: props.customize_body_var_title_text_transform,
        customize_body_price_color_text_h: props.customize_body_price_color_text.hue,
        customize_body_price_color_text_s: props.customize_body_price_color_text.saturation,
        customize_body_price_color_text_b: props.customize_body_price_color_text.brightness,
        customize_body_price_color_text_hex: '#' + props.customize_body_price_color_text_hex,
        customize_body_price_font_size: props.customize_body_price_font_size,
        customize_body_price_font_weigth: props.customize_body_price_font_weigth,
        customize_body_compare_price_color_text_h: props.customize_body_compare_price_color_text.hue,
        customize_body_compare_price_color_text_s: props.customize_body_compare_price_color_text.saturation,
        customize_body_compare_price_color_text_b: props.customize_body_compare_price_color_text.brightness,
        customize_body_compare_price_color_text_hex: '#' + props.customize_body_compare_price_color_text_hex,
        customize_body_compare_price_font_size: props.customize_body_compare_price_font_size,
        customize_body_compare_price_font_weigth: props.customize_body_compare_price_font_weigth,
        /* SALE PRICE */
        customize_body_enabled_sale_price: props.customize_body_enabled_sale_price,
        customize_body_sale_price_color_text_h: props.customize_body_sale_price_color_text.hue,
        customize_body_sale_price_color_text_s: props.customize_body_sale_price_color_text.saturation,
        customize_body_sale_price_color_text_b: props.customize_body_sale_price_color_text.brightness,
        customize_body_sale_price_color_text_hex: '#' + props.customize_body_sale_price_color_text_hex,
        customize_body_sale_price_font_size: props.customize_body_sale_price_font_size,
        customize_body_sale_price_font_weigth: props.customize_body_sale_price_font_weigth,
        /*  */
        customize_body_discount_color_text_h: props.customize_body_discount_color_text.hue,
        customize_body_discount_color_text_s: props.customize_body_discount_color_text.saturation,
        customize_body_discount_color_text_b: props.customize_body_discount_color_text.brightness,
        customize_body_discount_color_text_hex: '#' + props.customize_body_discount_color_text_hex,
        customize_body_discount_font_size: props.customize_body_discount_font_size,
        customize_body_discount_font_weigth: props.customize_body_discount_font_weigth,
        /*  */
        customize_body_upgrade_button_background_color_h: props.customize_body_upgrade_button_background_color.hue,
        customize_body_upgrade_button_background_color_s: props.customize_body_upgrade_button_background_color.saturation,
        customize_body_upgrade_button_background_color_b: props.customize_body_upgrade_button_background_color.brightness,
        customize_body_upgrade_button_background_color_hex: '#' + props.customize_body_upgrade_button_background_color_hex,
        customize_body_upgrade_button_text_color_h: props.customize_body_upgrade_button_text_color.hue,
        customize_body_upgrade_button_text_color_s: props.customize_body_upgrade_button_text_color.saturation,
        customize_body_upgrade_button_text_color_b: props.customize_body_upgrade_button_text_color.brightness,
        customize_body_upgrade_button_text_color_hex: '#' + props.customize_body_upgrade_button_text_color_hex,
        customize_body_upgrade_button_text_transform: props.customize_body_upgrade_button_text_transform,
        customize_body_upgrade_button_text_font_size: props.customize_body_upgrade_button_text_font_size,
        customize_body_upgrade_button_text_font_weigth: props.customize_body_upgrade_button_text_font_weigth,
        customize_body_upgrade_button_border_radius: props.customize_body_upgrade_button_border_radius,
        /*  */
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
        /* SALE PRICE */
        customize_body_upsell_enabled_sale_price: props.customize_body_upsell_enabled_sale_price,
        customize_body_upsell_sale_price_color_text_h: props.customize_body_upsell_sale_price_color_text.hue,
        customize_body_upsell_sale_price_color_text_s: props.customize_body_upsell_sale_price_color_text.saturation,
        customize_body_upsell_sale_price_color_text_b: props.customize_body_upsell_sale_price_color_text.brightness,
        customize_body_upsell_sale_price_color_text_hex: '#' + props.customize_body_upsell_sale_price_color_text_hex,
        customize_body_upsell_sale_price_font_size: props.customize_body_upsell_sale_price_font_size,
        customize_body_upsell_sale_price_font_weigth: props.customize_body_upsell_sale_price_font_weigth,
        /*  */
        customize_body_upsell_var_options_color_text_h: props.customize_body_upsell_var_options_color_text.hue,
        customize_body_upsell_var_options_color_text_s: props.customize_body_upsell_var_options_color_text.saturation,
        customize_body_upsell_var_options_color_text_b: props.customize_body_upsell_var_options_color_text.brightness,
        customize_body_upsell_var_options_color_text_hex: '#' + props.customize_body_upsell_var_options_color_text_hex,
        customize_body_upsell_var_options_font_size: props.customize_body_upsell_var_options_font_size,
        customize_body_upsell_var_options_font_weigth: props.customize_body_upsell_var_options_font_weigth,
        customize_body_upsell_var_options_text_transform: props.customize_body_upsell_var_options_text_transform,
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
        customize_popup_background_color_h: props.customize_popup_background_color.hue,
        customize_popup_background_color_s: props.customize_popup_background_color.saturation,
        customize_popup_background_color_b: props.customize_popup_background_color.brightness,
        customize_popup_background_color_hex: '#' + props.customize_popup_background_color_hex,
        customize_popup_border_color_h: props.customize_popup_border_color.hue,
        customize_popup_border_color_s: props.customize_popup_border_color.saturation,
        customize_popup_border_color_b: props.customize_popup_border_color.brightness,
        customize_popup_border_color_hex: '#' + props.customize_popup_border_color_hex,
        customize_popup_title_text_color_h: props.customize_popup_title_text_color.hue,
        customize_popup_title_text_color_s: props.customize_popup_title_text_color.saturation,
        customize_popup_title_text_color_b: props.customize_popup_title_text_color.brightness,
        customize_popup_title_text_color_hex: '#' + props.customize_popup_title_text_color_hex,
        customize_popup_title_font_size: props.customize_popup_title_font_size,
        customize_popup_title_font_weigth: props.customize_popup_title_font_weigth,
        customize_popup_title_text_transform: props.customize_popup_title_text_transform,
        customize_popup_price_text_color_h: props.customize_popup_price_text_color.hue,
        customize_popup_price_text_color_s: props.customize_popup_price_text_color.saturation,
        customize_popup_price_text_color_b: props.customize_popup_price_text_color.brightness,
        customize_popup_price_text_color_hex: '#' + props.customize_popup_price_text_color_hex,
        customize_popup_price_font_size: props.customize_popup_price_font_size,
        customize_popup_price_font_weigth: props.customize_popup_price_font_weigth,
        customize_popup_compare_price_text_color_h: props.customize_popup_compare_price_text_color.hue,
        customize_popup_compare_price_text_color_s: props.customize_popup_compare_price_text_color.saturation,
        customize_popup_compare_price_text_color_b: props.customize_popup_compare_price_text_color.brightness,
        customize_popup_compare_price_text_color_hex: '#' + props.customize_popup_compare_price_text_color_hex,
        customize_popup_compare_price_font_size: props.customize_popup_compare_price_font_size,
        customize_popup_compare_price_font_weigth: props.customize_popup_compare_price_font_weigth,
        /* SALE PRICE */
        customize_popup_enabled_sale_price: props.customize_popup_enabled_sale_price,
        customize_popup_sale_price_text_color_h: props.customize_popup_sale_price_text_color.hue,
        customize_popup_sale_price_text_color_s: props.customize_popup_sale_price_text_color.saturation,
        customize_popup_sale_price_text_color_b: props.customize_popup_sale_price_text_color.brightness,
        customize_popup_sale_price_text_color_hex: '#' + props.customize_popup_sale_price_text_color_hex,
        customize_popup_sale_price_font_size: props.customize_popup_sale_price_font_size,
        customize_popup_sale_price_font_weigth: props.customize_popup_sale_price_font_weigth,
        customize_popup_var_options_design: props.customize_popup_var_options_design,
        /*  */
        customize_popup_button_background_color_h: props.customize_popup_button_background_color.hue,
        customize_popup_button_background_color_s: props.customize_popup_button_background_color.saturation,
        customize_popup_button_background_color_b: props.customize_popup_button_background_color.brightness,
        customize_popup_button_background_color_hex: '#' + props.customize_popup_button_background_color_hex,
        customize_popup_button_text_color_h: props.customize_popup_button_text_color.hue,
        customize_popup_button_text_color_s: props.customize_popup_button_text_color.saturation,
        customize_popup_button_text_color_b: props.customize_popup_button_text_color.brightness,
        customize_popup_button_text_color_hex: '#' + props.customize_popup_button_text_color_hex,
        customize_popup_button_border_radius: props.customize_popup_button_border_radius,
        customize_popup_button_text_font_size: props.customize_popup_button_text_font_size,
        customize_popup_button_text_font_weigth: props.customize_popup_button_text_font_weigth,
        customize_popup_button_text_transform: props.customize_popup_button_text_transform,
        customize_popup_button_hov_background_color_h: props.customize_popup_button_hov_background_color.hue,
        customize_popup_button_hov_background_color_s: props.customize_popup_button_hov_background_color.saturation,
        customize_popup_button_hov_background_color_b: props.customize_popup_button_hov_background_color.brightness,
        customize_popup_button_hov_background_color_hex: '#' + props.customize_popup_button_hov_background_color_hex,
        customize_popup_button_hov_text_color_h: props.customize_popup_button_hov_text_color.hue,
        customize_popup_button_hov_text_color_s: props.customize_popup_button_hov_text_color.saturation,
        customize_popup_button_hov_text_color_b: props.customize_popup_button_hov_text_color.brightness,
        customize_popup_button_hov_text_color_hex: '#' + props.customize_popup_button_hov_text_color_hex,
        customize_footer_total_price_text_color_h: props.customize_footer_total_price_text_color.hue,
        customize_footer_total_price_text_color_s: props.customize_footer_total_price_text_color.saturation,
        customize_footer_total_price_text_color_b: props.customize_footer_total_price_text_color.brightness,
        customize_footer_total_price_text_color_hex: '#' + props.customize_footer_total_price_text_color_hex,
        customize_footer_total_price_font_size: props.customize_footer_total_price_font_size,
        customize_footer_total_price_font_weigth: props.customize_footer_total_price_font_weigth,
        customize_footer_compare_price_text_color_h: props.customize_footer_compare_price_text_color.hue,
        customize_footer_compare_price_text_color_s: props.customize_footer_compare_price_text_color.saturation,
        customize_footer_compare_price_text_color_b: props.customize_footer_compare_price_text_color.brightness,
        customize_footer_compare_price_text_color_hex: '#' + props.customize_footer_compare_price_text_color_hex,
        customize_footer_compare_price_font_size: props.customize_footer_compare_price_font_size,
        customize_footer_compare_price_font_weigth: props.customize_footer_compare_price_font_weigth,
        customize_footer_discount_text_color_h: props.customize_footer_discount_text_color.hue,
        customize_footer_discount_text_color_s: props.customize_footer_discount_text_color.saturation,
        customize_footer_discount_text_color_b: props.customize_footer_discount_text_color.brightness,
        customize_footer_discount_text_color_hex: '#' + props.customize_footer_discount_text_color_hex,
        customize_footer_discount_font_size: props.customize_footer_discount_font_size,
        customize_footer_discount_font_weigth: props.customize_footer_discount_font_weigth,
        customize_footer_background_color_h: props.customize_footer_background_color.hue,
        customize_footer_background_color_s: props.customize_footer_background_color.saturation,
        customize_footer_background_color_b: props.customize_footer_background_color.brightness,
        customize_footer_background_color_hex: '#' + props.customize_footer_background_color_hex,
        customize_footer_text_color_h: props.customize_footer_text_color.hue,
        customize_footer_text_color_s: props.customize_footer_text_color.saturation,
        customize_footer_text_color_b: props.customize_footer_text_color.brightness,
        customize_footer_text_color_hex: '#' + props.customize_footer_text_color_hex,

      };

      const method = 'PUT';
      const app = this.context;
      await makePutPostRequest('/api/customize', method, requestBody, app).then(response => {
        if (response) {
          this.getCustomize();
          this.setState({ toast: true });
        };
      }).catch(err => {
        this.notifyError(err, 'updateCustomize');
      });
    }
  };

  iconPreview = () => {
    if (this.state.dataCustomize.iconsCustomize != undefined) {
      const a = this.state.customize_body_prod_icon_remove_svg;
      const b = '#' + this.state.customize_body_prod_icon_remove_color_hex;
      const c = '#' + this.state.customize_body_prod_icon_remove_color_hov_hex;
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
            const icon_svg_color = document.querySelector("#content svg");
            const paths = document.querySelectorAll("#content svg path");
            const paths2 = document.querySelectorAll("#content svg circle");

            icon_svg_color.setAttribute("style", "fill:" + b + ";")

            icon_svg_color.onmouseover = function () {
              icon_svg_color.style.fill = c;
              for (let i = 0; i < paths.length; i++) {
                paths[i].setAttribute("style", "fill:" + c + ";")
                paths[i].setAttribute("fill", c)
              };

              for (let i = 0; i < paths2.length; i++) {
                paths2[i].setAttribute("style", "fill:" + c + ";");
              };

            }

            icon_svg_color.onmouseout = function () {
              icon_svg_color.style.fill = b;
              for (let i = 0; i < paths.length; i++) {
                paths[i].setAttribute("style", "fill:" + b + ";")
                paths[i].setAttribute("fill", b)
              };

              for (let i = 0; i < paths2.length; i++) {
                paths2[i].setAttribute("style", "fill:" + b + ";");
              };
            }

            /* for (let i = 0; i < paths.length; i++) {
              paths[i].setAttribute("style", "fill:" + b + ";")
              paths[i].setAttribute("fill", b)
            };
            
            for (let i = 0; i < paths2.length; i++) {
              paths2[i].setAttribute("style", "fill:" + b + ";");
            }; */
          };
        };
      }, 50);
    };
  };

  async componentDidMount() {
    this.getCustomize();
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  };

  render() {
    //const apps = this.context;
    /* console.log(this.state) */
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
    const {
      dataCustomize,
      loading,
      toast,
      toastError,
      messageError,
      options_font_size,
      options_transform,
      options_weight,
      options_radius,
      tabCartHeader,
      popoverHeaderBk,
      popoverHeaderText,
      popoverHeaderIcon,
      popoverHeaderIcon1,
      customize_slidecart_design,
      customize_slidecart_size,
      customize_slidecart_position,
      customize_slidecart_animation_mobile,
      customize_slidecart_footer_fixed,
      customize_slidecart_rtl,
      customize_slidecart_margin_left,
      popoverLoading1,
      popoverLoading2,
      customize_enabled_loading,
      customize_loading_background,
      customize_loading_background_rgb,
      customize_loading_icon,
      customize_loading_icon_hex,
      customize_header_background_color,
      customize_header_background_color_hex,
      customize_header_text_color,
      customize_header_text_color_hex,
      customize_header_text_font_size,
      customize_header_text_transform,
      customize_header_icon_color,
      customize_header_icon_color_hex,
      customize_header_icon_color_hov,
      customize_header_icon_color_hov_hex,
      customize_header_icon_size,
      tabCartBody,
      popoverBodyBk,
      popoverBodyText,
      popoverBodyBorder,
      popoverBodyIcon,
      popoverBodyProd0,
      popoverBodyProd1,
      popoverBodyProd2,
      popoverBodyProd3,
      popoverBodyProd4,
      popoverBodyProd5,
      popoverBodyProd6,
      popoverBodyProd7,
      popoverBodyProd8,
      popoverBodyUpsell1,
      popoverBodyUpsell2,
      popoverBodyUpsell3,
      popoverBodyUpsell4,
      popoverBodyUpsell5,
      popoverBodyUpsell6,
      popoverBodyUpsell7,
      popoverBodyUpsell8,
      popoverBodyUpsell9,
      popoverBodyUpsell10,
      popoverBodyUpsell11,
      popoverBodyUpsell12,
      popoverBodyUpsell13,
      customize_body_background_color,
      customize_body_background_color_hex,
      customize_body_text_color,
      customize_body_text_color_hex,
      customize_body_border_color,
      customize_body_border_color_hex,
      customize_body_prod_icon_remove_color,
      customize_body_prod_icon_remove_color_hex,
      customize_body_design_qty,
      customize_body_prod_remove_enabled,
      customize_body_prod_remove_text,
      customize_body_prod_icon_remove,
      customize_body_prod_icon_remove_size,
      customize_body_prod_icon_remove_color_hov,
      customize_body_prod_icon_remove_color_hov_hex,
      customize_body_prod_title_color_text,
      customize_body_prod_title_color_text_hex,
      customize_body_prod_title_font_size,
      customize_body_prod_title_font_weigth,
      customize_body_prod_title_text_transform,
      customize_body_var_title_color_text,
      customize_body_var_title_color_text_hex,
      customize_body_var_title_font_size,
      customize_body_var_title_font_weigth,
      customize_body_var_title_text_transform,
      customize_body_price_color_text,
      customize_body_price_color_text_hex,
      customize_body_price_font_size,
      customize_body_price_font_weigth,
      customize_body_compare_price_color_text,
      customize_body_compare_price_color_text_hex,
      customize_body_compare_price_font_size,
      customize_body_compare_price_font_weigth,
      customize_body_enabled_sale_price,
      customize_body_sale_price_color_text,
      customize_body_sale_price_color_text_hex,
      customize_body_sale_price_font_size,
      customize_body_sale_price_font_weigth,
      customize_body_discount_color_text,
      customize_body_discount_color_text_hex,
      customize_body_discount_font_size,
      customize_body_discount_font_weigth,
      customize_body_upgrade_button_background_color,
      customize_body_upgrade_button_background_color_hex,
      customize_body_upgrade_button_text_color,
      customize_body_upgrade_button_text_color_hex,
      customize_body_upgrade_button_text_transform,
      customize_body_upgrade_button_text_font_size,
      customize_body_upgrade_button_text_font_weigth,
      customize_body_upgrade_button_border_radius,
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
      customize_body_upsell_var_title_text_color,
      customize_body_upsell_var_title_text_color_hex,
      customize_body_upsell_var_title_font_size,
      customize_body_upsell_var_title_font_weigth,
      customize_body_upsell_var_title_text_transform,
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
      customize_body_upsell_var_options_color_text,
      customize_body_upsell_var_options_color_text_hex,
      customize_body_upsell_var_options_font_size,
      customize_body_upsell_var_options_font_weigth,
      customize_body_upsell_var_options_text_transform,
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
      customize_body_upsell_button_hov_text_color_hex,
      tabCartPopUp,
      popoverPopUp1,
      popoverPopUp2,
      popoverPopUp3,
      popoverPopUp4,
      popoverPopUp5,
      popoverPopUp6,
      popoverPopUp7,
      popoverPopUp8,
      popoverPopUp9,
      popoverPopUp10,
      customize_popup_background_color,
      customize_popup_background_color_hex,
      customize_popup_border_color,
      customize_popup_border_color_hex,
      customize_popup_title_text_color,
      customize_popup_title_text_color_hex,
      customize_popup_title_font_size,
      customize_popup_title_font_weigth,
      customize_popup_title_text_transform,
      customize_popup_price_text_color,
      customize_popup_price_text_color_hex,
      customize_popup_price_font_size,
      customize_popup_price_font_weigth,
      customize_popup_compare_price_text_color,
      customize_popup_compare_price_text_color_hex,
      customize_popup_compare_price_font_size,
      customize_popup_compare_price_font_weigth,
      customize_popup_enabled_sale_price,
      customize_popup_sale_price_text_color,
      customize_popup_sale_price_text_color_hex,
      customize_popup_sale_price_font_size,
      customize_popup_sale_price_font_weigth,
      customize_popup_var_options_design,
      customize_popup_button_background_color,
      customize_popup_button_background_color_hex,
      customize_popup_button_text_color,
      customize_popup_button_text_color_hex,
      customize_popup_button_border_radius,
      customize_popup_button_text_font_size,
      customize_popup_button_text_font_weigth,
      customize_popup_button_text_transform,
      customize_popup_button_hov_background_color,
      customize_popup_button_hov_background_color_hex,
      customize_popup_button_hov_text_color,
      customize_popup_button_hov_text_color_hex,
      tabCartFooter,
      popoverFooter1,
      popoverFooter2,
      popoverFooter3,
      popoverFooter4,
      popoverFooter5,
      customize_footer_total_price_text_color,
      customize_footer_total_price_text_color_hex,
      customize_footer_total_price_font_size,
      customize_footer_total_price_font_weigth,
      customize_footer_compare_price_text_color,
      customize_footer_compare_price_text_color_hex,
      customize_footer_compare_price_font_size,
      customize_footer_compare_price_font_weigth,
      customize_footer_discount_text_color,
      customize_footer_discount_text_color_hex,
      customize_footer_discount_font_size,
      customize_footer_discount_font_weigth,
      customize_footer_background_color,
      customize_footer_background_color_hex,
      customize_footer_text_color,
      customize_footer_text_color_hex,
      tabSlideCartDesign
    } = this.state;

    var active = this.validateData();
    const contextualSaveBarMarkup = !active ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          loading: loading,
          onAction: () => this.updateCustomize(this.state),
        }}
        discardAction={{
          onAction: () => this.discard(),
        }}
        visible
        fullWidth={true}
      />
    ) : null;
    /* ............................................POP UP IMAGE ................................................................*/

    const popUpImage = <div id="xmas-popup" /*  onClick={()=>{this.hiddenPopUpImage()}} */ className="popup" href="#">
      <div className="popup-content">
        <img src="" alt="xmas-sale" />
        <a onClick={() => { this.hiddenPopUpImage() }} className="close">x</a>
      </div>
    </div>
    /* ---------------------------------------------- SLIDE CART DESIGN -----------------------------------------------------------------*/
    const slideSize = [
      { label: 'Medium', value: '365' },
      { label: 'Normal', value: '450' },
      { label: 'Big', value: '500' },
    ];
    const slidePosition = [
      { label: 'Left', value: '0' },
      { label: 'Center', value: '2' },
      { label: 'Right', value: '1' }
    ];
    const slideAnimation = [
      { label: 'Side', value: '0' },
      { label: 'Below', value: '1' }
    ];

    // const slideCartDesign =
    //   <Card>
    //     <FormLayout>
    //       <BlockStack gap={400}>
    //         <Text variant="headingMd" as="h5">
    //           Slide Cart Design
    //         </Text>
    //         <InlineGrid columns={{ xs: 1, sm: 2 }}>
    //           <BlockStack>
    //             <RadioButton
    //               label="Design Classic"
    //               checked={customize_slidecart_design === '0'}
    //               id="0"
    //               name="design1"
    //               onChange={() => { this.handleOnChange('0', "customize_slidecart_design") }}
    //             />
    //             <div className='slideContent1'>
    //               <img onClick={() => { this.showPopUpImage('slideCart1') }}
    //                 alt=""
    //                 width="35%"
    //                 height="100%"
    //                 src={slideCart1}
    //               />
    //             </div>
    //           </BlockStack>
    //           <BlockStack>
    //             <RadioButton
    //               label="Design With Rounded Corners"
    //               id="1"
    //               name="design2"
    //               checked={customize_slidecart_design === '1'}
    //               onChange={() => { this.handleOnChange('1', "customize_slidecart_design") }}
    //             />
    //             <div className='slideContent2'>
    //               <img onClick={() => { this.showPopUpImage('slideCart2') }}
    //                 alt=""
    //                 width="35%"
    //                 height="100%"
    //                 src={slideCart2}
    //               />
    //             </div>
    //           </BlockStack>
    //         </InlineGrid>
    //         <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 3 }}>
    //           <Select
    //             label={<Text variant="headingSm" as="h3">Slide Size</Text>}
    //             options={slideSize}
    //             value={customize_slidecart_size}
    //             onChange={(value) => { this.handleOnChange(value, "customize_slidecart_size") }}
    //           />
    //           <Select
    //             label={<Text variant="headingSm" as="h3">Slide Position</Text>}
    //             options={slidePosition}
    //             value={customize_slidecart_position}
    //             onChange={(value) => { this.handleOnChange(value, "customize_slidecart_position") }}
    //           />
    //           <Select
    //             label={<div style={{ display: "flex" }}>
    //               <div>{<Text variant="headingSm" as="h3">Slide Animation(Only Mobile)</Text>}</div>
    //               <Tooltip persistOnClick content="Not available with slide position center."><Icon source={InfoIcon} tone="info" /></Tooltip>
    //             </div>}
    //             options={slideAnimation}
    //             value={customize_slidecart_animation_mobile}
    //             //helpText={"Not available with slide position center."}
    //             onChange={(value) => { this.handleOnChange(value, "customize_slidecart_animation_mobile") }}
    //           />
    //         </InlineGrid>
    //         <Checkbox
    //           label="Slide Cart Fixed Footer"
    //           //helpText="Check this if your store language uses right to left scripts."
    //           checked={customize_slidecart_footer_fixed == 0 ? false  : true}
    //           onChange={(value) => { this.handleOnChange(value, "customize_slidecart_footer_fixed") }}
    //         />
    //         {/* <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 3 }}> */}
    //         <Checkbox
    //           label={<div style={{ display: "flex" }}>
    //             <div>Display Cart On RTL</div>
    //             <Tooltip persistOnClick content="Check this if your store language uses right to left scripts."><Icon source={InfoIcon} tone="info" /></Tooltip>
    //           </div>}
    //           //helpText="Check this if your store language uses right to left scripts."
    //           checked={customize_slidecart_rtl == 0 ? false : true}
    //           onChange={(value) => { this.handleOnChange(value, "customize_slidecart_rtl") }}
    //         />
    //         <Checkbox
    //           label="Add margin left in screen on mobile devices?"
    //           checked={customize_slidecart_margin_left == 0 ? false : true}
    //           onChange={(value) => { this.handleOnChange(value, "customize_slidecart_margin_left") }}
    //         />
    //         {/* </InlineGrid> */}
    //       </BlockStack>
    //     </FormLayout>
    //   </Card>
    /* ------------------------------------------------- CART HEADER -------------------------------------------------------------------*/
    const myCustomize = dataCustomize;
    const cartHeaderTabs = [
      {
        id: "General",
        content: "General",
        accessibilityLabel: "General",
        panelID: "cartHeaderGeneral-page-fitted"
      }
    ];

    /* ********************************** CART HEADER CONTENT ***************************************************** */
    const hexcolor_cartHeader_content = hsbToHex(customize_header_background_color);
    const activator_cartHeader_content = (
      <Button onClick={() => { this.handlePopover("popoverHeaderBk") }} id='customizeHeader1'>
        <ButtonColor background={hexcolor_cartHeader_content} />
      </Button>
    );

    const hexcolor_cartHeader_text = hsbToHex(customize_header_text_color);
    const activator_cartHeader_text = (
      <Button onClick={() => { this.handlePopover("popoverHeaderText") }} id='customizeHeader2'>
        <ButtonColor background={hexcolor_cartHeader_text} />
      </Button>
    );

    const headerContent =
      <InlineGrid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={400}>
        <TextField
          label={<Text variant="headingSm" as="h3">Header Background</Text>}
          value={customize_header_background_color_hex || 'ffffff'}
          onChange={(value) => { this.handleOnChangeColor(value, "customize_header_background_color_hex", "customize_header_background_color") }}
          prefix='#'
          maxLength={6}
          connectedRight={
            <Popover
              active={popoverHeaderBk}
              activator={activator_cartHeader_content}
              onClose={() => { this.handlePopover("popoverHeaderBk", 0) }}
            >
              <Popover.Section>
                <ColorPicker
                  onChange={(value) => { this.handleColors(value, "customize_header_background_color", "customize_header_background_color_hex") }}
                  color={customize_header_background_color}
                />
              </Popover.Section>
              <Popover.Section>
                <TextField value={hexcolor_cartHeader_content || '#ffffff'} />
              </Popover.Section>
            </Popover>
          }
        />
        <TextField
          label={<Text variant="headingSm" as="h3">Header Text Color</Text>}
          value={customize_header_text_color_hex || '000000'}
          onChange={(value) => { this.handleOnChangeColor(value, "customize_header_text_color_hex", "customize_header_text_color") }}
          prefix='#'
          maxLength={6}
          connectedRight={
            <Popover
              active={popoverHeaderText}
              activator={activator_cartHeader_text}
              onClose={() => { this.handlePopover("popoverHeaderText", 0) }}
            >
              <Popover.Section>
                <ColorPicker
                  onChange={(value) => { this.handleColors(value, "customize_header_text_color", "customize_header_text_color_hex") }}
                  color={customize_header_text_color}
                />
              </Popover.Section>
              <Popover.Section>
                <TextField value={hexcolor_cartHeader_text} />
              </Popover.Section>
            </Popover>
          }
        />
        <Select
          label={<Text variant="headingSm" as="h3">Header Text Transform</Text>}
          options={options_transform}
          value={customize_header_text_transform}
          onChange={(value) => { this.handleOnChange(value, "customize_header_text_transform") }}
        />
        <Select
          label={<Text variant="headingSm" as="h3">Header Text Font Size</Text>}
          options={options_font_size}
          value={customize_header_text_font_size}
          onChange={(value) => { this.handleOnChange(value, "customize_header_text_font_size") }}
        />
      </InlineGrid>

    /* ********************************** CART HEADER ICON ***************************************************** */
    const hexcolor_cartHeader_icon = hsbToHex(customize_header_icon_color);
    const activator_cartHeader_icon = (
      <Button onClick={() => { this.handlePopover("popoverHeaderIcon") }} id='customizeHeader3'>
        <ButtonColor background={hexcolor_cartHeader_icon} />
      </Button>
    );

    const hexcolor_cartHeader_icon_hov = hsbToHex(customize_header_icon_color_hov);
    const activator_cartHeader_icon_hov = (
      <Button onClick={() => { this.handlePopover("popoverHeaderIcon1") }} id='customizeHeader4'>
        <ButtonColor background={hexcolor_cartHeader_icon_hov} />
      </Button>
    );

    const headerIcon =
      <BlockStack gap={200}>
        <Text variant="headingLg" as="h5">
          Icon close
        </Text>
        <BlockStack gap={500}>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
            <TextField
              label={<Text variant="headingSm" as="h3">Color</Text>}
              value={customize_header_icon_color_hex || '7d7d7d'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_header_icon_color_hex", "customize_header_icon_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverHeaderIcon}
                  activator={activator_cartHeader_icon}
                  onClose={() => { this.handlePopover("popoverHeaderIcon", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_header_icon_color", "customize_header_icon_color_hex") }}
                      color={customize_header_icon_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartHeader_icon} />
                  </Popover.Section>
                </Popover>
              }
            />
            <TextField
              label={<Text variant="headingSm" as="h3">Color Hover</Text>}
              value={customize_header_icon_color_hov_hex || '7d7d7d'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_header_icon_color_hov_hex", "customize_header_icon_color_hov") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverHeaderIcon1}
                  activator={activator_cartHeader_icon_hov}
                  onClose={() => { this.handlePopover("popoverHeaderIcon1", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_header_icon_color_hov", "customize_header_icon_color_hov_hex") }}
                      color={customize_header_icon_color_hov}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartHeader_icon_hov} />
                  </Popover.Section>
                </Popover>
              }
            />
          </InlineGrid>
          <RangeSlider
            label={<Text variant="headingSm" as="h3">Size Icon Close</Text>}
            value={customize_header_icon_size}
            onChange={(value) => { this.handleOnChange(value, "customize_header_icon_size") }}
            output
            min={8}
            max={30}
            prefix={customize_header_icon_size + 'px'}
          />
        </BlockStack>
      </BlockStack>
    /* ********************************** END CART HEADER ICON ***************************************************** */
    /* ********************************** END CART HEADER CONTENT ***************************************************** */
    /* -----------------------------------------------END  CART HEADER-------------------------------------------------------------------*/

    /* ------------------------------------------------- CART BODY-------------------------------------------------------------------*/
    const cartBodyTabs = [
      {
        id: "General",
        content: "General",
        accessibilityLabel: "General",
        panelID: "cartBodyGeneral-page-fitted"
      },
      {
        id: "Products",
        content: "Products",
        accessibilityLabel: "Products",
        panelID: "cartBodyProducts-page-fitted"
      },
      {
        id: "Upsells",
        content: "Upsells",
        accessibilityLabel: "Upsells",
        panelID: "cartBodyUpsells-page-fitted"
      }
    ];


    /* ********************************** CART BODY GENERAL ***************************************************** */
    const hexcolor_cartBody_general_BK = hsbToHex(customize_body_background_color);
    const activator_cartBody_general_BK = (
      <Button onClick={() => { this.handlePopover("popoverBodyBk") }} id='customizeBody1'>
        <ButtonColor background={hexcolor_cartBody_general_BK} />
      </Button>
    );

    const hexcolor_cartBody_general_Text = hsbToHex(customize_body_text_color);
    const activator_cartBody_general_Text = (
      <Button onClick={() => { this.handlePopover("popoverBodyText") }} id='customizeBody2'>
        <ButtonColor background={hexcolor_cartBody_general_Text} />
      </Button>
    );

    const hexcolor_cartBody_general_Border = hsbToHex(customize_body_border_color);
    const activator_cartBody_general_Border = (
      <Button onClick={() => { this.handlePopover("popoverBodyBorder") }} id='customizeBody3'>
        <ButtonColor background={hexcolor_cartBody_general_Border} />
      </Button>
    );
    const bodyGeneral =
      <div>
        <FormLayout>
          <BlockStack gap={500}>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label={<Text variant="headingSm" as="h3">Body Background</Text>}
                value={customize_body_background_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_background_color_hex", "customize_body_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyBk}
                    activator={activator_cartBody_general_BK}
                    onClose={() => { this.handlePopover("popoverBodyBk", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_background_color", "customize_body_background_color_hex") }}
                        color={customize_body_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_general_BK} />
                    </Popover.Section>
                  </Popover>
                }
              />
              {/* ---------------------------------- */}
              <TextField
                label={<Text variant="bodyMd" as="h3">Border Color (Separation)</Text>}
                value={customize_body_border_color_hex || 'eeeeee'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_border_color_hex", "customize_body_border_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyBorder}
                    activator={activator_cartBody_general_Border}
                    onClose={() => { this.handlePopover("popoverBodyBorder", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_border_color", "customize_body_border_color_hex") }}
                        color={customize_body_border_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_general_Border} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
            <Divider borderColor="border-hover" />
            <Text variant="headingLg" as="h5">Clear All Text</Text>
            <TextField
              label={<Text variant="headingSm" as="h3">Color</Text>}
              value={customize_body_text_color_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_text_color_hex", "customize_body_text_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyText}
                  activator={activator_cartBody_general_Text}
                  onClose={() => { this.handlePopover("popoverBodyText", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_text_color", "customize_body_text_color_hex") }}
                      color={customize_body_text_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_general_Text} />
                  </Popover.Section>
                </Popover>
              }
            />
            <Divider borderColor="border-hover" />
            <Text variant="headingLg" as="h5">Design Input Quantity</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <RadioButton
                label="Design Classic"
                checked={customize_body_design_qty == 0}
                id="3"
                name="accounts"
                onChange={() => { this.handleOnChange('0', "customize_body_design_qty") }}
              />
              <RadioButton
                label="Center Borderless Design"
                id="4"
                name="accounts"
                checked={customize_body_design_qty == 1}
                onChange={() => { this.handleOnChange('1', "customize_body_design_qty") }}
              />
            </InlineGrid>
            <InlineStack align='center'>
              <div className={customize_body_design_qty == 0 ? "hs-item-cart-qty" : "hs-item-cart-qty hs-design"}>
                <div className="hs-cart-plus-minus" data-quantity="1" data-id="43053059309787" data-key="43053059309787:f45fee19d9c13f5badcc975453449e8b" data-line="1" data-free="Brake" parts="">
                  <div className="hs-dec hs-qtybutton hs-event-static">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 -192 469.33333 469">
                      <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0">
                      </path>
                    </svg>
                  </div>
                  <input disabled type="text" defaultValue={"1"} id="43053059309787" data-id="43053059309787" data-key="43053059309787:f45fee19d9c13f5badcc975453449e8b" data-line="1" data-value="1" className="hs-event-static" />
                  <div className="hs-inc hs-qtybutton hs-event-static">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" version="1.1" x="0px" y="0px" viewBox="0 0 492 492"> <g> <g>
                      <path d="M465.064,207.566l0.028,0H284.436V27.25c0-14.84-12.016-27.248-26.856-27.248h-23.116    c-14.836,0-26.904,12.408-26.904,27.248v180.316H26.908c-14.832,0-26.908,12-26.908,26.844v23.248    c0,14.832,12.072,26.78,26.908,26.78h180.656v180.968c0,14.832,12.064,26.592,26.904,26.592h23.116    c14.84,0,26.856-11.764,26.856-26.592V284.438h180.624c14.84,0,26.936-11.952,26.936-26.78V234.41    C492,219.566,479.904,207.566,465.064,207.566z">
                      </path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>
                    </svg>
                  </div></div>
              </div>
            </InlineStack>
          </BlockStack>
        </FormLayout>
      </div>;
    /****************************** CART BODY PRODUCTS *****************************************/
    const hexcolor_cartBody_prod_Title = hsbToHex(customize_body_prod_title_color_text);
    const activator_cartBody_prod_Title = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd1") }} id='customizeBody5'>
        <ButtonColor background={hexcolor_cartBody_prod_Title} />
      </Button>
    );

    const hexcolor_cartBody_prod_Var = hsbToHex(customize_body_var_title_color_text);
    const activator_cartBody_prod_Var = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd2") }} id='customizeBody6'>
        <ButtonColor background={hexcolor_cartBody_prod_Var} />
      </Button>
    );

    const hexcolor_cartBody_prod_Price = hsbToHex(customize_body_price_color_text);
    const activator_cartBody_prod_Price = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd3") }} id='customizeBody7'>
        <ButtonColor background={hexcolor_cartBody_prod_Price} />
      </Button>
    );

    const hexcolor_cartBody_prod_ComparePrice = hsbToHex(customize_body_compare_price_color_text);
    const activator_cartBody_prod_ComparePrice = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd4") }} id='customizeBody8'>
        <ButtonColor background={hexcolor_cartBody_prod_ComparePrice} />
      </Button>
    );

    const hexcolor_cartBody_prod_SalePrice = hsbToHex(customize_body_sale_price_color_text);
    const activator_cartBody_prod_SalePrice = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd6") }} id='customizeBody22'>
        <ButtonColor background={hexcolor_cartBody_prod_SalePrice} />
      </Button>
    );

    const hexcolor_cartBody_prod_Discount = hsbToHex(customize_body_discount_color_text);
    const activator_cartBody_prod_Discount = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd5") }} id='customizeBody20'>
        <ButtonColor background={hexcolor_cartBody_prod_Discount} />
      </Button>
    );


    const hexcolor_cartBody_prod_button_upgrade = hsbToHex(customize_body_upgrade_button_background_color);
    const activator_cartBody_prod_button_upgrade = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd7") }} id='customizeBody23'>
        <ButtonColor background={hexcolor_cartBody_prod_button_upgrade} />
      </Button>
    );

    const hexcolor_cartBody_prod_button_upgrade_text = hsbToHex(customize_body_upgrade_button_text_color);
    const activator_cartBody_prod_button_upgrade_text = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd8") }} id='customizeBody24'>
        <ButtonColor background={hexcolor_cartBody_prod_button_upgrade_text} />
      </Button>
    );



    const hexcolor_cartBody_prod_icon_remove = hsbToHex(customize_body_prod_icon_remove_color_hov);
    const activator_cartBody_prod_icon_remove = (
      <Button onClick={() => { this.handlePopover("popoverBodyProd0") }} id='customizeBody21'>
        <ButtonColor background={hexcolor_cartBody_prod_icon_remove} />
      </Button>
    );

    const activatorModal = <div ref={this.yourRef}><Button primary onClick={() => this.handleOnChange(true, "modal")}>Select Icon</Button></div>

    const hexcolor_cartBody_general_Icon = hsbToHex(customize_body_prod_icon_remove_color);
    const activator_cartBody_general_Icon = (
      <Button onClick={() => { this.handlePopover("popoverBodyIcon") }} id='customizeBody4'>
        <ButtonColor background={hexcolor_cartBody_general_Icon} />
      </Button>
    );

    const bodyProd =
      <BlockStack gap={500}>
        <FormLayout>
          <Text variant="headingLg" as="h5">
            Product Remove Item
          </Text>
          <BlockStack gap={400}>
            <Checkbox
              label="Text instead of icon"
              checked={customize_body_prod_remove_enabled == 0 ? false : true}
              onChange={(value) => { this.handleOnChange(value, "customize_body_prod_remove_enabled") }}
            />
            {!customize_body_prod_remove_enabled ? dataCustomize.iconsCustomize != null ?
              <InlineStack gap={200} align='center'>
                <div id='content'>
                </div>
                <Modal
                  activator={activatorModal}
                  open={this.state.modal}
                  onClose={() => this.handleOnChange(false, "modal")}
                  title="Select the icon of your preference"
                  secondaryActions={[
                    {
                      content: 'Cancel',
                      onAction: () => this.handleOnChange(false, "modal"),
                    },
                  ]}
                >
                  <Modal.Section>
                    <InlineGrid gap="400" columns={11}>
                      {dataCustomize.iconsCustomize.map((el, i) => (
                        <Button key={i} id={'button' + i} icon={el.icon} onClick={() => this.iconChange(el.icon, el.id)}></Button>
                      ))}
                    </InlineGrid>
                  </Modal.Section>
                </Modal>
              </InlineStack>
              : '' :
              <TextField label="Remove Text" value={customize_body_prod_remove_text} onChange={(value) => { this.handleOnChange(value, "customize_body_prod_remove_text") }} />
            }

            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Remove Item Color</Text>}
                value={customize_body_prod_icon_remove_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_prod_icon_remove_color_hex", "customize_body_prod_icon_remove_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyIcon}
                    activator={activator_cartBody_general_Icon}
                    onClose={() => { this.handlePopover("popoverBodyIcon", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_prod_icon_remove_color", "customize_body_prod_icon_remove_color_hex") }}
                        color={customize_body_prod_icon_remove_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_general_Icon} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Remove Item Color Hover</Text>}
                value={customize_body_prod_icon_remove_color_hov_hex || '7d7d7d'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_prod_icon_remove_color_hov_hex", "customize_body_prod_icon_remove_color_hov") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyProd0}
                    activator={activator_cartBody_prod_icon_remove}
                    onClose={() => { this.handlePopover("popoverBodyProd0", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_prod_icon_remove_color_hov", "customize_body_prod_icon_remove_color_hov_hex") }}
                        color={customize_body_prod_icon_remove_color_hov}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_prod_icon_remove} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
            <RangeSlider
              label={<Text variant="headingSm" as="h3">Size Remove Item</Text>}
              value={customize_body_prod_icon_remove_size}
              onChange={(value) => { this.handleOnChange(value, "customize_body_prod_icon_remove_size") }}
              output
              min={8}
              max={30}
              prefix={customize_body_prod_icon_remove_size + 'px'}
            />
          </BlockStack>
        </FormLayout>
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">
            Product Title
          </Text>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_prod_title_color_text_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_prod_title_color_text_hex", "customize_body_prod_title_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd1}
                  activator={activator_cartBody_prod_Title}
                  onClose={() => { this.handlePopover("popoverBodyProd1", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_prod_title_color_text", "customize_body_prod_title_color_text_hex") }}
                      color={customize_body_prod_title_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_Title} />
                  </Popover.Section>
                </Popover>
              }
            />
            <Select
              label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
              options={options_weight}
              value={customize_body_prod_title_font_weigth}
              onChange={(value) => { this.handleOnChange(value, "customize_body_prod_title_font_weigth") }}
            />
            <Select
              label={<Text variant="headingSm" as="h3">Text Transform</Text>}
              options={options_transform}
              value={customize_body_prod_title_text_transform}
              onChange={(value) => { this.handleOnChange(value, "customize_body_prod_title_text_transform") }}
            />
            <Select
              label={<Text variant="headingSm" as="h3">Font Size</Text>}
              options={options_font_size}
              value={customize_body_prod_title_font_size}
              onChange={(value) => { this.handleOnChange(value, "customize_body_prod_title_font_size") }}
            />
          </InlineGrid>
        </FormLayout>
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Variant Title</Text>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_var_title_color_text_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_var_title_color_text_hex", "customize_body_var_title_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd2}
                  activator={activator_cartBody_prod_Var}
                  onClose={() => { this.handlePopover("popoverBodyProd2", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_var_title_color_text", "customize_body_var_title_color_text_hex") }}
                      color={customize_body_var_title_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_Var} />
                  </Popover.Section>
                </Popover>
              }
            />
            <Select
              label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
              options={options_weight}
              value={customize_body_var_title_font_weigth}
              onChange={(value) => { this.handleOnChange(value, "customize_body_var_title_font_weigth") }}
            />
            <Select
              label={<Text variant="headingSm" as="h3">Text Transform</Text>}
              options={options_transform}
              value={customize_body_var_title_text_transform}
              onChange={(value) => { this.handleOnChange(value, "customize_body_var_title_text_transform") }}
            />
            <Select
              label={<Text variant="headingSm" as="h3">Font Size</Text>}
              options={options_font_size}
              value={customize_body_var_title_font_size}
              onChange={(value) => { this.handleOnChange(value, "customize_body_var_title_font_size") }}
            />
          </InlineGrid>
        </FormLayout>
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Price</Text>
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_price_color_text_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_price_color_text_hex", "customize_body_price_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd3}
                  activator={activator_cartBody_prod_Price}
                  onClose={() => { this.handlePopover("popoverBodyProd3", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_price_color_text", "customize_body_price_color_text_hex") }}
                      color={customize_body_price_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_Price} />
                  </Popover.Section>
                </Popover>
              }
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_price_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_price_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_price_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_price_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        <Divider borderColor='border-hover' />
        <BlockStack gap={200}>
          <Text variant="headingLg" as="h5">Compare Price</Text>
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_compare_price_color_text_hex || '737373'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_compare_price_color_text_hex", "customize_body_compare_price_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd4}
                  activator={activator_cartBody_prod_ComparePrice}
                  onClose={() => { this.handlePopover("popoverBodyProd4", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_compare_price_color_text", "customize_body_compare_price_color_text_hex") }}
                      color={customize_body_compare_price_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_ComparePrice} />
                  </Popover.Section>
                </Popover>
              }
            />
            {/* ********* */}
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_compare_price_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_compare_price_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_compare_price_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_compare_price_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </BlockStack>
        <Divider borderColor='border-hover' />
        {/* SALE PRICE */}
        <FormLayout>
          <Text variant="headingLg" as="h5">Sale Price</Text>
          <BlockStack gap={400}>
            <Checkbox
              label="Enabled Sale Price"
              checked={customize_body_enabled_sale_price}
              onChange={(value) => { this.handleOnChange(value, "customize_body_enabled_sale_price") }}
              helpText="Is applied to the price when you have to compare the price."
            />
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_sale_price_color_text_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_sale_price_color_text_hex", "customize_body_sale_price_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd6}
                  activator={activator_cartBody_prod_SalePrice}
                  onClose={() => { this.handlePopover("popoverBodyProd6", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_sale_price_color_text", "customize_body_sale_price_color_text_hex") }}
                      color={customize_body_sale_price_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_SalePrice} />
                  </Popover.Section>
                </Popover>
              }
            />
            {/* ********* */}
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_sale_price_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_sale_price_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_sale_price_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_sale_price_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        {/*  */}
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Discount</Text>
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_discount_color_text_hex || '737373'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_discount_color_text_hex", "customize_body_discount_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd5}
                  activator={activator_cartBody_prod_Discount}
                  onClose={() => { this.handlePopover("popoverBodyProd5", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_discount_color_text", "customize_body_discount_color_text_hex") }}
                      color={customize_body_discount_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_Discount} />
                  </Popover.Section>
                </Popover>
              }
            />
            {/* ********* */}
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_discount_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_discount_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_discount_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_discount_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Button Upgrade</Text>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
            <TextField
              label={<Text variant="headingSm" as="h3">Background Color</Text>}
              value={customize_body_upgrade_button_background_color_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upgrade_button_background_color_hex", "customize_body_upgrade_button_background_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd7}
                  activator={activator_cartBody_prod_button_upgrade}
                  onClose={() => { this.handlePopover("popoverBodyProd7", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upgrade_button_background_color", "customize_body_upgrade_button_background_color_hex") }}
                      color={customize_body_upgrade_button_background_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_button_upgrade} />
                  </Popover.Section>
                </Popover>
              }
            />
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_upgrade_button_text_color_hex || 'ffffff'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upgrade_button_text_color_hex", "customize_body_upgrade_button_text_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyProd8}
                  activator={activator_cartBody_prod_button_upgrade_text}
                  onClose={() => { this.handlePopover("popoverBodyProd8", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upgrade_button_text_color", "customize_body_upgrade_button_text_color_hex") }}
                      color={customize_body_upgrade_button_text_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_prod_button_upgrade_text} />
                  </Popover.Section>
                </Popover>
              }
            />
            <Select
              label='Text Transform'
              options={options_transform}
              value={customize_body_upgrade_button_text_transform}
              onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_text_transform") }}
            />
            <Select
              label='Font Size'
              options={options_font_size}
              value={customize_body_upgrade_button_text_font_size}
              onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_text_font_size") }}
            />
            <Select
              label='Font Weigth'
              options={options_weight}
              value={customize_body_upgrade_button_text_font_weigth}
              onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_text_font_weigth") }}
            />
            <Select
              label='Border Raius'
              options={options_radius}
              value={customize_body_upgrade_button_border_radius}
              onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_border_radius") }}
            />
          </InlineGrid>
        </FormLayout>
      </BlockStack>;
    /******************************** CART BODY UPSELLS ************************************/
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

    const bodyUpsell =
      <BlockStack gap={500}>
        <FormLayout>
          <Text variant="headingLg" as="h5">General</Text>
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Background Color</Text>}
              value={customize_body_upsell_background_color_hex || 'f7f8f9'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_background_color_hex", "customize_body_upsell_background_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyUpsell1}
                  activator={activator_cartBody_upsell_BK}
                  onClose={() => { this.handlePopover("popoverBodyUpsell1", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upsell_background_color", "customize_body_upsell_background_color_hex") }}
                      color={customize_body_upsell_background_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_upsell_BK} />
                  </Popover.Section>
                </Popover>
              }
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label={<Text variant="headingSm" as="h3">Border Color (Separation - Stacked)</Text>}
                value={customize_body_upsell_border_color_hex || 'e5e5e5'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_border_color_hex", "customize_body_upsell_border_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell2}
                    activator={activator_cartBody_upsell_Border}
                    onClose={() => { this.handlePopover("popoverBodyUpsell2", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_border_color", "customize_body_upsell_border_color_hex") }}
                        color={customize_body_upsell_border_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_Border} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Arrows Color (Slide)</Text>}
                value={customize_body_upsell_arrows_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_arrows_color_hex", "customize_body_upsell_arrows_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell12}
                    activator={activator_cartBody_upsell_Arrows}
                    onClose={() => { this.handlePopover("popoverBodyUpsell12", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_arrows_color", "customize_body_upsell_arrows_color_hex") }}
                        color={customize_body_upsell_arrows_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_Arrows} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        {/* ************ */}
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Product Title</Text>
          <BlockStack gap={400}>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_body_upsell_prod_title_color_text_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_prod_title_color_text_hex", "customize_body_upsell_prod_title_color_text") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell3}
                    activator={activator_cartBody_upsell_prod_Title}
                    onClose={() => { this.handlePopover("popoverBodyUpsell3", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_prod_title_color_text", "customize_body_upsell_prod_title_color_text_hex") }}
                        color={customize_body_upsell_prod_title_color_text}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_prod_Title} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_prod_title_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_prod_title_font_weigth") }}
              />
            </InlineGrid>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_body_upsell_prod_title_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_prod_title_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_prod_title_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_prod_title_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        {/* ************* */}
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Price</Text>
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_upsell_price_color_text_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_price_color_text_hex", "customize_body_upsell_price_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyUpsell5}
                  activator={activator_cartBody_upsell_var_Price}
                  onClose={() => { this.handlePopover("popoverBodyUpsell5", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upsell_price_color_text", "customize_body_upsell_price_color_text_hex") }}
                      color={customize_body_upsell_price_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_upsell_var_Price} />
                  </Popover.Section>
                </Popover>
              }
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_price_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_price_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_price_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_price_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        {/* ************* */}
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Compare Price</Text>
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_upsell_compare_price_color_text_hex || '737373'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_compare_price_color_text_hex", "customize_body_upsell_compare_price_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyUpsell6}
                  activator={activator_cartBody_upsell_var_ComparePrice}
                  onClose={() => { this.handlePopover("popoverBodyUpsell6", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upsell_compare_price_color_text", "customize_body_upsell_compare_price_color_text_hex") }}
                      color={customize_body_upsell_compare_price_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_upsell_var_ComparePrice} />
                  </Popover.Section>
                </Popover>
              }
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_compare_price_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_compare_price_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_compare_price_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_compare_price_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        {/* ************* */}

        {/* *************SALE PRICE************** */}
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Sale Price</Text>
          <Checkbox
            label="Enabled Sale Price"
            checked={customize_body_upsell_enabled_sale_price}
            onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_enabled_sale_price") }}
            helpText="Is applied to the price when you have to compare the price."
          />
          <BlockStack gap={400}>
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_upsell_sale_price_color_text_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_sale_price_color_text_hex", "customize_body_upsell_sale_price_color_text") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyUpsell13}
                  activator={activator_cartBody_upsell_var_SalePrice}
                  onClose={() => { this.handlePopover("popoverBodyUpsell13", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upsell_sale_price_color_text", "customize_body_upsell_sale_price_color_text_hex") }}
                      color={customize_body_upsell_sale_price_color_text}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_upsell_var_SalePrice} />
                  </Popover.Section>
                </Popover>
              }
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_sale_price_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_sale_price_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_sale_price_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_sale_price_font_size") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
        {/* ************* */}
        <Divider borderColor='border-hover' />
        <FormLayout>
          <Text variant="headingLg" as="h5">Button Add Cart</Text>
          <Text variant="headingLg" as="h6">Normal</Text>
          <BlockStack gap={400}>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_body_upsell_button_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_background_color_hex", "customize_body_upsell_button_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell8}
                    activator={activator_cartBody_upsell_button_normal_BK}
                    onClose={() => { this.handlePopover("popoverBodyUpsell8", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_background_color", "customize_body_upsell_button_background_color_hex") }}
                        color={customize_body_upsell_button_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_button_normal_BK} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_body_upsell_button_text_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_text_color_hex", "customize_body_upsell_button_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell9}
                    activator={activator_cartBody_upsell_button_normal_Text}
                    onClose={() => { this.handlePopover("popoverBodyUpsell9", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_text_color", "customize_body_upsell_button_text_color_hex") }}
                        color={customize_body_upsell_button_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_button_normal_Text} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_body_upsell_button_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_button_text_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_text_font_size") }}
              />
            </InlineGrid>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_button_text_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_text_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Border Raius</Text>}
                options={options_radius}
                value={customize_body_upsell_button_border_radius}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_border_radius") }}
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>

        <FormLayout>
          <Text variant="headingLg" as="h6">Hover</Text>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
            <TextField
              label={<Text variant="headingSm" as="h3">Background Color</Text>}
              value={customize_body_upsell_button_hov_background_color_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_hov_background_color_hex", "customize_body_upsell_button_hov_background_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyUpsell10}
                  activator={activator_cartBody_upsell_button_hov_BK}
                  onClose={() => { this.handlePopover("popoverBodyUpsell10", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_hov_background_color", "customize_body_upsell_button_hov_background_color_hex") }}
                      color={customize_body_upsell_button_hov_background_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_upsell_button_hov_BK} />
                  </Popover.Section>
                </Popover>
              }
            />
            <TextField
              label={<Text variant="headingSm" as="h3">Text Color</Text>}
              value={customize_body_upsell_button_hov_text_color_hex || 'ffffff'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_hov_text_color_hex", "customize_body_upsell_button_hov_text_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverBodyUpsell11}
                  activator={activator_cartBody_upsell_button_hov_Text}
                  onClose={() => { this.handlePopover("popoverBodyUpsell11", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_hov_text_color", "customize_body_upsell_button_hov_text_color_hex") }}
                      color={customize_body_upsell_button_hov_text_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_cartBody_upsell_button_hov_Text} />
                  </Popover.Section>
                </Popover>
              }
            />
          </InlineGrid>
        </FormLayout>
      </BlockStack>;
    /* **********************************************END CART BODY UPSELL ********************************************** */
    /* -------------------------------------------------END CART BODY---------------------------------------------------------------- */
    /* ----------------------------------------------------CART POPUP ------------------------------------------------------------------ */
    const cartPopUpTabs = [
      {
        id: "General",
        content: "General",
        accessibilityLabel: "General",
        panelID: "cartpOPuPGeneral-page-fitted"
      }
    ];

    const hexcolor_cartPopup_BK = hsbToHex(customize_popup_background_color);
    const activator_cartPopup_BK = (
      <Button onClick={() => { this.handlePopover("popoverPopUp1") }} id='customizePopup1'>
        <ButtonColor background={hexcolor_cartPopup_BK} />
      </Button>
    );

    const hexcolor_cartPopup_Border = hsbToHex(customize_popup_border_color);
    const activator_cartPopup_Border = (
      <Button onClick={() => { this.handlePopover("popoverPopUp2") }} id='customizePopup2'>
        <ButtonColor background={hexcolor_cartPopup_Border} />
      </Button>
    );

    const hexcolor_cartPopup_Title = hsbToHex(customize_popup_title_text_color);
    const activator_cartPopup_Tiile = (
      <Button onClick={() => { this.handlePopover("popoverPopUp3") }} id='customizePopup3'>
        <ButtonColor background={hexcolor_cartPopup_Title} />
      </Button>
    );

    const hexcolor_cartPopup_Price = hsbToHex(customize_popup_price_text_color);
    const activator_cartPopup_Price = (
      <Button onClick={() => { this.handlePopover("popoverPopUp4") }} id='customizePopup4'>
        <ButtonColor background={hexcolor_cartPopup_Price} />
      </Button>
    );

    const hexcolor_cartPopup_ComparePrice = hsbToHex(customize_popup_compare_price_text_color);
    const activator_cartPopup_ComparePrice = (
      <Button onClick={() => { this.handlePopover("popoverPopUp5") }} id='customizePopup5'>

      </Button>
    );

    const hexcolor_cartPopup_SalePrice = hsbToHex(customize_popup_sale_price_text_color);
    const activator_cartPopup_SalePrice = (
      <Button onClick={() => { this.handlePopover("popoverPopUp10") }} id='customizePopup10'>
        <ButtonColor background={hexcolor_cartPopup_SalePrice} />
      </Button>
    );

    const hexcolor_cartBody_upsell_var_Title = hsbToHex(customize_body_upsell_var_title_text_color);
    const activator_cartBody_upsell_var_Title = (
      <Button onClick={() => { this.handlePopover("popoverBodyUpsell4") }} id='customizeBody12'>
        <ButtonColor background={hexcolor_cartBody_upsell_var_Title} />
      </Button>
    );

    const hexcolor_cartBody_upsell_var_Options = hsbToHex(customize_body_upsell_var_options_color_text);
    const activator_cartBody_upsell_var_Options = (
      <Button onClick={() => { this.handlePopover("popoverBodyUpsell7") }} id='customizeBody15'>
        <ButtonColor background={hexcolor_cartBody_upsell_var_Options} />
      </Button>
    );



    const hexcolor_cartPopup_Button = hsbToHex(customize_popup_button_background_color);
    const activator_cartPopup_Button = (
      <Button onClick={() => { this.handlePopover("popoverPopUp6") }} id='customizePopup6'>
        <ButtonColor background={hexcolor_cartPopup_Button} />
      </Button>
    );

    const hexcolor_cartPopup_ButtonText = hsbToHex(customize_popup_button_text_color);
    const activator_cartPopup_ButtonText = (
      <Button onClick={() => { this.handlePopover("popoverPopUp7") }} id='customizePopup7'>
        <ButtonColor background={hexcolor_cartPopup_ButtonText} />
      </Button>
    );

    const hexcolor_cartPopup_ButtonHov = hsbToHex(customize_popup_button_hov_background_color);
    const activator_cartPopup_ButtonHov = (
      <Button onClick={() => { this.handlePopover("popoverPopUp8") }} id='customizePopup8'>
        <ButtonColor background={hexcolor_cartPopup_ButtonHov} />
      </Button>
    );

    const hexcolor_cartPopup_ButtonTextHov = hsbToHex(customize_popup_button_hov_text_color);
    const activator_cartPopup_ButtonTextHov = (
      <Button onClick={() => { this.handlePopover("popoverPopUp9") }} id='customizePopup9'>
        <ButtonColor background={hexcolor_cartPopup_ButtonTextHov} />
      </Button>
    );

    const rgb_customize_loading_background = rgbString(hsbToRgb(customize_loading_background));
    const hexcolor_customize_loading_icon = hsbToHex(customize_loading_icon);
    const hexcolor_cartFooter_BK = hsbToHex(customize_footer_background_color);
    const hexcolor_cartFooter_Text = hsbToHex(customize_footer_text_color);
    const hexcolor_cartFooter_totalPrice_Text = hsbToHex(customize_footer_total_price_text_color);

    const activator_customize_loading_icon = (
      <Button onClick={() => { this.handlePopover("popoverLoading2") }} id='customizeLoading2'>
        <ButtonColor background={hexcolor_customize_loading_icon} />
      </Button>
    );

    const activator_loading_background = (
      <Button onClick={() => { this.handlePopover("popoverLoading1") }} id='customizeLoading1'>
        <ButtonColor background={rgb_customize_loading_background} />
      </Button>
    );

    const activator_cartFooter_BK = (
      <Button onClick={() => { this.handlePopover("popoverFooter1") }} id='customizeFooter1'>
        <ButtonColor background={hexcolor_cartFooter_BK} />
      </Button>
    );

    const activator_cartFooter_Text = (
      <Button onClick={() => { this.handlePopover("popoverFooter2") }} id='customizeFooter2'>
        <ButtonColor background={hexcolor_cartFooter_Text} />
      </Button>
    );

    const activator_cartFooter_totalPrice_Text = (
      <Button onClick={() => { this.handlePopover("popoverFooter3") }} id='customizeFooter3'>
        <ButtonColor background={hexcolor_cartFooter_totalPrice_Text} />
      </Button>
    );

    const hexcolor_cartFooter_comparePrice_Text = hsbToHex(customize_footer_compare_price_text_color);
    const activator_cartFooter_comparePrice_Text = (
      <Button onClick={() => { this.handlePopover("popoverFooter4") }} id='customizeFooter4'>
        <ButtonColor background={hexcolor_cartFooter_comparePrice_Text} />
      </Button>
    );

    const hexcolor_cartFooter_discount_Text = hsbToHex(customize_footer_discount_text_color);
    const activator_cartFooter_discount_Text = (
      <Button onClick={() => { this.handlePopover("popoverFooter5") }} id='customizeFooter5'>
        <ButtonColor background={hexcolor_cartFooter_discount_Text} />
      </Button>
    );

    const loadingBackground = (
      <Card>
        <FormLayout>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2 }}>
            <TextField
              onBlur={() => (this.validateRGB(customize_loading_background_rgb, 'rgba(255,255,255,0.2)', 'customize_loading_background', 'customize_loading_background_rgb'))}
              label="Loading Background"
              value={customize_loading_background_rgb || 'rgba(255,255,255,0.2)'}
              onChange={(value) => this.handleRgbChange(value, 'customize_loading_background', 'customize_loading_background_rgb')}
              connectedRight={
                <Popover
                  active={popoverLoading1}
                  activator={activator_loading_background}
                  onClose={() => { this.handlePopover("popoverLoading1", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => this.handleColorChangeRGB(value, 'customize_loading_background', 'customize_loading_background_rgb')}
                      color={customize_loading_background}
                      allowAlpha
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={rgb_customize_loading_background || 'rgba(255,255,255,0.2)'} onChange={(value) => this.handleRgbChange(value, 'customize_loading_background', 'customize_loading_background_rgb')} />
                  </Popover.Section>
                </Popover>
              }
            />
            <TextField
              label='Loading Icon Color'
              value={customize_loading_icon_hex || 'ccc'}
              onChange={(value) => { this.handleOnChangeColor(value, "customize_loading_icon_hex", "customize_loading_icon") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popoverLoading2}
                  activator={activator_customize_loading_icon}
                  onClose={() => { this.handlePopover("popoverLoading2", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "customize_loading_icon", "customize_loading_icon_hex") }}
                      color={customize_loading_icon}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_customize_loading_icon} />
                  </Popover.Section>
                </Popover>
              }
            />
          </InlineGrid>
        </FormLayout>
      </Card>
    );

    const actionMarkup = (
      <Button
        role="switch"
        id="hs-active"
        ariaChecked={customize_enabled_loading ? 'false' : 'true'}
        onClick={() => this.toggleIsDirty("customize_enabled_loading")}
        size="slim"
      >
        {!customize_enabled_loading ? "Turn on" : "Turn off"}
      </Button>
    );

    const loadingStatusMarkup = (
      <Badge
        tone={customize_enabled_loading ? 'success' : undefined}
        toneAndProgressLabelOverride={`Setting is ${customize_enabled_loading ? "On" : "Off"}`}
      >
        {customize_enabled_loading ? "On" : "Off"}
      </Badge>
    );

    const loadingToogle =
      <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
          <label htmlFor="hs-active">
            <Text variant="bodyMd" as="h2" tone={customize_enabled_loading ? "success" : ''}>The loading background is {customize_enabled_loading ? 'enabled' : 'disabled'}.</Text>
          </label>
          <InlineStack gap="200" align="center" blockAlign="center">
            {loadingStatusMarkup}
          </InlineStack>
        </InlineStack>
      </InlineStack>;

    const slideCartDesign =
      <BlockStack gap={400} key={0}>
        <Card>
          <BlockStack gap={400}>
            <FormLayout>
              <Text variant="headingMd" as="h5">GENERAL</Text>
              <Divider borderColor="border"></Divider>
            </FormLayout>
            <FormLayout>
              <RadioButton
                label="Design Classic"
                checked={customize_slidecart_design === '0'}
                id="0"
                name="design1"
                onChange={() => { this.handleOnChange('0', "customize_slidecart_design") }}
              />
              {/* <div className='slideContent1'>
                  <img onClick={() => { this.showPopUpImage('slideCart1') }}
                    alt=""
                    width="35%"
                    height="100%"
                    src={slideCart1}
                  />
                </div> */}
              <RadioButton
                label="Design With Rounded Corners"
                id="1"
                name="design2"
                checked={customize_slidecart_design === '1'}
                onChange={() => { this.handleOnChange('1', "customize_slidecart_design") }}
              />
              {/* <div className='slideContent2'>
                  <img onClick={() => { this.showPopUpImage('slideCart2') }}
                    alt=""
                    width="35%"
                    height="100%"
                    src={slideCart2}
                  />
                </div> */}
            </FormLayout>
            <FormLayout>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 3 }}>
                <Select
                  label={<Text variant="bodyMd" as="h3">Slide Size</Text>}
                  options={slideSize}
                  value={customize_slidecart_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_slidecart_size") }}
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Slide Position</Text>}
                  options={slidePosition}
                  value={customize_slidecart_position}
                  onChange={(value) => { this.handleOnChange(value, "customize_slidecart_position") }}
                />
                <Select
                  label={<div style={{ display: "flex" }}>
                    <div>{<Text variant="bodyMd" as="h3">Slide Animation(Only Mobile)</Text>}</div>
                    <Tooltip persistOnClick content="Not available with slide position center."><Icon source={InfoIcon} tone="info" /></Tooltip>
                  </div>}
                  options={slideAnimation}
                  value={customize_slidecart_animation_mobile}
                  //helpText={"Not available with slide position center."}
                  onChange={(value) => { this.handleOnChange(value, "customize_slidecart_animation_mobile") }}
                />
              </InlineGrid>
            </FormLayout>
            <FormLayout>
              <Checkbox
                label="Slide Cart Fixed Footer"
                //helpText="Check this if your store language uses right to left scripts."
                checked={customize_slidecart_footer_fixed == 0 ? false : true}
                onChange={(value) => { this.handleOnChange(value, "customize_slidecart_footer_fixed") }}
              />
              {/* <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 3 }}> */}
              <Checkbox
                label={<div style={{ display: "flex" }}>
                  <div>Display Cart On RTL</div>
                  <Tooltip persistOnClick content="Check this if your store language uses right to left scripts."><Icon source={InfoIcon} tone="info" /></Tooltip>
                </div>}
                //helpText="Check this if your store language uses right to left scripts."
                checked={customize_slidecart_rtl == 0 ? false : true}
                onChange={(value) => { this.handleOnChange(value, "customize_slidecart_rtl") }}
              />
              <Checkbox
                label="Add margin left in screen on mobile devices?"
                checked={customize_slidecart_margin_left == 0 ? false : true}
                onChange={(value) => { this.handleOnChange(value, "customize_slidecart_margin_left") }}
              />
            </FormLayout>
            {/* </InlineGrid> */}
          </BlockStack>
          {/* <Card roundedAbove="xs">
                <BlockStack gap={{ xs: '400', sm: '500' }}>
                  <Box width="100%">
                    <BlockStack gap={{ xs: '200', sm: '400' }}>
                      <Box width="100%">
                        <InlineStack
                          gap="1200"
                          align="space-between"
                          blockAlign="center"
                          wrap={false}
                        >
                          {loadingToogle}
                          <Box minWidth="fit-content">
                            <InlineStack align="end">{actionMarkup}</InlineStack>
                          </Box>
                        </InlineStack>
                      </Box>
                    </BlockStack>
                  </Box>
                </BlockStack>
              </Card> */}
        </Card>
        <Card>
          <Box width="100%">
            <BlockStack gap={{ xs: '200', sm: '400' }}>
              <Box width="100%">
                <InlineStack
                  gap="1200"
                  align="space-between"
                  blockAlign="center"
                  wrap={false}
                >
                  {loadingToogle}
                  <Box minWidth="fit-content">
                    <InlineStack align="end">{actionMarkup}</InlineStack>
                  </Box>
                </InlineStack>
              </Box>
            </BlockStack>
          </Box>
        </Card>
        {loadingBackground}
      </BlockStack>;

    const slideCartDesignHeader =
      <Card key={1}>
        <BlockStack gap={400}>
          <FormLayout>
            <Text variant="headingMd" as="h3">
              GENERAL
            </Text>
            <Divider borderColor="border"></Divider>
          </FormLayout>
          <FormLayout>
            <Text variant="bodySm" fontWeight='bold'>CONTENT</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label={<Text variant="bodyMd" as="h3">Header Background</Text>}
                value={customize_header_background_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_header_background_color_hex", "customize_header_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverHeaderBk}
                    activator={activator_cartHeader_content}
                    onClose={() => { this.handlePopover("popoverHeaderBk", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_header_background_color", "customize_header_background_color_hex") }}
                        color={customize_header_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartHeader_content || '#ffffff'} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="bodyMd" as="h3">Header Text Color</Text>}
                value={customize_header_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_header_text_color_hex", "customize_header_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverHeaderText}
                    activator={activator_cartHeader_text}
                    onClose={() => { this.handlePopover("popoverHeaderText", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_header_text_color", "customize_header_text_color_hex") }}
                        color={customize_header_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartHeader_text} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Select
                label={<Text variant="bodyMd" as="h3">Header Text Transform</Text>}
                options={options_transform}
                value={customize_header_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_header_text_transform") }}
              />
              <Select
                label={<Text variant="bodyMd" as="h3">Header Text Font Size</Text>}
                options={options_font_size}
                value={customize_header_text_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_header_text_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="bodySm" fontWeight='bold'>ICON CLOSE</Text>
          </FormLayout>
          <FormLayout>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label={<Text variant="bodyMd" as="h3">Color</Text>}
                value={customize_header_icon_color_hex || '7d7d7d'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_header_icon_color_hex", "customize_header_icon_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverHeaderIcon}
                    activator={activator_cartHeader_icon}
                    onClose={() => { this.handlePopover("popoverHeaderIcon", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_header_icon_color", "customize_header_icon_color_hex") }}
                        color={customize_header_icon_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartHeader_icon} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="bodyMd" as="h3">Color Hover</Text>}
                value={customize_header_icon_color_hov_hex || '7d7d7d'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_header_icon_color_hov_hex", "customize_header_icon_color_hov") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverHeaderIcon1}
                    activator={activator_cartHeader_icon_hov}
                    onClose={() => { this.handlePopover("popoverHeaderIcon1", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_header_icon_color_hov", "customize_header_icon_color_hov_hex") }}
                        color={customize_header_icon_color_hov}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartHeader_icon_hov} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
            <RangeSlider
              label={<Text variant="bodyMd" as="h3">Size Icon Close</Text>}
              value={customize_header_icon_size}
              onChange={(value) => { this.handleOnChange(value, "customize_header_icon_size") }}
              output
              min={8}
              max={30}
              prefix={customize_header_icon_size + 'px'}
            />
          </FormLayout>
        </BlockStack>
      </Card>;

    const slideCartDesignBody =
      <BlockStack gap={400} key={2}>
        <Card>
          <BlockStack gap={400}>
            <FormLayout>
              <Text variant="headingMd" as="h5">GENERAL</Text>
              <Divider borderColor="border"></Divider>
            </FormLayout>
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>CONTENT</Text>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Body Background</Text>}
                  value={customize_body_background_color_hex || 'ffffff'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_background_color_hex", "customize_body_background_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyBk}
                      activator={activator_cartBody_general_BK}
                      onClose={() => { this.handlePopover("popoverBodyBk", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_background_color", "customize_body_background_color_hex") }}
                          color={customize_body_background_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_general_BK} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <TextField
                  label={<Text variant="bodyMd" as="h3">Border Color (Separation)</Text>}
                  value={customize_body_border_color_hex || 'eeeeee'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_border_color_hex", "customize_body_border_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyBorder}
                      activator={activator_cartBody_general_Border}
                      onClose={() => { this.handlePopover("popoverBodyBorder", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_border_color", "customize_body_border_color_hex") }}
                          color={customize_body_border_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_general_Border} />
                      </Popover.Section>
                    </Popover>
                  }
                />
              </InlineGrid>
                <Text variant="bodySm" fontWeight='bold'>CLEAR ALL</Text>
                <TextField
                  label={<Text variant="bodySm" as="h3">Text Color</Text>}
                  value={customize_body_text_color_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_text_color_hex", "customize_body_text_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyText}
                      activator={activator_cartBody_general_Text}
                      onClose={() => { this.handlePopover("popoverBodyText", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_text_color", "customize_body_text_color_hex") }}
                          color={customize_body_text_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_general_Text} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <Text variant="bodySm" fontWeight='bold'>DESIGN INPUT QUANTITY</Text>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                  <RadioButton
                    label="Design Classic"
                    checked={customize_body_design_qty == 0}
                    id="3"
                    name="accounts"
                    onChange={() => { this.handleOnChange('0', "customize_body_design_qty") }}
                  />
                  <RadioButton
                    label="Center Borderless Design"
                    id="4"
                    name="accounts"
                    checked={customize_body_design_qty == 1}
                    onChange={() => { this.handleOnChange('1', "customize_body_design_qty") }}
                  />
                </InlineGrid>
                <InlineStack align='center'>
                  <div className={customize_body_design_qty == 0 ? "hs-item-cart-qty" : "hs-item-cart-qty hs-design"}>
                    <div className="hs-cart-plus-minus" data-quantity="1" data-id="43053059309787" data-key="43053059309787:f45fee19d9c13f5badcc975453449e8b" data-line="1" data-free="Brake" parts="">
                      <div className="hs-dec hs-qtybutton hs-event-static">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 -192 469.33333 469">
                          <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0">
                          </path>
                        </svg>
                      </div>
                      <input disabled type="text" defaultValue={"1"} id="43053059309787" data-id="43053059309787" data-key="43053059309787:f45fee19d9c13f5badcc975453449e8b" data-line="1" data-value="1" className="hs-event-static" />
                      <div className="hs-inc hs-qtybutton hs-event-static">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" version="1.1" x="0px" y="0px" viewBox="0 0 492 492"> <g> <g>
                          <path d="M465.064,207.566l0.028,0H284.436V27.25c0-14.84-12.016-27.248-26.856-27.248h-23.116    c-14.836,0-26.904,12.408-26.904,27.248v180.316H26.908c-14.832,0-26.908,12-26.908,26.844v23.248    c0,14.832,12.072,26.78,26.908,26.78h180.656v180.968c0,14.832,12.064,26.592,26.904,26.592h23.116    c14.84,0,26.856-11.764,26.856-26.592V284.438h180.624c14.84,0,26.936-11.952,26.936-26.78V234.41    C492,219.566,479.904,207.566,465.064,207.566z">
                          </path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>
                        </svg>
                      </div></div>
                  </div>
                </InlineStack>
            </FormLayout>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={300}>
            <Text as="h2" variant="headingMd">PRODUCTS</Text>
            <Divider borderColor="border"></Divider>
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>
                PRODUCT REMOVE ITEM
              </Text>
              <BlockStack gap={400}>
                <Checkbox
                  label="Text instead of icon"
                  checked={customize_body_prod_remove_enabled == 0 ? false : true}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_prod_remove_enabled") }}
                />
                {!customize_body_prod_remove_enabled ? dataCustomize.iconsCustomize != null ?
                  <InlineStack gap={200} align='center'>
                    <div id='content'>
                    </div>
                    <Modal
                      activator={activatorModal}
                      open={this.state.modal}
                      onClose={() => this.handleOnChange(false, "modal")}
                      title="Select the icon of your preference"
                      secondaryActions={[
                        {
                          content: 'Cancel',
                          onAction: () => this.handleOnChange(false, "modal"),
                        },
                      ]}
                    >
                      <Modal.Section>
                        <InlineGrid gap="400" columns={11}>
                          {dataCustomize.iconsCustomize.map((el, i) => (
                            <Button key={i} id={'button' + i} icon={el.icon} onClick={() => this.iconChange(el.icon, el.id)}></Button>
                          ))}
                        </InlineGrid>

                      </Modal.Section>
                    </Modal>
                  </InlineStack>
                  : '' :
                  <TextField label="Remove Text" value={customize_body_prod_remove_text} onChange={(value) => { this.handleOnChange(value, "customize_body_prod_remove_text") }} />
                }

                <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Remove Item Color</Text>}
                    value={customize_body_prod_icon_remove_color_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_prod_icon_remove_color_hex", "customize_body_prod_icon_remove_color") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyIcon}
                        activator={activator_cartBody_general_Icon}
                        onClose={() => { this.handlePopover("popoverBodyIcon", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_prod_icon_remove_color", "customize_body_prod_icon_remove_color_hex") }}
                            color={customize_body_prod_icon_remove_color}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_general_Icon} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Remove Item Color Hover</Text>}
                    value={customize_body_prod_icon_remove_color_hov_hex || '7d7d7d'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_prod_icon_remove_color_hov_hex", "customize_body_prod_icon_remove_color_hov") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyProd0}
                        activator={activator_cartBody_prod_icon_remove}
                        onClose={() => { this.handlePopover("popoverBodyProd0", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_prod_icon_remove_color_hov", "customize_body_prod_icon_remove_color_hov_hex") }}
                            color={customize_body_prod_icon_remove_color_hov}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_prod_icon_remove} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                </InlineGrid>
                <RangeSlider
                  label={<Text variant="bodyMd" as="h3">Size Remove Item</Text>}
                  value={customize_body_prod_icon_remove_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_prod_icon_remove_size") }}
                  output
                  min={8}
                  max={30}
                  prefix={customize_body_prod_icon_remove_size + 'px'}
                />
              </BlockStack>
            </FormLayout>
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>
                PRODUCT TITLE
              </Text>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_body_prod_title_color_text_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_prod_title_color_text_hex", "customize_body_prod_title_color_text") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyProd1}
                      activator={activator_cartBody_prod_Title}
                      onClose={() => { this.handlePopover("popoverBodyProd1", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_prod_title_color_text", "customize_body_prod_title_color_text_hex") }}
                          color={customize_body_prod_title_color_text}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_prod_Title} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_body_prod_title_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_prod_title_font_weigth") }}
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Text Transform</Text>}
                  options={options_transform}
                  value={customize_body_prod_title_text_transform}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_prod_title_text_transform") }}
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_prod_title_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_prod_title_font_size") }}
                />
              </InlineGrid>
            </FormLayout>
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>VARIANT TITLE</Text>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_body_var_title_color_text_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_var_title_color_text_hex", "customize_body_var_title_color_text") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyProd2}
                      activator={activator_cartBody_prod_Var}
                      onClose={() => { this.handlePopover("popoverBodyProd2", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_var_title_color_text", "customize_body_var_title_color_text_hex") }}
                          color={customize_body_var_title_color_text}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_prod_Var} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_body_var_title_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_var_title_font_weigth") }}
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Text Transform</Text>}
                  options={options_transform}
                  value={customize_body_var_title_text_transform}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_var_title_text_transform") }}
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_var_title_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_var_title_font_size") }}
                />
              </InlineGrid>
            </FormLayout>
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>PRICE</Text>
              <BlockStack gap={400}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_body_price_color_text_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_price_color_text_hex", "customize_body_price_color_text") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyProd3}
                      activator={activator_cartBody_prod_Price}
                      onClose={() => { this.handlePopover("popoverBodyProd3", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_price_color_text", "customize_body_price_color_text_hex") }}
                          color={customize_body_price_color_text}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_prod_Price} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_price_font_weigth") }}
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                    options={options_font_size}
                    value={customize_body_price_font_size}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_price_font_size") }}
                  />
                </InlineGrid>
              </BlockStack>
            </FormLayout>
            {/* <Divider borderColor='border-hover' /> */}
            <BlockStack gap={200}>
              <Text variant="bodySm" fontWeight='bold'>COMPARE PRICE</Text>
              <BlockStack gap={400}>
                {/* ********* */}
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_compare_price_color_text_hex || '737373'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_compare_price_color_text_hex", "customize_body_compare_price_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyProd4}
                        activator={activator_cartBody_prod_ComparePrice}
                        onClose={() => { this.handlePopover("popoverBodyProd4", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_compare_price_color_text", "customize_body_compare_price_color_text_hex") }}
                            color={customize_body_compare_price_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_prod_ComparePrice} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_compare_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_compare_price_font_weigth") }}
                  />
                </InlineGrid>
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_compare_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_compare_price_font_size") }}
                />
              </BlockStack>
            </BlockStack>
            {/* <Divider borderColor='border-hover' /> */}
            {/* SALE PRICE */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>SALE PRICE</Text>
              <BlockStack gap={400}>
                <Checkbox
                  label="Enabled Sale Price"
                  checked={customize_body_enabled_sale_price}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_enabled_sale_price") }}
                  helpText="Is applied to the price when you have to compare the price."
                />
                {/* ********* */}
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_sale_price_color_text_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_sale_price_color_text_hex", "customize_body_sale_price_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyProd6}
                        activator={activator_cartBody_prod_SalePrice}
                        onClose={() => { this.handlePopover("popoverBodyProd6", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_sale_price_color_text", "customize_body_sale_price_color_text_hex") }}
                            color={customize_body_sale_price_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_prod_SalePrice} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_sale_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_sale_price_font_weigth") }}
                  />
                </InlineGrid>
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_sale_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_sale_price_font_size") }}
                />
              </BlockStack>
            </FormLayout>
            {/*  */}
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>DISCOUNT</Text>
              <BlockStack gap={400}>
                {/* ********* */}
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_discount_color_text_hex || '737373'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_discount_color_text_hex", "customize_body_discount_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyProd5}
                        activator={activator_cartBody_prod_Discount}
                        onClose={() => { this.handlePopover("popoverBodyProd5", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_discount_color_text", "customize_body_discount_color_text_hex") }}
                            color={customize_body_discount_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_prod_Discount} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_discount_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_discount_font_weigth") }}
                  />
                </InlineGrid>
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_discount_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_discount_font_size") }}
                />
              </BlockStack>
            </FormLayout>
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>BUTTON UPGRADE</Text>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <TextField
                  label={<Text variant="bodyMd" as="h3">Background Color</Text>}
                  value={customize_body_upgrade_button_background_color_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upgrade_button_background_color_hex", "customize_body_upgrade_button_background_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyProd7}
                      activator={activator_cartBody_prod_button_upgrade}
                      onClose={() => { this.handlePopover("popoverBodyProd7", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_upgrade_button_background_color", "customize_body_upgrade_button_background_color_hex") }}
                          color={customize_body_upgrade_button_background_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_prod_button_upgrade} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_body_upgrade_button_text_color_hex || 'ffffff'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upgrade_button_text_color_hex", "customize_body_upgrade_button_text_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyProd8}
                      activator={activator_cartBody_prod_button_upgrade_text}
                      onClose={() => { this.handlePopover("popoverBodyProd8", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_upgrade_button_text_color", "customize_body_upgrade_button_text_color_hex") }}
                          color={customize_body_upgrade_button_text_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_prod_button_upgrade_text} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <Select
                  label='Text Transform'
                  options={options_transform}
                  value={customize_body_upgrade_button_text_transform}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_text_transform") }}
                />
                <Select
                  label='Font Size'
                  options={options_font_size}
                  value={customize_body_upgrade_button_text_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_text_font_size") }}
                />
                <Select
                  label='Font Weigth'
                  options={options_weight}
                  value={customize_body_upgrade_button_text_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_text_font_weigth") }}
                />
                <Select
                  label='Border Raius'
                  options={options_radius}
                  value={customize_body_upgrade_button_border_radius}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upgrade_button_border_radius") }}
                />
              </InlineGrid>
            </FormLayout>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={500}>
            <FormLayout>
              <Text variant="headingMd" as="h5">UPSELLS</Text>
              <Divider borderColor='border-hover' />
              <BlockStack gap={400}>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Background Color</Text>}
                    value={customize_body_upsell_background_color_hex || 'f7f8f9'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_background_color_hex", "customize_body_upsell_background_color") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell1}
                        activator={activator_cartBody_upsell_BK}
                        onClose={() => { this.handlePopover("popoverBodyUpsell1", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_background_color", "customize_body_upsell_background_color_hex") }}
                            color={customize_body_upsell_background_color}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_BK} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Border Color (Separation - Stacked)</Text>}
                    value={customize_body_upsell_border_color_hex || 'e5e5e5'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_border_color_hex", "customize_body_upsell_border_color") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell2}
                        activator={activator_cartBody_upsell_Border}
                        onClose={() => { this.handlePopover("popoverBodyUpsell2", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_border_color", "customize_body_upsell_border_color_hex") }}
                            color={customize_body_upsell_border_color}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_Border} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                </InlineGrid>
                <TextField
                    label={<Text variant="bodyMd" as="h3">Arrows Color (Slide)</Text>}
                    value={customize_body_upsell_arrows_color_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_arrows_color_hex", "customize_body_upsell_arrows_color") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell12}
                        activator={activator_cartBody_upsell_Arrows}
                        onClose={() => { this.handlePopover("popoverBodyUpsell12", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_arrows_color", "customize_body_upsell_arrows_color_hex") }}
                            color={customize_body_upsell_arrows_color}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_Arrows} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
              </BlockStack>
            </FormLayout>
            {/* ************ */}
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>PRODUCT TITLE</Text>
              <BlockStack gap={400}>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_upsell_prod_title_color_text_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_prod_title_color_text_hex", "customize_body_upsell_prod_title_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell3}
                        activator={activator_cartBody_upsell_prod_Title}
                        onClose={() => { this.handlePopover("popoverBodyUpsell3", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_prod_title_color_text", "customize_body_upsell_prod_title_color_text_hex") }}
                            color={customize_body_upsell_prod_title_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_prod_Title} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_upsell_prod_title_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_prod_title_font_weigth") }}
                  />
                </InlineGrid>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <Select
                    label={<Text variant="bodyMd" as="h3">Text Transform</Text>}
                    options={options_transform}
                    value={customize_body_upsell_prod_title_text_transform}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_prod_title_text_transform") }}
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                    options={options_font_size}
                    value={customize_body_upsell_prod_title_font_size}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_prod_title_font_size") }}
                  />
                </InlineGrid>
              </BlockStack>
            </FormLayout>
            {/* ************* */}
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>PRICE</Text>
              <BlockStack gap={400}>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_upsell_price_color_text_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_price_color_text_hex", "customize_body_upsell_price_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell5}
                        activator={activator_cartBody_upsell_var_Price}
                        onClose={() => { this.handlePopover("popoverBodyUpsell5", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_price_color_text", "customize_body_upsell_price_color_text_hex") }}
                            color={customize_body_upsell_price_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_var_Price} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_upsell_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_price_font_weigth") }}
                  />
                </InlineGrid>
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_upsell_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_price_font_size") }}
                />
              </BlockStack>
            </FormLayout>
            {/* ************* */}
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>COMPARE PRICE</Text>
              <BlockStack gap={400}>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_upsell_compare_price_color_text_hex || '737373'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_compare_price_color_text_hex", "customize_body_upsell_compare_price_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell6}
                        activator={activator_cartBody_upsell_var_ComparePrice}
                        onClose={() => { this.handlePopover("popoverBodyUpsell6", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_compare_price_color_text", "customize_body_upsell_compare_price_color_text_hex") }}
                            color={customize_body_upsell_compare_price_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_var_ComparePrice} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_upsell_compare_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_compare_price_font_weigth") }}
                  />
                </InlineGrid>
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_upsell_compare_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_compare_price_font_size") }}
                />
              </BlockStack>
            </FormLayout>
            {/* ************* */}

            {/* *************SALE PRICE************** */}
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>SALE PRICE</Text>
              <Checkbox
                label="Enabled Sale Price"
                checked={customize_body_upsell_enabled_sale_price}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_enabled_sale_price") }}
                helpText="Is applied to the price when you have to compare the price."
              />
              <BlockStack gap={400}>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_upsell_sale_price_color_text_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_sale_price_color_text_hex", "customize_body_upsell_sale_price_color_text") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell13}
                        activator={activator_cartBody_upsell_var_SalePrice}
                        onClose={() => { this.handlePopover("popoverBodyUpsell13", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_sale_price_color_text", "customize_body_upsell_sale_price_color_text_hex") }}
                            color={customize_body_upsell_sale_price_color_text}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_var_SalePrice} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_upsell_sale_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_sale_price_font_weigth") }}
                  />
                </InlineGrid>
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_body_upsell_sale_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_sale_price_font_size") }}
                />
              </BlockStack>
            </FormLayout>
            {/* ************* */}
            {/* <Divider borderColor='border-hover' /> */}
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>BUTTON ADD CART</Text>
              <Text variant="bodySm" fontWeight='bold'>NORMAL</Text>
              <BlockStack gap={400}>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Background Color</Text>}
                    value={customize_body_upsell_button_background_color_hex || '000000'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_background_color_hex", "customize_body_upsell_button_background_color") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell8}
                        activator={activator_cartBody_upsell_button_normal_BK}
                        onClose={() => { this.handlePopover("popoverBodyUpsell8", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_background_color", "customize_body_upsell_button_background_color_hex") }}
                            color={customize_body_upsell_button_background_color}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_button_normal_BK} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                  <TextField
                    label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                    value={customize_body_upsell_button_text_color_hex || 'ffffff'}
                    onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_text_color_hex", "customize_body_upsell_button_text_color") }}
                    prefix='#'
                    maxLength={6}
                    connectedRight={
                      <Popover
                        active={popoverBodyUpsell9}
                        activator={activator_cartBody_upsell_button_normal_Text}
                        onClose={() => { this.handlePopover("popoverBodyUpsell9", 0) }}
                      >
                        <Popover.Section>
                          <ColorPicker
                            onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_text_color", "customize_body_upsell_button_text_color_hex") }}
                            color={customize_body_upsell_button_text_color}
                          />
                        </Popover.Section>
                        <Popover.Section>
                          <TextField value={hexcolor_cartBody_upsell_button_normal_Text} />
                        </Popover.Section>
                      </Popover>
                    }
                  />
                </InlineGrid>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <Select
                    label={<Text variant="bodyMd" as="h3">Text Transform</Text>}
                    options={options_transform}
                    value={customize_body_upsell_button_text_transform}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_text_transform") }}
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                    options={options_font_size}
                    value={customize_body_upsell_button_text_font_size}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_text_font_size") }}
                  />
                </InlineGrid>
                <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_body_upsell_button_text_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_text_font_weigth") }}
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Border Raius</Text>}
                    options={options_radius}
                    value={customize_body_upsell_button_border_radius}
                    onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_button_border_radius") }}
                  />
                </InlineGrid>
              </BlockStack>
            </FormLayout>

            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>HOVER</Text>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Background Color</Text>}
                  value={customize_body_upsell_button_hov_background_color_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_hov_background_color_hex", "customize_body_upsell_button_hov_background_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyUpsell10}
                      activator={activator_cartBody_upsell_button_hov_BK}
                      onClose={() => { this.handlePopover("popoverBodyUpsell10", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_hov_background_color", "customize_body_upsell_button_hov_background_color_hex") }}
                          color={customize_body_upsell_button_hov_background_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_upsell_button_hov_BK} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_body_upsell_button_hov_text_color_hex || 'ffffff'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_button_hov_text_color_hex", "customize_body_upsell_button_hov_text_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverBodyUpsell11}
                      activator={activator_cartBody_upsell_button_hov_Text}
                      onClose={() => { this.handlePopover("popoverBodyUpsell11", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_body_upsell_button_hov_text_color", "customize_body_upsell_button_hov_text_color_hex") }}
                          color={customize_body_upsell_button_hov_text_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartBody_upsell_button_hov_Text} />
                      </Popover.Section>
                    </Popover>
                  }
                />
              </InlineGrid>
            </FormLayout>
          </BlockStack>
        </Card>
      </BlockStack>;

    const slideCartDesignFooter =
      <BlockStack gap={500} key={3}>
        <Card>
          <BlockStack gap={400}>
            <FormLayout>
              <Text variant="headingMd" as="h5">GENERAL</Text>
              <Divider borderColor="border"></Divider>
            </FormLayout>
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>CONTENT</Text>
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <TextField
                  label={<Text variant="bodyMd" as="h3">Background Color</Text>}
                  value={customize_footer_background_color_hex || 'ffffff'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_background_color_hex", "customize_footer_background_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverFooter1}
                      activator={activator_cartFooter_BK}
                      onClose={() => { this.handlePopover("popoverFooter1", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_footer_background_color", "customize_footer_background_color_hex") }}
                          color={customize_footer_background_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartFooter_BK} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_footer_text_color_hex || '000000'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_text_color_hex", "customize_footer_text_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverFooter2}
                      activator={activator_cartFooter_Text}
                      onClose={() => { this.handlePopover("popoverFooter2", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_footer_text_color", "customize_footer_text_color_hex") }}
                          color={customize_footer_text_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartFooter_Text} />
                      </Popover.Section>
                    </Popover>
                  }
                />
              </InlineGrid>
            </FormLayout>
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>TOTAL PRICE</Text>
              <TextField
                label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                value={customize_footer_total_price_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_total_price_text_color_hex", "customize_footer_total_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverFooter3}
                    activator={activator_cartFooter_totalPrice_Text}
                    onClose={() => { this.handlePopover("popoverFooter3", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_footer_total_price_text_color", "customize_footer_total_price_text_color_hex") }}
                        color={customize_footer_total_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartFooter_totalPrice_Text} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_footer_total_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_total_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_footer_total_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_total_price_font_size") }}
                />
              </InlineGrid>
            </FormLayout>
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>COMPARE PRICE</Text>
              <BlockStack gap={400}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_footer_compare_price_text_color_hex || '737373'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_compare_price_text_color_hex", "customize_footer_compare_price_text_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverFooter4}
                      activator={activator_cartFooter_comparePrice_Text}
                      onClose={() => { this.handlePopover("popoverFooter4", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_footer_compare_price_text_color", "customize_footer_compare_price_text_color_hex") }}
                          color={customize_footer_compare_price_text_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartFooter_comparePrice_Text} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_footer_compare_price_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_footer_compare_price_font_weigth") }}
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                    options={options_font_size}
                    value={customize_footer_compare_price_font_size}
                    onChange={(value) => { this.handleOnChange(value, "customize_footer_compare_price_font_size") }}
                  />
                </InlineGrid>
              </BlockStack>
            </FormLayout>
            <FormLayout>
              <Text variant="bodySm" fontWeight='bold'>DISCOUNT</Text>
              <BlockStack gap={400}>
                <TextField
                  label={<Text variant="bodyMd" as="h3">Text Color</Text>}
                  value={customize_footer_discount_text_color_hex || '737373'}
                  onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_discount_text_color_hex", "customize_footer_discount_text_color") }}
                  prefix='#'
                  maxLength={6}
                  connectedRight={
                    <Popover
                      active={popoverFooter5}
                      activator={activator_cartFooter_discount_Text}
                      onClose={() => { this.handlePopover("popoverFooter5", 0) }}
                    >
                      <Popover.Section>
                        <ColorPicker
                          onChange={(value) => { this.handleColors(value, "customize_footer_discount_text_color", "customize_footer_discount_text_color_hex") }}
                          color={customize_footer_discount_text_color}
                        />
                      </Popover.Section>
                      <Popover.Section>
                        <TextField value={hexcolor_cartFooter_discount_Text} />
                      </Popover.Section>
                    </Popover>
                  }
                />
                <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Weigth</Text>}
                    options={options_weight}
                    value={customize_footer_discount_font_weigth}
                    onChange={(value) => { this.handleOnChange(value, "customize_footer_discount_font_weigth") }}
                  />
                  <Select
                    label={<Text variant="bodyMd" as="h3">Font Size</Text>}
                    options={options_font_size}
                    value={customize_footer_discount_font_size}
                    onChange={(value) => { this.handleOnChange(value, "customize_footer_discount_font_size") }}
                  />
                </InlineGrid>
              </BlockStack>
            </FormLayout>
          </BlockStack>
        </Card>
      </BlockStack>;

    const slideCartDesignModalProduct =
      <BlockStack gap={500} key={4}>
        <Card>
          <FormLayout>
            <Text variant="headingMd" as="h5">GENERAL</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_popup_background_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_background_color_hex", "customize_popup_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp1}
                    activator={activator_cartPopup_BK}
                    onClose={() => { this.handlePopover("popoverPopUp1", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_background_color", "customize_popup_background_color_hex") }}
                        color={customize_popup_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_BK} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Border Color (Separation)</Text>}
                value={customize_popup_border_color_hex || 'e5e5e5'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_border_color_hex", "customize_popup_border_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp2}
                    activator={activator_cartPopup_Border}
                    onClose={() => { this.handlePopover("popoverPopUp2", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_border_color", "customize_popup_border_color_hex") }}
                        color={customize_popup_border_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Border} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Product Title</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_title_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_title_text_color_hex", "customize_popup_title_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp3}
                    activator={activator_cartPopup_Tiile}
                    onClose={() => { this.handlePopover("popoverPopUp3", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_title_text_color", "customize_popup_title_text_color_hex") }}
                        color={customize_popup_title_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Title} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_popup_title_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_title_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_popup_title_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_title_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_popup_title_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_title_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Variant Title</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_body_upsell_var_title_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_var_title_text_color_hex", "customize_body_upsell_var_title_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell4}
                    activator={activator_cartBody_upsell_var_Title}
                    onClose={() => { this.handlePopover("popoverBodyUpsell4", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_var_title_text_color", "customize_body_upsell_var_title_text_color_hex") }}
                        color={customize_body_upsell_var_title_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_var_Title} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_var_title_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_title_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_body_upsell_var_title_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_title_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_var_title_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_title_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Price</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_price_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_price_text_color_hex", "customize_popup_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp4}
                    activator={activator_cartPopup_Price}
                    onClose={() => { this.handlePopover("popoverPopUp4", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_price_text_color", "customize_popup_price_text_color_hex") }}
                        color={customize_popup_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Price} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_popup_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_popup_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Compare Price</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_compare_price_text_color_hex || '737373'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_compare_price_text_color_hex", "customize_popup_compare_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp5}
                    activator={activator_cartPopup_ComparePrice}
                    onClose={() => { this.handlePopover("popoverPopUp5", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_compare_price_text_color", "customize_popup_compare_price_text_color_hex") }}
                        color={customize_popup_compare_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ComparePrice} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_popup_compare_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_compare_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_popup_compare_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_compare_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Sale Price</Text>
            <Checkbox
              label={<div style={{ display: "flex" }}>
                <div>Enabled Sale Price</div>
                <Tooltip persistOnClick content="Is applied to the price when you have to compare the price."><Icon source={InfoIcon} tone="info" /></Tooltip>
              </div>}
              checked={customize_popup_enabled_sale_price}
              onChange={(value) => { this.handleOnChange(value, "customize_popup_enabled_sale_price") }}
            //helpText="Is applied to the price when you have to compare the price."
            />
            <BlockStack gap={500}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_sale_price_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_sale_price_text_color_hex", "customize_popup_sale_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp10}
                    activator={activator_cartPopup_SalePrice}
                    onClose={() => { this.handlePopover("popoverPopUp10", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_sale_price_text_color", "customize_popup_sale_price_text_color_hex") }}
                        color={customize_popup_sale_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_SalePrice} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_popup_sale_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_sale_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_popup_sale_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_sale_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Variants Options</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <RadioButton
                label="Design Classic Variants"
                checked={customize_popup_var_options_design == 0}
                id="5"
                onChange={() => { this.handleOnChange('0', "customize_popup_var_options_design") }}
              />
              <RadioButton
                label="Design a single line each"
                id="6"
                checked={customize_popup_var_options_design == 1}
                onChange={() => { this.handleOnChange('1', "customize_popup_var_options_design") }}
              />
            </InlineGrid>
            <InlineStack align='center'>
              <div className={'hs_preview_var_options' + ' hs_design_' + customize_popup_var_options_design} >
                <span style={{
                  color: '#' + customize_body_upsell_var_options_color_text_hex,
                  fontSize: customize_body_upsell_var_options_font_size,
                  fontWeight: customize_body_upsell_var_options_font_weigth,
                  textTransform: customize_body_upsell_var_options_text_transform
                }}
                >
                  Variant Title</span>
                <select>
                  <option value="variant_option">Variant Option</option>
                </select>
              </div>
            </InlineStack>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_body_upsell_var_options_color_text_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_var_options_color_text_hex", "customize_body_upsell_var_options_color_text") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell7}
                    activator={activator_cartBody_upsell_var_Options}
                    onClose={() => { this.handlePopover("popoverBodyUpsell7", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_var_options_color_text", "customize_body_upsell_var_options_color_text_hex") }}
                        color={customize_body_upsell_var_options_color_text}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_var_Options} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_var_options_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_options_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_body_upsell_var_options_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_options_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_var_options_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_options_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h5">Button Add Cart</Text>
            <Text variant="headingLg" as="h6">Normal</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_popup_button_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_background_color_hex", "customize_popup_button_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp6}
                    activator={activator_cartPopup_Button}
                    onClose={() => { this.handlePopover("popoverPopUp6", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_background_color", "customize_popup_button_background_color_hex") }}
                        color={customize_popup_button_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Button} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_button_text_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_text_color_hex", "customize_popup_button_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp7}
                    activator={activator_cartPopup_ButtonText}
                    onClose={() => { this.handlePopover("popoverPopUp7", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_text_color", "customize_popup_button_text_color_hex") }}
                        color={customize_popup_button_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ButtonText} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_popup_button_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_popup_button_text_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_text_font_size") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_popup_button_text_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_text_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Border Raius</Text>}
                options={options_radius}
                value={customize_popup_button_border_radius}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_border_radius") }}
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h6">Hover</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_popup_button_hov_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_hov_background_color_hex", "customize_popup_button_hov_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp8}
                    activator={activator_cartPopup_ButtonHov}
                    onClose={() => { this.handlePopover("popoverPopUp8", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_hov_background_color", "customize_popup_button_hov_background_color_hex") }}
                        color={customize_popup_button_hov_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ButtonHov} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_button_hov_text_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_hov_text_color_hex", "customize_popup_button_hov_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp9}
                    activator={activator_cartPopup_ButtonTextHov}
                    onClose={() => { this.handlePopover("popoverPopUp9", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_hov_text_color", "customize_popup_button_hov_text_color_hex") }}
                        color={customize_popup_button_hov_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ButtonTextHov} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </FormLayout>
        </Card>
      </BlockStack>;

    const popUpContent =
      <Box padding={200}>
        <BlockStack gap={500}>
          <FormLayout>
            <Text variant="headingLg" as="h5">General</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_popup_background_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_background_color_hex", "customize_popup_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp1}
                    activator={activator_cartPopup_BK}
                    onClose={() => { this.handlePopover("popoverPopUp1", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_background_color", "customize_popup_background_color_hex") }}
                        color={customize_popup_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_BK} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Border Color (Separation)</Text>}
                value={customize_popup_border_color_hex || 'e5e5e5'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_border_color_hex", "customize_popup_border_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp2}
                    activator={activator_cartPopup_Border}
                    onClose={() => { this.handlePopover("popoverPopUp2", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_border_color", "customize_popup_border_color_hex") }}
                        color={customize_popup_border_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Border} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ********** */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Product Title</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_title_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_title_text_color_hex", "customize_popup_title_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp3}
                    activator={activator_cartPopup_Tiile}
                    onClose={() => { this.handlePopover("popoverPopUp3", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_title_text_color", "customize_popup_title_text_color_hex") }}
                        color={customize_popup_title_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Title} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_popup_title_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_title_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_popup_title_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_title_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_popup_title_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_title_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ********* */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Variant Title</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_body_upsell_var_title_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_var_title_text_color_hex", "customize_body_upsell_var_title_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell4}
                    activator={activator_cartBody_upsell_var_Title}
                    onClose={() => { this.handlePopover("popoverBodyUpsell4", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_var_title_text_color", "customize_body_upsell_var_title_text_color_hex") }}
                        color={customize_body_upsell_var_title_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_var_Title} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_var_title_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_title_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_body_upsell_var_title_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_title_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_var_title_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_title_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ********  */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Price</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_price_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_price_text_color_hex", "customize_popup_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp4}
                    activator={activator_cartPopup_Price}
                    onClose={() => { this.handlePopover("popoverPopUp4", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_price_text_color", "customize_popup_price_text_color_hex") }}
                        color={customize_popup_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Price} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_popup_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_popup_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******** */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Compare Price</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_compare_price_text_color_hex || '737373'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_compare_price_text_color_hex", "customize_popup_compare_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp5}
                    activator={activator_cartPopup_ComparePrice}
                    onClose={() => { this.handlePopover("popoverPopUp5", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_compare_price_text_color", "customize_popup_compare_price_text_color_hex") }}
                        color={customize_popup_compare_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ComparePrice} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_popup_compare_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_compare_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_popup_compare_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_compare_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******** */}
          {/* SALE PRICE */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Sale Price</Text>
            <Checkbox
              label={<div style={{ display: "flex" }}>
                <div>Enabled Sale Price</div>
                <Tooltip persistOnClick content="Is applied to the price when you have to compare the price."><Icon source={InfoIcon} tone="info" /></Tooltip>
              </div>}
              checked={customize_popup_enabled_sale_price}
              onChange={(value) => { this.handleOnChange(value, "customize_popup_enabled_sale_price") }}
            //helpText="Is applied to the price when you have to compare the price."
            />
            <BlockStack gap={500}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_sale_price_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_sale_price_text_color_hex", "customize_popup_sale_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp10}
                    activator={activator_cartPopup_SalePrice}
                    onClose={() => { this.handlePopover("popoverPopUp10", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_sale_price_text_color", "customize_popup_sale_price_text_color_hex") }}
                        color={customize_popup_sale_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_SalePrice} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_popup_sale_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_sale_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_popup_sale_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_popup_sale_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******** */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Variants Options</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <RadioButton
                label="Design Classic Variants"
                checked={customize_popup_var_options_design == 0}
                id="5"
                onChange={() => { this.handleOnChange('0', "customize_popup_var_options_design") }}
              />
              <RadioButton
                label="Design a single line each"
                id="6"
                checked={customize_popup_var_options_design == 1}
                onChange={() => { this.handleOnChange('1', "customize_popup_var_options_design") }}
              />
            </InlineGrid>
            <InlineStack align='center'>
              <div className={'hs_preview_var_options' + ' hs_design_' + customize_popup_var_options_design} >
                <span style={{
                  color: '#' + customize_body_upsell_var_options_color_text_hex,
                  fontSize: customize_body_upsell_var_options_font_size,
                  fontWeight: customize_body_upsell_var_options_font_weigth,
                  textTransform: customize_body_upsell_var_options_text_transform
                }}
                >
                  Variant Title</span>
                <select>
                  <option value="variant_option">Variant Option</option>
                </select>
              </div>
            </InlineStack>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_body_upsell_var_options_color_text_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_body_upsell_var_options_color_text_hex", "customize_body_upsell_var_options_color_text") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverBodyUpsell7}
                    activator={activator_cartBody_upsell_var_Options}
                    onClose={() => { this.handlePopover("popoverBodyUpsell7", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_body_upsell_var_options_color_text", "customize_body_upsell_var_options_color_text_hex") }}
                        color={customize_body_upsell_var_options_color_text}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartBody_upsell_var_Options} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_body_upsell_var_options_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_options_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_body_upsell_var_options_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_options_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_body_upsell_var_options_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_body_upsell_var_options_font_size") }}
              />
            </InlineGrid>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******** */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Button Add Cart</Text>
            <Text variant="headingLg" as="h6">Normal</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_popup_button_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_background_color_hex", "customize_popup_button_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp6}
                    activator={activator_cartPopup_Button}
                    onClose={() => { this.handlePopover("popoverPopUp6", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_background_color", "customize_popup_button_background_color_hex") }}
                        color={customize_popup_button_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_Button} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_button_text_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_text_color_hex", "customize_popup_button_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp7}
                    activator={activator_cartPopup_ButtonText}
                    onClose={() => { this.handlePopover("popoverPopUp7", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_text_color", "customize_popup_button_text_color_hex") }}
                        color={customize_popup_button_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ButtonText} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <Select
                label={<Text variant="headingSm" as="h3">Text Transform</Text>}
                options={options_transform}
                value={customize_popup_button_text_transform}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_text_transform") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Size</Text>}
                options={options_font_size}
                value={customize_popup_button_text_font_size}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_text_font_size") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                options={options_weight}
                value={customize_popup_button_text_font_weigth}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_text_font_weigth") }}
              />
              <Select
                label={<Text variant="headingSm" as="h3">Border Raius</Text>}
                options={options_radius}
                value={customize_popup_button_border_radius}
                onChange={(value) => { this.handleOnChange(value, "customize_popup_button_border_radius") }}
              />
            </InlineGrid>
          </FormLayout>
          <FormLayout>
            <Text variant="headingLg" as="h6">Hover</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_popup_button_hov_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_hov_background_color_hex", "customize_popup_button_hov_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp8}
                    activator={activator_cartPopup_ButtonHov}
                    onClose={() => { this.handlePopover("popoverPopUp8", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_hov_background_color", "customize_popup_button_hov_background_color_hex") }}
                        color={customize_popup_button_hov_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ButtonHov} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_popup_button_hov_text_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_popup_button_hov_text_color_hex", "customize_popup_button_hov_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverPopUp9}
                    activator={activator_cartPopup_ButtonTextHov}
                    onClose={() => { this.handlePopover("popoverPopUp9", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_popup_button_hov_text_color", "customize_popup_button_hov_text_color_hex") }}
                        color={customize_popup_button_hov_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartPopup_ButtonTextHov} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </FormLayout>
        </BlockStack>
      </Box>;
    /* ------------------------------------------------END CART POPUP--------------------------------------------------------------------------- */
    /* --------------------------------------------------- CART FOOTER ---------------------------------------------------------------- */
    const cartFooterTabs = [
      {
        id: "General",
        content: "General",
        accessibilityLabel: "General",
        panelID: "cartFooterGeneral-page-fitted"
      }
    ];

    const footerContent =
      <Box padding={200}>
        <BlockStack gap={500}>
          <FormLayout>
            <Text variant="headingLg" as="h5">Content</Text>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
              <TextField
                label={<Text variant="headingSm" as="h3">Background Color</Text>}
                value={customize_footer_background_color_hex || 'ffffff'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_background_color_hex", "customize_footer_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverFooter1}
                    activator={activator_cartFooter_BK}
                    onClose={() => { this.handlePopover("popoverFooter1", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_footer_background_color", "customize_footer_background_color_hex") }}
                        color={customize_footer_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartFooter_BK} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_footer_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_text_color_hex", "customize_footer_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverFooter2}
                    activator={activator_cartFooter_Text}
                    onClose={() => { this.handlePopover("popoverFooter2", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_footer_text_color", "customize_footer_text_color_hex") }}
                        color={customize_footer_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartFooter_Text} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******* */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Total Price</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_footer_total_price_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_total_price_text_color_hex", "customize_footer_total_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverFooter3}
                    activator={activator_cartFooter_totalPrice_Text}
                    onClose={() => { this.handlePopover("popoverFooter3", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_footer_total_price_text_color", "customize_footer_total_price_text_color_hex") }}
                        color={customize_footer_total_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartFooter_totalPrice_Text} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_footer_total_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_total_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_footer_total_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_total_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******* */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Compare Price</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_footer_compare_price_text_color_hex || '737373'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_compare_price_text_color_hex", "customize_footer_compare_price_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverFooter4}
                    activator={activator_cartFooter_comparePrice_Text}
                    onClose={() => { this.handlePopover("popoverFooter4", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_footer_compare_price_text_color", "customize_footer_compare_price_text_color_hex") }}
                        color={customize_footer_compare_price_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartFooter_comparePrice_Text} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_footer_compare_price_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_compare_price_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_footer_compare_price_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_compare_price_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
          <Divider borderColor='border-hover' />
          {/* ******* */}
          <FormLayout>
            <Text variant="headingLg" as="h5">Discount</Text>
            <BlockStack gap={400}>
              <TextField
                label={<Text variant="headingSm" as="h3">Text Color</Text>}
                value={customize_footer_discount_text_color_hex || '737373'}
                onChange={(value) => { this.handleOnChangeColor(value, "customize_footer_discount_text_color_hex", "customize_footer_discount_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={popoverFooter5}
                    activator={activator_cartFooter_discount_Text}
                    onClose={() => { this.handlePopover("popoverFooter5", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "customize_footer_discount_text_color", "customize_footer_discount_text_color_hex") }}
                        color={customize_footer_discount_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cartFooter_discount_Text} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} >
                <Select
                  label={<Text variant="headingSm" as="h3">Font Weigth</Text>}
                  options={options_weight}
                  value={customize_footer_discount_font_weigth}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_discount_font_weigth") }}
                />
                <Select
                  label={<Text variant="headingSm" as="h3">Font Size</Text>}
                  options={options_font_size}
                  value={customize_footer_discount_font_size}
                  onChange={(value) => { this.handleOnChange(value, "customize_footer_discount_font_size") }}
                />
              </InlineGrid>
            </BlockStack>
          </FormLayout>
        </BlockStack>
      </Box>;

    const slideCartDesignContent = this.contentTabsDesign(tabSlideCartDesign, slideCartDesign, slideCartDesignHeader, slideCartDesignBody, slideCartDesignFooter, slideCartDesignModalProduct);//RETURN CONTENT TABS BODY
    const cartHeader = this.contentTabsHeader(tabCartHeader, headerContent, headerIcon);//RETURN CONTENT TABS HEADER
    const cartBody = this.contentTabsBody(tabCartBody, bodyGeneral, bodyProd, bodyUpsell);//RETURN CONTENT TABS BODY
    const cartPopUp = this.contentTabsPopUp(tabCartPopUp, popUpContent);//RETURN CONTENT TABS FOOTER 
    const cartFooter = this.contentTabsFooter(tabCartFooter, footerContent);//RETURN CONTENT TABS FOOTER 

    const toastMarkup = toast ? <Toast content="Customize updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> : null;
    const toastErrorMarkup = toastError ? <Toast content={messageError} error onDismiss={() => { this.handlePopover("toastError", 0) }} duration={2500} /> : null;

    const tabsCustomize = [
      {
        id: 'cart-design',
        content: 'Cart Design',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content-1',
      },
      {
        id: 'cart-header-properties',
        content: 'Cart Header Properties',
        panelID: 'accepts-marketing-content-1',
      },
      {
        id: 'cart-body-properties',
        content: 'Cart Body Properties',
        panelID: 'repeat-customers-content-1',
      },
      {
        id: 'cart-footer-properties',
        content: 'Cart Footer Properties',
        panelID: 'prospects-content-1',
      },
      {
        id: 'cart-modal-product-properties',
        content: 'Cart Modal Product Properties',
        panelID: 'prospects-content-1',
      },
    ];
    const tabsContent =
      <BlockStack gap={300}>
        <Tabs tabs={tabsCustomize} selected={tabSlideCartDesign} onSelect={(indexTab) => this.handleTabChange(indexTab, 'tabSlideCartDesign')}></Tabs>
        {slideCartDesignContent}
      </BlockStack>;

    const myloading = loading ? (
      <div>
        <Loading />
      </div>
    ) : null;

    // const { activeCustomize, setActiveCustomize } = this.context;

    return (
      (typeof myCustomize.customize === 'undefined' || myCustomize.length < 1) ? <SkeletonLoad></SkeletonLoad> :
        /* <Page title='Customize'>
            {popUpImage}
            {myloading}
            <Layout>
                <Layout.AnnotatedSection
                    title="Slide Cart Design"
                    description="Select the design that is to your liking."
                >
                    <Card>
                        {slideCartDesign}
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Loading Background"
                    description="Enable or disable loading when a product is added."
                >
                    <SettingToggle
                        action={{
                            content: !!customize_enabled_loading ? "Disabled" : "Enabled",
                            onAction: () => this.toggleIsDirty("customize_enabled_loading"),
                        }}
                        enabled={customize_enabled_loading}
                    >
                        The loading is  <Text as="span" fontWeight="semibold">{customize_enabled_loading ? 'Enabled' : 'Disabled'}.</Text>
                    </SettingToggle>
                    {loadingBackground}
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Slide Cart Header Properties"
                    description="Modify the properties of the according to your style."
                >
                    <Card>
                        <Tabs
                            tabs={cartHeaderTabs}
                            selected={tabCartHeader}
                            fitted={true}
                        />
                        {cartHeader}
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Slide Cart Body Properties"
                    description="Modify the properties of the according to your style."
                >
                    <Card>
                        <Tabs
                            tabs={cartBodyTabs}
                            selected={tabCartBody}
                            onSelect={(indexTab) => this.handleTabChange(indexTab, 'tabCartBody')}
                            fitted={true}
                        />
                        {cartBody}
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Slide Cart PopUp Product Properties"
                    description="Modify the properties of the according to your style."
                >
                    <Card>
                        <Tabs
                            tabs={cartPopUpTabs}
                            selected={tabCartPopUp}
                            onSelect={(indexTab) => this.handleTabChange(indexTab, 'tabCartPopUp')}
                            fitted={true}
                        />
                        {cartPopUp}
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Slide Cart Footer Properties"
                    description="Modify the properties of the according to your style."
                >
                    <Card>
                        <Tabs
                            tabs={cartFooterTabs}
                            selected={tabCartFooter}
                            fitted={true}
                        />
                        {cartFooter}
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
            {contextualSaveBarMarkup}
            {toastMarkup}
            {toastErrorMarkup}
        </Page> */
        <div>
          {popUpImage}
          {myloading}
          <BlockStack gap="500">
            {/* <Card roundedAbove="xs">
              <BlockStack gap={{ xs: '400', sm: '500' }}>
                <Box width="100%">
                  <BlockStack gap={{ xs: '200', sm: '400' }}>
                    <Box width="100%">
                      <InlineStack
                        gap="1200"
                        align="space-between"
                        blockAlign="center"
                        wrap={false}
                      >
                        {loadingToogle}
                        <Box minWidth="fit-content">
                          <InlineStack align="end">{actionMarkup}</InlineStack>
                        </Box>
                      </InlineStack>
                    </Box>
                  </BlockStack>
                </Box>
              </BlockStack>
            </Card>
            <BlockStack gap="500">
              {loadingBackground}
            </BlockStack> */}
            {tabsContent}
            {/* <Collapsible
              open={customize_enabled_loading}
              id="basic-collapsible"
              transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
            >
              <BlockStack gap="500">
                {loadingBackground}
              </BlockStack>
            </Collapsible> */}
            {/* {slideCartDesign} */}
            {/* <Card> */}
            {/* <Tabs
                    tabs={cartHeaderTabs}
                    selected={tabCartHeader}
                    fitted={true}
                  /> */}
            {/* {cartHeader} */}
            {/* </Card> */}
            {/* <Card>
              <Text variant="headingLg" as="h5">Slide Cart Body Properties</Text>
              <Tabs
                tabs={cartBodyTabs}
                selected={tabCartBody}
                onSelect={(indexTab) => this.handleTabChange(indexTab, 'tabCartBody')}
                fitted={true}
              />

              {cartBody}
            </Card> */}
            {/* <Card>
              <Text variant="headingLg" as="h5">Slide Cart PopUp Product Properties</Text>
              <Tabs
                tabs={cartPopUpTabs}
                selected={tabCartPopUp}
                onSelect={(indexTab) => this.handleTabChange(indexTab, 'tabCartPopUp')}
                fitted={true}
              />
              {cartPopUp}
            </Card> */}
            {/* <Card>
              <Text variant="headingLg" as="h5">Slide Cart Footer Properties</Text>
              <Tabs
                tabs={cartFooterTabs}
                selected={tabCartFooter}
                fitted={true}
              />
              {cartFooter}
            </Card> */}
          </BlockStack>
          {contextualSaveBarMarkup}
          {toastMarkup}
          {toastErrorMarkup}
        </div>
    );
  }
  handleRgbChange = (value, state, stateRGB) => {
    const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");

    const color = rgbToHsb({
      red: rgbValues[0],
      green: rgbValues[1],
      blue: rgbValues[2],
      alpha: rgbValues[3]
    });
    this.setState({ [state]: color, [stateRGB]: value });
  };


  handleColorChangeRGB = (value, state, stateRGB) => {
    const torgb = rgbString(hsbToRgb(value));
    this.setState({ [state]: value, [stateRGB]: torgb });
  };
  validateRGB = (value, custom, state, stateRGB) => {
    if (value.indexOf('rgba') < 0) {
      this.handleRgbChange(custom, state, stateRGB)
    };

  };

  toggleIsDirty = (toggle) => {
    const isDirty = this.state[`${toggle}`];
    if (isDirty == true) {
      this.setState({ [`${toggle}`]: false });
      this.props.updateGridItems({ customize: false });
    } else {
      this.setState({ [`${toggle}`]: true });
      this.props.updateGridItems({ customize: true });
    }
  };


  handleOnChange = (value, second) => {
    if (value.length > 250) {
      return false;
    }
    if (second !== 'customize_slidecart_position') {

      if (value == false) {
        value = 0;
      }
      if (value == true) {
        value = 1;
      }
    }
    if (second === 'customize_slidecart_design' || second === 'customize_slidecart_animation_mobile') {
      value = value.toString();
    }
    this.setState({ [second]: value });
  };

  handleOnChangeColor = (value, hex, hsb) => {
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

  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val })
  };

  handleColors = (value, colorhsb, colorhex) => {
    this.setState({ [colorhsb]: value, [colorhex]: hsbToHex(value).replace(/\#/, "") });
    /* this.setState({ [colorhex]:hsbToHex(value).replace(/\#/, "")}) */
  };

  handleTabChange = (indexTab, state) => {//FUNCTION CHANGE TAB SELECT : PARAMS(INDEX,STATE)
    this.setState({ [state]: indexTab });
  };

  notifyError = (err, name) => {
    switch (name) {
      case 'getCustomize':
        this.setState({ toastError: true, messageError: JSON.stringify(err) });
        break;
      case 'updateCustomize':
        this.setState({ toastError: true, messageError: JSON.stringify(err) });
        break;
    }
  };

  contentTabsDesign = (tabSlideCartDesign, slideCartDesign, slideCartDesignHeader, slideCartDesignBody, slideCartDesignFooter, slideCartDesignModalProduct) => {
    var contentBodyTab = '';
    switch (tabSlideCartDesign) {
      case 0:
        contentBodyTab = slideCartDesign;
        break;
      case 1:
        contentBodyTab = slideCartDesignHeader;
        break;
      case 2:
        contentBodyTab = slideCartDesignBody;
        break;
      case 3:
        contentBodyTab = slideCartDesignFooter;
        break;
      case 4:
        contentBodyTab = slideCartDesignModalProduct;
        break;
    }
    contentBodyTab = <Box padding={200}>
      {contentBodyTab}
    </Box>
    return contentBodyTab;
  };

  contentTabsHeader = (tabCartHeader, headerContent, headerIcon) => {//RETURN CONTENT IN TAB HEADER
    var contentHeaderTab = '';
    switch (tabCartHeader) {
      case 0:
        contentHeaderTab = <div>
          <FormLayout>
            <Text variant="headingLg" as="h5">
              Slide Cart Header Properties
            </Text>
            <BlockStack gap={500}>
              {headerContent}<Divider borderColor="border-hover" /> {headerIcon}
            </BlockStack>
          </FormLayout>
        </div>;

        break;
      /* case 1:
        contentHeaderTab = headerIcon
      break; */
    }
    return contentHeaderTab;
  };

  contentTabsBody = (tabCartBody, bodyGeneral, bodyProd, bodyUpsell) => {//RETURN CONTENT IN TAB BODY
    var contentBodyTab = '';
    switch (tabCartBody) {
      case 0:
        contentBodyTab = bodyGeneral;
        break;
      case 1:
        contentBodyTab = bodyProd;
        this.iconPreview();
        break;
      case 2:
        contentBodyTab = bodyUpsell;
        break;
    }
    contentBodyTab = <Box padding={200}>
      {contentBodyTab}
    </Box>
    return contentBodyTab;
  };

  contentTabsPopUp = (tabCartPopUp, popUpContent) => {//RETURN CONTENT IN TAB BODY
    var contentPopUpTab = '';
    switch (tabCartPopUp) {
      case 0:
        contentPopUpTab = popUpContent;
        break;
    }
    return contentPopUpTab;
  };

  contentTabsFooter = (tabCartFooter, footerContent) => {//RETURN CONTENT IN TAB BODY
    var contentFooterTab = '';
    switch (tabCartFooter) {
      case 0:
        contentFooterTab = footerContent;
        break;
    }
    return contentFooterTab;
  };
  showPopUpImage = (slideCart) => {
    var thisImage = slideCart1_popup;
    switch (slideCart) {
      case 'slideCart2':
        thisImage = slideCart2_popup;
        break;
    }
    var popup = !!document.querySelector('.popup') ? document.querySelector('.popup') : '';
    if (!!popup) {
      var popup_content = !!popup.querySelector(`.popup-content`) ? popup.querySelector(`.popup-content`) : '';
      if (!!popup_content) {
        var popup_img = !!popup_content.querySelector('img') ? popup_content.querySelector('img') : '';
        if (!!popup_img) {
          popup_img.setAttribute('src', thisImage)
          popup.style.display = 'block';
          var x = window.scrollX;
          var y = window.scrollY;
          window.onscroll = function () { window.scrollTo(x, y) };
        };
      };
    };

  }

  iconChange = (icon_svg, icon_id) => {
    this.setState({
      modal: 0,
      customize_body_prod_icon_remove: icon_id,
      customize_body_prod_icon_remove_svg: icon_svg
    });
  };

  hiddenPopUpImage = () => {
    var popup = !!document.querySelector('.popup') ? document.querySelector('.popup') : '';
    if (!!popup) {
      var popup_content = !!popup.querySelector(`.popup-content`) ? popup.querySelector(`.popup-content`) : '';
      if (!!popup_content) {
        var popup_img = !!popup_content.querySelector('img') ? popup_content.querySelector('img') : '';
        if (!!popup_img) {
          popup.style.display = 'none';
          popup_img.setAttribute('src', ``)
          window.onscroll = null;
        };
      };
    };

  }

}

export default (Customize);