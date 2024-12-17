import { Component } from "react";
import {
    Toast,
    BlockStack,
} from '@shopify/polaris';
import { Toogle, SaveBar, SkeletonSimple } from "@components/";

import { Icon } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';
import { CheckCircleIcon } from '@shopify/polaris-icons';

import { makeGetRequest, makePutPostRequest } from '@utils/Services';
class Integratios extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            toast: null,
            messageError: '',
            integrations: [],
        };
    };
    getIntegrationsData = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_integrations', app);
        if (data && data.integrations !== undefined && data.integrations !== null) {
            var arr_integrations = [];
            for (let i = 0; i < data.integrations.length; i++) {
                arr_integrations.push({
                    id: data.integrations[i].id,
                    enabled_app: data.integrations[i].enabled_app,
                    integrations_app_title: data.integrations[i].integrations_app_title,
                    integrations_app_description: data.integrations[i].integrations_app_description,
                    automatic: data.integrations[i].automatic,
                    new: data.integrations[i].new
                })
            }
            this.setState({
                data: data.integrations,
                loading: false,
                integrations: arr_integrations
            });
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


    validateData = () => {
        const arr1 = this.state.data;
        const arr2 = this.state.integrations;
        for (var i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i].enabled_app !== arr2[i].enabled_app) {
                return false;
            };
        };
        return true;
    };

    discard = () => {
        this.setState({
            loading: false
        });
        if (this.state.data.length > 0) {
            const data = this.state.data;
            var arr_integrations = [];
            for (let i = 0; i < data.length; i++) {
                arr_integrations.push({
                    id: data[i].id,
                    enabled_app: data[i].enabled_app,
                    integrations_app_title: data[i].integrations_app_title,
                    integrations_app_description: data[i].integrations_app_description,
                    automatic: data[i].automatic
                })
            };
            this.setState({
                integrations: arr_integrations
            });
        }
    };

    updateIntegrations = async () => {
        this.setState({
            loading: true
        });
        const {
            data,
            integrations
        } = this.state
        var arr_integrations = [];
        for (let i = 0; i < integrations.length; i++) {
            arr_integrations.push({
                id: data[i].id,
                enabled_app: integrations[i].enabled_app
            });
        }
        const requestBody = {
            arr_integrations
        };

        const method = 'PUT';
        const app = this.context;
        const updateIntegrations = await makePutPostRequest('/api/integrations', method, requestBody, app);
        var messageError = '';
        if (updateIntegrations.error && updateIntegrations.message) {
            messageError = updateIntegrations.message;
        };
        await this.getIntegrationsData();
        this.setState({ toast: true, messageError: messageError })
    };

    async componentDidMount() {
        this.getIntegrationsData();
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
            toast,
            messageError,
            integrations,
        } = this.state;

        const equals = this.validateData();

        const ThisToast = () => {
            return (
                toast ?
                    messageError ?
                        <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                        <Toast content="Integrations updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
                    null
            );
        };

        var Object_rows = [];
        for (var i = 0; i < 7; i++) {
            Object_rows.push(<SkeletonSimple key={i} />);
        }

        const SkeletonBody = <BlockStack gap={500}>{Object_rows}</BlockStack>
        const loadingComponent = loading ? <Loading /> : null;
        return (
            <div>
                {loadingComponent}
                {data.length <= 0 ? SkeletonBody :
                    <BlockStack gap={500}>
                        {integrations.map((el, i) => (
                            el.automatic == 1 ?
                                <div key={i} className='integrationsAutomatic'>
                                    <Toogle
                                        key={i}
                                        enabled={true}
                                        title={el.integrations_app_title}
                                        description={el.integrations_app_description}
                                        stateText={'The' + el.integrations_app_title + ' integration is'}
                                        activeToogle={() => this.toggleIsDirty(i, 'enabled_app')}
                                        action={el.automatic == 1 ? <div className='iconCheckIntegrations'><Icon source={CheckCircleIcon} tone="success" /></div> : false}
                                    />
                                </div> :
                                <Toogle
                                    key={i}
                                    enabled={el.enabled_app}
                                    title={el.integrations_app_title}
                                    description={el.integrations_app_description}
                                    stateText={'The' + el.integrations_app_title + ' integration is'}
                                    activeToogle={() => this.toggleIsDirty(i, 'enabled_app')}
                                />))}
                        <ThisToast />
                        <SaveBar equals={equals} loading={loading} action={() => this.updateIntegrations(this.state)} discard={() => { this.discard() }} />
                    </BlockStack>}
            </div>
        );
    }
    toggleIsDirty = (indice, state) => {
        let integrations = [...this.state.integrations];
        var value = null;
        if (integrations[indice][state] == 1) {
            value = 0;
        } else {
            value = 1;
        };
        integrations[indice][state] = value;
        this.setState({ integrations });
    };

    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };
}
export default Integratios;