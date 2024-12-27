import { Component } from "react";
import {
  Card,
  Button,
  Select,
  Tabs,
  Box,
  Divider,
  Icon,
  Checkbox,
  InlineGrid,
  TextField,
  Text,
  InlineStack,
  Toast,
  InlineCode,
  BlockStack,
  hsbToHex,
  rgbToHsb
} from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';
import colorconvert from 'color-convert';
import { currencyShop } from '@utils/functionUtils';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton, StatusModule, StatusModuleBanner } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
  arr_options_mode,
  arr_options_range,
  arr_options_font_size,
  arr_options_weight,
  arr_options_transform,
  arr_options_radius,
  arr_options_countries
} from '@utils/global'

class Rewards extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      dataRewards: null,
      money_format: null,
      toas: null,
      messageError: '',
      loading: true,
      popoverEnabled: 0,
      popoverRewardsBackgroundContent: null,
      popoverRewardsBackgroundPrimary: null,
      popoverRewardsBackgroundSecondary: null,
      popoverRewardsFont: null,
      rewards_tabs_selected: 0,
      enabled_rewards: null,
      rewards_tab_selected: 2,
      rewards_countries: null,
      rewards_enabled_in_cartEmpty: null,
      rewards_converted_amount: null,
      rewards_show_goals: null,
      rewards_bar_no_dscto: null,
      rewards_show_prices_percentages: null,
      rewards_mode: null,
      rewards_range: null,
      rewards_font_size: null,
      rewards_text_transform: null,
      rewards_font_weight: null,
      rewards_background_content_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      rewards_background_content_color_hex: null,
      rewards_background_primary_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      rewards_background_primary_color_hex: null,
      rewards_background_secondary_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      rewards_background_secondary_color_hex: null,
      rewards_font_color: {
        hue: null,
        saturation: null,
        brightness: null
      },
      rewards_font_color_hex: null,
      rewards_border_radius: null,
      values_rewards_all_countries: [],
      values_rewards_specific_countries: [],
      options_mode: [],
      options_range: [],
      options_radius: [],
      options_countries: [],
    };
  };
  componentDidMount() {
    this.getRewards();
  };
  getRewards = async () => {
    const app = this.context;
    const data = await makeGetRequest('/api/get_rewards', app);
    if (data && data.rewards !== undefined && data.rewards !== null) {
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
        dataRewards: data
      };
    };

    const rewards = data.rewards;
    const rewardsAllTiers = data.rewardsAllTiers;
    const rewardsSpecificTiers = data.rewardsSpecificTiers;
    const shop = data.money_format;
    //console.log(announcemenTiers)

    //------------------------------------REWARDS-AL-COUNTRIES-TIERS-----------------------------------------------//
    var values_rewards_all_countries = [];
    if (rewardsAllTiers.length > 0) {
      for (let i = 0; i < rewardsAllTiers.length; i++) {
        values_rewards_all_countries.push({
          rewards_title: rewardsAllTiers[i].rewards_title,
          rewards_congratulations: rewardsAllTiers[i].rewards_congratulations,
          rewards_amount: rewardsAllTiers[i].rewards_amount,
          rewards_confetti_time: rewardsAllTiers[i].rewards_confetti_time.toString(),
          rewards_confetti: rewardsAllTiers[i].rewards_confetti
        });
      };
    };
    //------------------------------------REWARDS-SPECIFIC-COUNTRIES-TIERS-----------------------------------------------//
    var values_rewards_specific_countries = [];
    if (rewardsSpecificTiers.length > 0) {
      for (let i = 0; i < rewardsSpecificTiers.length; i++) {
        values_rewards_specific_countries.push({
          rewards_title_specific_countries: rewardsSpecificTiers[i].rewards_title_specific_countries,
          rewards_congratulations_specific_countries: rewardsSpecificTiers[i].rewards_congratulations_specific_countries,
          rewards_amount_specific_countries: rewardsSpecificTiers[i].rewards_amount_specific_countries,
          rewards_confetti_time_specific_countries: rewardsSpecificTiers[i].rewards_confetti_time_specific_countries.toString(),
          rewards_confetti_specific_countries: rewardsSpecificTiers[i].rewards_confetti_specific_countries,
          /* rewards_options_countries:arr_options_countries, */
          rewards_specific_country: rewardsSpecificTiers[i].rewards_specific_country
        });
      };
    };


    var stateData = {
      messageError: '',

      loading: false,
      toast: false,

      enabled_rewards: rewards.enabled_rewards,
      /*  rewards_options_mode:arr_options_mode, */
      rewards_countries: rewards.rewards_countries,
      rewards_enabled_in_cartEmpty: rewards.rewards_enabled_in_cartEmpty,
      rewards_converted_amount: rewards.rewards_converted_amount,
      rewards_show_goals: rewards.rewards_show_goals,
      rewards_bar_no_dscto: rewards.rewards_bar_no_dscto,
      rewards_show_prices_percentages: rewards.rewards_show_prices_percentages,
      rewards_mode: rewards.rewards_mode.toString(),
      rewards_range: rewards.rewards_range,
      rewards_font_size: rewards.rewards_font_size,
      rewards_text_transform: rewards.rewards_text_transform,
      rewards_font_weight: rewards.rewards_font_weight,
      rewards_background_content_color: {
        hue: rewards.rewards_background_content_color_h,
        saturation: rewards.rewards_background_content_color_s,
        brightness: rewards.rewards_background_content_color_b
      },
      rewards_background_content_color_hex: hsbToHex(
        {
          hue: rewards.rewards_background_content_color_h,
          saturation: rewards.rewards_background_content_color_s,
          brightness: rewards.rewards_background_content_color_b
        }
      ).replace(/\#/, ""),
      rewards_background_primary_color: {
        hue: rewards.rewards_background_primary_color_h,
        saturation: rewards.rewards_background_primary_color_s,
        brightness: rewards.rewards_background_primary_color_b
      },
      rewards_background_primary_color_hex: hsbToHex(
        {
          hue: rewards.rewards_background_primary_color_h,
          saturation: rewards.rewards_background_primary_color_s,
          brightness: rewards.rewards_background_primary_color_b
        }
      ).replace(/\#/, ""),
      rewards_background_secondary_color: {
        hue: rewards.rewards_background_secondary_color_h,
        saturation: rewards.rewards_background_secondary_color_s,
        brightness: rewards.rewards_background_secondary_color_b
      },
      rewards_background_secondary_color_hex: hsbToHex(
        {
          hue: rewards.rewards_background_secondary_color_h,
          saturation: rewards.rewards_background_secondary_color_s,
          brightness: rewards.rewards_background_secondary_color_b
        }
      ).replace(/\#/, ""),
      rewards_font_color: {
        hue: rewards.rewards_font_color_h,
        saturation: rewards.rewards_font_color_s,
        brightness: rewards.rewards_font_color_b
      },
      rewards_font_color_hex: hsbToHex(
        {
          hue: rewards.rewards_font_color_h,
          saturation: rewards.rewards_font_color_s,
          brightness: rewards.rewards_font_color_b
        }
      ).replace(/\#/, ""),
      rewards_border_radius: rewards.rewards_border_radius,
      values_rewards_all_countries: values_rewards_all_countries,
      values_rewards_specific_countries: values_rewards_specific_countries,
      options_mode: arr_options_mode,
      options_range: arr_options_range,
      options_font_size: arr_options_font_size,
      options_transform: arr_options_transform,
      options_weight: arr_options_weight,
      options_radius: arr_options_radius,
      options_countries: arr_options_countries,
      money_format: shop.money_format || '$',
      popoverRewardsBackgroundContent: false,
      popoverRewardsBackgroundPrimary: false,
      popoverRewardsBackgroundSecondary: false,
      popoverRewardsFont: false
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
    if (props) {
      if (props.dataRewards) {
        if (props) {
          const stateData = {
            enabled_rewards: +props.enabled_rewards,
            rewards_countries: props.rewards_countries,
            rewards_enabled_in_cartEmpty: +props.rewards_enabled_in_cartEmpty,
            rewards_converted_amount: +props.rewards_converted_amount,
            rewards_show_goals: +props.rewards_show_goals,
            rewards_bar_no_dscto: +props.rewards_bar_no_dscto,
            rewards_show_prices_percentages: +props.rewards_show_prices_percentages,
            rewards_mode: props.rewards_mode,
            rewards_range: props.rewards_range,
            rewards_font_size: props.rewards_font_size,
            rewards_text_transform: props.rewards_text_transform,
            rewards_font_weight: props.rewards_font_weight,
            rewards_background_content_color_h: props.rewards_background_content_color.hue,
            rewards_background_content_color_s: props.rewards_background_content_color.saturation,
            rewards_background_content_color_b: props.rewards_background_content_color.brightness,
            rewards_background_primary_color_h: props.rewards_background_primary_color.hue,
            rewards_background_primary_color_s: props.rewards_background_primary_color.saturation,
            rewards_background_primary_color_b: props.rewards_background_primary_color.brightness,
            rewards_background_secondary_color_h: props.rewards_background_secondary_color.hue,
            rewards_background_secondary_color_s: props.rewards_background_secondary_color.saturation,
            rewards_background_secondary_color_b: props.rewards_background_secondary_color.brightness,
            rewards_font_color_h: props.rewards_font_color.hue,
            rewards_font_color_s: props.rewards_font_color.saturation,
            rewards_font_color_b: props.rewards_font_color.brightness,
            rewards_border_radius: props.rewards_border_radius,
          };

          const dataRewards = props.dataRewards;
          if (dataRewards !== null) {
            const c = dataRewards.rewards;
            const data_rewards = {
              enabled_rewards: c.enabled_rewards,
              rewards_countries: c.rewards_countries,
              rewards_enabled_in_cartEmpty: c.rewards_enabled_in_cartEmpty,
              rewards_converted_amount: c.rewards_converted_amount,
              rewards_show_goals: c.rewards_show_goals,
              rewards_bar_no_dscto: c.rewards_bar_no_dscto,
              rewards_show_prices_percentages: c.rewards_show_prices_percentages,
              rewards_mode: c.rewards_mode.toString(),
              rewards_range: c.rewards_range,
              rewards_font_size: c.rewards_font_size,
              rewards_text_transform: c.rewards_text_transform,
              rewards_font_weight: c.rewards_font_weight,
              rewards_background_content_color_h: c.rewards_background_content_color_h,
              rewards_background_content_color_s: c.rewards_background_content_color_s,
              rewards_background_content_color_b: c.rewards_background_content_color_b,
              rewards_background_primary_color_h: c.rewards_background_primary_color_h,
              rewards_background_primary_color_s: c.rewards_background_primary_color_s,
              rewards_background_primary_color_b: c.rewards_background_primary_color_b,
              rewards_background_secondary_color_h: c.rewards_background_secondary_color_h,
              rewards_background_secondary_color_s: c.rewards_background_secondary_color_s,
              rewards_background_secondary_color_b: c.rewards_background_secondary_color_b,
              rewards_font_color_h: c.rewards_font_color_h,
              rewards_font_color_s: c.rewards_font_color_s,
              rewards_font_color_b: c.rewards_font_color_b,
              rewards_border_radius: c.rewards_border_radius,
            };

            const stateData4 = props.values_rewards_all_countries;
            var arr_rewards_all_countries = [];
            for (let i = 0; i < dataRewards.rewardsAllTiers.length; i++) {
              arr_rewards_all_countries.push(
                {
                  rewards_title: dataRewards.rewardsAllTiers[i].rewards_title,
                  rewards_congratulations: dataRewards.rewardsAllTiers[i].rewards_congratulations,
                  rewards_amount: dataRewards.rewardsAllTiers[i].rewards_amount.toString(),
                  rewards_confetti_time: dataRewards.rewardsAllTiers[i].rewards_confetti_time.toString(),
                  rewards_confetti: dataRewards.rewardsAllTiers[i].rewards_confetti
                }
              )
            };

            const stateData5 = this.state.values_rewards_specific_countries;
            var arr_rewards_specific_countries = [];
            for (let i = 0; i < dataRewards.rewardsSpecificTiers.length; i++) {
              arr_rewards_specific_countries.push(
                {
                  rewards_title_specific_countries: dataRewards.rewardsSpecificTiers[i].rewards_title_specific_countries,
                  rewards_congratulations_specific_countries: dataRewards.rewardsSpecificTiers[i].rewards_congratulations_specific_countries,
                  rewards_amount_specific_countries: dataRewards.rewardsSpecificTiers[i].rewards_amount_specific_countries.toString(),
                  rewards_confetti_time_specific_countries: dataRewards.rewardsSpecificTiers[i].rewards_confetti_time_specific_countries.toString(),
                  rewards_confetti_specific_countries: dataRewards.rewardsSpecificTiers[i].rewards_confetti_specific_countries,
                  rewards_specific_country: dataRewards.rewardsSpecificTiers[i].rewards_specific_country
                }
              )
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_rewards;
            const b = stateData;

            const g = arr_rewards_all_countries;
            const h = stateData4;
            const i = arr_rewards_specific_countries;
            const j = stateData5;
            const identicalrewards1 = this.shallowEqualRewards(g, h);
            const identicalrewards2 = this.shallowEqualRewardSpecific(i, j);

            if (!equals(a, b) || !identicalrewards1 || !identicalrewards2) {
              thisEquals = false;
            };
          };
        };
      };
    };


    return thisEquals;
  };

  discard = (props) => {
    props ? this.originalData(1, props) : '';
    this.props.updateGridItems({ rewards: props.rewards.enabled_rewards });
  };

  updateRewards = async (props) => {
    if (props) {
      this.setState({
        loading: true
      });
      const method = 'PUT';
      const app = this.context;
      const requestBody = {
        update_rewards_all_tier: !this.equalsRewards(),
        update_rewards_specific_tier: !this.equalsRewardsSpecific(),
        enabled_rewards: props.enabled_rewards,
        rewards_countries: props.rewards_countries,
        rewards_enabled_in_cartEmpty: props.rewards_enabled_in_cartEmpty,
        rewards_converted_amount: props.rewards_converted_amount,
        rewards_show_goals: props.rewards_show_goals,
        rewards_bar_no_dscto: props.rewards_bar_no_dscto,
        rewards_show_prices_percentages: props.rewards_show_prices_percentages,
        rewards_mode: props.rewards_mode,
        rewards_range: props.rewards_range,
        rewards_font_size: props.rewards_font_size,
        rewards_text_transform: props.rewards_text_transform,
        rewards_font_weight: props.rewards_font_weight,
        rewards_background_content_color_h: props.rewards_background_content_color.hue,
        rewards_background_content_color_s: props.rewards_background_content_color.saturation,
        rewards_background_content_color_b: props.rewards_background_content_color.brightness,
        rewards_background_content_color_hex: '#' + props.rewards_background_content_color_hex,
        rewards_background_primary_color_h: props.rewards_background_primary_color.hue,
        rewards_background_primary_color_s: props.rewards_background_primary_color.saturation,
        rewards_background_primary_color_b: props.rewards_background_primary_color.brightness,
        rewards_background_primary_color_hex: '#' + props.rewards_background_primary_color_hex,
        rewards_background_secondary_color_h: props.rewards_background_secondary_color.hue,
        rewards_background_secondary_color_s: props.rewards_background_secondary_color.saturation,
        rewards_background_secondary_color_b: props.rewards_background_secondary_color.brightness,
        rewards_background_secondary_color_hex: '#' + props.rewards_background_secondary_color_hex,
        rewards_font_color_h: props.rewards_font_color.hue,
        rewards_font_color_s: props.rewards_font_color.saturation,
        rewards_font_color_b: props.rewards_font_color.brightness,
        rewards_font_color_hex: '#' + props.rewards_font_color_hex,
        rewards_border_radius: props.rewards_border_radius,
        values_rewards_all_countries: props.values_rewards_all_countries,
        values_rewards_specific_countries: props.values_rewards_specific_countries,
      };
      const updateRewards = await makePutPostRequest('/api/rewards', method, requestBody, app);
      var messageError = '';
      if (updateRewards.error && updateRewards.message) {
        messageError = updateRewards.message;
      };
      await this.getRewards();
      this.setState({ toast: true, messageError: messageError })
    };
  };

  render() {
    const {
      dataRewards,
      money_format,
      toast,
      messageError,
      loading,
      popoverEnabled,
      popoverRewardsBackgroundContent,
      popoverRewardsBackgroundPrimary,
      popoverRewardsBackgroundSecondary,
      popoverRewardsFont,
      rewards_tab_selected,
      enabled_rewards,
      rewards_enabled_in_cartEmpty,
      rewards_bar_no_dscto,
      rewards_converted_amount,
      rewards_show_goals,
      rewards_show_prices_percentages,
      options_mode,
      rewards_mode,
      options_range,
      rewards_range,
      options_font_size,
      rewards_font_size,
      options_transform,
      rewards_text_transform,
      options_weight,
      rewards_font_weight,
      options_radius,
      rewards_border_radius,
      options_countries,
      rewards_background_content_color_hex,
      rewards_background_content_color,
      rewards_background_primary_color_hex,
      rewards_background_primary_color,
      rewards_background_secondary_color_hex,
      rewards_background_secondary_color,
      rewards_font_color_hex,
      rewards_font_color,
      values_rewards_all_countries,
      values_rewards_specific_countries
    } = this.state;
    const equals = this.validateData(this.state);

    const rewards_tabs = [
      {
        id: "All Countries",
        content: "Rewards All Countries",
        accessibilityLabel: "Rewards All Countries",
        panelID: "rewards-page-fitted"
      },
      {
        id: "Specific Countries",
        content: "Rewards Specific Countries",
        accessibilityLabel: "RewardsSpecific Countries",
        panelID: "rewards-page-fitted2"
      },
      {
        id: "Settings",
        content: "Rewards Settings",
        accessibilityLabel: "Rewards Settings",
        panelID: "settings-page-fitted"
      }
    ];

    const activator_rewards_background_content =
      <ButtonColor click={() => { this.handlePopover("popoverRewardsBackgroundContent") }} id='rewards_button_color0' background={hsbToHex(rewards_background_content_color)} />;

    const activator_rewards_background_primary =
      <ButtonColor click={() => { this.handlePopover("popoverRewardsBackgroundPrimary") }} id='rewards_button_color' background={hsbToHex(rewards_background_primary_color)} />;

    const activator_rewards_background_secondary =
      <ButtonColor click={() => { this.handlePopover("popoverRewardsBackgroundSecondary") }} id='rewards_button_color2' background={hsbToHex(rewards_background_secondary_color)} />;

    const activator_rewards_font =
      <ButtonColor click={() => { this.handlePopover("popoverRewardsFont") }} id='rewards_button_color3' background={hsbToHex(rewards_font_color)} />;

    const rewards_settings_content = (
      <Box paddingBlockStart="300">
        <BlockStack gap="200">
          <InlineStack align="center" gap={200}>
            <Checkbox
              label={<Titles text="Show prices or percentages" />}
              checked={rewards_show_prices_percentages}
              onChange={() => this.changeStateBoolean("rewards_show_prices_percentages")}
            />
          </InlineStack>
          <InlineGrid gap={300}>
            <Select
              label={<Titles text="Mode" />}
              disabled={!rewards_show_prices_percentages}
              options={options_mode}
              value={rewards_mode}
              onChange={(value) => this.handleChange(value, "rewards_mode")}
            />
            <Select
              label={<Titles text="Ranges" />}
              disabled={!rewards_show_prices_percentages || rewards_mode == 1 ? true : false}
              options={options_range}
              value={rewards_range}
              onChange={(value) => this.handleChange(value, "rewards_range")}
            />
            <Select
              label={<Titles text="Font Size" />}
              options={options_font_size}
              value={rewards_font_size}
              onChange={(value) => this.handleChange(value, "rewards_font_size")}
            />
            <Select
              label={<Titles text="Text Transform" />}
              options={options_transform}
              value={rewards_text_transform}
              onChange={(value) => this.handleChange(value, "rewards_text_transform")}
            />
            <Select
              label={<Titles text="Font weight" />}
              options={options_weight}
              value={rewards_font_weight}
              onChange={(value) => this.handleChange(value, "rewards_font_weight")}
            />
            <Select
              label={<Titles text="Border Radius" />}
              options={options_radius}
              value={rewards_border_radius}
              onChange={(value) => this.handleChange(value, "rewards_border_radius")}
            />
            <FieldColor
              labelColor={<Titles text='Rewards Background Content' />}
              textValue={rewards_background_content_color_hex || 'ffffff'}
              changeColorText={(value) => { this.handleOnChangeColor(value, "rewards_background_content_color_hex", "rewards_background_content_color") }}
              activePop={popoverRewardsBackgroundContent}
              activadorPop={activator_rewards_background_content}
              closePop={() => { this.handlePopover("popoverRewardsBackgroundContent", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "rewards_background_content_color", "rewards_background_content_color_hex") }}
              colorPicker={rewards_background_content_color}
            />
            <FieldColor
              labelColor={<Titles text='Rewards Background Color Primary' />}
              textValue={rewards_background_primary_color_hex || '000000'}
              changeColorText={(value) => { this.handleOnChangeColor(value, "rewards_background_primary_color_hex", "rewards_background_primary_color") }}
              activePop={popoverRewardsBackgroundPrimary}
              activadorPop={activator_rewards_background_primary}
              closePop={() => { this.handlePopover("popoverRewardsBackgroundPrimary", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "rewards_background_primary_color", "rewards_background_primary_color_hex") }}
              colorPicker={rewards_background_primary_color}
            />
            <FieldColor
              labelColor={<Titles text='Rewards Background Color Secondary' />}
              textValue={rewards_background_secondary_color_hex || 'cccccc'}
              changeColorText={(value) => { this.handleOnChangeColor(value, "rewards_background_secondary_color_hex", "rewards_background_secondary_color") }}
              activePop={popoverRewardsBackgroundSecondary}
              activadorPop={activator_rewards_background_secondary}
              closePop={() => { this.handlePopover("popoverRewardsBackgroundSecondary", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "rewards_background_secondary_color", "rewards_background_secondary_color_hex") }}
              colorPicker={rewards_background_secondary_color}
            />
            <FieldColor
              labelColor={<Titles text='Rewards Font Color' />}
              textValue={rewards_font_color_hex || '000000'}
              changeColorText={(value) => { this.handleOnChangeColor(value, "rewards_font_color_hex", "rewards_font_color") }}
              activePop={popoverRewardsFont}
              activadorPop={activator_rewards_font}
              closePop={() => { this.handlePopover("popoverRewardsFont", 0) }}
              changeColorPicker={(value) => { this.handleColors(value, "rewards_font_color", "rewards_font_color_hex") }}
              colorPicker={rewards_font_color}
            />
          </InlineGrid>
        </BlockStack>
      </Box>
    );
    var rewards_tiers = '', titleRewards = '', rewards_countries_tiers = '', inAction = '', viewCountry = 0;
    switch (rewards_tab_selected) {
      case 0:
        titleRewards = 'DEFAULT ALL COUNTRIES REWARDS ';
        rewards_tiers = values_rewards_all_countries;
        inAction = 'values_rewards_all_countries';
        viewCountry = 0;
        break;
      case 1:
        titleRewards = 'SPECIFIC COUNTRIES REWARDS ';
        rewards_tiers = values_rewards_specific_countries;
        inAction = 'values_rewards_specific_countries';
        viewCountry = 1;
        break;
    };

    if (rewards_tiers !== '') {
      rewards_countries_tiers = (
        typeof dataRewards.rewardsAllTiers !== 'undefined' || typeof dataRewards.rewardsSpecificTiers !== 'undefined' ?
          rewards_tiers.length > 0 ?
            rewards_tiers.map((el, i) => (
              <BlockStack key={i}>
                <Box paddingBlockStart='300' paddingBlockEnd='300' width="100%" gap={500}>
                  <BlockStack key={i} gap={400}>
                    <InlineStack
                      gap="1200"
                      align="space-between"
                      blockAlign="start"
                      wrap={false}
                    >
                      <Titles text={titleRewards + parseInt(i + 1, 10)} />
                      <Box minWidth="fit-content">
                        <InlineStack align="end">
                          <Button onClick={() => { this.removeTier(i, inAction) }} icon={<Icon source={DeleteIcon} />} variant="plain" tone="critical"></Button>
                        </InlineStack>
                      </Box>
                    </InlineStack>
                    <TextField
                      label={<Titles text="You are {{price}} away from free shipping!" />}
                      value={el.rewards_title || el.rewards_title_specific_countries || "You are {{price}} away from free shipping!"}
                      helpText={<div>
                        Do not delete this text: <Text variant="bodyMd" as="span"><InlineCode> {"{{price"}{"}}"}
                        </InlineCode></Text> which is where the minimum amount you will assign will go.
                      </div>}
                      onChange={(value) => { this.handleChanges(value, i, rewards_tab_selected === 0 ? "rewards_title" : "rewards_title_specific_countries") }}
                    />
                    <TextField
                      label={<Titles text="Congrats, you have got free shipping" />}
                      value={el.rewards_congratulations || el.rewards_congratulations_specific_countries || "Congrats, you have got free shipping"}
                      onChange={(value) => { this.handleChanges(value, i, rewards_tab_selected === 0 ? "rewards_congratulations" : "rewards_congratulations_specific_countries") }}
                    />
                    <TextField
                      label={<Titles text="Enter minimum quantity for the discount to apply ( Example: Free Shipping )" />}
                      value={el.rewards_amount || el.rewards_amount_specific_countries || 100.00}
                      type='number'
                      prefix={currencyShop(money_format)}
                      onChange={(value) => { this.handleChanges(value, i, rewards_tab_selected === 0 ? "rewards_amount" : "rewards_amount_specific_countries") }}
                    />
                    <TextField
                      label={<Titles text="This will show a celebration when the unlock has been achieved.(Show Confetti On Unlock)" />}
                      value={el.rewards_confetti_time || el.rewards_confetti_time_specific_countries || 300}
                      type='number'
                      disabled={el.rewards_confetti == 0 || el.rewards_confetti_specific_countries == 0}
                      connectedLeft={
                        <Checkbox
                          checked={el.rewards_confetti || el.rewards_confetti_specific_countries || 0}
                          onChange={(value) => this.handleChanges(value, i, rewards_tab_selected === 0 ? "rewards_confetti" : "rewards_confetti_specific_countries")}
                        />
                      }
                      onChange={(value) => { this.handleChanges(value, i, rewards_tab_selected === 0 ? "rewards_confetti_time" : "rewards_confetti_time_specific_countries") }}
                    />
                    {!!viewCountry ? <Select key={i}
                      label={<Titles text="Country" />}
                      options={options_countries}
                      onChange={(value) => this.selectChanges(value, i, "rewards_specific_country")}
                      value={el.rewards_specific_country}
                    /> : null}
                  </BlockStack>
                </Box>
                <Divider borderColor='border-hover' />
              </BlockStack>

            )) :
            <BlockStack gap={200}>
              <InlineStack align="center" gap={200}>
                <Titles text='WithOut Rewards Tiers.' />
              </InlineStack>
              <Divider borderColor='border-hover' />
            </BlockStack>
          : null)
    };

    const rewards_countries_tiers_full =
      <BlockStack gap={200}>
        {rewards_countries_tiers}
        < InlineStack align="end" >
          <Button onClick={() => this.addTier(rewards_tab_selected ? 'values_rewards_specific_countries' : 'values_rewards_all_countries')} tone='success' variant="primary">Add Rewards</Button>
        </InlineStack >
      </BlockStack>;

    var rewards_content = '';
    switch (rewards_tab_selected) {
      case 0: case 1:
        rewards_content = rewards_countries_tiers_full;
        break;
      case 2:
        rewards_content = rewards_settings_content;
        break;
    }

    const rewards = <BlockStack gap={500}>
      <Card>
        <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
          <Checkbox
            label="Enabled Rewards In Cart Empty"
            checked={rewards_enabled_in_cartEmpty}
            onChange={() => this.changeStateBoolean("rewards_enabled_in_cartEmpty")}
          />
          <Checkbox

            label="Calculate based on the total price without discount"
            checked={rewards_bar_no_dscto}
            onChange={() => this.changeStateBoolean("rewards_bar_no_dscto")}
          />
          <Checkbox
            label="Amount converted according to active currency in Shopify "
            checked={rewards_converted_amount}
            onChange={() => this.changeStateBoolean("rewards_converted_amount")}
          />
          <Checkbox
            label="Show all goals from rewards."
            checked={rewards_show_goals}
            onChange={() => this.changeStateBoolean("rewards_show_goals")}
          />
        </InlineGrid>
      </Card>
      <Card>
        <Tabs
          tabs={rewards_tabs}
          selected={rewards_tab_selected}
          onSelect={this.handleTabChange}
          fitted
        />
        {rewards_content}
      </Card>
    </BlockStack>

    const ThisToast = () => {
      return (
        toast ?
          messageError ?
            <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
            <Toast content="Rewards updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
          null
      );
    };
    const loadingComponent = loading ? <Loading /> : null;
    return (
      <div>
        {loadingComponent}
        {dataRewards !== null ?
          <Box paddingBlockEnd="400">
            <BlockStack gap={500}>
              {/* <Toogle enabled={enabled_rewards} title='Rewards' description="Reward your customers with discounts once they spend a minimum amount." stateText='The Rewards is' activeToogle={() => this.changeStateBoolean('enabled_rewards')}></Toogle> */}
              <StatusModule module='rewards' enabled={enabled_rewards} popoverEnabled={popoverEnabled} onActionEnabledItem={() => { this.setState({ enabled_rewards: 1, popoverEnabled: !popoverEnabled }) }} onActionDisabledItem={() => { this.setState({ enabled_rewards: 0, popoverEnabled: !popoverEnabled }) }} actionPopOver={() => this.setState({ popoverEnabled: !popoverEnabled })} />
              {!enabled_rewards ?
                <StatusModuleBanner module='rewards' onAction={() => { this.setState({ enabled_rewards: 1 }) }} /> : null}
              {rewards}
            </BlockStack>
            <ThisToast />
            <SaveBar equals={equals} loading={loading} action={() => this.updateRewards(this.state)} discard={() => { this.discard(dataRewards) }} />
          </Box>
          : <ToogleSkeleton />}
      </div>
    );
  }
  changeStateBoolean = (thisSate) => {
    var stateNow = this.state[thisSate];
    this.setState({ [thisSate]: !stateNow });
    if(thisSate === 'enabled_rewards'){
      this.props.updateGridItems({ rewards: !stateNow });
    };
  };
  handleChange = (value, thisSate) => {
    //var newState = stateNow;
    var stateData = {};
    stateData[thisSate] = value;
    this.setState(stateData);
  };
  handleChanges(value, indice, state) {
    var patt = new RegExp(/^[A-Za-z0-9\s]+$/g);

    var validatenum = /^[0-9]+/;
    var validatenumResult = validatenum.test(value);
    var max_value = 250;
    function updateTier(where, tier, value, state) {
      switch (tier) {
        case 0:
          let values_rewards_all_countries = [...where.state.values_rewards_all_countries];
          values_rewards_all_countries[indice][state] = value;
          where.setState({ values_rewards_all_countries });
          break;
        case 1:
          let values_rewards_specific_countries = [...where.state.values_rewards_specific_countries];
          values_rewards_specific_countries[indice][state] = value;
          where.setState({ values_rewards_specific_countries });
          break;
      }

    };
    switch (state) {
      case 'rewards_amount': case 'rewards_amount_specific_countries':
        max_value = 10;
        break;
      case 'rewards_confetti_time': case 'rewards_confetti_time_specific_countries':
        max_value = 5;
        break;
    };
    if (value.length > max_value) {
      return false;
    };

    if ((state === 'rewards_amount') || (state === 'rewards_amount_specific_countries')) {
      if (value < 0 || validatenumResult == false) {
        value = '';
      };
    };
    if ((state === 'rewards_confetti_time') || (state === 'rewards_confetti_time_specific_countries')) {
      if (value < 0 || value > 600 || validatenumResult == false) {
        value = '';
      };
    };
    if ((state === 'rewards_confetti') || (state === 'rewards_confetti_specific_countries')) {
      value = !value ? 0 : 1;
    };

    switch (state) {
      case 'rewards_title': case 'rewards_congratulations': case 'rewards_amount': case 'rewards_confetti_time': case 'rewards_confetti':
        updateTier(this, 0, value, state);
        break;
      case 'rewards_title_specific_countries': case 'rewards_congratulations_specific_countries': case 'rewards_amount_specific_countries': case 'rewards_confetti_time_specific_countries': case 'rewards_confetti_specific_countries':
        updateTier(this, 1, value, state);
        break;
    };
  };
  selectChanges(value, indice, state) {
    let values_rewards_specific_countries = [...this.state.values_rewards_specific_countries];
    values_rewards_specific_countries[indice][state] = value;
    this.setState({ values_rewards_specific_countries });
  };
  handleTabChange = selectedTabIndex => {
    this.setState({ rewards_tab_selected: selectedTabIndex });
  };
  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val })
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
  addTier = (state) => {
    switch (state) {
      case 'values_rewards_all_countries':
        if (this.state.values_rewards_all_countries.length < 200) {
          this.setState(prevState => ({
            values_rewards_all_countries: [...prevState.values_rewards_all_countries, {
              rewards_title: 'You are {{price}} away from free shipping!',
              rewards_congratulations: '🍍 Congrats! you have unlocked free shipping!',
              rewards_amount: '100.00',
              rewards_confetti_time: '300',
              rewards_confetti: 0
            }]
          }));
        } else {
          this.setState({ toast: true, messageError: 'Maximum rewards: 200' });
        }
        break;
      case 'values_rewards_specific_countries':
        if (this.state.values_rewards_specific_countries.length < 200) {
          this.setState(prevState => ({
            values_rewards_specific_countries: [...prevState.values_rewards_specific_countries, {
              rewards_title_specific_countries: 'You are {{price}} away from free shipping!',
              rewards_congratulations_specific_countries: '🍍 Congrats! you have unlocked free shipping!',
              rewards_amount_specific_countries: '100.00',
              rewards_confetti_time_specific_countries: '300',
              rewards_confetti_specific_countries: 0,
              rewards_specific_country: '0',
            }]
          }));
        } else {
          this.setState({ toast: true, messageError: 'Maximum rewards: 200' });
        }
        break;
    }
  };
  removeTier = (i, state) => {
    switch (state) {
      case 'values_rewards_all_countries':
        if (this.state.values_rewards_all_countries.length > 0) {
          let values_rewards_all_countries = [...this.state.values_rewards_all_countries];
          values_rewards_all_countries.splice(i, 1);
          this.setState({ values_rewards_all_countries });
        }
        break;
      case 'values_rewards_specific_countries':
        if (this.state.values_rewards_specific_countries.length > 0) {
          let values_rewards_specific_countries = [...this.state.values_rewards_specific_countries];
          values_rewards_specific_countries.splice(i, 1);
          this.setState({ values_rewards_specific_countries });
        }
        break;
    };
  };

  shallowEqualRewards(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++) {
      if (arr1[i].rewards_title !== arr2[i].rewards_title) {
        return false;
      }
      if (arr1[i].rewards_congratulations !== arr2[i].rewards_congratulations) {
        return false;
      }
      if (arr1[i].rewards_amount !== arr2[i].rewards_amount) {
        return false;
      }
      if (arr1[i].rewards_confetti_time !== arr2[i].rewards_confetti_time) {
        return false;
      }
      if (arr1[i].rewards_confetti !== arr2[i].rewards_confetti) {
        return false;
      }
    };
    return true;
  };

  shallowEqualRewardSpecific(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++) {
      if (arr1[i].rewards_title_specific_countries !== arr2[i].rewards_title_specific_countries) {
        return false;
      }
      if (arr1[i].rewards_congratulations_specific_countries !== arr2[i].rewards_congratulations_specific_countries) {
        return false;
      }
      if (arr1[i].rewards_amount_specific_countries !== arr2[i].rewards_amount_specific_countries) {
        return false;
      }
      if (arr1[i].rewards_confetti_time_specific_countries !== arr2[i].rewards_confetti_time_specific_countries) {
        return false;
      }
      if (arr1[i].rewards_confetti_specific_countries !== arr2[i].rewards_confetti_specific_countries) {
        return false;
      }
      if (arr1[i].rewards_specific_country !== arr2[i].rewards_specific_country) {
        return false;
      }
    };
    return true;
  };
  equalsRewards = () => {
    var updateTiers = false;
    const posts = this.state.dataRewards;
    if (typeof posts.rewardsAllTiers !== null) {
      const pact = posts.rewardsAllTiers;
      const stateData3 = this.state.values_rewards_all_countries;
      var arr_values_rewards_all_countries = [];
      for (let i = 0; i < pact.length; i++) {
        arr_values_rewards_all_countries.push({
          rewards_title: pact[i].rewards_title,
          rewards_congratulations: pact[i].rewards_congratulations,
          rewards_amount: pact[i].rewards_amount,
          rewards_confetti_time: pact[i].rewards_confetti_time.toString(),
          rewards_confetti: pact[i].rewards_confetti
        });
      };
      updateTiers = this.shallowEqualRewards(arr_values_rewards_all_countries, stateData3);

    };
    return updateTiers;
  };
  equalsRewardsSpecific = () => {
    var updateTiers = false;
    const posts = this.state.dataRewards;
    if (typeof posts.rewardsSpecificTiers !== null) {
      const pact = posts.rewardsSpecificTiers;
      const stateData3 = this.state.values_rewards_specific_countries;
      var arr_values_rewards_specific_countries = [];
      for (let i = 0; i < pact.length; i++) {
        arr_values_rewards_specific_countries.push(
          {
            rewards_title_specific_countries: pact[i].rewards_title_specific_countries,
            rewards_congratulations_specific_countries: pact[i].rewards_congratulations_specific_countries,
            rewards_amount_specific_countries: pact[i].rewards_amount_specific_countries,
            rewards_confetti_time_specific_countries: pact[i].rewards_confetti_time_specific_countries.toString(),
            rewards_confetti_specific_countries: pact[i].rewards_confetti_specific_countries,
            /* rewards_options_countries:arr_options_countries, */
            rewards_specific_country: pact[i].rewards_specific_country
          }
        )
      };
      updateTiers = this.shallowEqualRewardSpecific(arr_values_rewards_specific_countries, stateData3);

    };
    return updateTiers;
  };
}
export default Rewards;