import { Component } from "react";
import { Redirect, TitleBar } from '@shopify/app-bridge/actions';

import { Context } from '@shopify/app-bridge-react';
class Index extends Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const titleBarOptions = {
      title:  ''
    };
    TitleBar.create(app, titleBarOptions);
    const myProps = this.props;
    var routeRedirect = '/sticky-cart'
    if (myProps) {
      if (typeof myProps.isNewUser !== 'undefined') {
        var isNewUser = myProps.isNewUser();
        if (!isNewUser) {
          routeRedirect = '/cart-bar'
        };
      };
    };
    
    
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.APP, `/additional-functions${routeRedirect}`);
    return (<></>
    );
  }

}
export default (Index);