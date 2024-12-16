import React from "react";
import { InlineStack, Text } from "@shopify/polaris";
import { Context } from '@shopify/app-bridge-react';
import { makeGetRequest, makePutPostRequest } from '@utils/Services';
import { useQuery } from "react-query";


export class HeaderPage extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      embed_app: null,
      general_app: this.props.generalApp,
    };
  };

  changeStatusApp = async (value, REFETCH = null) => {
    console.log(value);
    const app = this.context;
    const requestBody = {
      dashboard_general_app: value
    }
    const res = await makePutPostRequest('/api/setDashboard', 'POST', requestBody, app);
    this.setState({embed_app: value});
  };

  updates = async () => {
    console.log('updates');
  };

  render() {
    console.log(this)
    const app = this.context;

    const fetchEmbedApp = async () => {
      const res = await makeGetRequest('/api/verify', app);
      console.log(res)
      return res;
    };

    const Toogle = ({ isLoading, data, REFETCH=NULL }) => {
      console.log('toogle');
      console.log('data');
      console.log(data);
      var status_app = null;
      var swithc = '';
      if (isLoading) {
        swithc = ''
      } else {
        if (data.activeApp || !!this.state.embed_app) {
          swithc = ' hs_enabled';
        };

        /* if(data.activeEmbedApp == 1 || this.state.embed_app != null){
          var status = this.state.embed_app != null ? this.state.embed_app : data.activeEmbedApp;
          this.changeStatusApp(status,REFETCH) 
        };
        status_app = data.activeEmbedApp == 1 ? () => { } : ()=>{this.updates()} ; */
      };
     

      return <InlineStack gap={200} blockAlign="center" align="center">
        <Text as="h3" variant="headingMd" fontWeight='medium'>Slide Cart <Text tone={swithc !== '' ? 'success' : 'critical'} as="span" variant="headingMd" fontWeight='medium'>{swithc !== '' ? 'Enabled' : 'Disabled'}</Text></Text>
        <button type="button" className={"hs_switch" + swithc} onClick={ status_app }>
          <span className="hs_switch_track"></span>
          <span className="hs_switch_thumb"></span>
        </button>
      </InlineStack>
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
        status, } = useQuery("users", fetchEmbedApp);
      if (data) {
        const status_app = data.activeEmbedApp != 1 ? 0 : 1;
        var updateData = false;
        if ((data.activeEmbedApp != 1 && data.activeApp) || (data.activeEmbedApp == 1 && !data.activeApp)) {
          updateData = true;
        };
        if (updateData) {
          this.changeStatusApp(status_app, refetch)
        };
      };
      return (
        <Toogle isLoading={isLoading} data={data} REFETCH={refetch} />
      );
    };
    console.log('RENDER')
    return (
      /* <Query keyName={['repoData']} fn={() => makeGetRequest('/api/verify', app).then((res) =>
        res,
      )}>
        {({ data, isLoading }) => {
          if (isLoading) return 'Loading...'
          if (data) {
            if (this.state.embed_app == null) {
              this.setState({ embed_app: data })
            };
          };
          return (
            <InlineStack gap={200} blockAlign="center" align="center">
              <Text as="h3" variant="headingMd" fontWeight='medium'>Slide Cart <Text tone={general_app ? 'success' : 'critical'} as="span" variant="headingMd" fontWeight='medium'>{general_app ? 'Enabled' : 'Disabled'}</Text></Text>
              <button type="button" className={"hs_switch" + swithc} onClick={() => { this.changeStatusApp(this.state) }}>
                <span className="hs_switch_track"></span>
                <span className="hs_switch_thumb"></span>
              </button>
            </InlineStack>
          );
        }}
      </Query> */
      <Query />
    );
  }
}
