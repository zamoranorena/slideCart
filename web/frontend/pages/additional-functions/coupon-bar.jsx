import React from 'react';
import {TitleBar} from '@shopify/app-bridge/actions';
import {
  Collapsible,
  InlineStack,
  BlockStack,
  InlineGrid,
  Box,
  Toast,
  Card,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  Button,
  Popover,
  ColorPicker,
  hexToRgb,
  hsbToHex,
  rgbToHsb,
  Badge,
  Text,
  InlineCode,
} from "@shopify/polaris";
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import {Redirect} from '@shopify/app-bridge/actions';
import { SkeletonLoad } from '../../components';
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';
//import colorconvert from 'color-convert';
//import BannerHead from '../components/BannerHead';
//import Skeleton from '../components/Skeleton';

class CouponBar extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      loading:false,
      toastMarkup:null,
      toastError:null,
      arr_options_minutes:[],
      arr_options_position:[],
      arr_options_transform:[],
      arr_options_font_size:[],
      arr_options_weight:[],
      arr_options_alignment:[],
      popover1:null,
      popover2:null,
      popover3:null,
      enabled_coupon_bar:null,
      coupon_bar_timer:null,
      coupon_bar_position:null,
      coupon_bar_text:null,
      coupon_bar_text_expire:null,
      coupon_bar_hours:null,
      coupon_bar_minutes:null,
      coupon_bar_seconds:null,
      coupon_bar_clear_offer:null,
      coupon_bar_background_color:{
        hue:null,
        saturation:null,
        brightness:null
      },
      coupon_bar_background_color_hex:null,
      coupon_bar_font_color:{
        hue:null,
        saturation:null,
        brightness:null
      },
      coupon_bar_font_color_hex:null,
      coupon_bar_font_size:null,
      coupon_bar_text_transform:null,
      coupon_bar_font_weight:null,
      coupon_bar_text_alignment:null,
    };
  };
  getCouponBarData = async () =>{
    const app = this.context;
    const data = await makeGetRequest('/api/get_coupon_bar',app);
    if (data.dataCouponBar && Object.keys(data).length > 0 && data.dataCouponBar !== undefined && data.dataCouponBar !== null ){
      /* const statusPlan =  data.statusPlan.data[0].status;
      if(statusPlan == 0){
      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
      return false;
      }; */
      var arr_options_minutes = []
        for (let i = 1; i <= 360; i++) {
          arr_options_minutes.push(
            {label: i+' Minutes', value: i.toString()}
          );
        };
      var arr_options_position = [
        {label: 'Static', value: '0'},
        {label: 'Fixed', value: '1'}
      ];
      var arr_options_transform = [
        {label: 'none', value: 'none'},
        {label: 'capitalize', value: 'capitalize'},
        {label: 'uppercase', value: 'uppercase'},
        {label: 'lowercase', value: 'lowercase'},
        {label: 'initial', value: 'initial'},
        {label: 'inherit', value: 'inherit'}
      ];
      var arr_options_weight = [
        {label: 'normal', value: 'normal'},
        {label: 'bold', value: 'bold'},
        {label: 'lighter', value: 'lighter'},
        {label: 'bolder', value: 'bolder'},
        {label: '100', value: '100'},
        {label: '200', value: '200'},
        {label: '300', value: '300'},
        {label: '400', value: '400'},
        {label: '500', value: '500'},
        {label: '600', value: '600'},
        {label: '700', value: '700'},
        {label: '800', value: '800'},
        {label: '900', value: '900'},
        {label: 'inherit', value: 'inherit'},
        {label: 'initial', value: 'initial'},
        {label: 'unset', value: 'unset'}
      ];
      var arr_options_alignment = [
        {label: 'Left', value: 'left'},
        {label: 'Center', value: 'center'},
        {label: 'Right', value: 'right'}
      ];
      var arr_options_font_size = [];
      for (let i = 1; i <= 30; i++) {
        arr_options_font_size.push(
          {label: i+'px', value: i+'px'}
        );
      };
      const coupon_bar = data.dataCouponBar[0];
      this.setState({
        data:data,
        loading:false,
        arr_options_minutes:arr_options_minutes,
        arr_options_position:arr_options_position,
        arr_options_transform:arr_options_transform,
        arr_options_weight:arr_options_weight,
        arr_options_alignment:arr_options_alignment,
        arr_options_font_size:arr_options_font_size,
        enabled_coupon_bar:coupon_bar.enabled_coupon_bar,
        coupon_bar_timer:coupon_bar.coupon_bar_timer.toString(),
        coupon_bar_position:coupon_bar.coupon_bar_position.toString(),
        coupon_bar_text:coupon_bar.coupon_bar_text,
        coupon_bar_text_expire:coupon_bar.coupon_bar_text_expire,
        coupon_bar_hours:coupon_bar.coupon_bar_hours,
        coupon_bar_minutes:coupon_bar.coupon_bar_minutes,
        coupon_bar_seconds:coupon_bar.coupon_bar_seconds,
        coupon_bar_clear_offer:coupon_bar.coupon_bar_clear_offer,
        coupon_bar_background_color:{
          hue:coupon_bar.coupon_bar_background_color_h,
          saturation:coupon_bar.coupon_bar_background_color_s,
          brightness:coupon_bar.coupon_bar_background_color_b
        },
        coupon_bar_background_color_hex:coupon_bar.coupon_bar_background_color_hex.replace(/\#/, ""),
        coupon_bar_font_color:{
          hue:coupon_bar.coupon_bar_font_color_h,
          saturation:coupon_bar.coupon_bar_font_color_s,
          brightness:coupon_bar.coupon_bar_font_color_b
        },
        coupon_bar_font_color_hex:coupon_bar.coupon_bar_font_color_hex.replace(/\#/, ""),
        coupon_bar_font_size:coupon_bar.coupon_bar_font_size,
        coupon_bar_text_transform:coupon_bar.coupon_bar_text_transform,
        coupon_bar_font_weight:coupon_bar.coupon_bar_font_weight,
        coupon_bar_text_alignment:coupon_bar.coupon_bar_text_alignment,
      });
      //this.titles();
    }else {
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

  titles = () =>{
    const app = this.context;
    const datas = { title: 'Coupon Bar' };
    const titleBarOptions = {
    title: datas.title
    };
    TitleBar.create(app, titleBarOptions);
  };

  validateData = () =>{
    const w = this.state;
    const stateData = {
        enabled_coupon_bar:w.enabled_coupon_bar,
        coupon_bar_timer:w.coupon_bar_timer,
        coupon_bar_position:w.coupon_bar_position,
        coupon_bar_text:w.coupon_bar_text,
        coupon_bar_text_expire:w.coupon_bar_text_expire,
        coupon_bar_hours:w.coupon_bar_hours,
        coupon_bar_minutes:w.coupon_bar_minutes,
        coupon_bar_seconds:w.coupon_bar_seconds,
        coupon_bar_clear_offer:w.coupon_bar_clear_offer,
        coupon_bar_background_color_h:w.coupon_bar_background_color.hue,
        coupon_bar_background_color_s:w.coupon_bar_background_color.saturation,
        coupon_bar_background_color_b:w.coupon_bar_background_color.brightness,
        coupon_bar_font_color_h:w.coupon_bar_font_color.hue,
        coupon_bar_font_color_s:w.coupon_bar_font_color.saturation,
        coupon_bar_font_color_b:w.coupon_bar_font_color.brightness,
        coupon_bar_font_size:w.coupon_bar_font_size,
        coupon_bar_text_transform:w.coupon_bar_text_transform,
        coupon_bar_font_weight:w.coupon_bar_font_weight,
        coupon_bar_text_alignment:w.coupon_bar_text_alignment

    };
    const posts = this.state.data.dataCouponBar;
    if(typeof posts !== 'undefined'){
      const ps = posts[0];
      const arr2 = {
        enabled_coupon_bar:ps.enabled_coupon_bar,
        coupon_bar_timer:ps.coupon_bar_timer.toString(),
        coupon_bar_position:ps.coupon_bar_position.toString(),
        coupon_bar_text:ps.coupon_bar_text,
        coupon_bar_text_expire:ps.coupon_bar_text_expire,
        coupon_bar_hours:ps.coupon_bar_hours,
        coupon_bar_minutes:ps.coupon_bar_minutes,
        coupon_bar_seconds:ps.coupon_bar_seconds,
        coupon_bar_clear_offer:ps.coupon_bar_clear_offer,
        quick_buy_button_background_color_h:ps.quick_buy_button_background_color_h,
        quick_buy_button_background_color_s:ps.quick_buy_button_background_color_s,
        quick_buy_button_background_color_b:ps.quick_buy_button_background_color_b,
        quick_buy_button_icon:ps.quick_buy_button_icon,
        coupon_bar_background_color_h:ps.coupon_bar_background_color_h,
        coupon_bar_background_color_s:ps.coupon_bar_background_color_s,
        coupon_bar_background_color_b:ps.coupon_bar_background_color_b,
        coupon_bar_font_color_h:ps.coupon_bar_font_color_h,
        coupon_bar_font_color_s:ps.coupon_bar_font_color_s,
        coupon_bar_font_color_b:ps.coupon_bar_font_color_b,
        coupon_bar_font_size:ps.coupon_bar_font_size,
        coupon_bar_text_transform:ps.coupon_bar_text_transform,
        coupon_bar_font_weight:ps.coupon_bar_font_weight,
        coupon_bar_text_alignment:ps.coupon_bar_text_alignment
      };
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const a = arr2;
      const b = stateData;
      /* console.log(a);
      console.log(b) */
      if(equals(a, b)){
        return true;
      }else{
        return false;
      }
    }
  };

  discard = () =>{
    const posts = this.state.data.dataCouponBar[0];
    this.setState({
        loading:false,
        enabled_coupon_bar:posts.enabled_coupon_bar,
        coupon_bar_timer:posts.coupon_bar_timer.toString(),
        coupon_bar_position:posts.coupon_bar_position.toString(),
        coupon_bar_text:posts.coupon_bar_text,
        coupon_bar_text_expire:posts.coupon_bar_text_expire,
        coupon_bar_hours:posts.coupon_bar_hours,
        coupon_bar_minutes:posts.coupon_bar_minutes,
        coupon_bar_seconds:posts.coupon_bar_seconds,
        coupon_bar_clear_offer:posts.coupon_bar_clear_offer,
        coupon_bar_background_color:{
            hue:posts.coupon_bar_background_color_h,
            saturation:posts.coupon_bar_background_color_s,
            brightness:posts.coupon_bar_background_color_b
        },
        coupon_bar_background_color_hex:hsbToHex({
            hue:posts.coupon_bar_background_color_h,
            saturation:posts.coupon_bar_background_color_s,
            brightness:posts.coupon_bar_background_color_b
        }).replace(/\#/,""),
        coupon_bar_font_color:{
          hue:posts.coupon_bar_font_color_h,
          saturation:posts.coupon_bar_font_color_s,
          brightness:posts.coupon_bar_font_color_b
        },
        coupon_bar_font_color_hex:hsbToHex({
            hue:posts.coupon_bar_font_color_h,
            saturation:posts.coupon_bar_font_color_s,
            brightness:posts.coupon_bar_font_color_b
        }).replace(/\#/,""),
        coupon_bar_font_size:posts.coupon_bar_font_size,
        coupon_bar_text_transform:posts.coupon_bar_text_transform,
        coupon_bar_font_weight:posts.coupon_bar_font_weight,
        coupon_bar_text_alignment:posts.coupon_bar_text_alignment,
        popover1: false,
        popover3: false
    });
    this.props.updateGridItemsAddOns({ coupon_bar: posts.enabled_coupon_bar });
  };

  save = async () =>{
    this.setState({
        loading:true
    });
    const {
      enabled_coupon_bar,
      coupon_bar_timer,
      coupon_bar_position,
      coupon_bar_text,
      coupon_bar_text_expire,
      coupon_bar_hours,
      coupon_bar_minutes,
      coupon_bar_seconds,
      coupon_bar_clear_offer,
      coupon_bar_background_color,
      coupon_bar_background_color_hex,
      coupon_bar_font_color,
      coupon_bar_font_color_hex,
      coupon_bar_font_size,
      coupon_bar_text_transform,
      coupon_bar_font_weight,
      coupon_bar_text_alignment
    } =this.state

    const requestBody = {
        enabled_coupon_bar:enabled_coupon_bar,
        coupon_bar_timer:coupon_bar_timer,
        coupon_bar_position:coupon_bar_position,
        coupon_bar_text:coupon_bar_text,
        coupon_bar_text_expire:coupon_bar_text_expire,
        coupon_bar_hours:coupon_bar_hours,
        coupon_bar_minutes:coupon_bar_minutes,
        coupon_bar_seconds:coupon_bar_seconds,
        coupon_bar_clear_offer:coupon_bar_clear_offer,
        coupon_bar_background_color_h:coupon_bar_background_color.hue,
        coupon_bar_background_color_s:coupon_bar_background_color.saturation,
        coupon_bar_background_color_b:coupon_bar_background_color.brightness,
        coupon_bar_background_color_hex:'#'+coupon_bar_background_color_hex,
        coupon_bar_font_color_h:coupon_bar_font_color.hue,
        coupon_bar_font_color_s:coupon_bar_font_color.saturation,
        coupon_bar_font_color_b:coupon_bar_font_color.brightness,
        coupon_bar_font_color_hex:'#'+coupon_bar_font_color_hex,
        coupon_bar_font_size:coupon_bar_font_size,
        coupon_bar_text_transform:coupon_bar_text_transform,
        coupon_bar_font_weight:coupon_bar_font_weight,
        coupon_bar_text_alignment:coupon_bar_text_alignment

      };
    const method = 'PUT';
    const app = this.context; 
    await makePutPostRequest('/api/coupon_bar',method,requestBody,app).then(response =>{
      if(response){
        this.getCouponBarData();
        this.setState({toastMarkup:true});
      }
      }).catch(err => {
        this.notifyError(err,'updateCouponBar');
      }); 
  };

  async componentDidMount() {
    this.getCouponBarData();
  };

  componentWillUnmount(){
    this.setState = (state, callback) => {
      return;
    }
  };
  render() {
    const {
      data,
      loading,
      arr_options_minutes,
      arr_options_position,
      arr_options_transform,
      arr_options_weight,
      arr_options_alignment,
      arr_options_font_size,
      popover1,
      popover3,
      enabled_coupon_bar,
      coupon_bar_timer,
      coupon_bar_position,
      coupon_bar_text,
      coupon_bar_text_expire,
      coupon_bar_hours,
      coupon_bar_minutes,
      coupon_bar_seconds,
      coupon_bar_clear_offer,
      coupon_bar_background_color,
      coupon_bar_background_color_hex,
      coupon_bar_font_color,
      coupon_bar_font_color_hex,
      coupon_bar_font_size,
      coupon_bar_text_transform,
      coupon_bar_font_weight,
      coupon_bar_text_alignment
    } = this.state;

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
        
    const hexcolor_coupon_bar_background_color = hsbToHex(coupon_bar_background_color);
    const activator_coupon_bar_background_color = (
        <Button onClick={()=>{this.handlePopover("popover1")}} id='coupon_bar_color'>
          <ButtonColor background={hexcolor_coupon_bar_background_color}/>
        </Button>
    );
    
    const hexcolor_coupon_bar_font_color = hsbToHex(coupon_bar_font_color);
    const activator_coupon_bar_font_color = (
        <Button onClick={()=>{this.handlePopover("popover3")}} id='coupon_bar_color3'>
          <ButtonColor background={hexcolor_coupon_bar_font_color}/>
        </Button>
    );
    const couponBar =
      <BlockStack gap={500}>
        <Card>
          <BlockStack gap={200}>
            <Text as="h1" variant="headingMd">
              Settings
            </Text>
            <BlockStack gap={400}>
              <Checkbox
                label="When the countdown expires, would you like to clear the offer?"
                checked={coupon_bar_clear_offer}
                onChange={() => this.handleChange("coupon_bar_clear_offer")}
              />
              <TextField
                label="What would you like your countdown text to show?"
                value={coupon_bar_text}
                onChange={(value) => { this.handleOnChange(value, "coupon_bar_text") }}
                placeholder='Enter yor countdown text'
                helpText={<div>
                  Do not delete this text: <Text variant="bodyMd" as="span"><InlineCode> {"{{COUNTDOWN"}{"}}"}
                  </InlineCode></Text> which is where the selected time will go.
                </div>}
                maxLength={250}
              />
              <InlineGrid gap="400" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                <Select
                  label="How many minutes on the timer?"
                  options={arr_options_minutes}
                  value={coupon_bar_timer}
                  onChange={(value) => { this.handleOnChange(value, "coupon_bar_timer") }}
                />
                <Select
                  label="Position"
                  options={arr_options_position}
                  value={coupon_bar_position}
                  onChange={(value) => { this.handleOnChange(value, "coupon_bar_position") }}
                />
                <TextField
                  label="Text when expire countdown"
                  value={coupon_bar_text_expire}
                  onChange={(value) => { this.handleOnChange(value, "coupon_bar_text_expire") }}
                  placeholder='Enter yor countdown expiration text'
                  maxLength={250}
                />
                <TextField
                  label="Hours"
                  value={coupon_bar_hours}
                  onChange={(value) => { this.handleOnChange(value, "coupon_bar_hours") }}
                  placeholder='hours'
                  maxLength={250}
                />
                <TextField
                  label="Minutes"
                  value={coupon_bar_minutes}
                  onChange={(value) => { this.handleOnChange(value, "coupon_bar_minutes") }}
                  placeholder='minutes'
                  maxLength={250}
                />
                <TextField
                  label="Seconds"
                  value={coupon_bar_seconds}
                  onChange={(value) => { this.handleOnChange(value, "coupon_bar_seconds") }}
                  placeholder='seconds'
                  maxLength={250}
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap={200}>
          <Text as="h1" variant="headingMd">
            Properties
          </Text>
          <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
            <TextField
              label="Background Color:"
              value={coupon_bar_background_color_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "coupon_bar_background_color_hex", "coupon_bar_background_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popover1}
                  activator={activator_coupon_bar_background_color}
                  onClose={() => { this.handlePopover("popover1", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "coupon_bar_background_color", "coupon_bar_background_color_hex") }}
                      color={coupon_bar_background_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_coupon_bar_background_color} />
                  </Popover.Section>
                </Popover>
              }
            />
            <TextField
              label="Font Color:"
              value={coupon_bar_font_color_hex || '000000'}
              onChange={(value) => { this.handleOnChangeColor(value, "coupon_bar_font_color_hex", "coupon_bar_font_color") }}
              prefix='#'
              maxLength={6}
              connectedRight={
                <Popover
                  active={popover3}
                  activator={activator_coupon_bar_font_color}
                  onClose={() => { this.handlePopover("popover3", 0) }}
                >
                  <Popover.Section>
                    <ColorPicker
                      onChange={(value) => { this.handleColors(value, "coupon_bar_font_color", "coupon_bar_font_color_hex") }}
                      color={coupon_bar_font_color}
                    />
                  </Popover.Section>
                  <Popover.Section>
                    <TextField value={hexcolor_coupon_bar_font_color} />
                  </Popover.Section>
                </Popover>
              }
            />
            <Select
              label="Font Size"
              options={arr_options_font_size}
              value={coupon_bar_font_size}
              onChange={(value) => { this.handleOnChange(value, "coupon_bar_font_size") }}
            />
            <Select
              label="Text Transform"
              options={arr_options_transform}
              value={coupon_bar_text_transform}
              onChange={(value) => { this.handleOnChange(value, "coupon_bar_text_transform") }}
            />
            <Select
              label="Font Weight"
              options={arr_options_weight}
              value={coupon_bar_font_weight}
              onChange={(value) => { this.handleOnChange(value, "coupon_bar_font_weight") }}
            />
            <Select
              label="Text Alignment"
              options={arr_options_alignment}
              value={coupon_bar_text_alignment}
              onChange={(value) => { this.handleOnChange(value, "coupon_bar_text_alignment") }}
            />
          </InlineGrid>
          </BlockStack>
        </Card>
      </BlockStack>;

    const toastMarkup = this.state.toastMarkup ? <Toast content="Coupon-Bar updated successfully!" onDismiss={()=>{this.handlePopover("toastMarkup",0)}} duration={2500} /> : null;
    const toastError = this.state.toastError ? <Toast content={this.state.messageError} error onDismiss={()=>{this.handlePopover("toastError",0)}} duration={2500} /> : null;


    const couponBarStatusMarkup = (
      <Badge
          tone={this.state.enabled_coupon_bar ? 'success' : 'critical'}
          toneAndProgressLabelOverride={`Quick Buy is ${this.state.enabled_coupon_bar ? "On" : "Off"}`}
      >
          {this.state.enabled_coupon_bar ? "On" : "Off"}
      </Badge>
  );

    const couponBarToogle =
    <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
            <label htmlFor="hs-active">
                <Text as="p" fontWeight="medium" tone={this.state.enabled_coupon_bar ? "success" : 'critical'}>The Coupon Bar is {this.state.enabled_coupon_bar ? 'enabled' : 'disabled'}.</Text>
            </label>
            <InlineStack gap="200" align="center" blockAlign="center">
                {couponBarStatusMarkup}
            </InlineStack>
        </InlineStack>
    </InlineStack>;

    const actionMarkup = (
      <Button
          role="switch"
          id="hs-active"
          ariaChecked={this.state.enabled_coupon_bar ? 'false' : 'true'}
          onClick={() => this.toggleIsDirty("enabled_coupon_bar")}
          size="slim"
          variant="primary"
          tone={!this.state.enabled_coupon_bar ? "success" : "critical"}
      >
          {!this.state.enabled_coupon_bar ? "Turn on" : "Turn off"}
      </Button>
  );

    return typeof data.dataCouponBar === 'undefined' ? <SkeletonLoad></SkeletonLoad>:
      <div>
        {loadingPage}
        {/* {<BannerHead {...this.props}/>} */}
        {/* <Layout>
          <Layout.AnnotatedSection
            title="Coupon Bar"
            description="Reduce cart abandonments by adding urgency to your store and watch your sales increase."
          >
            <SettingToggle
              action={{
                content: enabled_coupon_bar ? 'Disable' : 'Enabled',
                onAction: () => this.toggleIsDirty("enabled_coupon_bar"),
              }}
              enabled={enabled_coupon_bar}
            >
              The Coupon Bar is  <Text  variant="bodyMd" as="span" fontWeight="semibold">{enabled_coupon_bar ? 'enabled' : 'disable'}.</Text>
            </SettingToggle>
            {contextualSaveBarMarkup}
            {couponBar}
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
                      {couponBarToogle}
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
            open={this.state.enabled_coupon_bar}
            id="basic-collapsible"
            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
          >
            <BlockStack gap="500">
            {couponBar}
            </BlockStack>
          </Collapsible> */}
          <Box paddingBlockEnd="400">
            {couponBar}
          </Box>
          {contextualSaveBarMarkup}
          {toastMarkup}
          {toastError}
        </BlockStack>
      </div>;
  }

  toggleIsDirty = (toggle) => {
    const isDirty = this.state[`${toggle}`];
    if(isDirty==1){
        this.setState({ [`${toggle}`]:0,});
        this.props.updateGridItemsAddOns({ coupon_bar: false });
    } else{
        this.setState({ [`${toggle}`]:1,});
        this.props.updateGridItemsAddOns({ coupon_bar: true });
    }
  };

  handleOnChange = (value,second) => {
    this.setState({ [second]:value });
  };

  handleChange = (id) => {
    var validate = this.state[id];
    if (validate){
        validate = 0;
    } else{
        validate = 1;
    }
    this.setState({[id]: validate});
  };

  handlePopover = (popover,val=1) => {
    this.setState({[popover]:val})
  };

  handleOnChangeColor= (value,hex,hsb) => {
    //const hextorgb = colorconvert.hex.rgb(value)
    //const rgbtohsb = rgbToHsb({red:hextorgb[0], green:hextorgb[1], blue: hextorgb[2]})
    const hextorgb = hexToRgb('#'+value);
    const rgbtohsb = rgbToHsb({red:hextorgb.red, green:hextorgb.green, blue: hextorgb.blue})
    this.setState({ 
      [hex]:value,
      [hsb]:{
        hue:rgbtohsb.hue,
        saturation:rgbtohsb.saturation,
        brightness:rgbtohsb.brightness
      }
    }) 
  };

  handleColors = (value,colorhsb,colorhex) => {
    this.setState({ [colorhsb]: value,[colorhex]:hsbToHex(value).replace(/\#/, "") });
  };

  notifyError = (err,name) =>{
    switch (name) {
      case 'updateCouponBar':
         this.setState({toastError:true,messageError:JSON.stringify(err)});
        break;
    }
  };

}

export default CouponBar;