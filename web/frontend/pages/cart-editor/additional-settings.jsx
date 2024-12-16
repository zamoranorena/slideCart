import { Component } from "react";
import {
    Card,
    Text,
    Checkbox,
    Modal,
    Select,
    Toast,
    BlockStack,
    InlineCode,
    SkeletonBodyText,
    SkeletonDisplayText,
    Divider
} from '@shopify/polaris';
import { hideSlide } from "../../assets";
import { SaveBar, Titles } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';

class AdditionalSettings extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            messageError: '',
            loading: true,
            toast: false,
            dataAdditionalSettings: null,
            hide_cart: null,
            hide_decimal: null,
            hide_discount_money_cart: null,
            add_url_item_cart: null,
            reverse_currency_symbol: null,
            prices_reverse_order: null,
            hide_slide_cart: null,
            show_especial: null,
            show_discount: null,
            show_clear_all: null,
            show_products_count: null,
            show_prices_x_qty: null,
            show_compare_price: null,
            show_save_item: null,
            base_price_for_discount: null,
            show_discount_order_x_item: null,
            hidden_variant_title_cart: null,
            show_product_property: null,
            show_weight: null,
            show_unit_price: null,
            show_quantity_box_cart: null,
            hidden_quantity_box_cart_free: null,
            show_quantity_box_upsells: null,
            selected_subscribe_upsell: null,
            add_utm: null,
            cart_links: null,
            open_cart: null,
            show_subscription_option: null,
            show_subscription_option_upsell: null,
            image_quality: null,
            image_container: null,
        };
    };
    componentDidMount() {

        this.getAdditionalSettings();
    };
    getAdditionalSettings = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_additional_settings', app);
        if (data && data.additional_settings !== undefined && data.additional_settings !== null) {
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
                dataAdditionalSettings: data
            };
        };
        const additional_settings = data.additional_settings;

        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            hide_cart: additional_settings.hide_cart,
            hide_decimal: additional_settings.hide_decimal,
            hide_discount_money_cart: additional_settings.hide_discount_money_cart,
            add_url_item_cart: additional_settings.add_url_item_cart,
            reverse_currency_symbol: additional_settings.reverse_currency_symbol,
            prices_reverse_order: additional_settings.prices_reverse_order,
            hide_slide_cart: additional_settings.hide_slide_cart,
            show_especial: additional_settings.show_especial,
            show_discount: additional_settings.show_discount,
            show_clear_all: additional_settings.show_clear_all,
            show_products_count: additional_settings.show_products_count,
            show_prices_x_qty: additional_settings.show_prices_x_qty,
            show_compare_price: additional_settings.show_compare_price,
            show_save_item: additional_settings.show_save_item,
            base_price_for_discount: additional_settings.base_price_for_discount,
            show_discount_order_x_item: additional_settings.show_discount_order_x_item,
            hidden_variant_title_cart: additional_settings.hidden_variant_title_cart,
            show_product_property: additional_settings.show_product_property,
            show_weight: additional_settings.show_weight,
            show_unit_price: additional_settings.show_unit_price,
            show_quantity_box_cart: additional_settings.show_quantity_box_cart,
            hidden_quantity_box_cart_free: additional_settings.hidden_quantity_box_cart_free,
            show_quantity_box_upsells: additional_settings.show_quantity_box_upsells,
            selected_subscribe_upsell: additional_settings.selected_subscribe_upsell,
            add_utm: additional_settings.add_utm,
            cart_links: additional_settings.cart_links,
            open_cart: additional_settings.open_cart,
            show_subscription_option: additional_settings.show_subscription_option,
            show_subscription_option_upsell: additional_settings.show_subscription_option_upsell,
            image_quality: additional_settings.image_quality,
            image_container: additional_settings.image_container
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
            hide_cart: +props.hide_cart,
            hide_decimal: +props.hide_decimal,
            hide_discount_money_cart: +props.hide_discount_money_cart,
            add_url_item_cart: +props.add_url_item_cart,
            reverse_currency_symbol: +props.reverse_currency_symbol,
            prices_reverse_order: +props.prices_reverse_order,
            hide_slide_cart: +props.hide_slide_cart,
            show_especial: +props.show_especial,
            show_discount: +props.show_discount,
            show_clear_all: +props.show_clear_all,
            show_products_count: +props.show_products_count,
            show_prices_x_qty: +props.show_prices_x_qty,
            show_compare_price: +props.show_compare_price,
            show_save_item: +props.show_save_item,
            base_price_for_discount: +props.base_price_for_discount,
            show_discount_order_x_item: +props.show_discount_order_x_item,
            hidden_variant_title_cart: +props.hidden_variant_title_cart,
            show_product_property: +props.show_product_property,
            show_weight: +props.show_weight,
            show_unit_price: +props.show_unit_price,
            show_quantity_box_cart: +props.show_quantity_box_cart,
            hidden_quantity_box_cart_free: +props.hidden_quantity_box_cart_free,
            show_quantity_box_upsells: +props.show_quantity_box_upsells,
            selected_subscribe_upsell: +props.selected_subscribe_upsell,
            add_utm: +props.add_utm,
            cart_links: +props.cart_links,
            open_cart: +props.open_cart,
            show_subscription_option: +props.show_subscription_option,
            show_subscription_option_upsell: +props.show_subscription_option_upsell,
            image_quality: props.image_quality,
            image_container: props.image_container,
        };
        const dataAdditionalSettings = props.dataAdditionalSettings;
        if (dataAdditionalSettings !== null) {
            const pa = dataAdditionalSettings.additional_settings;
            const data_additional_settings = {
                hide_cart: +pa.hide_cart,
                hide_decimal: +pa.hide_decimal,
                hide_discount_money_cart: +pa.hide_discount_money_cart,
                add_url_item_cart: +pa.add_url_item_cart,
                reverse_currency_symbol: +pa.reverse_currency_symbol,
                prices_reverse_order: +pa.prices_reverse_order,
                hide_slide_cart: +pa.hide_slide_cart,
                show_especial: +pa.show_especial,
                show_discount: +pa.show_discount,
                show_clear_all: +pa.show_clear_all,
                show_products_count: +pa.show_products_count,
                show_prices_x_qty: +pa.show_prices_x_qty,
                show_compare_price: +pa.show_compare_price,
                show_save_item: +pa.show_save_item,
                base_price_for_discount: +pa.base_price_for_discount,
                show_discount_order_x_item: +pa.show_discount_order_x_item,
                hidden_variant_title_cart: +pa.hidden_variant_title_cart,
                show_product_property: +pa.show_product_property,
                show_weight: +pa.show_weight,
                show_unit_price: +pa.show_unit_price,
                show_quantity_box_cart: +pa.show_quantity_box_cart,
                hidden_quantity_box_cart_free: +pa.hidden_quantity_box_cart_free,
                show_quantity_box_upsells: +pa.show_quantity_box_upsells,
                selected_subscribe_upsell: +pa.selected_subscribe_upsell,
                add_utm: +pa.add_utm,
                cart_links: +pa.cart_links,
                open_cart: +pa.open_cart,
                show_subscription_option: +pa.show_subscription_option,
                show_subscription_option_upsell: +pa.show_subscription_option_upsell,
                image_quality: pa.image_quality,
                image_container: pa.image_container,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_additional_settings;
            const b = stateData;

            if (!equals(a, b)) {
                thisEquals = false;
            };
        }
        return thisEquals;
    };

    discard = (props) => {
        props ? this.originalData(1, props) : '';
    };

    updateAdditionalSettings = async (props) => {
        if (props) {
            this.setState({
                loading: true
            });
            const method = 'PUT';
            const app = this.context;
            const requestBody = {
                hide_cart: props.hide_cart,
                hide_decimal: props.hide_decimal,
                hide_discount_money_cart: props.hide_discount_money_cart,
                add_url_item_cart: props.add_url_item_cart,
                reverse_currency_symbol: props.reverse_currency_symbol,
                prices_reverse_order: props.prices_reverse_order,
                hide_slide_cart: props.hide_slide_cart,
                show_especial: props.show_especial,
                show_discount: props.show_discount,
                show_clear_all: props.show_clear_all,
                show_products_count: props.show_products_count,
                show_prices_x_qty: props.show_prices_x_qty,
                show_compare_price: props.show_compare_price,
                show_save_item: props.show_save_item,
                base_price_for_discount: props.base_price_for_discount,
                show_discount_order_x_item: props.show_discount_order_x_item,
                hidden_variant_title_cart: props.hidden_variant_title_cart,
                show_product_property: props.show_product_property,
                show_weight: props.show_weight,
                show_unit_price: props.show_unit_price,
                show_quantity_box_cart: props.show_quantity_box_cart,
                hidden_quantity_box_cart_free: props.hidden_quantity_box_cart_free,
                show_quantity_box_upsells: props.show_quantity_box_upsells,
                selected_subscribe_upsell: props.selected_subscribe_upsell,
                add_utm: props.add_utm,
                cart_links: props.cart_links,
                open_cart: props.open_cart,
                show_subscription_option: props.show_subscription_option,
                show_subscription_option_upsell: props.show_subscription_option_upsell,
                image_quality: props.image_quality,
                image_container: props.image_container,
            };

            const updateAdditionalSettings = await makePutPostRequest('/api/additional_settings', method, requestBody, app);
            var messageError = '';
            if (updateAdditionalSettings.error && updateAdditionalSettings.message) {
                messageError = updateAdditionalSettings.message;
            };
            await this.getAdditionalSettings();
            this.setState({ toast: true, messageError: messageError })
        };
    };
    render() {
        const {
            messageError,
            loading,
            toast,
            dataAdditionalSettings,
            hide_decimal,
            hide_discount_money_cart,
            add_url_item_cart,
            reverse_currency_symbol,
            prices_reverse_order,
            hide_slide_cart,

            show_clear_all,
            show_products_count,
            show_prices_x_qty,
            show_compare_price,
            show_save_item,
            base_price_for_discount,
            show_discount_order_x_item,
            hidden_variant_title_cart,
            show_product_property,
            show_weight,
            show_unit_price,
            show_quantity_box_cart,
            hidden_quantity_box_cart_free,
            show_quantity_box_upsells,
            selected_subscribe_upsell,
            add_utm,
            open_cart,
            show_subscription_option,
            show_subscription_option_upsell,
            image_quality,
            image_container,
        } = this.state;
        const equals = this.validateData(this.state);

        const activator_modal_video = <div style={{ cursor: "pointer" }} onClick={() => { this.setState({ modal_video: 1 }); }} ><InlineCode variation="code" >Watch Video</InlineCode></div>;

        const modal_video_hide_slide = !!this.state.modal_video ?
            <div>
                <Modal
                    size="large"
                    activator={activator_modal_video}
                    open={this.state.modal_video}
                    onClose={() => { this.setState({ modal_video: false }) }}
                    title="Hide Slide"
                >
                    <Modal.Section>
                        <video width="100%" height="auto" controls autoPlay muted>
                            <source src={hideSlide} type='video/mp4' />
                            Your browser does not support HTML5.
                        </video>
                    </Modal.Section>
                </Modal>
            </div> : null;


        const content_additional_settings =
            <Card>
                <BlockStack gap={400}>
                    <Text as="h1" variant="headingMd">Additional settings</Text>
                    <Checkbox
                        label={<Titles text="Hide Slide Cart only Cart page?" />}
                        checked={hide_slide_cart}
                        helpText={<div>When selected, the Slide Cart is deactivated when you are in the Cart page.{activator_modal_video}</div>}
                        onChange={() => this.handleChange("hide_slide_cart")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Hide decimals (,00) or (.00) " />}
                        checked={hide_decimal}
                        helpText="When selected, decimals with (00) will not be seen."
                        onChange={() => this.handleChange("hide_decimal")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Hide discount money text in cart" />}
                        checked={hide_discount_money_cart}
                        onChange={() => this.handleChange("hide_discount_money_cart")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Add url to the title of products added to the cart" />}
                        checked={add_url_item_cart}
                        onChange={() => this.handleChange("add_url_item_cart")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Reverse currency Symbol(Only EURO)" />}
                        checked={reverse_currency_symbol}
                        helpText="When selected, the symbol appears at the end."
                        onChange={() => this.handleChange("reverse_currency_symbol")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Prices Reverse Order" />}
                        checked={prices_reverse_order}
                        helpText="When selected, the order of price and compare price is reversed."
                        onChange={() => this.handleChange("prices_reverse_order")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Clear All" />}
                        checked={show_clear_all}
                        helpText="When selected, the option to empty the cart completely will be displayed."
                        onChange={() => this.handleChange("show_clear_all")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Products Count" />}
                        checked={show_products_count}
                        helpText="When selected, the amount of products added will be visible in the header of the slide cart."
                        onChange={() => this.handleChange("show_products_count")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Prices Slide Cart according to  quantity" />}
                        checked={show_prices_x_qty}
                        helpText="When selected, the prices will be according to the quantity."
                        onChange={() => this.handleChange("show_prices_x_qty")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Compare at price" />}
                        checked={show_compare_price}
                        helpText="When selected, the option will be visible next to the price."
                        onChange={() => this.handleChange("show_compare_price")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Save Item" />}
                        checked={show_save_item}
                        onChange={() => this.handleChange("show_save_item")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show discounts from base price instead of from compare at price" />}
                        checked={base_price_for_discount}
                        onChange={() => this.handleChange("base_price_for_discount")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show discounts applied to the order, to each of the products" />}
                        checked={show_discount_order_x_item}
                        onChange={() => this.handleChange("show_discount_order_x_item")}
                    />
                    <Divider />
                    <Checkbox
                        label={<Titles text="Hidden product variant title in cart" />}
                        checked={hidden_variant_title_cart}
                        helpText="When selected, the variant title will be hidden."
                        onChange={() => this.handleChange("hidden_variant_title_cart")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Product Property" />}
                        checked={show_product_property}
                        helpText="When selected, the properties of the product will be visible in the slide cart."
                        onChange={() => this.handleChange("show_product_property")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Weight" />}
                        checked={show_weight}
                        helpText="When selected, the weight of the product will be visible in the slide cart."
                        onChange={() => this.handleChange("show_weight")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Unit Price" />}
                        checked={show_unit_price}
                        helpText="When selected, the unit price of the product will be visible in the slide cart."
                        onChange={() => this.handleChange("show_unit_price")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Quantity Box In Cart" />}
                        checked={show_quantity_box_cart}
                        helpText="When selected, the box quantity of the added product will be visible."
                        onChange={() => this.handleChange("show_quantity_box_cart")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Hidden Quantity Box In Cart Free Item" />}
                        checked={hidden_quantity_box_cart_free}
                        helpText="When selected, the box quantity of the added product will not be visible if the title contains the word 'free'."
                        onChange={() => this.handleChange("hidden_quantity_box_cart_free")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show Quantity Box In Upsells" />}
                        checked={show_quantity_box_upsells}
                        helpText="When selected, the box quantity will be visible in cart upsell."
                        onChange={() => this.handleChange("show_quantity_box_upsells")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Add UTM tags to product URLs in cart  drawer?" />}
                        checked={add_utm}
                        helpText="When selected, The app will add ?utm_source=slide-cart-drawer-upsell to the products in cart and suggestions."
                        onChange={() => this.handleChange("add_utm")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Selected default subscribe only Recharge" />}
                        checked={selected_subscribe_upsell}
                        helpText="When selected, the subscribe option for upsells is checked from the start."
                        onChange={() => this.handleChange("selected_subscribe_upsell")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Open cart drawer when an item is added to  cart?" />}
                        checked={open_cart}
                        helpText="When selected, The drawer will open upon add to cart."
                        onChange={() => this.handleChange("open_cart")}
                    />
                    <Divider />
                    <Checkbox
                        label={<Titles text="Show subscription option in cart (BETA)" />}
                        checked={show_subscription_option}
                        onChange={() => this.handleChange("show_subscription_option")}
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Checkbox
                        label={<Titles text="Show subscription option in upsell" />}
                        checked={show_subscription_option_upsell}
                        onChange={() => this.handleChange("show_subscription_option_upsell")}
                    />
                    <Divider borderColor="border-inverse" />
                    <Select
                        label={<Text variant="bodySm" fontWeight='bold'>PRODUCT IMAGE QUALITY</Text>}
                        options={[
                            { label: 'Small (fastest load times) ', value: 'x120' },
                            { label: 'Compact', value: 'x160' },
                            { label: 'Medium ', value: 'x240' },
                            { label: 'Large', value: 'x480' },
                            { label: 'Big', value: 'x600' },
                            { label: '1024 x 1024', value: 'x1024' },
                            { label: '2048 x 2048', value: 'x2048' },
                        ]}
                        value={image_quality}
                        onChange={(value) => { this.handleOnChange(value, "image_quality") }}
                        helpText="Image quality to use for cart items and upsells.Consider that the higher the image quality the slower the loading time."
                    />
                    <Divider borderColor="border-tertiary"/>
                    <Select
                        label={<Text variant="bodySm" fontWeight='bold'>PRODUCT IMAGE CONTAINER</Text>}
                        options={[
                            { label: 'Normal', value: '70' },
                            { label: 'Medium ', value: '90' },
                            { label: 'Big', value: '120' },
                        ]}
                        value={image_container}
                        onChange={(value) => { this.handleOnChange(value, "image_container") }}
                        helpText="Choose a size to display the product image."
                    />
                </BlockStack>
            </Card>;


        var Object_rows = [];
        for (var i = 0; i < 22; i++) {
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
                        <Toast content="Additional Settings updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {dataAdditionalSettings !== null ?
                    <BlockStack gap={500}>
                        {content_additional_settings}
                        {modal_video_hide_slide}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateAdditionalSettings(this.state)} discard={() => { this.discard(dataAdditionalSettings) }} />
                    </BlockStack> : SkeletonBody}
            </div>
        );
    }
    handleChange = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
    };
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
export default AdditionalSettings;