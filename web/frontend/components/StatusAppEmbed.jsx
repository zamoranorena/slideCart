import React from "react";
import { Banner, Card } from "@shopify/polaris";
import { Context } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';
import { useQuery } from "react-query";


export class StatusAppEmbed extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            embed_app: null,
            general_app: this.props.generalApp,
        };
    };

    render() {
        const app = this.context;
        const fetchEmbedApp = async () => {
            const res = await makeGetRequest('/api/verify', app);
            return res;
        };

        const BannerState = ({ isLoading, data }) => {
            var banner = '';
            if (isLoading) {
                banner = '';
            } else {
                const status_app = data.activeEmbedApp != 1 ? 0 : 1;
                if (!status_app) {
                    banner = <Card padding="0">
                        <Banner
                        action={{
                            content: 'Active Slide Cart Drawer—Cart Upsell',
                            onAction: () => window.open(`https://${this.props.shopOrigin}/admin/themes/current/editor?context=apps&template&activateAppId=06f96c51-92d4-4ccf-8798-f65ef7359208/slide-cart-app-embed`) }}
                        title="Slide Cart Drawer—Cart Upsell not active"
                        tone="critical">
                            <p>
                                Enable App Embed V2 on Theme Editor
                            </p>
                        </Banner>
                    </Card>
                };
            };
            return banner;
        };

        const Query = () => {
            const { data,
                error,
                failureCount,
                isError,
                isFetchedAfterMount,
                isFetching,
                isIdle,
                isLoading,
                isPreviousData,
                isStale,
                isSuccess,
                refetch,
                remove,
                status, } = useQuery("users", fetchEmbedApp, {
                    refetchOnWindowFocus: true,
                    staleTime: 2000,
                });

            return (
                <BannerState isLoading={isLoading} data={data} REFETCH={refetch} />
            );
        };
        return (
            <Query />
        );
    }
}
