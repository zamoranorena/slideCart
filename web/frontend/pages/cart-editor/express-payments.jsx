import { Component } from "react";
import {
    Card,
    Toast,
    BlockStack,
    EmptyState,
    InlineStack,
} from '@shopify/polaris';
import { additional_buttons } from "../../assets";
import { Toogle, SaveBar, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

class ExpressPayments extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            messageError: '',
            loading: true,
            toast: false,
            enabled_additional_checkout_buttons: null,
            dataAdditionalCheckout: null,
        };
    };
    componentDidMount() {
        this.getAdditionalCheckoutButton();
    };

    getAdditionalCheckoutButton = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_additional_checkout_button', app);
        if (data && data.additional_checkout !== undefined && data.additional_checkout !== null) {
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
                dataAdditionalCheckout: data
            };
        };
        const additional_checkout_buttons = data.additional_checkout;

        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            enabled_additional_checkout_buttons: additional_checkout_buttons.enabled_additional_checkout_buttons,
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
            enabled_additional_checkout_buttons:+props.enabled_additional_checkout_buttons,
        };
        const dataAdditionalCheckoutButton = props.dataAdditionalCheckout;
        if (dataAdditionalCheckoutButton !== null) {
            const pacb = dataAdditionalCheckoutButton.additional_checkout;
            const data_additional_checkout_button = {
                enabled_additional_checkout_buttons:+pacb.enabled_additional_checkout_buttons,    
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_additional_checkout_button;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
        this.props.updateGridItems({ express_payments: props.additional_checkout.enabled_additional_checkout_buttons });
    };

    updateAdditionalCheckoutButton = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                enabled_additional_checkout_buttons: props.enabled_additional_checkout_buttons,
            };

            const updateAdditionalCheckoutButton = await makePutPostRequest('/api/additional_checkout_button', method, requestBody, app);
            var messageError = '';
            if (updateAdditionalCheckoutButton.error && updateAdditionalCheckoutButton.message) {
                messageError = updateAdditionalCheckoutButton.message;
            };
            await this.getAdditionalCheckoutButton();
            this.setState({ toast: true, messageError: messageError })
        };
    };


    render() {
        const {
            messageError,
            loading,
            toast,
            dataAdditionalCheckout,
            enabled_additional_checkout_buttons,
        } = this.state;

        const equals = this.validateData(this.state);

        const content_additional_checkout_button = (
            <Card>
                <InlineStack align="center"><img src= {additional_buttons}/></InlineStack>
                {/* <EmptyState
                    image={additional_buttons}
                >
                </EmptyState> */}
            </Card>
        );

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Cart Button updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataAdditionalCheckout !== null ?
                    <BlockStack gap={500}>
                        <Toogle enabled={enabled_additional_checkout_buttons} title='Additional Checkout Buttons' description="These buttons show the logo for a third-party accelerated checkout method. When a customer clicks a branded button, they complete their payment with that accelerated checkout method. The following third-party accelerated checkout methods are available Amazon Pay, Apple Pay, Google Pay, PayPal, Shop Pay and Venmo." stateText='The additional checkout buttons are' activeToogle={() => this.changeStateBoolean('enabled_additional_checkout_buttons')}></Toogle>
                        {content_additional_checkout_button}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateAdditionalCheckoutButton (this.state)} discard={() => { this.discard(dataAdditionalCheckout) }} />
                    </BlockStack> : <ToogleSkeleton />}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ express_payments: !stateNow });
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
}
export default ExpressPayments;