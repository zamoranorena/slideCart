import { Component } from "react";
import {Link, Icon, ButtonGroup, BlockStack, EmptyState, Pagination, LegacyCard, Box, Scrollable, Text, LegacyStack, Thumbnail, Button, Card, Page, Layout, List, SkeletonBodyText, SkeletonDisplayText, SkeletonPage } from '@shopify/polaris';
import { Context, Loading } from '@shopify/app-bridge-react';
// import {
//     StarFilledIcon
// } from '@shopify/polaris-icons';
import { withTranslation, Trans } from "react-i18next";
import { Redirect, TitleBar } from '@shopify/app-bridge/actions';
import { makeGetRequest, makePutPostRequest } from '../utils/Services';
class Recommended extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            listApps: [],
            listPartners: [],
            loading: false,
            activeModal: false,
            showBannerWarning: false,
            spinner: false,
            slide: {
                whiteSpace: null,
                transition: null,
                transform: null
            },
            currentSlideImage: 0,
            hasPrevious: false,
            hasNext: true,
            idSetInterval: null,
            totalImages: 0,
            server: null,
            skeletonP: true
        }
        // set interval
    }

    slideShow = (image, retro) => {
        const pathname = window.location.pathname;
        var item_featured = document.getElementsByClassName("item-featured");
        var rows = item_featured.length - 1;
        var cant_images = item_featured.length;
        var counter = image;
        this.setState({
            slide: {
                whiteSpace: 'nowrap',
                transition: 'all 1000ms ease 0s',
                transform: 'translate3d(-' + counter + '00%, 0px, 0px)',
            },
            currentSlideImage: counter,
        });
        // INTERVALO
        var data = setInterval(() => {
            if (pathname == "/recommendedapps") {
                if (retro) {
                    counter = counter - 1;
                    if (counter <= rows) {
                        this.setState({
                            slide: {
                                whiteSpace: 'nowrap',
                                transition: 'all 1000ms ease 0s',
                                transform: 'translate3d(-' + counter + '00%, 0px, 0px)',
                            },
                            currentSlideImage: counter,
                        });
                        if (counter == 0) {
                            retro = false;
                            this.setState({ hasNext: true, hasPrevious: false });
                        }
                    }
                } else {
                    counter = counter + 1;

                    if (counter <= rows) {

                        this.setState({
                            slide: {
                                whiteSpace: 'nowrap',
                                transition: 'all 1000ms ease 0s',
                                transform: 'translate3d(-' + counter + '00%, 0px, 0px)',
                            },
                            currentSlideImage: counter,
                        });
                        if (counter == rows) {
                            retro = true;
                            this.setState({ hasNext: false, hasPrevious: true });
                        }
                    }
                }
            } else {
                clearInterval(data);
            }
        }, 3000);
        this.setState({ idSetInterval: data, totalImages: cant_images });
    }

    titleBar = () => {
        const app = this.context;
        const data = { title: 'Recommended Apps' };
        const titleBarOptions = {
            title: data.title
        };
        TitleBar.create(app, titleBarOptions);
    };

    redirectToPage = (path) => {
        const app = this.context;
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, path);
    };

    // Obtiene la lista de apps recomendadas
    getRecommendedApps = async () => {
      const app = this.context;
        const result = await makeGetRequest('/api/get_recommended_apps', app);
        const error = result.error;
        if (!error) {
            const plan_status = result.plan_status;
            if (plan_status == 0) {
                this.redirectToPage("/plans");
            }
            this.setState({ listApps: result.data.recommended_apps, listPartners: result.data.partners, skeletonP: false, server: result.server });
            this.slideShow(0, false);
        } else {
            console.log(result.message);
        }
    };

    // onload
    async componentDidMount() {
        this.getRecommendedApps();
    };

    // HTML
    render() {
        const server = (import.meta.env.VITE_APP_SERVER.toLowerCase() === 'true');
        const file_version = import.meta.env.VITE_FILE_VERSION;
        const loading = this.state.loading ? <Loading /> : null;
        const {
            listApps,
            listPartners,
            skeletonP,
        } = this.state;
        const skeletonPage = <div>
            <Loading />
            <SkeletonPage>
                <Layout>
                    <Layout.Section>
                        <Card sectioned>
                            <BlockStack gap={500}>
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={9} />
                            </BlockStack>
                        </Card>
                    </Layout.Section>
                </Layout>
            </SkeletonPage>
        </div>;
        const htmlPartners = listPartners.length > 0 ?
            <Box background="bg-surface"
                borderRadius="2"
                overflowX="hidden"
                overflowY="hidden"
                paddingBlockEnd={{ xs: '4', sm: '5' }}
                paddingBlockStart={{ xs: '4', sm: '5' }}
                paddingInlineStart={{ xs: '4', sm: '5' }}
                paddingInlineEnd={{ xs: '4', sm: '5' }}
                shadow="md">
                <Box paddingBlockEnd='4'>
                    <Text variant="headingMd" as="h2">Our partners</Text>
                </Box>
                <div style={{
                    margin: '0px auto',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <div style={this.state.slide}>
                        {listPartners.map((partner, i) => (
                            <div style={{ 
                                display: 'inline-block',
                                width: '100%',
                            }} className="item-featured" key={i}>
                                <Link url={partner.app_url} external>
                                    <img src={server ? "/frontend/assets/" + partner.image + "?v=" + file_version: "/assets/" + partner.image + "?v=" + file_version} style={{ maxWidth: '100%' }} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {listPartners.length > 1 ?
                    <Box paddingBlockStart={{ xs: 2 }}>
                        <LegacyStack distribution='center'>
                            <LegacyStack.Item>
                                <nav aria-label="Pagination">
                                    <Pagination
                                        hasPrevious={this.state.hasPrevious}
                                        onPrevious={() => {
                                            var image = this.state.currentSlideImage - 1;
                                            if (image == 0) {
                                                this.setState({ hasNext: true, hasPrevious: false });
                                            }
                                            if (image >= 0) {
                                                if (this.state.idSetInterval) {
                                                    clearInterval(this.state.idSetInterval)
                                                }
                                                this.setState({
                                                    slide: {
                                                        whiteSpace: 'nowrap',
                                                        transition: 'all 1000ms ease 0s',
                                                        transform: 'translate3d(-' + (this.state.currentSlideImage - 1) + '00%, 0px, 0px)'
                                                    },
                                                    currentSlideImage: image,
                                                });
                                                this.slideShow(image, true);
                                            } else {
                                                this.setState({ hasNext: true, hasPrevious: false });
                                            }
                                        }}
                                        hasNext={this.state.hasNext}
                                        onNext={() => {
                                            var image = this.state.currentSlideImage + 1;
                                            if (image == this.state.totalImages - 1) {
                                                this.setState({ hasNext: false, hasPrevious: true });
                                            }
                                            if (image < this.state.totalImages) {
                                                if (this.state.idSetInterval) {
                                                    clearInterval(this.state.idSetInterval)
                                                }
                                                this.setState({
                                                    slide: {
                                                        whiteSpace: 'nowrap',
                                                        transition: 'all 1000ms ease 0s',
                                                        transform: 'translate3d(-' + (this.state.currentSlideImage + 1) + '00%, 0px, 0px)'
                                                    },
                                                    currentSlideImage: image,
                                                });
                                                this.slideShow(image, false);
                                            } else {
                                                this.setState({ hasNext: false, hasPrevious: true });
                                            }
                                        }}
                                    />
                                </nav>
                            </LegacyStack.Item>
                        </LegacyStack>
                    </Box> : null}
            </Box> : null;
        return (
            skeletonP ? skeletonPage :
                <Page title='Recommended Apps'>
                    <Layout>
                        <Layout.Section>
                            <LegacyCard title="Recommended Apps">
                                {listApps.length > 0 ?
                                    <Scrollable shadow style={{ maxHeight: '800px' }} focusable>
                                        {listApps.map((app, i) => (
                                            <LegacyCard.Section 
                                                title={app.title} 
                                                actions={[{ content: 'Install', url: app.app_url, target: "_blank" }]}
                                                
                                            >
                                                <Box>
                                                    <div style={{
                                                        display: 'flex',
                                                        marginBlockEnd: 'var(--p-space-3)',
                                                        paddingTop: '10px',
                                                        paddingBottom: '10px'
                                                    }}>

                                                        <div style={{
                                                            marginInlineEnd: '10px'
                                                        }}>
                                                            <Link url={app.app_url} target="_blank">
                                                                <Thumbnail
                                                                    source={server ? "/frontend/assets/" + app.image + "?v=" + file_version: "/assets/" + app.image + "?v=" + file_version}
                                                                    size="large"
                                                                    alt="Black choker necklace"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <LegacyStack spacing="ExtraTight">
                                                                <LegacyStack.Item>
                                                                    <Text variant="bodyMd" as="p">{app.score}</Text>
                                                                </LegacyStack.Item>
                                                                <LegacyStack.Item>
                                                                    <Icon
                                                                        source={StarFilledIcon}
                                                                        color="base"
                                                                    />
                                                                </LegacyStack.Item>
                                                                <LegacyStack.Item>
                                                                    ({app.num_clients}+)
                                                                </LegacyStack.Item>
                                                                <LegacyStack.Item>
                                                                    {app.free == 0 ? 'from' + ' ' + app.price + (app.recurring ? '/month' : '/annual') + ' ' + (app.plan_trial > 0 ? app.plan_trial + '-day free trial' : null) : 'Free to install'}
                                                                </LegacyStack.Item>
                                                            </LegacyStack>
                                                            <Text variant="bodyMd" color="subdued">
                                                                {app.description}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </LegacyCard.Section>
                                        ))}
                                    </Scrollable> : 
                                    <EmptyState
                                        heading="No apps"
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                    >
                                    </EmptyState>}
                            </LegacyCard>
                        </Layout.Section>
                        <Layout.Section variant="oneThird">
                            <LegacyCard>
                                <LegacyCard.Section>
                                    <Box paddingBlockEnd='4'>
                                        <Box background="bg-surface"
                                            borderRadius="2"
                                            overflowX="hidden"
                                            overflowY="hidden"
                                            paddingBlockEnd={{ xs: '4', sm: '5' }}
                                            paddingBlockStart={{ xs: '4', sm: '5' }}
                                            paddingInlineStart={{ xs: '4', sm: '5' }}
                                            paddingInlineEnd={{ xs: '4', sm: '5' }}
                                            shadow="md">
                                            <BlockStack gap="300">
                                                <Text variant="headingMd" as="h2">What news</Text>
                                                <Text variant="headingSm" as="h3">Version 1.0</Text>
                                                <Text variant="bodyMd" as="span" color="subdued">Feb 12, 2023</Text>
                                                <Text variant="bodyMd" as="h3" fontWeight="bold">New:</Text>
                                                <List>
                                                    <List.Item>Invoice generator</List.Item>
                                                    <List.Item>Fixbugs POS</List.Item>
                                                </List>
                                                <ButtonGroup>
                                                    <Button url="https://roadmap.fordeer.io?ref=fiopapp" external variant="plain" target="_blank">Roadmap</Button>
                                                    <Button url="https://roadmap.fordeer.io/?ref=fiopapp" external variant="plain" target="_blank">Changelogs</Button>
                                                </ButtonGroup>
                                            </BlockStack>
                                        </Box>
                                    </Box>
                                </LegacyCard.Section>
                                </LegacyCard>
                                <LegacyCard>
                                    <LegacyCard.Section>
                                        {htmlPartners}
                                    </LegacyCard.Section>
                                </LegacyCard>
                        </Layout.Section>
                    </Layout>
                    {loading}
                </Page>
        );
    }
}
export default withTranslation()(Recommended);
