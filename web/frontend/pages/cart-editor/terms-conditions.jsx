import { Component } from "react";
import {
    Card,
    Text,
    Select,
    InlineCode,
    TextField,
    Toast,
    BlockStack,
} from '@shopify/polaris';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton, StatusModule, StatusModuleBanner } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_font_size,
} from '@utils/global'

class TermsCondition extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            popoverEnabled: 0,
            messageError: '',
            loading: true,
            toast: false,
            dataTerms: null,
            enabled_terms: null,
            text_terms: null,
            font_size_terms: null,
            url_terms: null,
            notify_terms: null,
        };
    };

    componentDidMount() {
        this.getTerms();
    };

    getTerms = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_terms', app);
        if (data && data.terms !== undefined && data.terms !== null) {
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
                dataTerms: data
            };
        };
        const settings_terms_conditions = data.terms;

        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            enabled_terms: settings_terms_conditions.enabled_terms,
            text_terms: settings_terms_conditions.text_terms,
            font_size_terms: settings_terms_conditions.font_size_terms,
            url_terms: settings_terms_conditions.url_terms,
            notify_terms: settings_terms_conditions.notify_terms,
            options_font_size: arr_options_font_size,
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
            enabled_terms: +props.enabled_terms,
            text_terms: props.text_terms,
            font_size_terms: props.font_size_terms,
            url_terms: props.url_terms,
            notify_terms: props.notify_terms,
        };
        const dataTerms = props.dataTerms;
        if (dataTerms !== null) {
            const pt = dataTerms.terms;
            const data_terms = {
                enabled_terms: +pt.enabled_terms,
                text_terms: pt.text_terms,
                font_size_terms: pt.font_size_terms,
                url_terms: pt.url_terms,
                notify_terms: pt.notify_terms,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_terms;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    updateTerms = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_terms: props.enabled_terms,
                text_terms: props.text_terms,
                font_size_terms: props.font_size_terms,
                url_terms: props.url_terms,
                notify_terms: props.notify_terms,
            };

            const updateTerms = await makePutPostRequest('/api/terms', method, requestBody, app);
            var messageError = '';
            if (updateTerms.error && updateTerms.message) {
                messageError = updateTerms.message;
            };
            await this.getTerms();
            this.setState({ toast: true, messageError: messageError })
        };
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ terms_conditions: props.terms.enabled_terms });
    };
    render() {
        const {
            popoverEnabled,
            messageError,
            loading,
            toast,
            dataTerms,
            enabled_terms,
            text_terms,
            font_size_terms,
            url_terms,
            notify_terms,
            options_font_size,
        } = this.state;

        const equals = this.validateData(this.state);
        const text_terms_text = <div>The text that is in the middle of double<InlineCode> {"{{"}{"}}"}</InlineCode> (curly suspenders),the URL link will be added.</div>;
        const url_terms_text = 'Insert URL to redirect, example : www.google.com';
        const notify_terms_text = 'Notification text that will appear if you do not accept the terms and conditions.';
        const content_terms = (
            <Card>
                <BlockStack gap={200}>
                    <Text as="h1" variant="headingMd">
                        Terms and Conditions Properties
                    </Text>
                    <BlockStack gap={400}>
                        <TextField
                            label={<Titles text='Text Terms and Conditions' />}
                            value={text_terms}
                            onChange={(value) => { this.handleChange(value, "text_terms") }}
                            helpText={text_terms_text}
                        />
                        <Select
                            label={<Titles text='Font Size' />}
                            options={options_font_size}
                            value={font_size_terms}
                            onChange={(value) => { this.handleChange(value, "font_size_terms") }}
                        />
                        <TextField
                            label={<Titles text='URL' />}
                            value={url_terms}
                            onChange={(value) => { this.handleChange(value, "url_terms") }}
                            helpText={url_terms_text}
                        />
                        <TextField
                            label={<Titles text='Notify' />}
                            value={notify_terms}
                            onChange={(value) => { this.handleChange(value, "notify_terms") }}
                            helpText={notify_terms_text}
                        />
                    </BlockStack>
                </BlockStack>
                    </Card>
        );

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Terms and Condition updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataTerms !== null ?
                    <BlockStack gap={500}>
                        {/* <Toogle enabled={enabled_terms} title='Terms and Conditions' description="A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app." stateText='The terms and conditions are' activeToogle={() => this.changeStateBoolean('enabled_terms')}></Toogle> */}
                        <StatusModule module='terms_conditions' enabled={enabled_terms} popoverEnabled={popoverEnabled} onActionEnabledItem={() => { this.setState({ enabled_terms: 1, popoverEnabled: !popoverEnabled }) }} onActionDisabledItem={() => { this.setState({ enabled_terms: 0, popoverEnabled: !popoverEnabled }) }} actionPopOver={() => this.setState({ popoverEnabled: !popoverEnabled })} />
                        {!enabled_terms ?
                            <StatusModuleBanner module='terms_conditions' onAction={() => { this.setState({ enabled_terms: 1 }) }} />
                            : null}
                        {content_terms}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateTerms(this.state)} discard={() => { this.discard(dataTerms) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ terms_conditions: !stateNow });
    };
    handleChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
}
export default TermsCondition;