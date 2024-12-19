import { Component } from "react";
import {
  ButtonGroup,
  Frame,
  Layout,
  Box,
  Card,
  Tabs,
  Tag,
  FormLayout,
  Banner,
  Text,
  Button,
  Checkbox,
  Select,
  TextField,
  Toast,
  SkeletonBodyText,
  SkeletonDisplayText,
  BlockStack,
  InlineGrid,
  InlineStack,
  rgbToHsb,
  hsbToHex
} from '@shopify/polaris';
import {
  arr_options_mode_upsell,
  arr_options_mode_add_to_cart_upsell,
  arr_options_upsell_qty,
  arr_options_transform,
  arr_options_weight,
  arr_options_upsell_autoplay_time,
  arr_options_font_size,
  arr_options_radius
} from '@utils/global'
import { ResourcePicker } from '@shopify/app-bridge-react';
import colorconvert from 'color-convert';
import { hsbToHexOutPrefix } from '@utils/functionUtils';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { CustomizeUpsells, Toogle, SaveBar, Titles, FieldColor, ToolInfo, ToogleSkeleton } from "@components/";
import { makeGetRequest, makePutPostRequest } from '@utils/Services';


class CartEmpty extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      dataCartEmpty: null,
      dataCustomize: null,

      popoverCEUpselHeadingBK: 0,
      popoverCEUpselHeadingFont: 0,
      popoverCETitleColor: 0,
      popoverCESubTitleColor: 0,
      popoverCEButtonFontColor: 0,
      popoverCEButtonBKColor: 0,
      resourcePickerUpsellEmpty: false,
      activeModalCustomize: 0,

      loading: true,
      toast: false,
      messageError: '',

      enabled_cart_empty: null,
      cart_empty_tabs_selected: 0,
      cart_empty_title: null,
      cart_empty_title_font_size: null,
      cart_empty_title_text_transform: null,
      cart_empty_title_font_weight: null,
      cart_empty_title_color: { hue: null, saturation: null, brightness: null },
      cart_empty_title_color_hex: null,
      cart_empty_subtitle: null,
      cart_empty_subtitle_font_size: null,
      cart_empty_subtitle_text_transform: null,
      cart_empty_subtitle_font_weight: null,
      cart_empty_subtitle_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      cart_empty_subtitle_color_hex: null,
      cart_empty_button_background_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      cart_empty_button_background_color_hex: null,
      cart_empty_button_text: null,
      cart_empty_button_font_size: null,
      cart_empty_button_url: null,
      cart_empty_button_font_weight: null,
      cart_empty_button_text_transform: null,
      cart_empty_button_font_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      cart_empty_button_font_color_hex: null,
      cart_empty_button_border_radius: null,
      cart_empty_enabled_upsell: null,
      cart_empty_upsell_list_products: [],
      cart_empty_upsell_font_size: null,
      cart_empty_upsell_mode: '',
      cart_empty_upsell_qty: null,
      cart_empty_upsell_autoplay_time: null,
      cart_empty_upsell_add_to_cart_mode: '',
      cart_empty_upsell_heading: null,
      cart_empty_upsell_heading_background_color:
      {
        hue: null,
        saturation: null,
        brightness: null
      },
      cart_empty_upsell_heading_background_color_hex: null,
      cart_empty_upsell_text_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      cart_empty_upsell_text_color_hex: null,
      cart_empty_upsell_heading_bold_font: null,
      cart_empty_upsell_product_url: null,
      cart_empty_upsell_max_item: '',
    }
  };

  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val, toast: false })
  };

  discard = () => {
    var c = this.state.dataCartEmpty;
    this.originalData(1, c);
  };

  originalData = (identify, data) => {
    var myData = {};
    if (!identify) {
      myData = {
        dataCartEmpty: data
      };
    };

    const cartEmpty = data.cart_empty;
    var stateData = {
      messageError: '',
      loading: false,
      toast: false,
      options_mode_upsell: arr_options_mode_upsell,
      options_mode_add_to_cart_upsell: arr_options_mode_add_to_cart_upsell,
      options_upsell_qty: arr_options_upsell_qty,
      options_upsell_autoplay_time: arr_options_upsell_autoplay_time,
      options_font_size: arr_options_font_size,
      options_transform: arr_options_transform,
      options_weight: arr_options_weight,
      options_radius: arr_options_radius,
      enabled_cart_empty: cartEmpty.enabled_cart_empty,
      cart_empty_title: cartEmpty.cart_empty_title,
      cart_empty_title_font_size: cartEmpty.cart_empty_title_font_size,
      cart_empty_title_text_transform: cartEmpty.cart_empty_title_text_transform,
      cart_empty_title_font_weight: cartEmpty.cart_empty_title_font_weight,
      cart_empty_title_color: { hue: cartEmpty.cart_empty_title_color_h, saturation: cartEmpty.cart_empty_title_color_s, brightness: cartEmpty.cart_empty_title_color_b },
      cart_empty_title_color_hex: hsbToHexOutPrefix({ hue: cartEmpty.cart_empty_title_color_h, saturation: cartEmpty.cart_empty_title_color_s, brightness: cartEmpty.cart_empty_title_color_b }),
      cart_empty_subtitle: cartEmpty.cart_empty_subtitle,
      cart_empty_subtitle_font_size: cartEmpty.cart_empty_subtitle_font_size,
      cart_empty_subtitle_text_transform: cartEmpty.cart_empty_subtitle_text_transform,
      cart_empty_subtitle_font_weight: cartEmpty.cart_empty_subtitle_font_weight,
      cart_empty_subtitle_color: { hue: cartEmpty.cart_empty_subtitle_color_h, saturation: cartEmpty.cart_empty_subtitle_color_s, brightness: cartEmpty.cart_empty_subtitle_color_b },
      cart_empty_subtitle_color_hex: hsbToHexOutPrefix({ hue: cartEmpty.cart_empty_subtitle_color_h, saturation: cartEmpty.cart_empty_subtitle_color_s, brightness: cartEmpty.cart_empty_subtitle_color_b }),
      cart_empty_button_background_color: { hue: cartEmpty.cart_empty_button_background_color_h, saturation: cartEmpty.cart_empty_button_background_color_s, brightness: cartEmpty.cart_empty_button_background_color_b },
      cart_empty_button_background_color_hex: hsbToHexOutPrefix({ hue: cartEmpty.cart_empty_button_background_color_h, saturation: cartEmpty.cart_empty_button_background_color_s, brightness: cartEmpty.cart_empty_button_background_color_b }),
      cart_empty_button_text: cartEmpty.cart_empty_button_text,
      cart_empty_button_font_size: cartEmpty.cart_empty_button_font_size,
      cart_empty_button_url: cartEmpty.cart_empty_button_url,
      cart_empty_button_font_weight: cartEmpty.cart_empty_button_font_weight,
      cart_empty_button_text_transform: cartEmpty.cart_empty_button_text_transform,
      cart_empty_button_font_color: { hue: cartEmpty.cart_empty_button_font_color_h, saturation: cartEmpty.cart_empty_button_font_color_s, brightness: cartEmpty.cart_empty_button_font_color_b },
      cart_empty_button_font_color_hex: hsbToHexOutPrefix({ hue: cartEmpty.cart_empty_button_font_color_h, saturation: cartEmpty.cart_empty_button_font_color_s, brightness: cartEmpty.cart_empty_button_font_color_b }),
      cart_empty_button_border_radius: cartEmpty.cart_empty_button_border_radius,
      cart_empty_enabled_upsell: cartEmpty.cart_empty_enabled_upsell,
      cart_empty_upsell_list_products: cartEmpty.cart_empty_upsell_list_products == [""] ? [] : cartEmpty.cart_empty_upsell_list_products.split(','),
      cart_empty_upsell_font_size: cartEmpty.cart_empty_upsell_font_size,
      cart_empty_upsell_mode: cartEmpty.cart_empty_upsell_mode.toString(),
      cart_empty_upsell_qty: cartEmpty.cart_empty_upsell_qty,
      cart_empty_upsell_autoplay_time: cartEmpty.cart_empty_upsell_autoplay_time,
      cart_empty_upsell_add_to_cart_mode: cartEmpty.cart_empty_upsell_add_to_cart_mode.toString(),
      cart_empty_upsell_heading: cartEmpty.cart_empty_upsell_heading,
      cart_empty_upsell_heading_background_color: { hue: cartEmpty.cart_empty_upsell_heading_background_color_h, saturation: cartEmpty.cart_empty_upsell_heading_background_color_s, brightness: cartEmpty.cart_empty_upsell_heading_background_color_b },
      cart_empty_upsell_heading_background_color_hex: hsbToHexOutPrefix({ hue: cartEmpty.cart_empty_upsell_heading_background_color_h, saturation: cartEmpty.cart_empty_upsell_heading_background_color_s, brightness: cartEmpty.cart_empty_upsell_heading_background_color_b }),
      cart_empty_upsell_text_color: { hue: cartEmpty.cart_empty_upsell_text_color_h, saturation: cartEmpty.cart_empty_upsell_text_color_s, brightness: cartEmpty.cart_empty_upsell_text_color_b },
      cart_empty_upsell_text_color_hex: hsbToHexOutPrefix({ hue: cartEmpty.cart_empty_upsell_text_color_h, saturation: cartEmpty.cart_empty_upsell_text_color_s, brightness: cartEmpty.cart_empty_upsell_text_color_b }),
      cart_empty_upsell_heading_bold_font: cartEmpty.cart_empty_upsell_heading_bold_font,
      cart_empty_upsell_product_url: cartEmpty.cart_empty_upsell_product_url,
      cart_empty_upsell_max_item: cartEmpty.cart_empty_upsell_max_item,
      popoverCEUpselHeadingBK: false,
      popoverCEUpselHeadingFont: false,
      popoverCETitleColor: false,
      popoverCESubTitleColor: false,
      popoverCEButtonFontColor: false,
      popoverCEButtonBKColor: false
    };
    this.props.updateGridItems({ cart_empty: cartEmpty.enabled_cart_empty });
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

  getCartEmpty = async () => {
    const app = this.context;
    const data = await makeGetRequest('/api/get_cart_empty', app);
    if (data && data.cart_empty !== undefined && data.cart_empty !== null) {
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

  updateSettings = async (props) => {
    this.setState({
      loading: true
    });
    if (!!props) {
      const requestBody = {
        enabled_cart_empty: props.enabled_cart_empty,
        cart_empty_title: props.cart_empty_title,
        cart_empty_title_font_size: props.cart_empty_title_font_size,//NEW
        cart_empty_title_text_transform: props.cart_empty_title_text_transform,
        cart_empty_title_font_weight: props.cart_empty_title_font_weight,
        cart_empty_title_color_h: props.cart_empty_title_color.hue,
        cart_empty_title_color_s: props.cart_empty_title_color.saturation,
        cart_empty_title_color_b: props.cart_empty_title_color.brightness,
        cart_empty_title_color_hex: '#' + props.cart_empty_title_color_hex,
        cart_empty_subtitle: props.cart_empty_subtitle,
        cart_empty_subtitle_font_size: props.cart_empty_subtitle_font_size,//NEW
        cart_empty_subtitle_text_transform: props.cart_empty_subtitle_text_transform,
        cart_empty_subtitle_font_weight: props.cart_empty_subtitle_font_weight,
        cart_empty_subtitle_color_h: props.cart_empty_subtitle_color.hue,
        cart_empty_subtitle_color_s: props.cart_empty_subtitle_color.saturation,
        cart_empty_subtitle_color_b: props.cart_empty_subtitle_color.brightness,
        cart_empty_subtitle_color_hex: '#' + props.cart_empty_subtitle_color_hex,
        cart_empty_button_background_color_h: props.cart_empty_button_background_color.hue,
        cart_empty_button_background_color_s: props.cart_empty_button_background_color.saturation,
        cart_empty_button_background_color_b: props.cart_empty_button_background_color.brightness,
        cart_empty_button_background_color_hex: '#' + props.cart_empty_button_background_color_hex,
        cart_empty_button_text: props.cart_empty_button_text,
        cart_empty_button_font_size: props.cart_empty_button_font_size,//NEW
        cart_empty_button_url: props.cart_empty_button_url,
        cart_empty_button_font_weight: props.cart_empty_button_font_weight,
        cart_empty_button_text_transform: props.cart_empty_button_text_transform,
        cart_empty_button_font_color_h: props.cart_empty_button_font_color.hue,
        cart_empty_button_font_color_s: props.cart_empty_button_font_color.saturation,
        cart_empty_button_font_color_b: props.cart_empty_button_font_color.brightness,
        cart_empty_button_font_color_hex: '#' + props.cart_empty_button_font_color_hex,
        cart_empty_button_border_radius: props.cart_empty_button_border_radius,
        cart_empty_enabled_upsell: props.cart_empty_enabled_upsell,
        cart_empty_upsell_list_products: props.cart_empty_upsell_list_products.toString(),
        cart_empty_upsell_font_size: props.cart_empty_upsell_font_size,//NEW
        cart_empty_upsell_mode: parseInt(props.cart_empty_upsell_mode, 10),
        cart_empty_upsell_qty: parseInt(props.cart_empty_upsell_qty, 10),
        cart_empty_upsell_autoplay_time: parseInt(props.cart_empty_upsell_autoplay_time, 10),
        cart_empty_upsell_add_to_cart_mode: parseInt(props.cart_empty_upsell_add_to_cart_mode, 10),
        cart_empty_upsell_heading: props.cart_empty_upsell_heading,
        cart_empty_upsell_heading_background_color_h: props.cart_empty_upsell_heading_background_color.hue,
        cart_empty_upsell_heading_background_color_s: props.cart_empty_upsell_heading_background_color.saturation,
        cart_empty_upsell_heading_background_color_b: props.cart_empty_upsell_heading_background_color.brightness,
        cart_empty_upsell_heading_background_color_hex: '#' + props.cart_empty_upsell_heading_background_color_hex,
        cart_empty_upsell_text_color_h: props.cart_empty_upsell_text_color.hue,
        cart_empty_upsell_text_color_s: props.cart_empty_upsell_text_color.saturation,
        cart_empty_upsell_text_color_b: props.cart_empty_upsell_text_color.brightness,
        cart_empty_upsell_text_color_hex: '#' + props.cart_empty_upsell_text_color_hex,
        cart_empty_upsell_heading_bold_font: props.cart_empty_upsell_heading_bold_font,
        cart_empty_upsell_product_url: props.cart_empty_upsell_product_url,
        cart_empty_upsell_max_item: parseInt(props.cart_empty_upsell_max_item, 10),
      };
      const method = 'PUT';
      const app = this.context;
      const updateSettings = await makePutPostRequest('/api/cart_empty', method, requestBody, app);
      var messageError = '';
      if (updateSettings.error && updateSettings.message) {
        messageError = updateSettings.message;
      };
      await this.getCartEmpty();
      this.setState({ toast: true, messageError: messageError })
    }
  };
  componentDidMount() {
    this.getCartEmpty();
  };

  onChanges = (state, newValue) => {
    this.setState({ [state]: newValue, toast: false });
  };

  validateData = (props) => {
    var thisEquals = true;
    const stateData = {
      enabled_cart_empty: !!+props.enabled_cart_empty,
      cart_empty_title: props.cart_empty_title,
      cart_empty_title_font_size: props.cart_empty_title_font_size,//NEW
      cart_empty_title_text_transform: props.cart_empty_title_text_transform,
      cart_empty_title_font_weight: props.cart_empty_title_font_weight,
      cart_empty_title_color_h: props.cart_empty_title_color.hue,
      cart_empty_title_color_s: props.cart_empty_title_color.saturation,
      cart_empty_title_color_b: props.cart_empty_title_color.brightness,
      cart_empty_subtitle: props.cart_empty_subtitle,
      cart_empty_subtitle_font_size: props.cart_empty_subtitle_font_size,//NEW
      cart_empty_subtitle_text_transform: props.cart_empty_subtitle_text_transform,
      cart_empty_subtitle_font_weight: props.cart_empty_subtitle_font_weight,
      cart_empty_subtitle_color_h: props.cart_empty_subtitle_color.hue,
      cart_empty_subtitle_color_s: props.cart_empty_subtitle_color.saturation,
      cart_empty_subtitle_color_b: props.cart_empty_subtitle_color.brightness,
      cart_empty_button_background_color_h: props.cart_empty_button_background_color.hue,
      cart_empty_button_background_color_s: props.cart_empty_button_background_color.saturation,
      cart_empty_button_background_color_b: props.cart_empty_button_background_color.brightness,
      cart_empty_button_text: props.cart_empty_button_text,
      cart_empty_button_font_size: props.cart_empty_button_font_size,//NEW
      cart_empty_button_url: props.cart_empty_button_url,
      cart_empty_button_font_weight: props.cart_empty_button_font_weight,
      cart_empty_button_text_transform: props.cart_empty_button_text_transform,
      cart_empty_button_font_color_h: props.cart_empty_button_font_color.hue,
      cart_empty_button_font_color_s: props.cart_empty_button_font_color.saturation,
      cart_empty_button_font_color_b: props.cart_empty_button_font_color.brightness,
      cart_empty_button_border_radius: props.cart_empty_button_border_radius,
      cart_empty_enabled_upsell: !!+props.cart_empty_enabled_upsell,
      cart_empty_upsell_list_products: props.cart_empty_upsell_list_products,
      cart_empty_upsell_font_size: props.cart_empty_upsell_font_size,//NEW
      cart_empty_upsell_mode: props.cart_empty_upsell_mode.toString(),
      cart_empty_upsell_qty: parseInt(props.cart_empty_upsell_qty),
      cart_empty_upsell_autoplay_time: parseInt(props.cart_empty_upsell_autoplay_time),
      cart_empty_upsell_add_to_cart_mode: props.cart_empty_upsell_add_to_cart_mode.toString(),
      cart_empty_upsell_heading: props.cart_empty_upsell_heading,
      cart_empty_upsell_heading_background_color_h: props.cart_empty_upsell_heading_background_color.hue,
      cart_empty_upsell_heading_background_color_s: props.cart_empty_upsell_heading_background_color.saturation,
      cart_empty_upsell_heading_background_color_b: props.cart_empty_upsell_heading_background_color.brightness,
      cart_empty_upsell_text_color_h: props.cart_empty_upsell_text_color.hue,
      cart_empty_upsell_text_color_s: props.cart_empty_upsell_text_color.saturation,
      cart_empty_upsell_text_color_b: props.cart_empty_upsell_text_color.brightness,
      cart_empty_upsell_heading_bold_font: !!+props.cart_empty_upsell_heading_bold_font,
      cart_empty_upsell_product_url: !!+props.cart_empty_upsell_product_url,
      cart_empty_upsell_max_item: props.cart_empty_upsell_max_item.toString(),
    };

    const myDataCartEmpty = this.state.dataCartEmpty;
    if (myDataCartEmpty !== null) {
      const cart_empty = myDataCartEmpty.cart_empty;
      const dataCartEmpty = {
        enabled_cart_empty: !!+cart_empty.enabled_cart_empty,
        cart_empty_title: cart_empty.cart_empty_title,
        cart_empty_title_font_size: cart_empty.cart_empty_title_font_size,//NEW
        cart_empty_title_text_transform: cart_empty.cart_empty_title_text_transform,
        cart_empty_title_font_weight: cart_empty.cart_empty_title_font_weight,
        cart_empty_title_color_h: cart_empty.cart_empty_title_color_h,
        cart_empty_title_color_s: cart_empty.cart_empty_title_color_s,
        cart_empty_title_color_b: cart_empty.cart_empty_title_color_b,
        cart_empty_subtitle: cart_empty.cart_empty_subtitle,
        cart_empty_subtitle_font_size: cart_empty.cart_empty_subtitle_font_size,//NEW
        cart_empty_subtitle_text_transform: cart_empty.cart_empty_subtitle_text_transform,
        cart_empty_subtitle_font_weight: cart_empty.cart_empty_subtitle_font_weight,
        cart_empty_subtitle_color_h: cart_empty.cart_empty_subtitle_color_h,
        cart_empty_subtitle_color_s: cart_empty.cart_empty_subtitle_color_s,
        cart_empty_subtitle_color_b: cart_empty.cart_empty_subtitle_color_b,
        cart_empty_button_background_color_h: cart_empty.cart_empty_button_background_color_h,
        cart_empty_button_background_color_s: cart_empty.cart_empty_button_background_color_s,
        cart_empty_button_background_color_b: cart_empty.cart_empty_button_background_color_b,
        cart_empty_button_text: cart_empty.cart_empty_button_text,
        cart_empty_button_font_size: cart_empty.cart_empty_button_font_size,//NEW
        cart_empty_button_url: cart_empty.cart_empty_button_url,
        cart_empty_button_font_weight: cart_empty.cart_empty_button_font_weight,
        cart_empty_button_text_transform: cart_empty.cart_empty_button_text_transform,
        cart_empty_button_font_color_h: cart_empty.cart_empty_button_font_color_h,
        cart_empty_button_font_color_s: cart_empty.cart_empty_button_font_color_s,
        cart_empty_button_font_color_b: cart_empty.cart_empty_button_font_color_b,
        cart_empty_button_border_radius: cart_empty.cart_empty_button_border_radius,
        cart_empty_enabled_upsell: !!+cart_empty.cart_empty_enabled_upsell,
        cart_empty_upsell_list_products: cart_empty.cart_empty_upsell_list_products == [""] ? [] : cart_empty.cart_empty_upsell_list_products.split(','),
        cart_empty_upsell_font_size: cart_empty.cart_empty_upsell_font_size,//NEW
        cart_empty_upsell_mode: cart_empty.cart_empty_upsell_mode.toString(),
        cart_empty_upsell_qty: cart_empty.cart_empty_upsell_qty,
        cart_empty_upsell_autoplay_time: cart_empty.cart_empty_upsell_autoplay_time,
        cart_empty_upsell_add_to_cart_mode: cart_empty.cart_empty_upsell_add_to_cart_mode.toString(),
        cart_empty_upsell_heading: cart_empty.cart_empty_upsell_heading,
        cart_empty_upsell_heading_background_color_h: cart_empty.cart_empty_upsell_heading_background_color_h,
        cart_empty_upsell_heading_background_color_s: cart_empty.cart_empty_upsell_heading_background_color_s,
        cart_empty_upsell_heading_background_color_b: cart_empty.cart_empty_upsell_heading_background_color_b,
        cart_empty_upsell_text_color_h: cart_empty.cart_empty_upsell_text_color_h,
        cart_empty_upsell_text_color_s: cart_empty.cart_empty_upsell_text_color_s,
        cart_empty_upsell_text_color_b: cart_empty.cart_empty_upsell_text_color_b,
        cart_empty_upsell_heading_bold_font: !!+cart_empty.cart_empty_upsell_heading_bold_font,
        cart_empty_upsell_product_url: !!+cart_empty.cart_empty_upsell_product_url,
        cart_empty_upsell_max_item: cart_empty.cart_empty_upsell_max_item.toString(),
      }
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const a = dataCartEmpty;
      const b = stateData;
      if (!equals(a, b)) {
        thisEquals = false;
      };
    };
    return thisEquals;
  };
  render() {
    const buttonCustomize = <Button /* fullWidth */ variant="primary" tone="success" onClick={() => { this.functionModal() }}>Customize</Button>
    const { dataCartEmpty, loading,
      toast, messageError, enabled_cart_empty,
      cart_empty_tabs_selected, cart_empty_title,
      cart_empty_title_font_size, cart_empty_title_text_transform,
      cart_empty_title_font_weight, cart_empty_title_color,
      cart_empty_title_color_hex, cart_empty_subtitle,
      cart_empty_subtitle_font_size, cart_empty_subtitle_text_transform,
      cart_empty_subtitle_font_weight, cart_empty_subtitle_color,
      cart_empty_subtitle_color_hex, cart_empty_button_background_color,
      cart_empty_button_background_color_hex, cart_empty_button_text,
      cart_empty_button_font_size, cart_empty_button_url,
      cart_empty_button_font_weight, cart_empty_button_text_transform,
      cart_empty_button_font_color, cart_empty_button_font_color_hex,
      cart_empty_button_border_radius, cart_empty_enabled_upsell,
      cart_empty_upsell_list_products, cart_empty_upsell_font_size,
      cart_empty_upsell_mode, cart_empty_upsell_qty, cart_empty_upsell_autoplay_time,
      cart_empty_upsell_add_to_cart_mode, cart_empty_upsell_heading,
      cart_empty_upsell_heading_background_color, cart_empty_upsell_heading_background_color_hex,
      cart_empty_upsell_text_color, cart_empty_upsell_text_color_hex,
      cart_empty_upsell_heading_bold_font, cart_empty_upsell_product_url,
      cart_empty_upsell_max_item, options_mode_upsell, options_mode_add_to_cart_upsell,
      options_upsell_qty, options_upsell_autoplay_time, options_font_size, options_transform,
      options_weight, options_radius, popoverCEUpselHeadingBK,
      popoverCEUpselHeadingFont, popoverCETitleColor, popoverCESubTitleColor,
      popoverCEButtonFontColor, popoverCEButtonBKColor, resourcePickerUpsellEmpty,
      activeModalCustomize
    } = this.state;
    var equals = this.validateData(this.state);

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


    const cartEmpty_tabs = [
      {
        id: "Cart Empty Title",
        content: "Title",
        accessibilityLabel: "Cart Empty Title",
        panelID: "cartEmptyTitle-page-fitted"
      },
      {
        id: "Cart Empty SubTitle",
        content: "SubTitle",
        accessibilityLabel: "Cart Empty SubTitle",
        panelID: "cartEmptySubTitle-page-fitted"
      },
      {
        id: "Cart Empty Button",
        content: "Button",
        accessibilityLabel: "Cart Empty Button",
        panelID: "cartEmptyButton-page-fitted"
      }
    ];

    if (cart_empty_enabled_upsell) {
      var upsell_empty = {
        id: "Cart Empty Upsell",
        content: "Upsell",
        accessibilityLabel: "Cart Empty Upsell",
        panelID: "cartEmptyUpsell-page-fitted"
      }
      cartEmpty_tabs.push(upsell_empty);
    };

    const ThisToast = () => {
      return (
        toast ?
          messageError ?
            <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
            <Toast content="Settings updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
          null
      );
    };

    let tagToEmptyUpsell = null;
    if (cart_empty_upsell_list_products.length > 0) {
      const tagsToAddEmpty = cart_empty_upsell_list_products.map((tag, i) =>
        <Box key={tag} padding={200}><Tag onRemove={() => this.removeTagCart(i)} key={tag}>{tag}</Tag></Box>

      );
      tagToEmptyUpsell = (
        <InlineStack wrap>{tagsToAddEmpty}</InlineStack>
      );
    };

    const hexcolor_cartEmpty_upsell_headingBK = hsbToHex(cart_empty_upsell_heading_background_color);
    const activator_cartEmpty_upsell_headingBK = (
      <Button onClick={() => { this.handlePopover("popoverCEUpselHeadingBK") }} id='cartEmpty5'>
        <ButtonColor background={hexcolor_cartEmpty_upsell_headingBK} />
      </Button>
    );

    const activator_cartEmpty_upsell_headingFont = (
      <Button onClick={() => { this.handlePopover("popoverCEUpselHeadingFont") }} id='cartEmpty6'>
        <ButtonColor background={"#" + cart_empty_upsell_text_color_hex} />
      </Button>
    );

    const cartEmpty_contentUpsell = (
      <FormLayout>
        <BlockStack gap={400}>
          <Banner title="Recharge Element (Integration Recharge Subscriptions)" tone="warning" secondaryAction={{ content: 'https://apps.shopify.com/subscription-payments', url: 'https://apps.shopify.com/subscription-payments', external: true }}>
            <Text>{'In this option, if there are not product selected to display, the recharge element does not appear.'}</Text>
          </Banner>
          <InlineStack align="end">
            <Button variant="primary" tone="success" onClick={() => this.setState({ resourcePickerUpsellEmpty: true })} primary>Add Products</Button>
          </InlineStack>
          <BlockStack gap={400}>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
              {/* <Select
                label={<Titles text="Upsell Mode" />}
                options={options_mode_upsell}
                value={cart_empty_upsell_mode}
                onChange={(value) => { this.handleChange(value, "cart_empty_upsell_mode") }}
              /> */}
              <BlockStack gap="100">
                <Titles text="Upsell Mode" />
                <ButtonGroup variant="segmented">
                  <Button onClick={() => this.handleChange('0', "cart_empty_upsell_mode")} pressed={cart_empty_upsell_mode === '0'}>Slide</Button>
                  <Button onClick={() => this.handleChange('1', "cart_empty_upsell_mode")} pressed={cart_empty_upsell_mode === '1'}>Stacked</Button>
                </ButtonGroup>
              </BlockStack>

              {/* <Select
                label={<Titles text="Upsell Add To Cart Mode" />}
                options={options_mode_add_to_cart_upsell}
                value={cart_empty_upsell_add_to_cart_mode}
                onChange={(value) => { this.handleChange(value, "cart_empty_upsell_add_to_cart_mode") }}
              /> */}
              <BlockStack gap="100">
                <Titles text="Upsell Add To Cart Mode" />
                <ButtonGroup variant="segmented">
                  <Button onClick={() => this.handleChange('0', "cart_empty_upsell_add_to_cart_mode")} pressed={cart_empty_upsell_add_to_cart_mode === '0'}>Modal</Button>
                  <Button onClick={() => this.handleChange('1', "cart_empty_upsell_add_to_cart_mode")} pressed={cart_empty_upsell_add_to_cart_mode === '1'}>Static</Button>
                </ButtonGroup>
              </BlockStack>
              
              <Select
                label={<Titles text="Quantity of upsell products for each frame" />}
                options={options_upsell_qty}
                value={parseInt(cart_empty_upsell_qty)}
                onChange={(value) => { this.handleChange(value, "cart_empty_upsell_qty") }}
                disabled={parseInt(cart_empty_upsell_mode)}
              />

              <Select
                label={<ToolInfo active={enabled_cart_empty} title={<Titles text="Upsell AutoPlay Time" />} description="If 0 is selected, autoplay does not start." />}
                options={options_upsell_autoplay_time}
                value={parseInt(cart_empty_upsell_autoplay_time)}
                onChange={(value) => { this.handleChange(value, "cart_empty_upsell_autoplay_time") }}
                disabled={parseInt(cart_empty_upsell_mode)}
              />
            </InlineGrid>
            <TextField
              label={<Titles text="Max. number of items to suggest" />}
              type="number"
              inputMode="numeric"
              min='1'
              autoComplete="off"
              pattern="^[0-9]+"
              value={cart_empty_upsell_max_item.toString()}
              onChange={(value) => { this.handleChange(value, "cart_empty_upsell_max_item") }}
            />

          </BlockStack>
          <BlockStack gap={400}>
            <TextField
              label={<Titles text="Section heading for suggested products" />}
              value={cart_empty_upsell_heading}
              onChange={(value) => { this.handleChange(value, "cart_empty_upsell_heading") }}
            />
            <Select
              label={<Titles text='Heading text font size:' />}
              options={options_font_size}
              value={cart_empty_upsell_font_size}
              onChange={(value) => { this.handleChange(value, "cart_empty_upsell_font_size") }}
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <FieldColor
                labelColor={<Titles text='Heading background color' />}
                textValue={cart_empty_upsell_heading_background_color_hex}
                changeColorText={(value) => { this.handleOnChangeColor(value, "cart_empty_upsell_heading_background_color_hex", "cart_empty_upsell_heading_background_color") }}
                activePop={popoverCEUpselHeadingBK}
                activadorPop={activator_cartEmpty_upsell_headingBK}
                closePop={() => { this.handlePopover("popoverCEUpselHeadingBK", 0) }}
                changeColorPicker={(value) => { this.handleColors(value, "cart_empty_upsell_heading_background_color", "cart_empty_upsell_heading_background_color_hex") }}
                colorPicker={cart_empty_upsell_heading_background_color}
              />
              <FieldColor
                labelColor={<Titles text="Heading text color" />}
                textValue={cart_empty_upsell_text_color_hex || '000000'}
                changeColorText={(value) => { this.handleOnChangeColor(value, "cart_empty_upsell_text_color_hex", "cart_empty_upsell_text_color") }}
                activePop={popoverCEUpselHeadingFont}
                activadorPop={activator_cartEmpty_upsell_headingFont}
                closePop={() => { this.handlePopover("popoverCEUpselHeadingFont", 0) }}
                changeColorPicker={(value) => { this.handleColors(value, "cart_empty_upsell_text_color", "cart_empty_upsell_text_color_hex") }}
                colorPicker={cart_empty_upsell_text_color}
              />
            </InlineGrid>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Checkbox
                label={<Titles text="Add bold font for heading" />}
                checked={cart_empty_upsell_heading_bold_font}
                onChange={() => this.changeStateBoolean("cart_empty_upsell_heading_bold_font")}
              />
              <Checkbox
                label={<Titles text="Add url to product title" />}
                checked={cart_empty_upsell_product_url}
                onChange={() => this.changeStateBoolean("cart_empty_upsell_product_url")}
              />
            </InlineGrid>
          </BlockStack>
          {tagToEmptyUpsell}
          {buttonCustomize}
        </BlockStack>
      </FormLayout>
    );

    const activator_cartEmpty_title = (
      <Button onClick={() => { this.handlePopover("popoverCETitleColor") }} id='cartEmpty'>
        <ButtonColor background={"#" + cart_empty_title_color_hex} />
      </Button>
    );

    const cartEmpty_contentTitle = (
      <FormLayout>
        <BlockStack gap={400}>
          <TextField
            label={<Titles text='Title Text' />}
            autoComplete="off"
            value={cart_empty_title}
            onChange={(value) => { this.handleChange(value, "cart_empty_title") }}
          />
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
            <FieldColor
              labelColor={<Titles text='Title Color' />}
              textValue={cart_empty_title_color_hex}
              changeColorText={(value) => { this.handleOnChangeColor(value, "cart_empty_title_color_hex", "cart_empty_title_color") }}
              activePop={popoverCETitleColor}
              activadorPop={activator_cartEmpty_title}
              closePop={() => { this.handlePopover("popoverCETitleColor", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "cart_empty_title_color", "cart_empty_title_color_hex") }}
              colorPicker={cart_empty_title_color}
            />
            <Select
              label={<Titles text='Title Text Font Size' />}
              options={options_font_size}//NEW
              value={cart_empty_title_font_size}//NEW
              onChange={(value) => { this.handleChange(value, "cart_empty_title_font_size") }}//NEW
            />
            <Select
              label={<Titles text='Title Text Transform' />}
              options={options_transform}
              value={cart_empty_title_text_transform}
              onChange={(value) => { this.handleChange(value, "cart_empty_title_text_transform") }}
            />
            <Select
              label={<Titles text='Title Text Font Weight' />}
              options={options_weight}
              value={cart_empty_title_font_weight}
              onChange={(value) => { this.handleChange(value, "cart_empty_title_font_weight") }}
            />
          </InlineGrid>
        </BlockStack>
      </FormLayout>
    );

    const activator_cartEmpty_subtitle = (
      <Button onClick={() => { this.handlePopover("popoverCESubTitleColor") }} id='cartEmpty2'>
        <ButtonColor background={"#" + cart_empty_subtitle_color_hex} />
      </Button>
    );

    const cartEmpty_contentSubTitle = (
      <FormLayout>
        <BlockStack gap={400}>
          <TextField
            label={<Titles text="SubTitle Text" />}
            autoComplete="off"
            value={cart_empty_subtitle}
            onChange={(value) => { this.handleChange(value, "cart_empty_subtitle") }}
          />
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
            <FieldColor
              labelColor={<Titles text='SubTitle Color' />}
              textValue={cart_empty_subtitle_color_hex}
              changeColorText={(value) => { this.handleOnChangeColor(value, "cart_empty_subtitle_color_hex", "cart_empty_subtitle_color") }}
              activePop={popoverCESubTitleColor}
              activadorPop={activator_cartEmpty_subtitle}
              closePop={() => { this.handlePopover("popoverCESubTitleColor", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "cart_empty_subtitle_color", "cart_empty_subtitle_color_hex") }}
              colorPicker={cart_empty_subtitle_color}
            />
            <Select
              label={<Titles text='SubTitle Text Font Size' />}
              options={options_font_size}//NEW
              value={cart_empty_subtitle_font_size}//NEW
              onChange={(value) => { this.handleChange(value, "cart_empty_subtitle_font_size") }}//NEW
            />
            <Select
              label={<Titles text='SubTitle Text Transform' />}
              options={options_transform}//NEW
              value={cart_empty_subtitle_text_transform}//NEW
              onChange={(value) => { this.handleChange(value, "cart_empty_subtitle_text_transform") }}//NEW
            />
            <Select
              label={<Titles text='SubTitle Font Weight' />}
              options={options_weight}
              value={cart_empty_subtitle_font_weight}
              onChange={(value) => { this.handleChange(value, "cart_empty_subtitle_font_weight") }}
            />
          </InlineGrid>
        </BlockStack>
      </FormLayout>
    );

    const activator_cartEmpty_buttonFont = (
      <Button onClick={() => { this.handlePopover("popoverCEButtonFontColor") }} id='cartEmpty3'>
        <ButtonColor background={"#" + cart_empty_button_font_color_hex} />
      </Button>
    );

    const activator_cartEmpty_buttonBK = (
      <Button onClick={() => { this.handlePopover("popoverCEButtonBKColor") }} id='cartEmpty4'>
        <ButtonColor background={"#" + cart_empty_button_background_color_hex} />
      </Button>
    );

    const cartEmpty_contentButton = (
      <FormLayout>
        <BlockStack gap={200}>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
            <TextField
              label={<Titles text="Button Text" />}
              autoComplete="off"
              value={cart_empty_button_text}
              onChange={(value) => { this.handleChange(value, "cart_empty_button_text") }}
            />
            <TextField
              label={<Titles text="Button Url" />}
              prefix='/'
              value={cart_empty_button_url}
              onChange={(value) => { this.handleChange(value, "cart_empty_button_url") }}
            />
            <Select
              label={<Titles text="Text Font Size" />}
              options={options_font_size}//NEW
              value={cart_empty_button_font_size}//NEW
              onChange={(value) => { this.handleChange(value, "cart_empty_button_font_size") }}//NEW
            />
            <Select
              label={<Titles text="Button Border Radius" />}
              options={options_radius}
              value={cart_empty_button_border_radius}
              onChange={(value) => this.handleChange(value, "cart_empty_button_border_radius")}
            />
            <Select
              label={<Titles text='Button Text Transform' />}
              options={options_transform}
              value={cart_empty_button_text_transform}
              onChange={(value) => { this.handleChange(value, "cart_empty_button_text_transform") }}
            />
            <Select
              label={<Titles text='Button Text Font Weight' />}
              options={options_weight}
              value={cart_empty_button_font_weight}
              onChange={(value) => { this.handleChange(value, "cart_empty_button_font_weight") }}
            />
            <FieldColor
              labelColor={<Titles text="Button Text Color" />}
              textValue={cart_empty_button_font_color_hex}
              changeColorText={(value) => { this.handleOnChangeColor(value, "cart_empty_button_font_color_hex", "cart_empty_button_font_color") }}
              activePop={popoverCEButtonFontColor}
              activadorPop={activator_cartEmpty_buttonFont}
              closePop={() => { this.handlePopover("popoverCEButtonFontColor", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "cart_empty_button_font_color", "cart_empty_button_font_color_hex") }}
              colorPicker={cart_empty_button_font_color}
            />
            <FieldColor
              labelColor={<Titles text="Button Background Color" />}
              textValue={cart_empty_button_background_color_hex}
              changeColorText={(value) => { this.handleOnChangeColor(value, "cart_empty_button_background_color_hex", "cart_empty_button_background_color") }}
              activePop={popoverCEButtonBKColor}
              activadorPop={activator_cartEmpty_buttonBK}
              closePop={() => { this.handlePopover("popoverCEButtonBKColor", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "cart_empty_button_background_color", "cart_empty_button_background_color_hex") }}
              colorPicker={cart_empty_button_background_color}
            />
          </InlineGrid>
        </BlockStack>
      </FormLayout>
    );

    var cartEmpty_conten = '';
    switch (cart_empty_tabs_selected) {
      case 0:
        cartEmpty_conten = cartEmpty_contentTitle/* cart_empty_enabled_upsell ? cartEmpty_contentTitle : cartEmpty_contentSubTitle */;
        break;
      case 1:
        cartEmpty_conten = cartEmpty_contentSubTitle/* cart_empty_enabled_upsell ? cartEmpty_contentSubTitle : cartEmpty_contentButton */;
        break;
      case 2:
        cartEmpty_conten = cartEmpty_contentButton/* cart_empty_enabled_upsell ? cartEmpty_contentButton : '' */;
        break;
      case 3:
        cartEmpty_conten = cartEmpty_contentUpsell /* cart_empty_enabled_upsell ? cartEmpty_contentUpsell : cartEmpty_contentTitle */;
        break;
    };

    const section_cart_empty = (
      <Card>
        <Tabs
          tabs={cartEmpty_tabs}
          selected={cart_empty_tabs_selected}
          onSelect={this.handleTabChange}
          disclosureText="More views..."
          fitted
        />
        <InlineStack align="center" gap={200}>
          <Box paddingBlock="200">
            <Checkbox
              label={<Titles text="Enabled Upsell In Cart Empty" />}
              checked={cart_empty_enabled_upsell}
              onChange={(value) => this.handleChange(value, "cart_empty_enabled_upsell", cartEmpty_tabs)}
            />
          </Box>
        </InlineStack>
        <Box paddingBlockStart='200'>
          {cartEmpty_conten}
        </Box>
      </Card>
    );

    const resourcePickerUpsell = !!resourcePickerUpsellEmpty ? <ResourcePicker
      resourceType="Product"
      selectMultiple={false}
      showVariants={false}
      allowMultiple={false}
      open={this.state.resourcePickerUpsellEmpty}
      onSelection={(resource) => this.upsellStaticProducts(resource, resourcePickerUpsellEmpty ? 'empty' : 'normal')}
      onCancel={() => this.setState({ resourcePickerUpsellEmpty: false })}
    /> : null;

    const loadingComponent = loading ? <Loading /> : null;
    
    return (
      <div>
        {loadingComponent}
        {dataCartEmpty !== null ?
          <Box paddingBlockEnd="400">
            <BlockStack gap={500}>
              <Toogle enabled={enabled_cart_empty} title='Cart Empty' description='Configuration when cart is empty.' stateText='The Cart Empty is' activeToogle={() => this.changeStateBoolean('enabled_cart_empty')}>{section_cart_empty}
              </Toogle>
            </BlockStack>
            <ThisToast />
            <SaveBar equals={equals} loading={loading} action={() => { this.updateSettings(this.state) }} discard={() => { this.discard() }} />
            {resourcePickerUpsell}
            {activeModalCustomize ? <CustomizeUpsells active={activeModalCustomize} closeModal={() => { this.setState({ activeModalCustomize: 0 }) }} /> : null}
          </Box>
          : <ToogleSkeleton />}
      </div>
    );

  }
  changeStateBoolean = (thisSate) => {
    var stateNow = this.state[thisSate];
    this.setState({ [thisSate]: !stateNow, toast: false });
    if(thisSate === 'enabled_cart_empty'){
        this.props.updateGridItems({ cart_empty: !stateNow});

    };
  };

  handleChange = (value, thisSate, cartEmpty_tabs = []) => {

    var stateNow = this.state[thisSate];
    //var newState = stateNow;
    var stateData = {};
    var index_tab = 0;
    if (thisSate === 'cart_empty_enabled_upsell') {
      if (this.state.cart_empty_tabs_selected == 3 && stateNow == 1) {
        index_tab = 0;
      } else {
        index_tab = this.state.cart_empty_tabs_selected;
      }
      value = +(!stateNow);
      stateData.cart_empty_tabs_selected = index_tab;
    };
    stateData[thisSate] = value;
    stateData['toast'] = false
    this.setState(stateData);
  };

  /* TABS */
  handleTabChange = selectedTabIndex => {
    this.setState({ cart_empty_tabs_selected: selectedTabIndex, toast: false });
  };

  removeTagCart(i) {
    let cart_empty_upsell_list_products = [...this.state.cart_empty_upsell_list_products];
    cart_empty_upsell_list_products.splice(i, 1);
    this.setState({ cart_empty_upsell_list_products });
  };
  /*  */

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
      },
      toast: false
    })
  };

  handleColors = (value, colorhsb, colorhex) => {
    this.setState({ [colorhsb]: value, [colorhex]: hsbToHex(value).replace(/\#/, ""), toast: false });
    /* this.setState({ [colorhex]:hsbToHex(value).replace(/\#/, "")}) */
  };

  upsellStaticProducts(resource) {
    this.addNewTagEmpty(resource.selection[0].handle);
    this.setState({ resourcePickerUpsellEmpty: false, toast: false });
  };

  addNewTagEmpty = (tag) => {
    if (tag !== '') {
      const tags = new Set(this.state.cart_empty_upsell_list_products);
      const newTags = [...tags.add(tag)];
      this.setState({ cart_empty_upsell_list_products: newTags, toast: false });
    };
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
    //this.validateDataCustomizeUpsell();

  };

}
export default (CartEmpty);