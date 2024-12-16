import { Component } from "react";
import { Frame, Layout, Box, Card, Text, BlockStack, Toast, SkeletonBodyText } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context, Loading } from '@shopify/app-bridge-react';

import { EditorCode, SaveBar } from "../../components";
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';


class CustomCss extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      dataCustomCss: [],
      customCss: null,
      loading: true,
      toast: false,
      messageError: ''
    }
  };
  handlePopover = (popover, val = 1) => {
    this.setState({ [popover]: val })
  };

  discard = () => {
    var c = this.state.dataCustomCss;
    this.originalData(1, c);
  };

  originalData = (identify, data) => {
    var myData = {};
    if (!identify) {
      myData = {
        dataCustomCss: data
      };
    };
    data = data.dataCustomCss[0];
    var stateData = {
      messageError: '',
      loading: false,
      toast: false,
      customCss: data.customCss
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
    const data = await makeGetRequest('/api/get_customcss', app);
    if (data && data.dataCustomCss !== undefined && data.dataCustomCss !== null) {
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
        customCss: props.customCss
      };
      const method = 'PUT';
      const app = this.context;

      const updateCustom = await makePutPostRequest('/api/custom_css', method, requestBody, app);
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
      customCss: w.customCss
    };

    const myCustomCss = this.state.dataCustomCss;
    if (typeof myCustomCss.dataCustomCss !== 'undefined' || myCustomCss.length > 0) {
      const c = myCustomCss.dataCustomCss[0];
      const dataCustom = {
        customCss: c.customCss
      }
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const a = dataCustom;
      const b = stateData;
      if (!equals(a, b)) {
        thisEquals = false;
      };
      //const c = myCustomize.customize[0];

    };
    return thisEquals;
  };


  render() {
    const { dataCustomCss, customCss, loading, toast, messageError } = this.state
    var equals = this.validateData();
    const ThisToast = () => {
      return (
        toast ?
          messageError ?
            <Toast content={messageError} error onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
            <Toast content="Custom Css updated successfully!" onDismiss={() => { this.handlePopover("toast", 0) }} duration={2500} /> :
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
      (typeof dataCustomCss.dataCustomCss === 'undefined') ? skeletonCustom :
        <div>
          {loadingComponent}
          <BlockStack gap="500">
            <Card>
              <BlockStack gap={200}>
                <Text variant="headingLg" as="h5">
                  Custom CSS (styles)
                </Text>
                <Text>
                  The CSS code will be applied to the different components that you indicate, it is recommended to be specific and if necessary assign the "!important" property. Without the need to place the <style></style> tags
                </Text>
              </BlockStack>
            </Card>
            <Card padding={0}>
              <EditorCode value={customCss} language='css' changeState={(value) => this.setState({ customCss: value })} />
            </Card>
            <SaveBar equals={equals} loading={loading} action={() => this.updateCustom(this.state)} discard={this.discard} />
          </BlockStack>
          <ThisToast />
        </div>
    );

  }

}
export default (CustomCss);