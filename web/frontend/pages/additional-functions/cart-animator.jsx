import React from 'react';
import { TitleBar } from '@shopify/app-bridge/actions';
import {
  Collapsible,
  InlineGrid,
  Toast,
  Badge,
  InlineStack,
  Box,
  Card,
  Select,
  Button,
  FormLayout,
  BlockStack,
  Divider,
  Text,
} from "@shopify/polaris";
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { SkeletonLoad } from '../../components';
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';
//import BannerHead from '../components/BannerHead';
//import Skeleton from '../components/Skeleton';
class CartAnimator extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      toastMarkup: null,
      toastError: null,
      messageError: '',
      arr_options_animation: [],
      arr_options_time: [],
      enabled_cart_animator: null,
      cart_animator_add_cart_button: null,
      cart_animator_add_cart_button_time: null,
      cart_animator_sticky_bar_button: null,
      cart_animator_sticky_bar_button_time: null,
      cart_animator_sticky_cart_button: null,
      cart_animator_sticky_cart_button_time: null,
      cart_animator_quick_buy_button: null,
      cart_animator_quick_buy_button_time: null,
      cart_animator_checkout_button: null,
      cart_animator_checkout_button_time: null
    };
  };

  getCartAnimatorData = async () => {
    const app = this.context;
    const data = await makeGetRequest('/api/get_cart_animator', app);
    if (data.dataCartAnimator && Object.keys(data).length > 0 && data.dataCartAnimator !== undefined && data.dataCartAnimator !== null) {
      /*  const statusPlan =  data.statusPlan.data[0].status;
       if(statusPlan == 0){
         const redirect = Redirect.create(app);
         redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
         return false;
       }; */
      var arr_options_animation = [
        { label: 'None', value: 'none' },
        { label: 'Bounce', value: 'bounce' },
        { label: 'Flash', value: 'flash' },
        { label: 'Pulse', value: 'pulse' },
        { label: 'Rubber band', value: 'rubberBand' },
        { label: 'Shake', value: 'shake' },
        { label: 'Swing', value: 'swing' },
        { label: 'Tada', value: 'tada' },
        { label: 'Wobble', value: 'wobble' },
        { label: 'Jello', value: 'jello' },
      ];
      var arr_options_time = []
      for (let i = 1; i <= 20; i++) {
        arr_options_time.push(
          { label: i + (i == 1 ? ' second' : ' seconds'), value: i.toString() }
        );
      };
      const cartAnimator = data.dataCartAnimator[0];
      this.setState({
        data: data,
        loading: false,
        arr_options_animation: arr_options_animation,
        arr_options_time: arr_options_time,
        enabled_cart_animator: cartAnimator.enabled_cart_animator,
        cart_animator_add_cart_button: cartAnimator.cart_animator_add_cart_button,
        cart_animator_add_cart_button_time: cartAnimator.cart_animator_add_cart_button_time.toString(),
        cart_animator_sticky_bar_button: cartAnimator.cart_animator_sticky_bar_button,
        cart_animator_sticky_bar_button_time: cartAnimator.cart_animator_sticky_bar_button_time.toString(),
        cart_animator_sticky_cart_button: cartAnimator.cart_animator_sticky_cart_button,
        cart_animator_sticky_cart_button_time: cartAnimator.cart_animator_sticky_cart_button_time.toString(),
        cart_animator_quick_buy_button: cartAnimator.cart_animator_quick_buy_button,
        cart_animator_quick_buy_button_time: cartAnimator.cart_animator_quick_buy_button_time.toString(),
        cart_animator_checkout_button: cartAnimator.cart_animator_checkout_button,
        cart_animator_checkout_button_time: cartAnimator.cart_animator_checkout_button_time.toString(),
      });
      //this.titles();
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

  titles = () => {
    const app = this.context;
    const datas = { title: 'Cart Animator' };
    const titleBarOptions = {
      title: datas.title
    };
    TitleBar.create(app, titleBarOptions);
  };

  validateData = () => {
    const w = this.state;
    const stateData = {
      enabled_cart_animator: w.enabled_cart_animator,
      cart_animator_add_cart_button: w.cart_animator_add_cart_button,
      cart_animator_add_cart_button_time: w.cart_animator_add_cart_button_time,
      cart_animator_sticky_bar_button: w.cart_animator_sticky_bar_button,
      cart_animator_sticky_bar_button_time: w.cart_animator_sticky_bar_button_time,
      cart_animator_sticky_cart_button: w.cart_animator_sticky_cart_button,
      cart_animator_sticky_cart_button_time: w.cart_animator_sticky_cart_button_time,
      cart_animator_quick_buy_button: w.cart_animator_quick_buy_button,
      cart_animator_quick_buy_button_time: w.cart_animator_quick_buy_button_time,
      cart_animator_checkout_button: w.cart_animator_checkout_button,
      cart_animator_checkout_button_time: w.cart_animator_checkout_button_time
    };
    const posts = this.state.data.dataCartAnimator;
    if (typeof posts !== 'undefined') {
      const ps = posts[0];
      const arr2 = {
        enabled_cart_animator: ps.enabled_cart_animator,
        cart_animator_add_cart_button: ps.cart_animator_add_cart_button,
        cart_animator_add_cart_button_time: ps.cart_animator_add_cart_button_time.toString(),
        cart_animator_sticky_bar_button: ps.cart_animator_sticky_bar_button,
        cart_animator_sticky_bar_button_time: ps.cart_animator_sticky_bar_button_time.toString(),
        cart_animator_sticky_cart_button: ps.cart_animator_sticky_cart_button,
        cart_animator_sticky_cart_button_time: ps.cart_animator_sticky_cart_button_time.toString(),
        cart_animator_quick_buy_button: ps.cart_animator_quick_buy_button,
        cart_animator_quick_buy_button_time: ps.cart_animator_quick_buy_button_time.toString(),
        cart_animator_checkout_button: ps.cart_animator_checkout_button,
        cart_animator_checkout_button_time: ps.cart_animator_checkout_button_time.toString()
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
    const posts = this.state.data.dataCartAnimator[0];
    this.setState({
      loading: false,
      enabled_cart_animator: posts.enabled_cart_animator,
      cart_animator_add_cart_button: posts.cart_animator_add_cart_button,
      cart_animator_add_cart_button_time: posts.cart_animator_add_cart_button_time.toString(),
      cart_animator_sticky_bar_button: posts.cart_animator_sticky_bar_button,
      cart_animator_sticky_bar_button_time: posts.cart_animator_sticky_bar_button_time.toString(),
      cart_animator_sticky_cart_button: posts.cart_animator_sticky_cart_button,
      cart_animator_sticky_cart_button_time: posts.cart_animator_sticky_cart_button_time.toString(),
      cart_animator_quick_buy_button: posts.cart_animator_quick_buy_button,
      cart_animator_quick_buy_button_time: posts.cart_animator_quick_buy_button_time.toString(),
      cart_animator_checkout_button: posts.cart_animator_checkout_button,
      cart_animator_checkout_button_time: posts.cart_animator_checkout_button_time.toString()
    });
    this.props.updateGridItemsAddOns({ cart_animator: posts.enabled_cart_animator });
  };

  save = async () => {
    this.setState({
      loading: true
    });
    const {
      enabled_cart_animator,
      cart_animator_add_cart_button,
      cart_animator_add_cart_button_time,
      cart_animator_sticky_bar_button,
      cart_animator_sticky_bar_button_time,
      cart_animator_sticky_cart_button,
      cart_animator_sticky_cart_button_time,
      cart_animator_quick_buy_button,
      cart_animator_quick_buy_button_time,
      cart_animator_checkout_button,
      cart_animator_checkout_button_time
    } = this.state

    const requestBody = {
      enabled_cart_animator: enabled_cart_animator,
      cart_animator_add_cart_button: cart_animator_add_cart_button,
      cart_animator_add_cart_button_time: cart_animator_add_cart_button_time,
      cart_animator_sticky_bar_button: cart_animator_sticky_bar_button,
      cart_animator_sticky_bar_button_time: cart_animator_sticky_bar_button_time,
      cart_animator_sticky_cart_button: cart_animator_sticky_cart_button,
      cart_animator_sticky_cart_button_time: cart_animator_sticky_cart_button_time,
      cart_animator_quick_buy_button: cart_animator_quick_buy_button,
      cart_animator_quick_buy_button_time: cart_animator_quick_buy_button_time,
      cart_animator_checkout_button: cart_animator_checkout_button,
      cart_animator_checkout_button_time: cart_animator_checkout_button_time
    };

    const method = 'PUT';
    const app = this.context;
    await makePutPostRequest('/api/cart_animator', method, requestBody, app).then(response => {
      if (response) {
        this.getCartAnimatorData();
        this.setState({ toastMarkup: true });
      };
    }).catch(err => {
      this.notifyError(err, 'updateCartAnimator');
    });
  };

  async componentDidMount() {
    this.getCartAnimatorData();
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  };

  render() {
    const {
      data,
      loading,
      arr_options_animation,
      arr_options_time,
      enabled_cart_animator,
      cart_animator_add_cart_button,
      cart_animator_add_cart_button_time,
      cart_animator_sticky_bar_button,
      cart_animator_sticky_bar_button_time,
      cart_animator_sticky_cart_button,
      cart_animator_sticky_cart_button_time,
      cart_animator_quick_buy_button,
      cart_animator_quick_buy_button_time,
      cart_animator_checkout_button,
      cart_animator_checkout_button_time
    } = this.state

    const loadingPage = loading ? (
      <div>
        <Loading />
      </div>
    ) : null;

    var active = this.validateData();
    const contextualSaveBarMarkup = !active ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          loading: loading,
          onAction: () => this.save(),
        }}
        discardAction={{
          onAction: () => this.discard(),
        }}
        visible
        alignContentFlush
        fullWidth={true}
      />
    ) : null;
    const cartAnimator =
      <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
        {/* <BlockStack gap={500}> */}
        <Card>
          <BlockStack gap={500}>
            <Text as="h1" variant="headingMd">
              Add To Cart Button
            </Text>
            <BlockStack gap={500} align='center' inlineAlign="center">
              <div className={'hs-animated ' + 'Hs' + cart_animator_add_cart_button}>
                <Button disabled>{cart_animator_add_cart_button}</Button>
              </div>
            </BlockStack>
            <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Select
                label="Animation:"
                options={arr_options_animation}
                value={cart_animator_add_cart_button}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_add_cart_button") }}
              />
              <Select
                label="Time:"
                options={arr_options_time}
                value={cart_animator_add_cart_button_time}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_add_cart_button_time") }}
                disabled={cart_animator_add_cart_button === 'none' ? true : false}
              />
            </InlineGrid>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={500}>
            <Text as="h1" variant="headingMd">
              Sticky Bar Button
            </Text>
            <BlockStack gap={500} align='center' inlineAlign="center">
              <div className={'hs-animated ' + 'Hs' + cart_animator_sticky_bar_button}>
                <Button disabled>{cart_animator_sticky_bar_button}</Button>
              </div>
            </BlockStack>
            <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Select
                label="Animation:"
                options={arr_options_animation}
                value={cart_animator_sticky_bar_button}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_sticky_bar_button") }}
              />
              <Select
                label="Time:"
                options={arr_options_time}
                value={cart_animator_sticky_bar_button_time}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_sticky_bar_button_time") }}
                disabled={cart_animator_sticky_bar_button === 'none' ? true : false}
              />
            </InlineGrid>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={500}>
            <Text as="h1" variant="headingMd">
              Sticky Cart Button
            </Text>
            <BlockStack gap={500} align='center' inlineAlign="center">
              <div className={'hs-animated ' + 'Hs' + cart_animator_sticky_cart_button}>
                <Button disabled>{cart_animator_sticky_cart_button}</Button>
              </div>
            </BlockStack>
            <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Select
                label="Animation:"
                options={arr_options_animation}
                value={cart_animator_sticky_cart_button}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_sticky_cart_button") }}
              />
              <Select
                label="Time:"
                options={arr_options_time}
                value={cart_animator_sticky_cart_button_time}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_sticky_cart_button_time") }}
                disabled={cart_animator_sticky_cart_button === 'none' ? true : false}
              />
            </InlineGrid>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={500}>
            <Text as="h1" variant="headingMd">
              Quick Buy Button
            </Text>
            <BlockStack gap={500} align='center' inlineAlign="center">
              <div className={'hs-animated ' + 'Hs' + cart_animator_quick_buy_button}>
                <Button size='large' disabled>{cart_animator_quick_buy_button}</Button>
              </div>
            </BlockStack>
            <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Select
                label="Animation"
                options={arr_options_animation}
                value={cart_animator_quick_buy_button}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_quick_buy_button") }}
              />
              <Select
                label="Time:"
                options={arr_options_time}
                value={cart_animator_quick_buy_button_time}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_quick_buy_button_time") }}
                disabled={cart_animator_quick_buy_button === 'none' ? true : false}
              />
            </InlineGrid>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={500}>
            <Text as="h1" variant="headingMd">
              Checkout Button
            </Text>
            <BlockStack gap={500} align='center' inlineAlign="center">
              <div className={'hs-animated ' + 'Hs' + cart_animator_checkout_button}>
                <Button size='large' disabled>{cart_animator_checkout_button}</Button>
              </div>
            </BlockStack>
            <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
              <Select
                label="Animation:"
                options={arr_options_animation}
                value={cart_animator_checkout_button}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_checkout_button") }}
              />
              <Select
                label="Time:"
                options={arr_options_time}
                value={cart_animator_checkout_button_time}
                onChange={(value) => { this.handleOnChange(value, "cart_animator_checkout_button_time") }}
                disabled={cart_animator_checkout_button === 'none' ? true : false}
              />
            </InlineGrid>
          </BlockStack>
        </Card>
        {/* </BlockStack> */}
      </InlineGrid>;

    const toastMarkup = this.state.toastMarkup ? <Toast content="Cart Animator updated successfully!" onDismiss={() => { this.handlePopover("toastMarkup", 0) }} duration={2500} /> : null;
    const toastError = this.state.toastError ? <Toast content={this.state.messageError} error onDismiss={() => { this.handlePopover("toastError", 0) }} duration={2500} /> : null;

    const cartAnimatorStatusMarkup = (
      <Badge
        tone={this.state.enabled_cart_animator ? 'success' : 'critical'}
        toneAndProgressLabelOverride={`Quick Buy is ${this.state.enabled_cart_animator ? "On" : "Off"}`}
      >
        {this.state.enabled_cart_animator ? "On" : "Off"}
      </Badge>
    );

    const cartAnimatorToogle =
      <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
          <label htmlFor="hs-active">
            <Text as="p" fontWeight="medium" tone={this.state.enabled_cart_animator ? "success" : 'critical'}>The Cart Animator is {this.state.enabled_cart_animator ? 'enabled' : 'disabled'}.</Text>
          </label>
          <InlineStack gap="200" align="center" blockAlign="center">
            {cartAnimatorStatusMarkup}
          </InlineStack>
        </InlineStack>
      </InlineStack>;

    const actionMarkup = (
      <Button
        role="switch"
        id="hs-active"
        ariaChecked={this.state.enabled_cart_animator ? 'false' : 'true'}
        onClick={() => this.toggleIsDirty("enabled_cart_animator")}
        size="slim"
        variant="primary"
        tone={this.state.enabled_cart_animator ? "critical" : "success"}
      >
        {this.state.enabled_cart_animator ? "Turn off" : "Turn on"}
      </Button>
    );
    return typeof data.dataCartAnimator === 'undefined' ? <SkeletonLoad></SkeletonLoad> :
      <div>
        {loadingPage}
        {/* {<BannerHead {...this.props}/>} */}
        {/* <Layout>
                <Layout.AnnotatedSection
                >
                    <SettingToggle
                        action={{
                            content: enabled_cart_animator ? 'Disable' : 'Enabled',
                            onAction: () => this.toggleIsDirty("enabled_cart_animator"),
                        }}
                        enabled={enabled_cart_animator}
                    >
                        The Cart Animator is  <Text variant="bodyMd" as="span" fontWeight="semibold">{enabled_cart_animator ? 'enabled' : 'disable'}.</Text>
                    </SettingToggle>
                    {contextualSaveBarMarkup}
                    {cartAnimator}
                    {toastMarkup}
                    {toastError}
                </Layout.AnnotatedSection>
            </Layout> */}
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
                      {cartAnimatorToogle}
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
            open={this.state.enabled_cart_animator}
            id="basic-collapsible"
            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
          >
            <BlockStack gap="500">
              {cartAnimator}
            </BlockStack>
          </Collapsible> */}
          <Box paddingBlockEnd="400">
            {cartAnimator}
          </Box>
          {contextualSaveBarMarkup}
          {toastMarkup}
          {toastError}
        </BlockStack>
      </div>;
  }

  toggleIsDirty = (toggle) => {
    const isDirty = this.state[`${toggle}`];
    if (isDirty == 1) {
      this.setState({ [`${toggle}`]: 0, });
      this.props.updateGridItemsAddOns({ cart_animator: false });
    } else {
      this.setState({ [`${toggle}`]: 1, });
      this.props.updateGridItemsAddOns({ cart_animator: true });
    }
  };

  handleOnChange = (value, second) => {
    this.setState({ [second]: value });
  };

  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val })
  };

  notifyError = (err, name) => {
    switch (name) {
      case 'updateCartAnimator':
        this.setState({ toastError: true, messageError: JSON.stringify(err) });
        break;
    }
  };

}

export default CartAnimator;