import { Component } from "react";
import {
    Card,
    Banner,
    Text,
    DropZone,
    EmptyState,
    Button,
    Toast,
    SkeletonBodyText,
    SkeletonTabs,
    BlockStack
} from '@shopify/polaris';
import { Toogle, SaveBar, Titles, ToogleSkeleton } from "@components/";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';
class Payment_Badges extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            dataPaymentBadges: null,
            loading: true,
            enabled_payment_badges: true,
            contentStatus_payment: null,
            url_img_host: null,
            file_payment: [],
        }
    }
    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);
            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
    file_payment = file_payment => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
        let { file } = this.state;
        file = file_payment[0];
        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                this.setState({
                    base64: result,
                    file
                });
            },
            )
            .catch(err => {
                this.notifyError(err, 'file_payment');
            });
        validImageTypes.includes(file.type) && Math.round(file.size / 1024) < 2048 ? this.setState({ file_payment: file_payment }) : this.setState({ toast: true, messageError: `Unsupported Image: only 'jpeg', 'png', 'gif', 'svg' or size max 2mb.` })
    };

    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };

    getPaymentBadges = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_payment_badges', app);
        if (data && data.payment_badges !== undefined && data.payment_badges !== null) {
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

    updatePayment = async (props) => {
        this.setState({
            loading: true
        });
        const method = 'PUT';
        const app = this.context;
        var requestBody = {
            enabled_payment_badges: props.enabled_payment_badges,
            /* file_payment: props.file_payment[0].base64, */
        };
        if (props.file_payment.length > 0) {
            requestBody = Object.assign({}, requestBody, { file_payment: props.file_payment[0].base64 });
        };
        const updatePaymentBadges = await makePutPostRequest('/api/payment_badges', method, requestBody, app);
        var messageError = '';
        if (updatePaymentBadges.error && updatePaymentBadges.message) {
            messageError = updatePaymentBadges.message;
        };
        await this.getPaymentBadges();
        this.setState({ toast: true, messageError: messageError })
    };

    originalData = (identify, data) => {
        var myData = {};
        if (!identify) {
            myData = {
                dataPaymentBadges: data
            };
        };
        const paymentBadges = data.payment_badges;

        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            file_payment: [],
            enabled_payment_badges: paymentBadges.enabled_payment_badges,
            url_img_host: paymentBadges.url_img_host
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

    discard = () => {
        var c = this.state.dataPaymentBadges;
        this.originalData(1, c);
        this.props.updateGridItems({ payment_badges: c.payment_badges.enabled_payment_badges });
    };

    validateData = () => {
        var thisEquals = true;
        const w = this.state;
        const stateData = {
            enabled_payment_badges: +w.enabled_payment_badges
        };

        const dataPaymentBadges = this.state.dataPaymentBadges;
        if (dataPaymentBadges !== null) {
            const c = dataPaymentBadges.payment_badges;
            const data_payment_badges = {
                enabled_payment_badges: +c.enabled_payment_badges
            }
            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = data_payment_badges;
            const b = stateData;
            if (!equals(a, b)) {
                thisEquals = false;
            };
            //const c = myCustomize.customize[0];

        };
        return thisEquals;
    };
    componentDidMount() {
        this.getPaymentBadges();
    };

    render() {
        const {
            dataPaymentBadges,
            loading,
            enabled_payment_badges,
            url_img_host,
            file_payment,
            toast,
            messageError } = this.state;

        var equals = this.validateData();
        if (equals) {
            equals = file_payment.length <= 0;
        }
        const banner_payments =
            <div className='bannerPayments'>
                <Banner
                    title="Payment Badges"
                    tone="warning"
                >
                    <Text>We recommend a 450px X 50px image.</Text>
                </Banner>
            </div>;


        const fileUpload = /* !file_payment.length && */ <DropZone.FileUpload actionHint={<Text fontWeight='medium' variant="headingSm" as="span">or drop files to upload</Text>} actionTitle='Add file' />;


        const uploadedFiles = url_img_host && file_payment.length == 0 ?
            (
                <EmptyState
                    image={this.state.url_img_host ? this.state.url_img_host + "?v=" + Math.random().toString(36).substring(2, 7) : null}>
                </EmptyState>
            ) :
            (
                this.state.file_payment.map((file, index) => (
                    <EmptyState key={index}
                        image={
                            window.URL.createObjectURL(file)
                        }>
                    </EmptyState>
                ))
            );
        const imagecss =  url_img_host || file_payment.length > 0 ? ' hs_payment_image' : '';
        const payment_badges =
            <Card>
                <BlockStack gap={200}>
                    <Titles text="Select Image:" />
                    <div className={"hs_payment_badges" + imagecss}>
                        <DropZone accept="image/jpeg, image/png, image/gif, image/svg+xml" type="image" allowMultiple={false} onDrop={this.file_payment} >
                            {uploadedFiles}
                            {fileUpload}
                        </DropZone>
                    </div>
                </BlockStack>
            </Card>;

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Payment Badges updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const loadingComponent = loading ? <Loading /> : null;
       
        return (
            <div>
                {loadingComponent}
                {dataPaymentBadges === null ? <ToogleSkeleton /> :
                <BlockStack gap={500}>
                    <Toogle enabled={enabled_payment_badges} title='Payment Badges' description="Trust badges are an important element to add to your arsenal of trust building techniques- they are an element of the certification social proof, and can help you improve your store's conversion rate." stateText='The payment badges are' activeToogle={() => this.changeStateBoolean('enabled_payment_badges')}></Toogle>
                    {banner_payments}
                    {payment_badges}
                    <ThisToast />
                    <SaveBar equals={equals} loading={loading} action={() => this.updatePayment(this.state)} discard={() => { this.discard() }} />
                </BlockStack>}
            </div>
        );
    }
    changeStateBoolean = (thisSate) => {
        var stateNow = this.state[thisSate];
        this.setState({ [thisSate]: !stateNow });
        this.props.updateGridItems({ payment_badges: !stateNow });
    };
}
export default Payment_Badges;