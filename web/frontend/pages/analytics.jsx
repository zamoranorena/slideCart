  import { Component } from "react";
  import { TitleBar } from "@shopify/app-bridge-react";
  import { withTranslation, Trans } from "react-i18next";
  
  class Analytics extends Component {
    render() {
      const { t } = this.props;
      return (
        <>
        <div>Analytics</div>
        </>
      );
    }
  }
  export default withTranslation()(Analytics);