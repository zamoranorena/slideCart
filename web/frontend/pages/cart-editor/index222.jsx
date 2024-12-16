import { Component } from "react";
import { Redirect } from '@shopify/app-bridge/actions';

import { Context } from '@shopify/app-bridge-react';
class Index extends Component {
  static contextType = Context;

  render() {
    const app = this.context;   
  
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.APP, `/cart-editor/customize`);
    return (<></>
    );
  }

}
export default (Index);