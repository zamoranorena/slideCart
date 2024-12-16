import { Component } from "react";
import {
    Card,
    Divider,
    Text,
    Select,
    InlineCode,
    TextField,
    Toast,
    BlockStack,
    SkeletonBodyText,
    SkeletonDisplayText,
    hsbToHex,
    rgbToHsb
} from '@shopify/polaris';
import colorconvert from 'color-convert';
import { ButtonColor, Toogle, SaveBar, Titles, FieldColor, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

import {
    arr_options_radius,
    arr_options_font_size,
    arr_options_weight,
    arr_options_transform,
} from '@utils/global'
class Translator extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            dataTranslator: null,
            loading: true,
            toast: false,
            messageError: '',
            cart_title_language_settings: null,
            cart_empty_text_language_settings: null,
            add_to_cart_language_settings: null,
            rc_withOutSub_in_upsell_language_settings: null,
            rc_withSub_in_upsell_language_settings: null,
            rc_upgrade_language_settings: null,
            rc_downgrade_language_settings: null,
            add_in_upsell_language_settings: null,
            shopping_cart_language_settings: null,
            product_language_settings: null,
            products_language_settings: null,
            subtotal_language_settings: null,
            clear_all_language_settings: null,
            remove_language_settings: null,
            sold_out_language_settings: null,
            unavailable_language_settings: null,
            free_language_settings: null,
            free_gnral_language_settings: null,
            add_discount_code_language_settings: null,
            discount_applied_language_settings: null,
            checkout_button_textlanguage_settings: null,
            vendor_key_text_language_settings: null,
            subscription_text_language_settings: null,
            valid_coupon_text: null,
        };
    };
    componentDidMount() {
        this.getLanguage();
    };

    getLanguage = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_language', app);
        if (data && data.language !== undefined && data.language !== null) {
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

    originalData = (identify, props) => {
        var myData = {};
        if (!identify) {
            myData = {
                dataTranslator: props
            };
        };
        const data = props.language;

        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            cart_title_language_settings: data.cart_title_language_settings,
            cart_empty_text_language_settings: data.cart_empty_text_language_settings,
            add_to_cart_language_settings: data.add_to_cart_language_settings,
            rc_withOutSub_in_upsell_language_settings: data.rc_withOutSub_in_upsell_language_settings,
            rc_withSub_in_upsell_language_settings: data.rc_withSub_in_upsell_language_settings,
            rc_upgrade_language_settings: data.rc_upgrade_language_settings,
            rc_downgrade_language_settings: data.rc_downgrade_language_settings,
            add_in_upsell_language_settings: data.add_in_upsell_language_settings,
            shopping_cart_language_settings: data.shopping_cart_language_settings,
            product_language_settings: data.product_language_settings,
            products_language_settings: data.products_language_settings,
            subtotal_language_settings: data.subtotal_language_settings,
            clear_all_language_settings: data.clear_all_language_settings,
            remove_language_settings: data.remove_language_settings,
            sold_out_language_settings: data.sold_out_language_settings,
            unavailable_language_settings: data.unavailable_language_settings,
            free_language_settings: data.free_language_settings,
            free_gnral_language_settings: data.free_gnral_language_settings,
            add_discount_code_language_settings: data.add_discount_code_language_settings,
            discount_applied_language_settings: data.discount_applied_language_settings,
            checkout_button_textlanguage_settings: data.checkout_button_textlanguage_settings,
            vendor_key_text_language_settings: data.vendor_key_text_language_settings,
            subscription_text_language_settings: data.subscription_text_language_settings,
            valid_coupon_text: data.valid_coupon_text,
            shipping_taxes_discounts_language_settings: data.shipping_taxes_discounts_language_settings
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

    validateData = () => {
        var thisEquals = true;
        const w = this.state;
        const stateData = {
            cart_title_language_settings: w.cart_title_language_settings,
            cart_empty_text_language_settings: w.cart_empty_text_language_settings,
            add_to_cart_language_settings: w.add_to_cart_language_settings,
            rc_withOutSub_in_upsell_language_settings: w.rc_withOutSub_in_upsell_language_settings,
            rc_withSub_in_upsell_language_settings: w.rc_withSub_in_upsell_language_settings,
            rc_upgrade_language_settings: w.rc_upgrade_language_settings,
            rc_downgrade_language_settings: w.rc_downgrade_language_settings,
            add_in_upsell_language_settings: w.add_in_upsell_language_settings,
            shopping_cart_language_settings: w.shopping_cart_language_settings,
            product_language_settings: w.product_language_settings,
            products_language_settings: w.products_language_settings,
            subtotal_language_settings: w.subtotal_language_settings,
            clear_all_language_settings: w.clear_all_language_settings,
            remove_language_settings: w.remove_language_settings,
            sold_out_language_settings: w.sold_out_language_settings,
            unavailable_language_settings: w.unavailable_language_settings,
            free_language_settings: w.free_language_settings,
            free_gnral_language_settings: w.free_gnral_language_settings,
            add_discount_code_language_settings: w.add_discount_code_language_settings,
            discount_applied_language_settings: w.discount_applied_language_settings,
            checkout_button_textlanguage_settings: w.checkout_button_textlanguage_settings,
            vendor_key_text_language_settings: w.vendor_key_text_language_settings,
            subscription_text_language_settings: w.subscription_text_language_settings,
            valid_coupon_text: w.valid_coupon_text,
            shipping_taxes_discounts_language_settings: w.shipping_taxes_discounts_language_settings,
        };

        const myTranslator = this.state.dataTranslator;
        if (myTranslator !== null) {
            if (typeof myTranslator.language !== 'undefined') {
                const c = myTranslator.language;
                const dataTranslator = {
                    cart_title_language_settings: c.cart_title_language_settings,
                    cart_empty_text_language_settings: c.cart_empty_text_language_settings,
                    add_to_cart_language_settings: c.add_to_cart_language_settings,
                    rc_withOutSub_in_upsell_language_settings: c.rc_withOutSub_in_upsell_language_settings,
                    rc_withSub_in_upsell_language_settings: c.rc_withSub_in_upsell_language_settings,
                    rc_upgrade_language_settings: c.rc_upgrade_language_settings,
                    rc_downgrade_language_settings: c.rc_downgrade_language_settings,
                    add_in_upsell_language_settings: c.add_in_upsell_language_settings,
                    shopping_cart_language_settings: c.shopping_cart_language_settings,
                    product_language_settings: c.product_language_settings,
                    products_language_settings: c.products_language_settings,
                    subtotal_language_settings: c.subtotal_language_settings,
                    clear_all_language_settings: c.clear_all_language_settings,
                    remove_language_settings: c.remove_language_settings,
                    sold_out_language_settings: c.sold_out_language_settings,
                    unavailable_language_settings: c.unavailable_language_settings,
                    free_language_settings: c.free_language_settings,
                    free_gnral_language_settings: c.free_gnral_language_settings,
                    add_discount_code_language_settings: c.add_discount_code_language_settings,
                    discount_applied_language_settings: c.discount_applied_language_settings,
                    checkout_button_textlanguage_settings: c.checkout_button_textlanguage_settings,
                    vendor_key_text_language_settings: c.vendor_key_text_language_settings,
                    subscription_text_language_settings: c.subscription_text_language_settings,
                    valid_coupon_text: c.valid_coupon_text,
                    shipping_taxes_discounts_language_settings: c.shipping_taxes_discounts_language_settings,
                };
                const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
                const a = dataTranslator;
                const b = stateData;
                if (!equals(a, b)) {
                    thisEquals = false;
                };
            };
        }
        return thisEquals
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
    };

    updateLanguage = async (props) => {
        this.setState({
            loading: true
        });
        if (!!props) {
            const bodyTranslator =
            {
                cart_title_language_settings: props.cart_title_language_settings,
                cart_empty_text_language_settings: props.cart_empty_text_language_settings,
                add_to_cart_language_settings: props.add_to_cart_language_settings,
                rc_withOutSub_in_upsell_language_settings: props.rc_withOutSub_in_upsell_language_settings,
                rc_withSub_in_upsell_language_settings: props.rc_withSub_in_upsell_language_settings,
                rc_upgrade_language_settings: props.rc_upgrade_language_settings,
                rc_downgrade_language_settings: props.rc_downgrade_language_settings,
                add_in_upsell_language_settings: props.add_in_upsell_language_settings,
                shopping_cart_language_settings: props.shopping_cart_language_settings,
                product_language_settings: props.product_language_settings,
                products_language_settings: props.products_language_settings,
                subtotal_language_settings: props.subtotal_language_settings,
                clear_all_language_settings: props.clear_all_language_settings,
                remove_language_settings: props.remove_language_settings,
                sold_out_language_settings: props.sold_out_language_settings,
                unavailable_language_settings: props.unavailable_language_settings,
                free_language_settings: props.free_language_settings,
                free_gnral_language_settings: props.free_gnral_language_settings,
                add_discount_code_language_settings: props.add_discount_code_language_settings,
                discount_applied_language_settings: props.discount_applied_language_settings,
                checkout_button_textlanguage_settings: props.checkout_button_textlanguage_settings,
                vendor_key_text_language_settings: props.vendor_key_text_language_settings,
                subscription_text_language_settings: props.subscription_text_language_settings,
                valid_coupon_text: props.valid_coupon_text,
                shipping_taxes_discounts_language_settings: props.shipping_taxes_discounts_language_settings,
            }
                ;

            const requestBody = bodyTranslator;
            const method = 'PUT';
            const app = this.context;
            const updateLanguage = await makePutPostRequest('/api/language', method, requestBody, app);
            var messageError = '';
            if (updateLanguage.error && updateLanguage.message) {
                messageError = updateLanguage.message;
            };
            await this.getLanguage();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            dataTranslator,
            loading,
            toast,
            messageError,
            cart_title_language_settings,
            cart_empty_text_language_settings,
            add_to_cart_language_settings,
            rc_withOutSub_in_upsell_language_settings,
            rc_withSub_in_upsell_language_settings,
            rc_upgrade_language_settings,
            rc_downgrade_language_settings,
            add_in_upsell_language_settings,
            shopping_cart_language_settings,
            product_language_settings,
            products_language_settings,
            subtotal_language_settings,
            clear_all_language_settings,
            remove_language_settings,
            sold_out_language_settings,
            unavailable_language_settings,
            free_language_settings,
            free_gnral_language_settings,
            add_discount_code_language_settings,
            discount_applied_language_settings,
            checkout_button_textlanguage_settings,
            vendor_key_text_language_settings,
            subscription_text_language_settings,
            valid_coupon_text,
            shipping_taxes_discounts_language_settings
        } = this.state;

        const equals = this.validateData(this.state);

        const text_language_settings = <div>
            Do not modify the content that is between: <InlineCode> {"{{"}{"}}"}
            </InlineCode> (curly suspenders) and not the same ones, which is the amount to be discounted.
        </div>;

        const contentLanguageSettings =
            <Card>
                <BlockStack gap={400}>
                    <TextField label={<Titles text='Cart Title' />} value={cart_title_language_settings} onChange={(value) => { this.handleOnChange(value, "cart_title_language_settings") }} />
                    <TextField label={<Titles text='Cart empty text' />} value={cart_empty_text_language_settings} onChange={(value) => { this.handleOnChange(value, "cart_empty_text_language_settings") }} />
                    <TextField label={<Titles text='Add To Cart' />} value={add_to_cart_language_settings} onChange={(value) => { this.handleOnChange(value, "add_to_cart_language_settings") }} />
                    <TextField label={<Titles text='Without Subscription In Upsells' />} value={rc_withOutSub_in_upsell_language_settings} onChange={(value) => { this.handleOnChange(value, "rc_withOutSub_in_upsell_language_settings") }} />
                    <TextField label={<Titles text='With Subscription In Upsells' />} value={rc_withSub_in_upsell_language_settings} onChange={(value) => { this.handleOnChange(value, "rc_withSub_in_upsell_language_settings") }} />
                    <TextField label={<Titles text='Upgrade' />} value={rc_upgrade_language_settings} onChange={(value) => { this.handleOnChange(value, "rc_upgrade_language_settings") }} />
                    <TextField label={<Titles text='Downgrade' />} value={rc_downgrade_language_settings} onChange={(value) => { this.handleOnChange(value, "rc_downgrade_language_settings") }} />

                    <TextField label={<Titles text='Add In Upsells' />} value={add_in_upsell_language_settings} onChange={(value) => { this.handleOnChange(value, "add_in_upsell_language_settings") }} />
                    <TextField label={<Titles text='Shopping Cart' />} value={shopping_cart_language_settings} onChange={(value) => { this.handleOnChange(value, "shopping_cart_language_settings") }} />
                    <TextField label={<Titles text='Product' />} value={product_language_settings} onChange={(value) => { this.handleOnChange(value, "product_language_settings") }} />
                    <TextField label={<Titles text='Products' />} value={products_language_settings} onChange={(value) => { this.handleOnChange(value, "products_language_settings") }} />
                    <TextField label={<Titles text='Subtotal' />} value={subtotal_language_settings} onChange={(value) => { this.handleOnChange(value, "subtotal_language_settings") }} />
                    <TextField label={<Titles text='Clear all' />} value={clear_all_language_settings} onChange={(value) => { this.handleOnChange(value, "clear_all_language_settings") }} />
                    <TextField label={<Titles text='Remove' />} value={remove_language_settings} onChange={(value) => { this.handleOnChange(value, "remove_language_settings") }} />
                    <TextField label={<Titles text='Sold out' />} value={sold_out_language_settings} onChange={(value) => { this.handleOnChange(value, "sold_out_language_settings") }} />
                    <TextField label={<Titles text='Unavailable' />} value={unavailable_language_settings} onChange={(value) => { this.handleOnChange(value, "unavailable_language_settings") }} />
                    <TextField label={<Titles text='Free discount' />} value={free_language_settings} onChange={(value) => { this.handleOnChange(value, "free_language_settings") }} />
                    <TextField label={<Titles text='Free In All Slide Cart' />} value={free_gnral_language_settings} onChange={(value) => { this.handleOnChange(value, "free_gnral_language_settings") }} />
                    <TextField label={<Titles text='Add discount code if applicable' />} value={add_discount_code_language_settings} onChange={(value) => { this.handleOnChange(value, "add_discount_code_language_settings") }} />
                    <TextField label={<Titles text='Discount of money applied' />} value={discount_applied_language_settings} onChange={(value) => { this.handleOnChange(value, "discount_applied_language_settings") }}
                        helpText={text_language_settings} />
                    <TextField label={<Titles text='Checkout button text' />} value={checkout_button_textlanguage_settings} onChange={(value) => { this.handleOnChange(value, "checkout_button_textlanguage_settings") }} />
                    <TextField label={<Titles text='Vendor key text' />} value={vendor_key_text_language_settings} onChange={(value) => { this.handleOnChange(value, "vendor_key_text_language_settings") }} />
                    <TextField label={<Titles text='Subscription text' />} value={subscription_text_language_settings} onChange={(value) => { this.handleOnChange(value, "subscription_text_language_settings") }} />
                    <TextField label={<Titles text='Please Enter Valid Coupon Code' />} value={valid_coupon_text} onChange={(value) => { this.handleOnChange(value, "valid_coupon_text") }} />
                    <TextField label={<Titles text='Shipping, taxes, and discounts calculated at checkout' />} value={shipping_taxes_discounts_language_settings} onChange={(value) => { this.handleOnChange(value, "shipping_taxes_discounts_language_settings") }} />
                </BlockStack>
            </Card>;

        var Object_rows = [];
        for (var i = 0; i < 23; i++) {
            Object_rows.push(<BlockStack key={i} gap={200}><SkeletonDisplayText size="small" />
                <SkeletonBodyText size="small" lines={1} /></BlockStack>);
        }

        const SkeletonBody = <Card>
            <BlockStack gap={500}>
                {Object_rows}
            </BlockStack>
        </Card>;

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Translator updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataTranslator !== null ?
                    <BlockStack gap={500}>
                        {contentLanguageSettings}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateLanguage(this.state)} discard={() => { this.discard(dataTranslator) }} />
                    </BlockStack> : SkeletonBody}
            </div>
        );
    }
    handleOnChange = (value, thisSate) => {
        //var newState = stateNow;
        var stateData = {};
        stateData[thisSate] = value;
        this.setState(stateData);
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
}
export default Translator;