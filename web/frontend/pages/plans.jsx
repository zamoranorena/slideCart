import { Component } from "react";
import { Context, Loading } from '@shopify/app-bridge-react';
import {
  Button,
  Card,
  DataTable,
  Page,
  Layout,
  Modal,
  Banner,
  List,
  Box,
  Text,
  Frame,
  SkeletonDisplayText,
  SkeletonBodyText,
  SkeletonPage,
  BlockStack,
  InlineStack
} from "@shopify/polaris";
import { Redirect, TitleBar } from '@shopify/app-bridge/actions';
import { withTranslation, Trans } from "react-i18next";
import { authenticatedFetch } from "@shopify/app-bridge/utilities";
import { makeGetRequest, makePutPostRequest } from '../utils/Services';
class YourPlan extends Component {
  static contextType = Context;
  state = {
    dataPlan: [],
    activeModal: false,
    skeletonText: false,
    banner: false
  };

  // Obtiene los datos del plan
  getCurrentPlan = async () => {
    const app = this.context;
    const get = await makeGetRequest('/api/get_current_plan', app);
    if (!get.error) {
      this.setState({ dataPlan: get, skeletonText: false })
    } else {
      console.warn(get.message);
    }
  };

  createCharge = async () => {
    const app = this.context;
    this.setState({ loading: true, spinner: true, skeletonText: true });
    const response = await makeGetRequest('/api/create_charge', app);
    const error = response.error;
    if (error) {
      console.log(response.message);
    } else {
      const redirect = Redirect.create(app);
      if (!!response.result) {
        redirect.dispatch(Redirect.Action.REMOTE, response.result);
      } else {
        //redirect.dispatch(Redirect.Action.APP, '/');
        this.getCurrentPlan();
      };
    }
  };

  cancelSubscription = async () => {
    this.setState({ activeModal: false, loading: true, spinner: true, skeletonText: true });
    const app = this.context;
    const response = await makePutPostRequest('/api/cancel_charge', 'POST', '', app);
    const error = response.error;
    if (error) {
      console.log(response.message);
    } else {
      /* const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, '/'); */
      this.getCurrentPlan();
    }
  };

  async componentDidMount() {
    this.getCurrentPlan();
  };
  render() {
    const {
      dataPlan,
      activeModal,
      skeletonText,
      loading,
      spinner
    } = this.state;

    const data = { title: 'Plans' };

    var string_active_plan = 'Not', button_subscription = (!dataPlan.plan_status) ? <Button variant="primary" tone="success" size="medium" onClick={(e) => this.createCharge(dataPlan.id, e)}>Subscribe ${dataPlan.plan_price}/Month Now</Button> : '';
    if (dataPlan) {
      if (!!dataPlan.plan_status) {
        string_active_plan = '';
        button_subscription = <Button variant="primary" tone="critical" onClick={() => this.modalSubscription()}>Cancel Subscription</Button>;//<div className='iconPlans'><Icon source={CircleTickMajor} color='success'/></div>
      }
    }
    const rows = (dataPlan.length === 0) ? [] : [
      [<Text variant="bodyMd" as="span" fontWeight="semibold">Plan Type</Text>, skeletonText ? <SkeletonDisplayText size="small" /> : dataPlan.plan_type],
      [<Text variant="bodyMd" as="span" fontWeight="semibold">Price</Text>, skeletonText ? <SkeletonDisplayText size="small" /> : '$' + (dataPlan.plan_price + '/' + dataPlan.plan_charged_every)],
      [<Text variant="bodyMd" as="span" fontWeight="semibold">Trial days</Text>, skeletonText ? <SkeletonDisplayText size="small" /> : dataPlan.plan_trial + ' days'],
      [<Text variant="bodyMd" as="span" fontWeight="semibold">Charged every</Text>, skeletonText ? <SkeletonDisplayText size="small" /> : dataPlan.plan_charged_every],
      //['', skeletonText ? <SkeletonBodyText lines={1} /> : button_subscription]
    ];
    const baner = this.state.banner ?
      <Card>
        <Banner
          title="Before you can use the app, you need to make this change:"
          tone="warning"
        >
          <List>
            <List.Item>
              Subscribe the plan.
            </List.Item>
          </List>
        </Banner>
      </Card>
      : null;

    const skeletonPage =
      <div>
        <Frame>
          <Loading />
          <SkeletonPage title="Plans">
            <Layout>
              <Layout.Section>
                <div className="hs-table-plans">
                  <DataTable
                    footerContent={<Button loading>Subscription</Button>}
                    verticalAlign="middle"
                    columnContentTypes={[
                      'text',
                      'text',
                    ]}
                    headings={[
                      '',
                      <Text variant="bodyMd" as="span" fontWeight="semibold">Monthly (Currently Active)</Text>,
                    ]}
                    rows={[
                      [<Text variant="bodyMd" as="span" fontWeight="semibold">Plan Type</Text>, <SkeletonDisplayText size="small" />],
                      [<Text variant="bodyMd" as="span" fontWeight="semibold">Price</Text>, <SkeletonDisplayText size="small" />],
                      [<Text variant="bodyMd" as="span" fontWeight="semibold">Trial days</Text>, <SkeletonDisplayText size="small" />],
                      [<Text variant="bodyMd" as="span" fontWeight="semibold">Charged every</Text>, <SkeletonDisplayText size="small" />],
                      //['', skeletonText ? <SkeletonBodyText lines={1} /> : button_subscription]
                    ]}
                  />
                </div>
              </Layout.Section>
            </Layout>
          </SkeletonPage>
        </Frame>
      </div>;


    /*  <Card>
                      <BlockStack gap={200}>
                          <Box paddingInlineStart={{xs: '200', sm: '300', md: '3800', lg: '3800', xl: '3800'}} paddingInlineEnd={{xs: '200', sm: '300', md: '3800', lg: '3800', xl: '3800'}}>
                          <InlineStack align="center">
                            <SkeletonBodyText lines={1} size="small" />
                            </InlineStack>
                          </Box>
                      </BlockStack>
                    </Card> */
    return (
      (dataPlan.length === 0) ? skeletonPage :
        <Page title={data.title}>
          {baner}
          <div className="hs-table-plans">
            <DataTable
              footerContent={skeletonText ? <Button loading>Subscription</Button> : button_subscription}
              verticalAlign="middle"
              columnContentTypes={[
                'text',
                'text',
              ]}
              headings={[
                '',
                <Text variant="bodyMd" as="span" fontWeight="semibold">Monthly (Currently {string_active_plan} Active)</Text>,
              ]}
              rows={rows}
            />
          </div>
          <Modal
            open={activeModal}
            onClose={() => this.modalSubscription()}
            title="Are you sure you wish to cancel?"
            primaryAction={{
              content: 'Accept',
              onAction: () => this.cancelSubscription(),
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: () => this.modalSubscription(),
              },
            ]}
          >

            <Modal.Section>
              <p>
                Your subscription to "Monthly" will be cancelled allowing you no further access to the paid features.
              </p>
            </Modal.Section>
          </Modal>
        </Page>
    )

  }
  modalSubscription = () => {
    this.setState({ activeModal: !this.state.activeModal });
  };
}

export default withTranslation()(YourPlan);