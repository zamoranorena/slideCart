import { Component } from "react";
import { Frame, Layout, Box, Card, Text, Toast, SkeletonBodyText, BlockStack } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context,Loading } from '@shopify/app-bridge-react';

import { EditorCode, SaveBar } from "../../components";
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';


class CustomJs extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            dataCustomJs: [],
            customJs: null,
            loading: false,
            toast: false,
            messageError: ''
        }
    };
    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };

    discard = () => {
        var c = this.state.dataCustomJs;
        this.originalData(1, c);
    };

    originalData = (identify, data) => {
        var myData = {};
        if (!identify) {
            myData = {
                dataCustomJs: data
            };
        };
        data = data.dataCustomJs[0];
        var stateData = {
            messageError: '',
            loading: false,
            toast: false,
            customJs: data.customJs
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

    getCustom = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_customjs', app);
        if (data && data.dataCustomJs !== undefined && data.dataCustomJs !== null) {
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

    updateCustom = async (props) => {
        this.setState({
            loading: true
        });
        if (!!props) {
            const requestBody = {
                customJs: props.customJs
            };
            const method = 'PUT';
            const app = this.context;

            const updateCustom = await makePutPostRequest('/api/custom_js', method, requestBody, app);
            var messageError = '';
            if (updateCustom.error && updateCustom.message) {
                messageError = updateCustom.message;
            };
            await this.getCustom();
            this.setState({ toast: true, messageError: messageError })
        }
    };
    componentDidMount() {
        this.getCustom();
    }
    onChanges = (state, newValue) => {
        this.setState({ [state]: newValue });
    }

    validateData = () => {
        var thisEquals = true;
        const w = this.state;
        const stateData = {
            customJs: w.customJs
        };

        const myCustomJs = this.state.dataCustomJs;
        if (typeof myCustomJs.dataCustomJs !== 'undefined' || myCustomJs.length > 0) {
            const c = myCustomJs.dataCustomJs[0];
            const dataCustom = {
                customJs: c.customJs
            }
            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = dataCustom;
            const b = stateData;
            if (!equals(a, b)) {
                thisEquals = false;
            };
        };
        return thisEquals;
    };


    render() {
        const { dataCustomJs, customJs, loading, toast, messageError } = this.state
        var equals = this.validateData();
        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Custom Js updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };
        const skeletonCustom = <div>
            <Frame>
                <Loading active={true} />
                <Layout>
                    <Layout.Section>
                        <BlockStack gap={500}>
                            <Card>
                                <Box padding="200">
                                    <SkeletonBodyText lines={2} />
                                </Box>
                            </Card>
                            <Card>
                                <SkeletonBodyText lines={35} />
                            </Card>
                        </BlockStack>
                    </Layout.Section>
                </Layout>
            </Frame>
        </div>;

        const loadingComponent = loading ? <Loading /> : null;
        return (
            (typeof dataCustomJs.dataCustomJs === 'undefined') ? skeletonCustom :
                <div>
                    {loadingComponent}
                    <Box paddingBlockEnd="400">
                        <BlockStack gap="500">
                            <Card>
                                <BlockStack gap={200}>
                                    <Text variant="headingLg" as="h5">
                                        Custom JavaScript
                                    </Text>
                                    <Text>
                                        The JS code will be applied. Without the need to place <script></script> tags
                                    </Text>
                                </BlockStack>
                            </Card>
                            <Card padding={0}>
                                <EditorCode value={customJs} language='javascript' changeState={(value) => this.setState({ customJs: value })} />
                            </Card>
                        </BlockStack>
                    </Box>
                    <SaveBar equals={equals} loading={loading} action={() => this.updateCustom(this.state)} discard={this.discard} />
                    <ThisToast />
                </div>
        );

    }

}
export default (CustomJs);