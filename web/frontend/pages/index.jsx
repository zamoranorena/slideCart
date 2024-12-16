import React from 'react';
/* import Router from 'next/router' */
import { Page, Layout, Text, Banner, Button, Box, InlineStack, InlineGrid, Badge, Frame, SkeletonPage, Tooltip, SkeletonDisplayText, SkeletonBodyText, Toast, Card, BlockStack, Icon, ResourceList, ResourceItem } from '@shopify/polaris';
import { LayoutSidebarRightIcon, CartDownIcon, CartIcon, CartSaleIcon, WandIcon, ClockIcon } from '@shopify/polaris-icons';
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import { Redirect, TitleBar, History } from '@shopify/app-bridge/actions';
import { makeGetRequest, makePutPostRequest } from '../utils/Services';
import { BreakPoint_mdDown, ModalUpdateUser, StatusAppEmbed } from '../components';


import { useParams } from 'react-router-dom';

/* import BannerHead from '../components/BannerHead'; */
/* import md5 from "blueimp-md5"; */
/* import Skeleton from '../components/Skeleton'; */
class Index extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: null,
      new_user: 0,
      status_user: 0,
      loading: null,
      toast: null,
      toastError: null,
      messageError: null,
      app: null,
      slide_cart: null,
      cart_bar: null,
      sticky_cart: null,
      quick_buy: null,
      cart_animator: null,
      coupon_bar: null,
      appEmbed: null
    }
  }


  getDashboard = async () => {
    const app = this.context;
    const dataDashboard = await makeGetRequest('/api/getDashboard', app);
    /* console.log(dataDashboard) */

    if (dataDashboard && Object.keys(dataDashboard).length > 0 && dataDashboard.dashboard !== undefined && dataDashboard.dashboard !== null) {
      //------------------------------ STATUS PLAN -------------------------------------------// 
      /* const statusPlan = dataDashboard.status_plan.data[0].status;

      if (statusPlan == 0) {
        const app = this.context;
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
        return false;
      }; */

      var slideCart = 2, status_slideCart = 'success';
      const dataDashboards = dataDashboard.dashboard;
      dataDashboards.forEach(element => {
        if (!element.enabled_desktop) {
          slideCart--
        }
        if (!element.enabled_mobile) {
          slideCart--
        }
      });
      switch (slideCart) {
        case 0:
          status_slideCart = 'critical';
          break;
        case 1:
          status_slideCart = 'attention';
          break;
      };

      const pedding = [
        {
          id: 1,
          name: "Slide Cart",
          status: status_slideCart,
          url: "/cart-editor/settings",
          icon: LayoutSidebarRightIcon,
          progress: slideCart == 1 ? 'partiallyComplete' : 'complete',
          visible: true
        },
        {
          id: 2,
          name: "Add to Cart Bar",
          status: dataDashboards[0].enabled_cart_bar ? 'success' : 'critical',
          url: "/additional-functions/cart-bar",
          icon: CartIcon,
          visible: !!dataDashboard.new_user ? false : true
        },
        {
          id: 3,
          name: "Sticky Cart",
          status: dataDashboards[0].enabled_sticky_cart ? 'success' : 'critical',
          url: '/additional-functions/sticky-cart',
          icon: CartDownIcon,
          visible: true
        },
        {
          id: 4,
          name: "Quick Buy Button",
          status: dataDashboards[0].enabled_quick_buy ? 'success' : 'critical',
          url: "/additional-functions/quick-buy",
          icon: CartSaleIcon,
          visible: true
        },
        {
          id: 5,
          name: "Cart Animator",
          status: dataDashboards[0].enabled_cart_animator ? 'success' : 'critical',
          url: "/additional-functions/cart-animator",
          icon: WandIcon,
          visible: true
        },
        {
          id: 6,
          name: "Coupon Bar",
          status: dataDashboards[0].enabled_coupon_bar ? 'success' : 'critical',
          url: "/additional-functions/coupon-bar",
          icon: ClockIcon,
          visible: true
        }
      ];

      this.setState({
        data: dataDashboards[0],
        data2: pedding,
        new_user: dataDashboard.new_user,
        status_user: dataDashboard.status_user,
        app: dataDashboards[0].dashboard_general_app,
        slide_cart: slideCart,
        cart_bar: dataDashboards[0].enabled_cart_bar,
        sticky_cart: dataDashboards[0].enabled_sticky_cart,
        quick_buy: dataDashboards[0].enabled_quick_buy,
        cart_animator: dataDashboards[0].enabled_cart_animator,
        coupon_bar: dataDashboards[0].enabled_coupon_bar,
        appEmbed: `https://${this.props.shopOrigin}/admin/themes/current/editor?context=apps&template&activateAppId=06f96c51-92d4-4ccf-8798-f65ef7359208/slide-cart-app-embed`,
        loading: false
      });
      //this.titles();
    } else {
      if (typeof dataDashboard.plan_status !== 'undefined') {
        if (!dataDashboard.plan_status) {
          const app = this.context;
          const redirect = Redirect.create(app);
          redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
          return false;
        };
      };
    }
  };

  titles = () => {
    const app = this.context;
    const datas = { title: 'DashBoard' };
    const titleBarOptions = {
      title: datas.title
    };
    TitleBar.create(app, titleBarOptions);
  };



  updateDashboard = async () => {
    this.setState({ loading: true })
    const app = this.context;
    const requestBody = {
      dashboard_general_app: this.state.app
    }
    await makePutPostRequest('/api/setDashboard', 'POST', requestBody, app).then(response => {
      if (response && !response.error) {
        this.getDashboard();
        this.setState({ toast: true })
      }
      else {
        this.setState({ toastError: true, messageError: 'Select product' })
      }
    }).catch(err => {
      this.setState({ toastError: true, messageError: 'Select product' })
      //this.notifyError(err,'updateSettings');
    });
  };

  openWindowAppEmbed = async (shop) => {
    const app = this.context;
    const redirect = Redirect.create(app);
    /* redirect.dispatch(Redirect.Action.REMOTE, {
      url: this.state.appEmbed,
      newContext: true,
    }); */
    redirect.dispatch(Redirect.Action.APP, `?shop=${shop}`);
  };

  async componentDidMount() {
    /* if(!!this.props.router.query.install)
    {
      var shop = !!this.props.shopOrigin ? this.props.shopOrigin : '';
      if(!!shop)
      {
        if(this.props.router.query.install===md5(shop+'<gH5<H-GJn!3GAAb'))
        {
          this.openWindowAppEmbed(shop);
        };
      };
    }; */
    this.getDashboard();
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  };

  render() {
    /* const params = useParams()
    console.log(params) */
    const { data, loading, toast, toastError, messageError, app, status_user, slide_cart, cart_bar, sticky_cart, quick_buy, cart_animator, coupon_bar } = this.state;
    const contextualSaveBarMarkup = app != data.dashboard_general_app ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          loading: loading,
          onAction: () => this.updateDashboard(),
        }}
        discardAction={{
          onAction: () => this.setState({ app: data.dashboard_general_app, loading: false }),
        }}
        visible
        fullWidth={true}
      />
    ) : null;

    const myLoading = loading ? (
      <div>
        <Loading />
      </div>
    ) : null;

    const toastMarkup = toast ? <Toast content="Dashboard updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> : null;
    const toastErrorMarkup = toastError ? <Toast content={messageError} error onDismiss={() => { this.handlePopover("toastError", 0) }} duration={2500} /> : null;

    const settingStatusMarkup = (
      <Badge
        tone={!!app ? 'success' : 'critical'}
        toneAndProgressLabelOverride={`Setting is ${!!app ? "On" : "Off"}`}
      >
        {!!app ? "On" : "Off"}
      </Badge>
    );

    const settingTitle =
      <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
          <label htmlFor="hs-active">
            <Text variant="headingMd" as="h6" tone={!!app ? "success" : 'critical'}>The app is currently {!!app ? 'enabled' : 'disabled'}.</Text>
          </label>
          <InlineStack gap="200" align="center" blockAlign="center">
            {settingStatusMarkup}
          </InlineStack>
        </InlineStack>
      </InlineStack>;

    const actionMarkup = (
      <Button
        role="switch"
        id="hs-active"
        ariaChecked={!!app ? 'false' : 'true'}
        onClick={() => this.toggleIsDirty("app")}
        size="slim"
        variant="primary"
        tone={!app ? "success" : "critical"}
      >
        {!app ? "Turn on" : "Turn off"}
      </Button>
    );

    const headerMarkup = (
      <Box width="100%">
        <InlineStack
          gap="1200"
          align="space-between"
          blockAlign="center"
          wrap={false}
        >
          {settingTitle}
          <Box minWidth="fit-content">
            <InlineStack align="end">{actionMarkup}</InlineStack>
          </Box>
        </InlineStack>
      </Box>
    );

    const Placeholder = ({ height = 'auto', width = 'auto', child = '' }) => {
      return (
        <div
          style={{
            height: height ?? undefined,
            width: width ?? undefined,
          }}
        >
          {child}
        </div>
      );
    };

    const skeletonPage =
      <div>
        <Frame>
          <Loading />
          <SkeletonPage>
            <Layout>
              {/*  <Layout.Section variant="oneThird"> */}
              <Layout.AnnotatedSection
                title={<SkeletonDisplayText size="small" />}
                description={<SkeletonBodyText lines={1} />}
              >
                <Card>
                  <BlockStack gap={{ xs: '400', sm: '500' }}>
                    <Box width="100%">
                      <SkeletonBodyText lines={1} />
                    </Box>
                  </BlockStack>
                </Card>
              </Layout.AnnotatedSection>
              <Layout.AnnotatedSection
                title={<SkeletonDisplayText size="small" />}
              >
                <Card>
                  <ResourceList
                    items={['item1', 'item2', 'item3', 'item4', 'item5']}
                    renderItem={({ id, name, status, url, icon, visible }) => (
                      <ResourceList.Item
                      /* id={id} */
                      >
                        <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                          <InlineGrid columns={1} alignItems='center'>
                            <Placeholder height='20px' child={<SkeletonBodyText lines={1} />} />
                          </InlineGrid>
                        </div>
                      </ResourceList.Item>
                    )}
                  />
                </Card>
              </Layout.AnnotatedSection>
            </Layout>
          </SkeletonPage>
        </Frame>
      </div>;

    return (
      (data.length < 1 ? skeletonPage :
        status_user ? <ModalUpdateUser paths='/cart-editor/settings' /> :
          <Page title={'Dashboard'}>
            {myLoading}
            <BlockStack gap="500">
              <Layout>

                {/*  <Layout.AnnotatedSection
              title="App State"
              description="Switch General"
            >
              <Card>
                <BlockStack gap={{ xs: '400', sm: '500' }}>
                  <Box width="100%">
                    <BlockStack gap={{ xs: '200', sm: '400' }}>
                      {headerMarkup}
                    </BlockStack>
                  </Box>
                </BlockStack>
              </Card>
            </Layout.AnnotatedSection> */}
                {/* <Layout.AnnotatedSection
              title="Widget"
              description=""
            >
              
            </Layout.AnnotatedSection> */}
              </Layout>
              <Layout>
                <Layout.Section>
                  {<StatusAppEmbed  {...this.props}/>}
                </Layout.Section>
                <Layout.Section>
                  <Card>
                    <BlockStack gap={{ xs: '400', sm: '500' }}>
                      <Box width="100%">
                        <BlockStack gap={{ xs: '200', sm: '400' }}>
                          {headerMarkup}
                        </BlockStack>
                      </Box>
                    </BlockStack>
                  </Card>
                </Layout.Section>
                <Layout.Section>
                  <Card>
                    <ResourceList
                      resourceName={{ singular: "transfer", plural: "transfers" }}
                      items={this.state.data2}
                      renderItem={({ id, name, status, url, icon, visible, progress }) => (
                        !!visible ?
                          <ResourceList.Item
                            id={id}
                            onClick={() => this.redirectToPage(url)}
                          >
                            <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                              <InlineGrid columns={3}>
                                <Placeholder child={<Icon source={icon} />} />
                                <Placeholder child={name} />
                                <Placeholder child={<Badge progress={progress ? progress : 'complete'} size="medium" tone={status}>{status === 'success' || status === 'attention' ? 'Enabled' : 'Disabled'}</Badge>} />
                              </InlineGrid>
                            </div>
                          </ResourceList.Item> : ''
                      )}
                    />
                  </Card>
                </Layout.Section>
              </Layout>
            </BlockStack>
            {contextualSaveBarMarkup}
            {toastMarkup}
            {toastErrorMarkup}
          </Page>)
    );
  }
  toggleIsDirty = (toggle) => {
    var state = this.state[`${toggle}`];
    !!state ? state = 0 : state = 1;
    this.setState({ [`${toggle}`]: state });
  };
  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val })
  };
  redirectToPage = (path) => {
    this.setState({ loading: true })
    const app = this.context;
    const redirect = Redirect.create(app);
    /* Router.push({
      pathname: path,
      query: { shop: this.props.shopOrigin,host:this.props.host },
    }); */
    /* const history = History.create(app);
    history.dispatch(History.Action.PUSH, path); */
    redirect.dispatch(Redirect.Action.APP, path)
  };
}

export default Index;