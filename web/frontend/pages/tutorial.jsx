import { Component } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { withTranslation, Trans } from "react-i18next";

class Tutorial extends Component {
  render() {
    const { t } = this.props;
    return (
      <>
      <div>Tutorial</div>
      </>
    );
  }
}
export default withTranslation()(Tutorial);