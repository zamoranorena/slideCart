import { authenticatedFetch } from "@shopify/app-bridge/utilities";
import { Redirect } from "@shopify/app-bridge/actions";

import { useAppBridge } from "@shopify/app-bridge-react";
function useAuthenticatedFetch() {
  const app = useAppBridge();
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);
    checkHeadersForReauthorization(response.headers, app);
    return response;
  };
}

function checkHeadersForReauthorization(headers, app) {
  if (headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1") {
    const authUrlHeader =
      headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
      `/api/auth`;

    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith("/")
        ? `https://${window.location.host}${authUrlHeader}`
        : authUrlHeader,
    );
  }
}


/* export async function makeGetRequest(endpoint, app) { */
  /* const fetchFunction = authenticatedFetch(app);

  const response = await fetchFunction(endpoint);
  await checkHeadersForReauthorization(response.headers, app);
  return response.json();
 */


  /* const result = await authenticatedFetch(app)(endpoint,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(json => {
      checkHeadersForReauthorization(response.headers, app);
      return json;
    });
  return result; */
/* }; */
export async function makeGetRequest (endpoint,app) {
  const result = await authenticatedFetch(app)(endpoint,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(json => {
      return json;
    });
  return result;
};
export async function makeDeleteRequest(endpoint, app) {
  const result = await authenticatedFetch(app)(endpoint,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(json => {
      return json;
    });
  return result;
};

export async function makePutPostRequest(endpoint, method, requestBody, app) {
  const result = await authenticatedFetch(app)(endpoint,
    {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(resp => resp.json())
    .then(json => {
      return json;
    });
  return result;
};