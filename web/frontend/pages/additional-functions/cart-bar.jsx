/* import { Component } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { ActionList, Avatar, Grid, Icon, Card, Page, Text, BlockStack, Layout, FormLayout, Box } from '@shopify/polaris';
import { withTranslation, Trans } from "react-i18next";
import { AddGridLayout } from "../components";
import StickyCart from "./sticky-cart"
class CartBar extends Component {
  render() {
    const { t } = this.props;
    return (
      //<StickyCart />
      <AddGridLayout paths={0}>
          <BlockStack gap="400">
            <Card roundedAbove="md">
              <Text as="h1" variant="headingMd">
                Content inside a card
              </Text>
              <BlockStack gap="500">
                <FormLayout>
                  <FormLayout.Group>
                  </FormLayout.Group>
                </FormLayout>
              </BlockStack>
            </Card>
            <Card roundedAbove="md">
              <Text as="h1" variant="headingMd">
                Content inside a card
              </Text>
              <BlockStack gap="500">
                <FormLayout>
                  <FormLayout.Group>
                  </FormLayout.Group>
                </FormLayout>
              </BlockStack>
            </Card>
          </BlockStack>
      </AddGridLayout>
    );
  }
}
export default withTranslation()(CartBar); */
import React from 'react';
import {
  Collapsible,
  Toast,
  Card,
  FormLayout,
  Select,
  TextField,
  BlockStack,
  Popover,
  ColorPicker,
  Button,
  Checkbox,
  hsbToHex,
  rgbToHsb,
  hexToRgb,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Spinner,
  Tabs,
  Banner,
  Text,
  Badge,
  InlineStack,
  InlineCode,
  Box,
  InlineGrid
} from "@shopify/polaris";
import { ResourcePicker } from '@shopify/app-bridge-react';
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import { Redirect, TitleBar } from '@shopify/app-bridge/actions';
//import colorconvert from 'color-convert';
//import BannerHead from '../components/BannerHead';
import { SkeletonLoad } from '../../components';
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';
import { withTranslation, Trans } from "react-i18next";
class CartBar extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      popover1: null,
      popover2: null,
      popover3: null,
      popover4: null,
      popover5: null,
      popover6: null,

      options_redirect: [],
      options_position: [],
      graphqlProduct: [],

      loading: true,
      toastMarkup: false,
      toastValidate: false,
      toastError: false,
      messageError: null,
      cart_bar_tabs_selected: 0,
      enabled_cart_bar: null,
      enabled_cart_bar_home_page: null,
      cart_bar_product_shopify_id: '',
      cart_bar_product_shopify_handle: '',
      cart_bar_product_shopify_title: '',
      cart_bar_product_shopify_originalSrc: '',
      cart_bar_button_text: null,
      cart_bar_button_redirect: null,
      cart_bar_show_prices_x_qty: null,
      cart_bar_button_background_color: {
        hue: null,
        saturation: null,
        brightness: null,
      },
      cart_bar_button_background_color_hex: null,
      cart_bar_button_text_color: {
        hue: null,
        saturation: null,
        brightness: null,
      },
      cart_bar_button_text_color_hex: null,
      cart_bar_background_color: {
        hue: null,
        saturation: null,
        brightness: null,
      },
      cart_bar_background_color_hex: null,
      cart_bar_productTitle_color: {
        hue: null,
        saturation: null,
        brightness: null,
      },
      cart_bar_productTitle_color_hex: null,
      cart_bar_price_color: {
        hue: null,
        saturation: null,
        brightness: null,
      },
      cart_bar_price_color_hex: null,
      cart_bar_comparePrice_color: {
        hue: null,
        saturation: null,
        brightness: null,
      },
      cart_bar_comparePrice_color_hex: null,
      cart_bar_show_mobile: null,
      cart_bar_mobile_position: null,
      cart_bar_mobile_hide_atc: null,
      cart_bar_mobile_hide_stickybarButton: null,
      cart_bar_mobile_show_full_stickybarButton: null,
      cart_bar_mobile_show_productImage: null,
      cart_bar_mobile_show_productTitle: null,
      cart_bar_mobile_show_reviewStarts: null,
      cart_bar_mobile_show_variantSelect: null,
      cart_bar_mobile_show_quantitySelect: null,
      cart_bar_mobile_show_price: null,
      cart_bar_mobile_show_comparePrice: null,
      cart_bar_mobile_positionOffset: '',
      cart_bar_show_desktop: null,
      cart_bar_desktop_position: null,
      cart_bar_desktop_hide_atc: null,
      cart_bar_desktop_hide_stickybarButton: null,
      cart_bar_desktop_show_productImage: null,
      cart_bar_desktop_show_productTitle: null,
      cart_bar_desktop_show_reviewStars: null,
      cart_bar_desktop_show_variantSelect: null,
      cart_bar_desktop_show_quantitySelect: null,
      cart_bar_desktop_show_price: null,
      cart_bar_desktop_show_comparePrice: null,
      cart_bar_desktop_positionOffset: '',
    };
    this.handleSelection = this.handleSelection.bind(this);
  };

  titles = () => {
    const app = this.context;
    const datas = { title: 'Cart Bar' };
    const titleBarOptions = {
      title: datas.title
    };
    TitleBar.create(app, titleBarOptions);
  };

  getCartBarData = async () => {
    const app = this.context;
    const data = await makeGetRequest('/api/get_cart_bar', app);
    if (data && data.dataCartBar !== undefined && data.dataCartBar !== null) {
      const new_user = data.new_user;
      if (new_user == 1) {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, '/additional-functions/sticky-cart');
        return false;
      };
      var arr_options_redirect = [
        { label: 'Go To Slide Cart', value: 'no-redirect' },
        { label: 'Go To Cart', value: 'cart' },
        { label: 'Go To Checkout', value: 'checkout' },
      ];
      var arr_options_position = [
        { label: 'Top', value: '0' },
        { label: 'Bottom', value: '1' }
      ];
      const cart_bar = data.dataCartBar[0];
      this.setState({
        data: data.dataCartBar,
        options_redirect: arr_options_redirect,
        options_position: arr_options_position,
        resourcePicker: false,
        spinnerProduct: false,
        enabled_cart_bar: cart_bar.enabled_cart_bar,
        enabled_cart_bar_home_page: cart_bar.enabled_cart_bar_home_page,
        cart_bar_product_shopify_id: cart_bar.cart_bar_product_shopify_id,
        cart_bar_product_shopify_handle: cart_bar.cart_bar_product_shopify_handle,
        cart_bar_product_shopify_title: cart_bar.cart_bar_product_shopify_title,
        cart_bar_product_shopify_originalSrc: cart_bar.cart_bar_product_shopify_originalSrc,
        cart_bar_button_text: cart_bar.cart_bar_button_text,
        cart_bar_button_redirect: cart_bar.cart_bar_button_redirect,
        cart_bar_show_prices_x_qty: cart_bar.cart_bar_show_prices_x_qty,
        cart_bar_button_background_color: {
          hue: cart_bar.cart_bar_button_background_color_h,
          saturation: cart_bar.cart_bar_button_background_color_s,
          brightness: cart_bar.cart_bar_button_background_color_b,
        },
        cart_bar_button_background_color_hex: cart_bar.cart_bar_button_background_color_hex.replace(/\#/, ""),
        cart_bar_button_text_color: {
          hue: cart_bar.cart_bar_button_text_color_h,
          saturation: cart_bar.cart_bar_button_text_color_s,
          brightness: cart_bar.cart_bar_button_text_color_b,
        },
        cart_bar_button_text_color_hex: cart_bar.cart_bar_button_text_color_hex.replace(/\#/, ""),
        cart_bar_background_color: {
          hue: cart_bar.cart_bar_background_color_h,
          saturation: cart_bar.cart_bar_background_color_s,
          brightness: cart_bar.cart_bar_background_color_b,
        },
        cart_bar_background_color_hex: cart_bar.cart_bar_background_color_hex.replace(/\#/, ""),
        cart_bar_productTitle_color: {
          hue: cart_bar.cart_bar_productTitle_color_h,
          saturation: cart_bar.cart_bar_productTitle_color_s,
          brightness: cart_bar.cart_bar_productTitle_color_b,
        },
        cart_bar_productTitle_color_hex: cart_bar.cart_bar_productTitle_color_hex.replace(/\#/, ""),
        cart_bar_price_color: {
          hue: cart_bar.cart_bar_price_color_h,
          saturation: cart_bar.cart_bar_price_color_s,
          brightness: cart_bar.cart_bar_price_color_b,
        },
        cart_bar_price_color_hex: cart_bar.cart_bar_price_color_hex.replace(/\#/, ""),
        cart_bar_comparePrice_color: {
          hue: cart_bar.cart_bar_comparePrice_color_h,
          saturation: cart_bar.cart_bar_comparePrice_color_s,
          brightness: cart_bar.cart_bar_comparePrice_color_b,
        },
        cart_bar_comparePrice_color_hex: cart_bar.cart_bar_comparePrice_color_hex.replace(/\#/, ""),
        cart_bar_show_mobile: cart_bar.cart_bar_show_mobile,
        cart_bar_mobile_position: cart_bar.cart_bar_mobile_position,
        cart_bar_mobile_hide_atc: cart_bar.cart_bar_mobile_hide_atc,
        cart_bar_mobile_hide_stickybarButton: cart_bar.cart_bar_mobile_hide_stickybarButton,
        cart_bar_mobile_show_full_stickybarButton: cart_bar.cart_bar_mobile_show_full_stickybarButton,
        cart_bar_mobile_show_productImage: cart_bar.cart_bar_mobile_show_productImage,
        cart_bar_mobile_show_productTitle: cart_bar.cart_bar_mobile_show_productTitle,
        cart_bar_mobile_show_reviewStarts: cart_bar.cart_bar_mobile_show_reviewStarts,
        cart_bar_mobile_show_variantSelect: cart_bar.cart_bar_mobile_show_variantSelect,
        cart_bar_mobile_show_quantitySelect: cart_bar.cart_bar_mobile_show_quantitySelect,
        cart_bar_mobile_show_price: cart_bar.cart_bar_mobile_show_price,
        cart_bar_mobile_show_comparePrice: cart_bar.cart_bar_mobile_show_comparePrice,
        cart_bar_mobile_positionOffset: cart_bar.cart_bar_mobile_positionOffset,
        cart_bar_show_desktop: cart_bar.cart_bar_show_desktop,
        cart_bar_desktop_position: cart_bar.cart_bar_desktop_position,
        cart_bar_desktop_hide_atc: cart_bar.cart_bar_desktop_hide_atc,
        cart_bar_desktop_hide_stickybarButton: cart_bar.cart_bar_desktop_hide_stickybarButton,
        cart_bar_desktop_show_productImage: cart_bar.cart_bar_desktop_show_productImage,
        cart_bar_desktop_show_productTitle: cart_bar.cart_bar_desktop_show_productTitle,
        cart_bar_desktop_show_reviewStars: cart_bar.cart_bar_desktop_show_reviewStars,
        cart_bar_desktop_show_variantSelect: cart_bar.cart_bar_desktop_show_variantSelect,
        cart_bar_desktop_show_quantitySelect: cart_bar.cart_bar_desktop_show_quantitySelect,
        cart_bar_desktop_show_price: cart_bar.cart_bar_desktop_show_price,
        cart_bar_desktop_show_comparePrice: cart_bar.cart_bar_desktop_show_comparePrice,
        cart_bar_desktop_positionOffset: cart_bar.cart_bar_desktop_positionOffset,
        loading: false
      });
    } else {
      if (typeof data.plan_status !== 'undefined') {
        if (!data.plan_status) {
          const app = this.context;
          const redirect = Redirect.create(app);
          redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
          return false;
        };
      };
    }
  };

  validateData = () => {
    const w = this.state;
    const stateData = {
      enabled_cart_bar: w.enabled_cart_bar,
      enabled_cart_bar_home_page: w.enabled_cart_bar_home_page,
      cart_bar_product_shopify_id: w.cart_bar_product_shopify_id,
      cart_bar_product_shopify_handle: w.cart_bar_product_shopify_handle,
      cart_bar_product_shopify_title: w.cart_bar_product_shopify_title,
      cart_bar_product_shopify_originalSrc: w.cart_bar_product_shopify_originalSrc,
      cart_bar_button_text: w.cart_bar_button_text,
      cart_bar_button_redirect: w.cart_bar_button_redirect,
      cart_bar_show_prices_x_qty: w.cart_bar_show_prices_x_qty,
      cart_bar_button_background_color_h: w.cart_bar_button_background_color.hue,
      cart_bar_button_background_color_s: w.cart_bar_button_background_color.saturation,
      cart_bar_button_background_color_b: w.cart_bar_button_background_color.brightness,
      cart_bar_button_text_color_h: w.cart_bar_button_text_color.hue,
      cart_bar_button_text_color_s: w.cart_bar_button_text_color.saturation,
      cart_bar_button_text_color_b: w.cart_bar_button_text_color.brightness,
      cart_bar_background_color_h: w.cart_bar_background_color.hue,
      cart_bar_background_color_s: w.cart_bar_background_color.saturation,
      cart_bar_background_color_b: w.cart_bar_background_color.brightness,
      cart_bar_productTitle_color_h: w.cart_bar_productTitle_color.hue,
      cart_bar_productTitle_color_s: w.cart_bar_productTitle_color.saturation,
      cart_bar_productTitle_color_b: w.cart_bar_productTitle_color.brightness,
      cart_bar_price_color_h: w.cart_bar_price_color.hue,
      cart_bar_price_color_s: w.cart_bar_price_color.saturation,
      cart_bar_price_color_b: w.cart_bar_price_color.brightness,
      cart_bar_comparePrice_color_h: w.cart_bar_comparePrice_color.hue,
      cart_bar_comparePrice_color_s: w.cart_bar_comparePrice_color.saturation,
      cart_bar_comparePrice_color_b: w.cart_bar_comparePrice_color.brightness,
      cart_bar_show_mobile: w.cart_bar_show_mobile,
      cart_bar_mobile_position: w.cart_bar_mobile_position,
      cart_bar_mobile_hide_atc: w.cart_bar_mobile_hide_atc,
      cart_bar_mobile_hide_stickybarButton: w.cart_bar_mobile_hide_stickybarButton,
      cart_bar_mobile_show_full_stickybarButton: w.cart_bar_mobile_show_full_stickybarButton,
      cart_bar_mobile_show_productImage: w.cart_bar_mobile_show_productImage,
      cart_bar_mobile_show_productTitle: w.cart_bar_mobile_show_productTitle,
      cart_bar_mobile_show_reviewStarts: w.cart_bar_mobile_show_reviewStarts,
      cart_bar_mobile_show_variantSelect: w.cart_bar_mobile_show_variantSelect,
      cart_bar_mobile_show_quantitySelect: w.cart_bar_mobile_show_quantitySelect,
      cart_bar_mobile_show_price: w.cart_bar_mobile_show_price,
      cart_bar_mobile_show_comparePrice: w.cart_bar_mobile_show_comparePrice,
      cart_bar_mobile_positionOffset: w.cart_bar_mobile_positionOffset.toString(),
      cart_bar_show_desktop: w.cart_bar_show_desktop,
      cart_bar_desktop_position: w.cart_bar_desktop_position,
      cart_bar_desktop_hide_atc: w.cart_bar_desktop_hide_atc,
      cart_bar_desktop_hide_stickybarButton: w.cart_bar_desktop_hide_stickybarButton,
      cart_bar_desktop_show_productImage: w.cart_bar_desktop_show_productImage,
      cart_bar_desktop_show_productTitle: w.cart_bar_desktop_show_productTitle,
      cart_bar_desktop_show_reviewStars: w.cart_bar_desktop_show_reviewStars,
      cart_bar_desktop_show_variantSelect: w.cart_bar_desktop_show_variantSelect,
      cart_bar_desktop_show_quantitySelect: w.cart_bar_desktop_show_quantitySelect,
      cart_bar_desktop_show_price: w.cart_bar_desktop_show_price,
      cart_bar_desktop_show_comparePrice: w.cart_bar_desktop_show_comparePrice,
      cart_bar_desktop_positionOffset: w.cart_bar_desktop_positionOffset.toString()
    };
    const posts = this.state.data;
    if (typeof posts[0] !== 'undefined') {
      const ps = posts[0];
      const arr2 = {
        enabled_cart_bar: ps.enabled_cart_bar,
        enabled_cart_bar_home_page: ps.enabled_cart_bar_home_page,
        cart_bar_product_shopify_id: ps.cart_bar_product_shopify_id,
        cart_bar_product_shopify_handle: ps.cart_bar_product_shopify_handle,
        cart_bar_product_shopify_title: ps.cart_bar_product_shopify_title,
        cart_bar_product_shopify_originalSrc: ps.cart_bar_product_shopify_originalSrc,
        cart_bar_button_text: ps.cart_bar_button_text,
        cart_bar_button_redirect: ps.cart_bar_button_redirect,
        cart_bar_show_prices_x_qty: ps.cart_bar_show_prices_x_qty,
        cart_bar_button_background_color_h: ps.cart_bar_button_background_color_h,
        cart_bar_button_background_color_s: ps.cart_bar_button_background_color_s,
        cart_bar_button_background_color_b: ps.cart_bar_button_background_color_b,
        cart_bar_button_text_color_h: ps.cart_bar_button_text_color_h,
        cart_bar_button_text_color_s: ps.cart_bar_button_text_color_s,
        cart_bar_button_text_color_b: ps.cart_bar_button_text_color_b,
        cart_bar_background_color_h: ps.cart_bar_background_color_h,
        cart_bar_background_color_s: ps.cart_bar_background_color_s,
        cart_bar_background_color_b: ps.cart_bar_background_color_b,
        cart_bar_productTitle_color_h: ps.cart_bar_productTitle_color_h,
        cart_bar_productTitle_color_s: ps.cart_bar_productTitle_color_s,
        cart_bar_productTitle_color_b: ps.cart_bar_productTitle_color_b,
        cart_bar_price_color_h: ps.cart_bar_price_color_h,
        cart_bar_price_color_s: ps.cart_bar_price_color_s,
        cart_bar_price_color_b: ps.cart_bar_price_color_b,
        cart_bar_comparePrice_color_h: ps.cart_bar_comparePrice_color_h,
        cart_bar_comparePrice_color_s: ps.cart_bar_comparePrice_color_s,
        cart_bar_comparePrice_color_b: ps.cart_bar_comparePrice_color_b,
        cart_bar_show_mobile: ps.cart_bar_show_mobile,
        cart_bar_mobile_position: ps.cart_bar_mobile_position,
        cart_bar_mobile_hide_atc: ps.cart_bar_mobile_hide_atc,
        cart_bar_mobile_hide_stickybarButton: ps.cart_bar_mobile_hide_stickybarButton,
        cart_bar_mobile_show_full_stickybarButton: ps.cart_bar_mobile_show_full_stickybarButton,
        cart_bar_mobile_show_productImage: ps.cart_bar_mobile_show_productImage,
        cart_bar_mobile_show_productTitle: ps.cart_bar_mobile_show_productTitle,
        cart_bar_mobile_show_reviewStarts: ps.cart_bar_mobile_show_reviewStarts,
        cart_bar_mobile_show_variantSelect: ps.cart_bar_mobile_show_variantSelect,
        cart_bar_mobile_show_quantitySelect: ps.cart_bar_mobile_show_quantitySelect,
        cart_bar_mobile_show_price: ps.cart_bar_mobile_show_price,
        cart_bar_mobile_show_comparePrice: ps.cart_bar_mobile_show_comparePrice,
        cart_bar_mobile_positionOffset: ps.cart_bar_mobile_positionOffset.toString(),
        cart_bar_show_desktop: ps.cart_bar_show_desktop,
        cart_bar_desktop_position: ps.cart_bar_desktop_position,
        cart_bar_desktop_hide_atc: ps.cart_bar_desktop_hide_atc,
        cart_bar_desktop_hide_stickybarButton: ps.cart_bar_desktop_hide_stickybarButton,
        cart_bar_desktop_show_productImage: ps.cart_bar_desktop_show_productImage,
        cart_bar_desktop_show_productTitle: ps.cart_bar_desktop_show_productTitle,
        cart_bar_desktop_show_reviewStars: ps.cart_bar_desktop_show_reviewStars,
        cart_bar_desktop_show_variantSelect: ps.cart_bar_desktop_show_variantSelect,
        cart_bar_desktop_show_quantitySelect: ps.cart_bar_desktop_show_quantitySelect,
        cart_bar_desktop_show_price: ps.cart_bar_desktop_show_price,
        cart_bar_desktop_show_comparePrice: ps.cart_bar_desktop_show_comparePrice,
        cart_bar_desktop_positionOffset: ps.cart_bar_desktop_positionOffset.toString()
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

  discard = () => {
    const posts = this.state.data[0];
    this.setState({
      enabled_cart_bar: posts.enabled_cart_bar,
      enabled_cart_bar_home_page: posts.enabled_cart_bar_home_page,
      cart_bar_product_shopify_id: posts.cart_bar_product_shopify_id,
      cart_bar_product_shopify_handle: posts.cart_bar_product_shopify_handle,
      cart_bar_product_shopify_title: posts.cart_bar_product_shopify_title,
      cart_bar_product_shopify_originalSrc: posts.cart_bar_product_shopify_originalSrc,
      cart_bar_button_text: posts.cart_bar_button_text,
      cart_bar_button_redirect: posts.cart_bar_button_redirect,
      cart_bar_show_prices_x_qty: posts.cart_bar_show_prices_x_qty,
      cart_bar_button_background_color: {
        hue: posts.cart_bar_button_background_color_h,
        saturation: posts.cart_bar_button_background_color_s,
        brightness: posts.cart_bar_button_background_color_b,
      },
      cart_bar_button_background_color_hex: hsbToHex({
        hue: posts.cart_bar_button_background_color_h,
        saturation: posts.cart_bar_button_background_color_s,
        brightness: posts.cart_bar_button_background_color_b,
      }).replace(/\#/, ""),
      cart_bar_button_text_color: {
        hue: posts.cart_bar_button_text_color_h,
        saturation: posts.cart_bar_button_text_color_s,
        brightness: posts.cart_bar_button_text_color_b,
      },
      cart_bar_button_text_color_hex: hsbToHex({
        hue: posts.cart_bar_button_text_color_h,
        saturation: posts.cart_bar_button_text_color_s,
        brightness: posts.cart_bar_button_text_color_b,
      }).replace(/\#/, ""),
      cart_bar_background_color: {
        hue: posts.cart_bar_background_color_h,
        saturation: posts.cart_bar_background_color_s,
        brightness: posts.cart_bar_background_color_b,
      },
      cart_bar_background_color_hex: hsbToHex({
        hue: posts.cart_bar_background_color_h,
        saturation: posts.cart_bar_background_color_s,
        brightness: posts.cart_bar_background_color_b,
      }).replace(/\#/, ""),
      cart_bar_productTitle_color: {
        hue: posts.cart_bar_productTitle_color_h,
        saturation: posts.cart_bar_productTitle_color_s,
        brightness: posts.cart_bar_productTitle_color_b,
      },
      cart_bar_productTitle_color_hex: hsbToHex({
        hue: posts.cart_bar_productTitle_color_h,
        saturation: posts.cart_bar_productTitle_color_s,
        brightness: posts.cart_bar_productTitle_color_b,
      }).replace(/\#/, ""),
      cart_bar_price_color: {
        hue: posts.cart_bar_price_color_h,
        saturation: posts.cart_bar_price_color_s,
        brightness: posts.cart_bar_price_color_b,
      },
      cart_bar_price_color_hex: hsbToHex({
        hue: posts.cart_bar_price_color_h,
        saturation: posts.cart_bar_price_color_s,
        brightness: posts.cart_bar_price_color_b,
      }).replace(/\#/, ""),
      cart_bar_comparePrice_color: {
        hue: posts.cart_bar_comparePrice_color_h,
        saturation: posts.cart_bar_comparePrice_color_s,
        brightness: posts.cart_bar_comparePrice_color_b,
      },
      cart_bar_comparePrice_color_hex: hsbToHex({
        hue: posts.cart_bar_comparePrice_color_h,
        saturation: posts.cart_bar_comparePrice_color_s,
        brightness: posts.cart_bar_comparePrice_color_b,
      }).replace(/\#/, ""),
      cart_bar_show_mobile: posts.cart_bar_show_mobile,
      cart_bar_mobile_position: posts.cart_bar_mobile_position,
      cart_bar_mobile_hide_atc: posts.cart_bar_mobile_hide_atc,
      cart_bar_mobile_hide_stickybarButton: posts.cart_bar_mobile_hide_stickybarButton,
      cart_bar_mobile_show_full_stickybarButton: posts.cart_bar_mobile_show_full_stickybarButton,
      cart_bar_mobile_show_productImage: posts.cart_bar_mobile_show_productImage,
      cart_bar_mobile_show_productTitle: posts.cart_bar_mobile_show_productTitle,
      cart_bar_mobile_show_reviewStarts: posts.cart_bar_mobile_show_reviewStarts,
      cart_bar_mobile_show_variantSelect: posts.cart_bar_mobile_show_variantSelect,
      cart_bar_mobile_show_quantitySelect: posts.cart_bar_mobile_show_quantitySelect,
      cart_bar_mobile_show_price: posts.cart_bar_mobile_show_price,
      cart_bar_mobile_show_comparePrice: posts.cart_bar_mobile_show_comparePrice,
      cart_bar_mobile_positionOffset: posts.cart_bar_mobile_positionOffset.toString(),
      cart_bar_show_desktop: posts.cart_bar_show_desktop,
      cart_bar_desktop_position: posts.cart_bar_desktop_position,
      cart_bar_desktop_hide_atc: posts.cart_bar_desktop_hide_atc,
      cart_bar_desktop_hide_stickybarButton: posts.cart_bar_desktop_hide_stickybarButton,
      cart_bar_desktop_show_productImage: posts.cart_bar_desktop_show_productImage,
      cart_bar_desktop_show_productTitle: posts.cart_bar_desktop_show_productTitle,
      cart_bar_desktop_show_reviewStars: posts.cart_bar_desktop_show_reviewStars,
      cart_bar_desktop_show_variantSelect: posts.cart_bar_desktop_show_variantSelect,
      cart_bar_desktop_show_quantitySelect: posts.cart_bar_desktop_show_quantitySelect,
      cart_bar_desktop_show_price: posts.cart_bar_desktop_show_price,
      cart_bar_desktop_show_comparePrice: posts.cart_bar_desktop_show_comparePrice,
      cart_bar_desktop_positionOffset: posts.cart_bar_desktop_positionOffset.toString(),
      graphqlProduct: [],
      loading: false
    });

    this.props.updateGridItemsAddOns({ cart_bar: true });
  };

  save = async () => {
    if (this.state.cart_bar_product_shopify_id === '' && this.state.enabled_cart_bar_home_page) {
      this.setState({
        toastValidate: true,
      });
    } else {
      this.setState({
        loading: true,
        graphqlProduct: []
      });

      const {
        enabled_cart_bar,
        enabled_cart_bar_home_page,
        cart_bar_product_shopify_id,
        cart_bar_product_shopify_handle,
        cart_bar_product_shopify_title,
        cart_bar_product_shopify_originalSrc,
        cart_bar_button_text,
        cart_bar_button_redirect,
        cart_bar_show_prices_x_qty,
        cart_bar_button_background_color,
        cart_bar_button_background_color_hex,
        cart_bar_button_text_color,
        cart_bar_button_text_color_hex,
        cart_bar_background_color,
        cart_bar_background_color_hex,
        cart_bar_productTitle_color,
        cart_bar_productTitle_color_hex,
        cart_bar_price_color,
        cart_bar_price_color_hex,
        cart_bar_comparePrice_color,
        cart_bar_comparePrice_color_hex,
        cart_bar_show_mobile,
        cart_bar_mobile_position,
        cart_bar_mobile_hide_atc,
        cart_bar_mobile_hide_stickybarButton,
        cart_bar_mobile_show_full_stickybarButton,
        cart_bar_mobile_show_productImage,
        cart_bar_mobile_show_productTitle,
        cart_bar_mobile_show_reviewStarts,
        cart_bar_mobile_show_variantSelect,
        cart_bar_mobile_show_quantitySelect,
        cart_bar_mobile_show_price,
        cart_bar_mobile_show_comparePrice,
        cart_bar_mobile_positionOffset,
        cart_bar_show_desktop,
        cart_bar_desktop_position,
        cart_bar_desktop_hide_atc,
        cart_bar_desktop_hide_stickybarButton,
        cart_bar_desktop_show_productImage,
        cart_bar_desktop_show_productTitle,
        cart_bar_desktop_show_reviewStars,
        cart_bar_desktop_show_variantSelect,
        cart_bar_desktop_show_quantitySelect,
        cart_bar_desktop_show_price,
        cart_bar_desktop_show_comparePrice,
        cart_bar_desktop_positionOffset,
      } = this.state

      const requestBody = {
        enabled_cart_bar: enabled_cart_bar,
        enabled_cart_bar_home_page: enabled_cart_bar_home_page,
        cart_bar_product_shopify_id: cart_bar_product_shopify_id,
        cart_bar_product_shopify_handle: cart_bar_product_shopify_handle,
        cart_bar_product_shopify_title: cart_bar_product_shopify_title,
        cart_bar_product_shopify_originalSrc: cart_bar_product_shopify_originalSrc,
        cart_bar_button_text: cart_bar_button_text,
        cart_bar_button_redirect: cart_bar_button_redirect,
        cart_bar_show_prices_x_qty: cart_bar_show_prices_x_qty,
        cart_bar_button_background_color_h: cart_bar_button_background_color.hue,
        cart_bar_button_background_color_s: cart_bar_button_background_color.saturation,
        cart_bar_button_background_color_b: cart_bar_button_background_color.brightness,
        cart_bar_button_background_color_hex: '#' + cart_bar_button_background_color_hex,
        cart_bar_button_text_color_h: cart_bar_button_text_color.hue,
        cart_bar_button_text_color_s: cart_bar_button_text_color.saturation,
        cart_bar_button_text_color_b: cart_bar_button_text_color.brightness,
        cart_bar_button_text_color_hex: '#' + cart_bar_button_text_color_hex,
        cart_bar_background_color_h: cart_bar_background_color.hue,
        cart_bar_background_color_s: cart_bar_background_color.saturation,
        cart_bar_background_color_b: cart_bar_background_color.brightness,
        cart_bar_background_color_hex: '#' + cart_bar_background_color_hex,
        cart_bar_productTitle_color_h: cart_bar_productTitle_color.hue,
        cart_bar_productTitle_color_s: cart_bar_productTitle_color.saturation,
        cart_bar_productTitle_color_b: cart_bar_productTitle_color.brightness,
        cart_bar_productTitle_color_hex: '#' + cart_bar_productTitle_color_hex,
        cart_bar_price_color_h: cart_bar_price_color.hue,
        cart_bar_price_color_s: cart_bar_price_color.saturation,
        cart_bar_price_color_b: cart_bar_price_color.brightness,
        cart_bar_price_color_hex: '#' + cart_bar_price_color_hex,
        cart_bar_comparePrice_color_h: cart_bar_comparePrice_color.hue,
        cart_bar_comparePrice_color_s: cart_bar_comparePrice_color.saturation,
        cart_bar_comparePrice_color_b: cart_bar_comparePrice_color.brightness,
        cart_bar_comparePrice_color_hex: '#' + cart_bar_comparePrice_color_hex,
        cart_bar_show_mobile: cart_bar_show_mobile,
        cart_bar_mobile_position: cart_bar_mobile_position,
        cart_bar_mobile_hide_atc: cart_bar_mobile_hide_atc,
        cart_bar_mobile_hide_stickybarButton: cart_bar_mobile_hide_stickybarButton,
        cart_bar_mobile_show_full_stickybarButton: cart_bar_mobile_show_full_stickybarButton,
        cart_bar_mobile_show_productImage: cart_bar_mobile_show_productImage,
        cart_bar_mobile_show_productTitle: cart_bar_mobile_show_productTitle,
        cart_bar_mobile_show_reviewStarts: cart_bar_mobile_show_reviewStarts,
        cart_bar_mobile_show_variantSelect: cart_bar_mobile_show_variantSelect,
        cart_bar_mobile_show_quantitySelect: cart_bar_mobile_show_quantitySelect,
        cart_bar_mobile_show_price: cart_bar_mobile_show_price,
        cart_bar_mobile_show_comparePrice: cart_bar_mobile_show_comparePrice,
        cart_bar_mobile_positionOffset: cart_bar_mobile_positionOffset === '' ? 0 : cart_bar_mobile_positionOffset,
        cart_bar_show_desktop: cart_bar_show_desktop,
        cart_bar_desktop_position: cart_bar_desktop_position,
        cart_bar_desktop_hide_atc: cart_bar_desktop_hide_atc,
        cart_bar_desktop_hide_stickybarButton: cart_bar_desktop_hide_stickybarButton,
        cart_bar_desktop_show_productImage: cart_bar_desktop_show_productImage,
        cart_bar_desktop_show_productTitle: cart_bar_desktop_show_productTitle,
        cart_bar_desktop_show_reviewStars: cart_bar_desktop_show_reviewStars,
        cart_bar_desktop_show_variantSelect: cart_bar_desktop_show_variantSelect,
        cart_bar_desktop_show_quantitySelect: cart_bar_desktop_show_quantitySelect,
        cart_bar_desktop_show_price: cart_bar_desktop_show_price,
        cart_bar_desktop_show_comparePrice: cart_bar_desktop_show_comparePrice,
        cart_bar_desktop_positionOffset: cart_bar_desktop_positionOffset === '' ? 0 : cart_bar_desktop_positionOffset,
      };
      const method = 'PUT';
      const app = this.context;
      await makePutPostRequest('/api/cart_bar', method, requestBody, app).then(response => {
        if (response) {
          this.getCartBarData();
          this.setState({ toastMarkup: true });
        }
      }).catch(err => {
        this.notifyError(err, 'updateCartBar');
      });
    };
  };

  async componentDidMount() {
    //this.titles();
    this.getCartBarData();
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  };

  render() {
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

    const loading = this.state.loading ? (
      <div>
        <Loading />
      </div>
    ) : null;

    var active = this.validateData();
    const contextualSaveBarMarkup = !active || this.state.graphqlProduct.length > 0 ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          loading: this.state.loading,
          onAction: () => this.save(),
        }}
        discardAction={{
          onAction: () => this.discard(),
        }}
        visible
        alignContentFlush={true}
        fullWidth={true}
      />
    ) : '';

    const head_home = (
      <FormLayout >
        <BlockStack gap="400">
          <Text as="h1" fontWeight='medium' variant="headingMd">
            Do you want to have a product like Sticky Cart Bar on the Home page?
          </Text>
          <InlineStack align='center'>
            <Checkbox
              label="Enable Add to Cart Bar Home Page"
              checked={this.state.enabled_cart_bar_home_page}
              onChange={() => this.handleChange("enabled_cart_bar_home_page")}
            />
          </InlineStack>

          {this.state.enabled_cart_bar_home_page && this.state.cart_bar_product_shopify_id === "" ?
            <BlockStack gap="400">
              <Button primary fullWidth={true} onClick={() => this.setState({ resourcePicker: true })}>Select product</Button>
            </BlockStack>
            : null
          }
        </BlockStack>
      </FormLayout>
    );

    const selectProduct =
      this.state.spinnerProduct == true ?
        <InlineStack gap="500" align='center' blockAlign="center">
          <Spinner accessibilityLabel="Spinner" size="large" />
        </InlineStack> :
        <BlockStack gap={200}>
          <InlineStack align="end"><Button onClick={() => this.setState({ resourcePicker: true })} variant="plain">Change Product</Button></InlineStack>
          <ResourceList
            resourceName={{ singular: 'Product', plural: 'Products' }}
            items={[
              {
                id: this.state.cart_bar_product_shopify_id,
                title: this.state.cart_bar_product_shopify_title,
                image: this.state.cart_bar_product_shopify_originalSrc
              }
            ]}
            renderItem={(item) => {
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
                  accessibilityLabel={item.title}
                >
                  <Text variant="bodyMd" as="span" fontWeight="semibold">
                    {item.title}
                  </Text>
                </ResourceItem>
              );
            }}
          />
        </BlockStack>


     /*  <Card
        actions={{
          content: 'Change Product',
          onAction: () => this.setState({ resourcePicker: true }),
        }}
      >
        <ResourceList
          resourceName={{ singular: 'Product', plural: 'Products' }}
          items={[
            {
              id: this.state.cart_bar_product_shopify_id,
              title: this.state.cart_bar_product_shopify_title,
              image: this.state.cart_bar_product_shopify_originalSrc
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
                <BlockStack gap="500">
                  <h3>
                    <Text variant="bodyMd" as="span" fontWeight="semibold">
                      {item.title}
                    </Text>
                  </h3>
                </BlockStack>
              </ResourceList.Item>
            );
          }}
        />
      </Card> */;

    const home =(
      <Card roundedAbove="xs">
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
            Home Page
          </Text>
          {head_home}
          {this.state.enabled_cart_bar_home_page && this.state.cart_bar_product_shopify_id !== '' ?
            selectProduct : null}
        </BlockStack>
      </Card>
    );

    const hexcolor_cart_bar_button_background = hsbToHex(this.state.cart_bar_button_background_color);
    const activator_cart_bar_button_background = (
      <Button onClick={() => { this.handlePopover("popover1") }} id='cart_bar_button_color'>
        <ButtonColor background={hexcolor_cart_bar_button_background} />
      </Button>
    );

    const hexcolor_cart_bar_button_text = hsbToHex(this.state.cart_bar_button_text_color);
    const activator_cart_bar_button_text = (
      <Button onClick={() => { this.handlePopover("popover2") }} id='cart_bar_button_color2'>
        <ButtonColor background={hexcolor_cart_bar_button_text} />
      </Button>
    );

    const hexcolor_cart_bar_background = hsbToHex(this.state.cart_bar_background_color);
    const activator_cart_bar_background = (
      <Button onClick={() => { this.handlePopover("popover3") }} id='cart_bar_button_color3'>
        <ButtonColor background={hexcolor_cart_bar_background} />
      </Button>
    );

    const hexcolor_cart_bar_productTitle = hsbToHex(this.state.cart_bar_productTitle_color);
    const activator_cart_bar_productTitle = (
      <Button onClick={() => { this.handlePopover("popover4") }} id='cart_bar_button_color4'>
        <ButtonColor background={hexcolor_cart_bar_productTitle} />
      </Button>
    );

    const hexcolor_cart_bar_price = hsbToHex(this.state.cart_bar_price_color);
    const activator_cart_bar_price = (
      <Button onClick={() => { this.handlePopover("popover5") }} id='cart_bar_button_color5'>
        <ButtonColor background={hexcolor_cart_bar_price} />
      </Button>
    );

    const hexcolor_cart_bar_comparePrice = hsbToHex(this.state.cart_bar_comparePrice_color);
    const activator_cart_bar_comparePrice = (
      <Button onClick={() => { this.handlePopover("popover6") }} id='cart_bar_button_color6'>
        <ButtonColor background={hexcolor_cart_bar_comparePrice} />
      </Button>
    );

    const cart_bar = (
      <Card roundedAbove="xs">
        <FormLayout>
          <BlockStack gap={400}>
            <Text as="h1" variant="headingMd">
              Sticky Bar Design
            </Text>
            <Checkbox
              label="Show Prices ATC according to quantity."
              helpText="When selected, the prices of ATC will be according to the quantity of ATC."
              checked={this.state.cart_bar_show_prices_x_qty}
              onChange={() => this.handleChange("cart_bar_show_prices_x_qty")}
            />
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label="Button Text"
                autoComplete="off"
                value={this.state.cart_bar_button_text}
                onChange={(value) => { this.handleOnChange(value, "cart_bar_button_text") }}
              />
              <Select
                label="ATC Button is clicked, redirect"
                options={this.state.options_redirect}
                value={this.state.cart_bar_button_redirect}
                onChange={(value) => { this.handleOnChange(value, "cart_bar_button_redirect") }}
              />
            </InlineGrid>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <TextField
                label="ATC Button Background Color"
                value={this.state.cart_bar_button_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "cart_bar_button_background_color_hex", "cart_bar_button_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={this.state.popover1}
                    activator={activator_cart_bar_button_background}
                    onClose={() => { this.handlePopover("popover1", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "cart_bar_button_background_color", "cart_bar_button_background_color_hex") }}
                        color={this.state.cart_bar_button_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cart_bar_button_background} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label="ATC Button Text Color"
                value={this.state.cart_bar_button_text_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "cart_bar_button_text_color_hex", "cart_bar_button_text_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={this.state.popover2}
                    activator={activator_cart_bar_button_text}
                    onClose={() => { this.handlePopover("popover2", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "cart_bar_button_text_color", "cart_bar_button_text_color_hex") }}
                        color={this.state.cart_bar_button_text_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cart_bar_button_text} />
                    </Popover.Section>
                  </Popover>
                }
              />

              <TextField
                label="ATC Background Color"
                value={this.state.cart_bar_background_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "cart_bar_background_color_hex", "cart_bar_background_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={this.state.popover3}
                    activator={activator_cart_bar_background}
                    onClose={() => { this.handlePopover("popover3", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "cart_bar_background_color", "cart_bar_background_color_hex") }}
                        color={this.state.cart_bar_background_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cart_bar_background} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label="ATC Product Title Color"
                value={this.state.cart_bar_productTitle_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "cart_bar_productTitle_color_hex", "cart_bar_productTitle_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={this.state.popover4}
                    activator={activator_cart_bar_productTitle}
                    onClose={() => { this.handlePopover("popover4", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "cart_bar_productTitle_color", "cart_bar_productTitle_color_hex") }}
                        color={this.state.cart_bar_productTitle_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cart_bar_productTitle} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label="ATC Price Color"
                value={this.state.cart_bar_price_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "cart_bar_price_color_hex", "cart_bar_price_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={this.state.popover5}
                    activator={activator_cart_bar_price}
                    onClose={() => { this.handlePopover("popover5", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "cart_bar_price_color", "cart_bar_price_color_hex") }}
                        color={this.state.cart_bar_price_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cart_bar_price} />
                    </Popover.Section>
                  </Popover>
                }
              />
              <TextField
                label="ATC Compare Price Color"
                value={this.state.cart_bar_comparePrice_color_hex || '000000'}
                onChange={(value) => { this.handleOnChangeColor(value, "cart_bar_comparePrice_color_hex", "cart_bar_comparePrice_color") }}
                prefix='#'
                maxLength={6}
                connectedRight={
                  <Popover
                    active={this.state.popover6}
                    activator={activator_cart_bar_comparePrice}
                    onClose={() => { this.handlePopover("popover6", 0) }}
                  >
                    <Popover.Section>
                      <ColorPicker
                        onChange={(value) => { this.handleColors(value, "cart_bar_comparePrice_color", "cart_bar_comparePrice_color_hex") }}
                        color={this.state.cart_bar_comparePrice_color}
                      />
                    </Popover.Section>
                    <Popover.Section>
                      <TextField value={hexcolor_cart_bar_comparePrice} />
                    </Popover.Section>
                  </Popover>
                }
              />
            </InlineGrid>
          </BlockStack>
        </FormLayout>
      </Card>
    );

    const cart_bar_tabs = [
      {
        id: "Mobile Settings",
        content: "Mobile Settings",
        accessibilityLabel: "Mobile Settings",
        panelID: "mobile-page-fitted"
      },
      {
        id: "Desktop Settings",
        content: "Desktop Settings",
        accessibilityLabel: "Desktop Settings",
        panelID: "desktop-page-fitted"
      }
    ];

    const cart_bar_tabs_mobile = [
      {
        id: "Mobile Settings",
        content: "Mobile Settings",
        accessibilityLabel: "Mobile Settings",
        panelID: "mobile-page-fitted"
      }
    ];

    const cart_bar_tabs_desktop = [
      {
        id: "Desktop Settings",
        content: "Desktop Settings",
        accessibilityLabel: "Desktop Settings",
        panelID: "desktop-page-fitted"
      }
    ];

    const content_cart_bar_mobile =
      <Box padding={200}>
        <FormLayout>
          <BlockStack gap={400}>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
            <Select
              label="Add to Cart Bar Position"
              options={this.state.options_position}
              value={this.state.cart_bar_mobile_position}
              onChange={(value) => { this.handleOnChange(value, "cart_bar_mobile_position") }}
            />
            <TextField
              label="Position Offset ( Y )"
              type="number"
              inputMode="numeric"
              min='0'
              autoComplete="off"
              pattern="^[0-9]+"
              value={typeof this.state.data[0] !== 'undefined' ? this.state.cart_bar_mobile_positionOffset.toString() : null}
              onChange={(value) => { this.handleOnChange(value, "cart_bar_mobile_positionOffset") }}
            />
          </InlineGrid>

          <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
            <Checkbox
              label="Hide the ATC when the button is visible"
              checked={this.state.cart_bar_mobile_hide_atc}
              onChange={() => this.handleChange("cart_bar_mobile_hide_atc")}
            />
            <Checkbox
              label="Hide Sticky Bar Button"
              checked={this.state.cart_bar_mobile_hide_stickybarButton}
              onChange={() => this.handleChange("cart_bar_mobile_hide_stickybarButton")}
            />
            {/* <Checkbox
              label="Show full width Sticky Bar Button"
              checked={this.state.cart_bar_mobile_show_full_stickybarButton}
              onChange= {() => this.handleChange("cart_bar_mobile_show_full_stickybarButton")}
            /> */}
            <Checkbox
              label="Show Product Image"
              checked={this.state.cart_bar_mobile_show_productImage}
              onChange={() => this.handleChange("cart_bar_mobile_show_productImage")}
            />
            <Checkbox
              label="Show Product Title"
              checked={this.state.cart_bar_mobile_show_productTitle}
              onChange={() => this.handleChange("cart_bar_mobile_show_productTitle")}
            />
            <Checkbox
              label="Show Review Stars"
              checked={this.state.cart_bar_mobile_show_reviewStarts}
              onChange={() => this.handleChange("cart_bar_mobile_show_reviewStarts")}
            />
            <Checkbox
              label="Show Variant select"
              checked={this.state.cart_bar_mobile_show_variantSelect}
              onChange={() => this.handleChange("cart_bar_mobile_show_variantSelect")}
            />
            <Checkbox
              label="Show Quantity select"
              checked={this.state.cart_bar_mobile_show_quantitySelect}
              onChange={() => this.handleChange("cart_bar_mobile_show_quantitySelect")}
            />
            <Checkbox
              label="Show Price"
              checked={this.state.cart_bar_mobile_show_price}
              onChange={() => this.handleChange("cart_bar_mobile_show_price")}
            />
            <Checkbox
              label="Show Compare Price"
              checked={this.state.cart_bar_mobile_show_comparePrice}
              onChange={() => this.handleChange("cart_bar_mobile_show_comparePrice")}
            />

          </InlineGrid>
          </BlockStack>
        </FormLayout>
      </Box>;
    const content_cart_bar_desktop =
      <Box padding={200}>
        <FormLayout>
          <BlockStack gap={400}>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Select
                label="Add to Cart Bar Position"
                options={this.state.options_position}
                value={this.state.cart_bar_desktop_position}
                onChange={(value) => { this.handleOnChange(value, "cart_bar_desktop_position") }}
              />
              <TextField
                label="Position Offset ( Y )"
                type="number"
                inputMode="numeric"
                min='0'
                autoComplete="off"
                pattern="^[0-9]+"
                value={typeof this.state.data[0] !== 'undefined' ? this.state.cart_bar_desktop_positionOffset.toString() : null}
                onChange={(value) => { this.handleOnChange(value, "cart_bar_desktop_positionOffset") }}
              />
            </InlineGrid>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
              <Checkbox
                label="Hide the ATC bar when the ATC button is visible"
                checked={this.state.cart_bar_desktop_hide_atc}
                onChange={() => this.handleChange("cart_bar_desktop_hide_atc")}
              />
              <Checkbox
                label="Hide Sticky Bar Button"
                checked={this.state.cart_bar_desktop_hide_stickybarButton}
                onChange={() => this.handleChange("cart_bar_desktop_hide_stickybarButton")}
              />
              <Checkbox
                label="Show Product Image"
                checked={this.state.cart_bar_desktop_show_productImage}
                onChange={() => this.handleChange("cart_bar_desktop_show_productImage")}
              />
              <Checkbox
                label="Show Product Title"
                checked={this.state.cart_bar_desktop_show_productTitle}
                onChange={() => this.handleChange("cart_bar_desktop_show_productTitle")}
              />
              <Checkbox
                label="Show Review Stars"
                checked={this.state.cart_bar_desktop_show_reviewStars}
                onChange={() => this.handleChange("cart_bar_desktop_show_reviewStars")}
              />
              <Checkbox
                label="Show Variant select"
                checked={this.state.cart_bar_desktop_show_variantSelect}
                onChange={() => this.handleChange("cart_bar_desktop_show_variantSelect")}
              />
              <Checkbox
                label="Show Quantity select"
                checked={this.state.cart_bar_desktop_show_quantitySelect}
                onChange={() => this.handleChange("cart_bar_desktop_show_quantitySelect")}
              />
              <Checkbox
                label="Show Price"
                checked={this.state.cart_bar_desktop_show_price}
                onChange={() => this.handleChange("cart_bar_desktop_show_price")}
              />
              <Checkbox
                label="Show Compare Price"
                checked={this.state.cart_bar_desktop_show_comparePrice}
                onChange={() => this.handleChange("cart_bar_desktop_show_comparePrice")}
              />
            </InlineGrid>
          </BlockStack>      
        </FormLayout>
      </Box>;

    const demo = this.state.cart_bar_show_mobile && this.state.cart_bar_show_desktop == 0 ?
      content_cart_bar_mobile :
      this.state.cart_bar_show_mobile == 0 && this.state.cart_bar_show_desktop ?
        content_cart_bar_desktop :
        null;


    const content_tabs = this.state.cart_bar_tabs_selected === 0 ? content_cart_bar_mobile : content_cart_bar_desktop;

    const cart_bar_settings = (
      <Card roundedAbove="xs">
        <BlockStack gap="200">
          <Text as="h1" variant="headingMd">
            Sticky Bar Settings
          </Text>
          <InlineGrid gap={200} columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
            <Checkbox
              label="Show on tablets and mobile devices"
              checked={this.state.cart_bar_show_mobile}
              onChange={() => this.handleChange("cart_bar_show_mobile")}
            />
            <Checkbox
              label="Show on desktop computers"
              checked={this.state.cart_bar_show_desktop}
              onChange={() => this.handleChange("cart_bar_show_desktop")}
            />
          </InlineGrid>

          {this.state.cart_bar_show_mobile == 0 && this.state.cart_bar_show_desktop == 0 ?
            null :
            <Tabs
              tabs={
                this.state.cart_bar_show_mobile && this.state.cart_bar_show_desktop ?
                  cart_bar_tabs :
                  this.state.cart_bar_show_mobile && this.state.cart_bar_show_desktop == 0 ?
                    cart_bar_tabs_mobile :
                    this.state.cart_bar_show_mobile == 0 && this.state.cart_bar_show_desktop ?
                      cart_bar_tabs_desktop :
                      [
                        {

                        }
                      ]
              }
              selected={this.state.cart_bar_tabs_selected}
              onSelect={
                this.state.cart_bar_show_mobile && this.state.cart_bar_show_desktop ?
                  () => this.handleChange("cart_bar_tabs_selected") :
                  this.state.cart_bar_show_mobile && this.state.cart_bar_show_desktop == 0 ?
                    () => ({}) :
                    this.state.cart_bar_show_mobile == 0 && this.state.cart_bar_show_desktop ?
                      () => ({}) : () => ({})
              }
              fitted
            />
          }
          {this.state.cart_bar_show_mobile && this.state.cart_bar_show_desktop ?
            content_tabs : demo}
        </BlockStack>
      </Card>
    );

    const toastMarkup = this.state.toastMarkup ? <Toast content="Cart-Bar updated successfully!" onDismiss={() => { this.handlePopover("toastMarkup", 0) }} duration={2500} /> : null;
    const toastValidate = this.state.toastValidate ? <Toast content="Add product to display on home page." onDismiss={() => { this.handlePopover("toastValidate", 0) }} duration={2500} /> : null;
    const toastError = this.state.toastError ? <Toast content={this.state.messageError} error onDismiss={() => { this.handlePopover("toastError", 0) }} duration={2500} /> : null;

    const banner_hidden_cart_bar = 
      <div className='bannerHs'>
        <Banner
          title="Cart Bar Hidden"
          tone="info"
        >
          <BlockStack gap="500">
            <p>
              To hide the add to cart bar you will have to add the following tag to the product: <Text fontWeight='medium' variant="bodyLg" as="span"><InlineCode> {"HS_CART_BAR_HIDDEN_PRODUCT"}</InlineCode></Text>
            </p>
          </BlockStack>
        </Banner>
      </div>;


    const cartBarToogle =
      <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
          <label htmlFor="hs-active">
            <Text as="p" fontWeight="medium" tone={this.state.enabled_cart_bar ? "success" : 'critical'}>The Cart Bar is {this.state.enabled_cart_bar ? 'enabled' : 'disabled'}.</Text>
          </label>
        </InlineStack>
      </InlineStack>;

    const actionMarkup = (
      <Button
        role="switch"
        id="hs-active"
        ariaChecked={this.state.enabled_cart_bar ? 'false' : 'true'}
        onClick={() => this.toggleIsDirty("enabled_cart_bar")}
        size="slim"
        variant="primary"
        tone={!this.state.enabled_cart_bar ? "success" : "critical"}
      >
        {!this.state.enabled_cart_bar ? "Turn on" : "Turn off"}
      </Button>
    );
    return (
      typeof this.state.data[0] === 'undefined' ? <SkeletonLoad></SkeletonLoad> :
        <div>
          {loading}
          {/*  {<BannerHead {...this.props}/>} */}
          <BlockStack gap="500">
            <Card roundedAbove="xs">
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
                        {cartBarToogle}
                        <Box minWidth="fit-content">
                          <InlineStack align="end">{actionMarkup}</InlineStack>
                        </Box>
                      </InlineStack>
                    </Box>
                  </BlockStack>
                </Box>
              </BlockStack>
            </Card>
            {/* <Collapsible
              open={this.state.enabled_cart_bar}
              id="basic-collapsible"
              transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
            >
            </Collapsible> */}
            <Box paddingBlockEnd="400">
              <BlockStack gap="500">
                {banner_hidden_cart_bar}
                {home}
                {cart_bar}
                {cart_bar_settings}
              </BlockStack>
            </Box>
            {contextualSaveBarMarkup}
            {toastValidate}
            {toastMarkup}
            {toastError}
            <ResourcePicker
              resourceType="Product"
              selectMultiple={false}
              showVariants={false}
              open={this.state.resourcePicker}
              onSelection={(resources) => this.handleSelection(resources)}
              onCancel={() => this.setState({ resourcePicker: false })}
            />
          </BlockStack>
        </div>
    )
  }
  handleOnChange = (value, second) => {
    var validatenum = /^[0-9]+/;
    var validatenumResult = validatenum.test(value);
    if (second === 'cart_bar_mobile_positionOffset') {
      if (value.length > 10) {
        return false;
      }
      if (value < 0 || validatenumResult == false) {
        this.setState({ cart_bar_mobile_positionOffset: '' });
      } else {
        this.setState({ cart_bar_mobile_positionOffset: value });
      }
    } else if (second === 'cart_bar_desktop_positionOffset') {
      if (value.length > 10) {
        return false;
      }
      if (value < 0 || validatenumResult == false) {
        this.setState({ cart_bar_desktop_positionOffset: '' });
      } else {
        this.setState({ cart_bar_desktop_positionOffset: value });
      }
    }
    else {
      if (value.length > 250) {
        return false;
      }
      this.setState({ [second]: value });
    }
  };
  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val })
  };
  handleColors = (value, colorhsb, colorhex) => {
    this.setState({ [colorhsb]: value, [colorhex]: hsbToHex(value).replace(/\#/, "") });
  };
  handleOnChangeColor = (value, hex, hsb) => {
    const hextorgb = hexToRgb('#'+value);
    const rgbtohsb = rgbToHsb({red:hextorgb.red, green:hextorgb.green, blue: hextorgb.blue})
    this.setState({
      [hex]: value,
      [hsb]: {
        hue: rgbtohsb.hue,
        saturation: rgbtohsb.saturation,
        brightness: rgbtohsb.brightness
      }
    })
  };
  toggleIsDirty = (toggle) => {
    const isDirty = this.state[`${toggle}`];
    let this_state = isDirty == 1 ? false : true;
    if (isDirty == 1) {
      this.setState({ [`${toggle}`]: 0, });
      this.props.updateGridItemsAddOns({ cart_bar: false });
    } else {
      this.setState({ [`${toggle}`]: 1, });
      this.props.updateGridItemsAddOns({ cart_bar: true });
    };
  };
  getGraphql = async (/* idsFromResources */resources) => {
    /* console.log(idsFromResources) */
    var id = resources.selection[0].id;
    if (this.state.data[0].cart_bar_product_shopify_id === id) {
      this.setState({
        graphqlProduct: [],
        cart_bar_product_shopify_id: this.state.data[0].cart_bar_product_shopify_id,
        cart_bar_product_shopify_handle: this.state.data[0].cart_bar_product_shopify_handle,
        cart_bar_product_shopify_title: this.state.data[0].cart_bar_product_shopify_title,
        cart_bar_product_shopify_originalSrc: this.state.data[0].cart_bar_product_shopify_originalSrc,
        spinnerProduct: false
      })
    } else {
      this.setState({
        graphqlProduct: resources.selection,
        cart_bar_product_shopify_id: id,
        cart_bar_product_shopify_handle: resources.selection[0].handle,
        cart_bar_product_shopify_title: resources.selection[0].title,
        //cart_bar_product_shopify_originalSrc: response.nodes[0].images.edges[0].node.originalSrc,
        cart_bar_product_shopify_originalSrc: resources.selection[0].images.length > 0 ? resources.selection[0].images[0].originalSrc : 'https://cdn.shopify.com/s/files/1/3067/1988/t/11/assets/hs-no-image.gif',
        spinnerProduct: false
      })

      /* const arr_ids = {
        ids: idsFromResources
      };
      const app = this.context;
      const method = 'POST';
      await makePutPostRequest('/getSettingsGraphql', method, arr_ids, app).then(response => {
        if (response) {
          this.setState({
            graphqlProduct: response.nodes,
            cart_bar_product_shopify_id: response.nodes[0].id,
            cart_bar_product_shopify_handle: response.nodes[0].handle,
            cart_bar_product_shopify_title: response.nodes[0].title,
            //cart_bar_product_shopify_originalSrc: response.nodes[0].images.edges[0].node.originalSrc,
            cart_bar_product_shopify_originalSrc: response.nodes[0].images.edges.length > 0 ? response.nodes[0].images.edges[0].node.originalSrc : 'https://cdn.shopify.com/s/files/1/3067/1988/t/11/assets/hs-no-image.gif',
            spinnerProduct: false
          })
        }
      }).catch(err => {
        this.notifyError(err, 'PostGraph');
      }); */
    }
  };
  handleChange = (id) => {
    var validate = this.state[id];
    if (validate) {
      validate = 0;
    } else {
      validate = 1;
    }
    this.setState({ [id]: validate });
  };
  handleSelection = (resources) => {
    this.setState({ resourcePicker: false, spinnerProduct: true });
    /* const idsFromResources = resources.selection.map((product) => product.id);
    this.getGraphql(idsFromResources); */
    this.getGraphql(resources);
  };
  notifyError = (err, name) => {
    switch (name) {
      case 'updateCartBar':
        this.setState({ toastError: true, messageError: JSON.stringify(err) });
        break;
    }
  };
}

export default withTranslation()(CartBar);