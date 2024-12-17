import { Component } from "react";
import {
    Card,
    FormLayout,
    Box,
    Tabs,
    Text,
    Select,
    Icon,
    Button,
    InlineGrid,
    Divider,
    InlineStack,
    Toast,
    TextField,
    BlockStack,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';

import colorconvert from 'color-convert';
import { hsbToHexOutPrefix } from '@utils/functionUtils';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
    arr_options_alignment
} from '@utils/global'

class Announcement extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            dataAnnouncement: null,
            loading: true,
            announcement_tabs_selected: 0,

            enabled_announcement: null,
            announcement_background_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            announcement_background_color_hex: null,
            announcement_border_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            announcement_border_color_hex: null,
            announcement_font_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            announcement_font_color_hex: null,
            announcement_font_size: null,
            announcement_text_transform: null,
            announcement_font_weight: null,
            announcement_text_alignment: null,
            options_font_size: arr_options_font_size,
            options_weight: arr_options_weight,
            options_transform: arr_options_transform,
            options_alignment: arr_options_alignment,
            values_announcement_tier: [],
        };
    };

    componentDidMount() {
        this.getAnnouncement();
    };

    getAnnouncement = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_announcement', app);
        if (data && data.announcement !== undefined && data.announcement !== null) {
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
                dataAnnouncement: data
            };
        };
        const announcement = data.announcement;
        const announcemenTiers = data.announcemenTiers;
        //console.log(announcemenTiers)

        var values_announcement_tier2 = [];
        if (announcemenTiers.length > 0) {
            for (let i = 0; i < announcemenTiers.length; i++) {
                values_announcement_tier2.push({
                    announcement_text: announcemenTiers[i].announcement_text,
                });
            };
        };


        var stateData = {
            messageError: '',
            popoverAnnouncementBackground: false,
            popoverAnnouncementBorder: false,
            popoverAnnouncementFont: false,
            loading: false,
            toast: false,

            enabled_announcement: announcement.enabled_announcement,
            announcement_background_color: {
                hue: announcement.announcement_background_color_h,
                saturation: announcement.announcement_background_color_s,
                brightness: announcement.announcement_background_color_b
            },
            announcement_background_color_hex: hsbToHexOutPrefix({
                hue: announcement.announcement_background_color_h,
                saturation: announcement.announcement_background_color_s,
                brightness: announcement.announcement_background_color_b
            }),
            announcement_border_color: {
                hue: announcement.announcement_border_color_h,
                saturation: announcement.announcement_border_color_s,
                brightness: announcement.announcement_border_color_b
            },
            announcement_border_color_hex: hsbToHexOutPrefix({
                hue: announcement.announcement_border_color_h,
                saturation: announcement.announcement_border_color_s,
                brightness: announcement.announcement_border_color_b
            }),
            announcement_font_color: {
                hue: announcement.announcement_font_color_h,
                saturation: announcement.announcement_font_color_s,
                brightness: announcement.announcement_font_color_b
            },
            announcement_font_color_hex: hsbToHexOutPrefix({
                hue: announcement.announcement_font_color_h,
                saturation: announcement.announcement_font_color_s,
                brightness: announcement.announcement_font_color_b
            }),
            announcement_font_size: announcement.announcement_font_size,
            announcement_text_transform: announcement.announcement_text_transform,
            announcement_font_weight: announcement.announcement_font_weight,
            announcement_text_alignment: announcement.announcement_text_alignment,
            values_announcement_tier: values_announcement_tier2
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

    updateAnnouncement = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                update_announcement_tier: !this.equalsTiers(),
                enabled_announcement: props.enabled_announcement,
                announcement_background_color_h: props.announcement_background_color.hue,
                announcement_background_color_s: props.announcement_background_color.saturation,
                announcement_background_color_b: props.announcement_background_color.brightness,
                announcement_background_color_hex: '#' + props.announcement_background_color_hex,
                announcement_border_color_h: props.announcement_border_color.hue,
                announcement_border_color_s: props.announcement_border_color.saturation,
                announcement_border_color_b: props.announcement_border_color.brightness,
                announcement_border_color_hex: '#' + props.announcement_border_color_hex,
                announcement_font_color_h: props.announcement_font_color.hue,
                announcement_font_color_s: props.announcement_font_color.saturation,
                announcement_font_color_b: props.announcement_font_color.brightness,
                announcement_font_color_hex: '#' + props.announcement_font_color_hex,
                announcement_font_size: props.announcement_font_size,
                announcement_text_transform: props.announcement_text_transform,
                announcement_font_weight: props.announcement_font_weight,
                announcement_text_alignment: props.announcement_text_alignment,
                values_announcement_tier: props.values_announcement_tier,
            };
            const updateAnnouncement = await makePutPostRequest('/api/announcement', method, requestBody, app);
            var messageError = '';
            if (updateAnnouncement.error && updateAnnouncement.message) {
                messageError = updateAnnouncement.message;
            };
            await this.getAnnouncement();
            this.setState({ toast: true, messageError: messageError })
        };
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ announcement: props.announcement.enabled_announcement });
    };

    validateData = (props) => {
        var thisEquals = true;
        if (props.dataAnnouncement) {
            if (props) {
                const stateData = {
                    enabled_announcement: +props.enabled_announcement,
                    announcement_background_color_h: props.announcement_background_color.hue,
                    announcement_background_color_s: props.announcement_background_color.saturation,
                    announcement_background_color_b: props.announcement_background_color.brightness,
                    announcement_border_color_h: props.announcement_border_color.hue,
                    announcement_border_color_s: props.announcement_border_color.saturation,
                    announcement_border_color_b: props.announcement_border_color.brightness,
                    announcement_font_color_h: props.announcement_font_color.hue,
                    announcement_font_color_s: props.announcement_font_color.saturation,
                    announcement_font_color_b: props.announcement_font_color.brightness,
                    announcement_font_size: props.announcement_font_size,
                    announcement_text_transform: props.announcement_text_transform,
                    announcement_font_weight: props.announcement_font_weight,
                    announcement_text_alignment: props.announcement_text_alignment,
                };

                const dataAnnouncement = props.dataAnnouncement;
                if (dataAnnouncement !== null) {
                    const c = dataAnnouncement.announcement;
                    const data_announcement = {
                        enabled_announcement: +c.enabled_announcement,
                        announcement_background_color_h: c.announcement_background_color_h,
                        announcement_background_color_s: c.announcement_background_color_s,
                        announcement_background_color_b: c.announcement_background_color_b,
                        announcement_border_color_h: c.announcement_border_color_h,
                        announcement_border_color_s: c.announcement_border_color_s,
                        announcement_border_color_b: c.announcement_border_color_b,
                        announcement_font_color_h: c.announcement_font_color_h,
                        announcement_font_color_s: c.announcement_font_color_s,
                        announcement_font_color_b: c.announcement_font_color_b,
                        announcement_font_size: c.announcement_font_size,
                        announcement_text_transform: c.announcement_text_transform,
                        announcement_font_weight: c.announcement_font_weight,
                        announcement_text_alignment: c.announcement_text_alignment,
                    };

                    const stateData3 = props.values_announcement_tier;
                    var arr_announcement_tier = [];
                    for (let i = 0; i < dataAnnouncement.announcemenTiers.length; i++) {
                        arr_announcement_tier.push(
                            {
                                announcement_text: dataAnnouncement.announcemenTiers[i].announcement_text,
                            }
                        )
                    };
                    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
                    const a = data_announcement;
                    const b = stateData;

                    const f = stateData3;
                    const e = arr_announcement_tier;
                    const arraysAreIdentical2 = this.shallowEqual(e, f);

                    if (!equals(a, b) || !arraysAreIdentical2) {
                        thisEquals = false;
                    };
                };
            };
        };


        return thisEquals;
    };
    render() {
        const {
            loading,
            toast,
            messageError,
            popoverAnnouncementBackground,
            popoverAnnouncementBorder,
            popoverAnnouncementFont,
            announcement_tabs_selected,
            dataAnnouncement,
            enabled_announcement,
            announcement_background_color,
            announcement_background_color_hex,
            announcement_border_color_hex,
            announcement_border_color,
            announcement_font_color_hex,
            announcement_font_color,
            announcement_font_size,
            announcement_text_transform,
            announcement_font_weight,
            announcement_text_alignment,
            options_font_size,
            options_weight,
            options_transform,
            options_alignment,
            values_announcement_tier
        } = this.state;

        var equals = this.validateData(this.state);

        const announcement_tabs = [
            {
                id: "Announcement Tiers",
                content: "Announcement Tiers",
                accessibilityLabel: "Announcement Tiers",
                panelID: "announcement-page-fitted"
            },
            {
                id: "Announcement Settings",
                content: "Announcement Settings",
                accessibilityLabel: "Announcement Settings",
                panelID: "settings-page-fitted"
            }
        ];

        const activator_announcement_background =
            <ButtonColor click={() => { this.handlePopover("popoverAnnouncementBackground") }} id='announcement_button_color' background={hsbToHex(announcement_background_color)} />;

        const activator_announcement_border =
            <ButtonColor click={() => { this.handlePopover("popoverAnnouncementBorder") }} id='announcement_button_color2' background={hsbToHex(announcement_border_color)} />;

        const activator_announcement_font =
            <ButtonColor click={() => { this.handlePopover("popoverAnnouncementFont") }} id='announcement_button_color3' background={hsbToHex(announcement_font_color)} />;

        const announcement_settings =
            <FormLayout>
                <BlockStack gap={400}>
                    <FieldColor
                        labelColor={<Titles text='Announcement Font Color' />}
                        textValue={announcement_font_color_hex || '000000'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "announcement_font_color_hex", "announcement_font_color") }}
                        activePop={popoverAnnouncementFont}
                        activadorPop={activator_announcement_font}
                        closePop={() => { this.handlePopover("popoverAnnouncementFont", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "announcement_font_color", "announcement_font_color_hex") }}
                        colorPicker={announcement_font_color}
                    />
                    <FieldColor
                        labelColor={<Titles text='Announcement Background Color' />}
                        textValue={announcement_background_color_hex || '000000'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "announcement_background_color_hex", "announcement_background_color") }}
                        activePop={popoverAnnouncementBackground}
                        activadorPop={activator_announcement_background}
                        closePop={() => { this.handlePopover("popoverAnnouncementBackground", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "announcement_background_color", "announcement_background_color_hex") }}
                        colorPicker={announcement_background_color}
                    />
                    <FieldColor
                        labelColor={<Titles text='Announcement Border Color' />}
                        textValue={announcement_border_color_hex || '000000'}
                        changeColorText={(value) => { this.handleOnChangeColor(value, "announcement_border_color_hex", "announcement_border_color") }}
                        activePop={popoverAnnouncementBorder}
                        activadorPop={activator_announcement_border}
                        closePop={() => { this.handlePopover("popoverAnnouncementBorder", 0) }}
                        changeColorPicker={(value) => { this.handleColors(value, "announcement_border_color", "announcement_border_color_hex") }}
                        colorPicker={announcement_border_color}
                    />

                    <InlineGrid gap={400} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}>
                        <Select
                            label='Font Size'
                            options={options_font_size}
                            value={announcement_font_size}
                            onChange={(value) => { this.handleChange(value, "announcement_font_size") }}
                        />
                        <Select
                            label='Text transform'
                            options={options_transform}
                            value={announcement_text_transform}
                            onChange={(value) => { this.handleChange(value, "announcement_text_transform") }}
                        />
                        <Select
                            label='Font weight'
                            options={options_weight}
                            value={announcement_font_weight}
                            onChange={(value) => { this.handleChange(value, "announcement_font_weight") }}
                        />
                        <Select
                            label='Text Alignment'
                            options={options_alignment}
                            value={announcement_text_alignment}
                            onChange={(value) => { this.handleChange(value, "announcement_text_alignment") }}
                        />
                    </InlineGrid>
                </BlockStack>
            </FormLayout>;

        const announcement_tiers = (
            typeof dataAnnouncement !== null && values_announcement_tier.length > 0 ?
                values_announcement_tier.map((el, i) => (
                    <FormLayout key={i}>
                        <Box paddingBlockStart='300' paddingBlockEnd='200' width="100%">
                            <InlineStack
                                gap="1200"
                                align="space-between"
                                blockAlign="start"
                                wrap={false}
                            >
                                <Text variant="headingSm" as="h6">{`ANNOUNCEMENT TEXT ` + parseInt(i + 1, 10)}</Text>
                                <Box minWidth="fit-content">
                                    <InlineStack align="end">
                                        <Button onClick={() => { this.removeTier(i) }} icon={<Icon source={DeleteIcon} />} variant="plain" tone="critical"></Button>
                                    </InlineStack>
                                </Box>
                            </InlineStack>
                            <TextField
                                label="Enter minimum quantity for the discount to apply ( Example: Free Shipping )"
                                value={el.announcement_text || "Enjoy free 2-day shipping on all orders!"}
                                onChange={(value) => this.handleChanges(value, i, "announcement_text")}
                            />
                        </Box>
                        <Divider borderColor='border-hover' />
                    </FormLayout>

                )) : null
        );

        const announcement_tiers_full = <FormLayout>
            {announcement_tiers}
            <InlineStack align="end">
                <Button onClick={() => this.addTier()} tone='success' variant="primary">Add Announcement</Button>
            </InlineStack>
        </FormLayout>;

        const announcement_content = !announcement_tabs_selected ? announcement_tiers_full : announcement_settings;

        const announcement = <Card>
            <FormLayout>
                <Tabs tabs={announcement_tabs} selected={announcement_tabs_selected} onSelect={this.handleTabChange} fitted >
                    {announcement_content}
                </Tabs>
            </FormLayout>
        </Card>;

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Announcement updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataAnnouncement !== null ?
                    <BlockStack gap={500}>
                        <Toogle enabled={enabled_announcement} title='Announcement' description="Make store announcements right inside of your cart." stateText='The Announcement is' activeToogle={() => this.changeStateBoolean('enabled_announcement')}></Toogle>
                        {announcement}
                        <SaveBar equals={equals} loading={loading} action={() => this.updateAnnouncement(this.state)} discard={() => { this.discard(dataAnnouncement) }} />
                        <ThisToast />
                    </BlockStack>
                    : <ToogleSkeleton />}
            </div>
        )
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ announcement: !stateNow });
    };
    handleChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
    };
    handleChanges(value, indice, state) {
        if (value.length > 250) {
            return false;
        };
        let values_announcement_tier = [...this.state.values_announcement_tier];
        values_announcement_tier[indice][state] = value;
        this.setState({ values_announcement_tier });
    };
    handleTabChange = selectedTabIndex => {
        this.setState({ announcement_tabs_selected: selectedTabIndex });
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
    addTier = () => {
        if (this.state.values_announcement_tier.length < 5) {
            this.setState(prevState => ({
                values_announcement_tier: [...prevState.values_announcement_tier, {
                    announcement_text: 'Enjoy free 2-day shipping on all orders!'
                }]
            }));
        } else {
            this.setState({ toast: true, messageError: 'Maximum announcement: 5' });
        }
    };
    removeTier = (i) => {
        if (this.state.values_announcement_tier.length > 1) {
            let values_announcement_tier = [...this.state.values_announcement_tier];
            values_announcement_tier.splice(i, 1);
            this.setState({ values_announcement_tier });
        }
    };
    equalsTiers = () => {
        var updateTiers = false;
        const posts = this.state.dataAnnouncement;
        if (typeof posts.announcemenTiers !== null) {
            const pact = posts.announcemenTiers;
            const stateData3 = this.state.values_announcement_tier;
            var arr_announcement_tier = [];
            for (let i = 0; i < pact.length; i++) {
                arr_announcement_tier.push(
                    {
                        announcement_text: pact[i].announcement_text,
                    }
                )
            };
            updateTiers = this.shallowEqual(arr_announcement_tier, stateData3);

        };
        return updateTiers;
    };
    shallowEqual = (object1, object2) => {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        };

        for (let key of keys1) {
            if (object1[key].announcement_text !== object2[key].announcement_text) {
                return false;
            }
        };

        return true;
    }
}
export default Announcement;