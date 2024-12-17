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
  SkeletonTabs,
  BlockStack,
  InlineGrid,
  InlineStack,
  rgbToHsb,
  hsbToHex
} from '@shopify/polaris';

import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';

//import CustomizeUpsells from '@components/CustomizeUpsells'
import { Toogle, SaveBar, Titles, SkeletonSimple } from "@components/";
import { makeGetRequest, makePutPostRequest } from '@utils/Services';


class Settings extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      dataSettings: null,

      enabled_desktop: null,
      enabled_mobile: null,
      loading: true,
      toast: false,
      messageError: '',
      /* contentStatus_cartEmpty: null,
      textStatus_cartEmpty: null,
      isDirty_cart_empty: null, */
    }
  };

  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val, toast: false })
  };

  discard = () => {
    var c = this.state.dataSettings;
    this.originalData(1, c);
  };

  originalData = (identify, data) => {
    var myData = {};
    if (!identify) {
      myData = {
        dataSettings: data
      };
    };
    const settings = data.settings;

    var stateData = {
      messageError: '',
      loading: false,
      toast: false,
      enabled_desktop: settings.enabled_desktop,
      enabled_mobile: settings.enabled_mobile,
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

  getSettings = async () => {
    const app = this.context;
    const data = await makeGetRequest('/api/get_settings', app);
    if (data && data.settings !== undefined && data.settings !== null) {
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
        enabled_desktop: props.enabled_desktop,
        enabled_mobile: props.enabled_mobile,
      };
      const method = 'PUT';
      const app = this.context;
      const updateSettings = await makePutPostRequest('/api/settings', method, requestBody, app);
      var messageError = '';
      if (updateSettings.error && updateSettings.message) {
        messageError = updateSettings.message;
      };
      await this.getSettings();
      this.setState({ toast: true, messageError: messageError })
    }
  };
  componentDidMount() {
    this.getSettings();
  };

  onChanges = (state, newValue) => {
    this.setState({ [state]: newValue, toast: false });
  };

  validateData = (props) => {
    var thisEquals = true;
    const stateData = {
      enabled_desktop: !!+props.enabled_desktop,
      enabled_mobile: !!+props.enabled_mobile,
    };

    const myDataSettings = this.state.dataSettings;
    if (myDataSettings !== null) {
      const settings = myDataSettings.settings;
      const dataSettings = {
        enabled_desktop: !!+settings.enabled_desktop,
        enabled_mobile: !!+settings.enabled_mobile,
      }
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const a = dataSettings;
      const b = stateData;
      if (!equals(a, b)) {
        thisEquals = false;
      };
    };
    return thisEquals;
  };
  render() {
    const { dataSettings, enabled_desktop, enabled_mobile, loading, toast, messageError } = this.state;
    var equals = this.validateData(this.state);

    //console.log(cartEmpty_tabs)
    const ThisToast = () => {
      return (
        toast ?
          messageError ?
            <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
            <Toast content="Settings updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
          null
      );
    };


    const skeletonCustom = <div>
      <Frame>
        <Loading active={loading} />
        <BlockStack gap={500}>
          <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
            <SkeletonSimple />
            <SkeletonSimple />
          </InlineGrid>
        </BlockStack>
      </Frame>
    </div>;

    const loadingComponent = loading ? <Loading /> : null;
    return (
      <div>
      {loadingComponent}
      {dataSettings !== null ?
          <BlockStack gap={500}>
            <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
              <Toogle enabled={enabled_desktop} title='Desktop' description='Enable or disable the app for desktop users.' stateText='The Slide Cart in desktop is' activeToogle={() => this.changeStateBoolean('enabled_desktop')} />
              <Toogle enabled={enabled_mobile} title='Mobile' description='Enable or disable the app for mobile users.' stateText='The Slide Cart in mobile is' activeToogle={() => this.changeStateBoolean('enabled_mobile')} />
            </InlineGrid>
          </BlockStack>
         : skeletonCustom}
        <ThisToast />
        <SaveBar equals={equals} loading={loading} action={() => { this.updateSettings(this.state) }} discard={() => { this.discard() }} />
         </div>
    );

  }
  changeStateBoolean = (thisSate) => {
    var stateNow = this.state[thisSate];
    this.setState({ [thisSate]: !stateNow, toast: false });
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


}
export default (Settings);