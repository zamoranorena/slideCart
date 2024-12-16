import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import {AddGridLayout} from "./components/AddGridLayout";
import {GridLayout} from "./components/GridLayout";
import {  useState } from "react";
import ScrollToTop from "./utils/scrollTop";
/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.globEager(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Routes({ pages }) {
  const [gridItems, setGridItems] = useState({
    customize: false,
    countdown: false,
    announcement: false,
    rewards: false,
    free_items: false,
    gift_wrap: false,
    shipping_protections: false,
    cart_note: false,
    cart_coupon: false,
    terms_conditions: false,
    minimum_order: false,
    checkout_button: false,
    cart_button: false,
    continue_shopping: false,
    payment_badges: false,
    express_payments: false,
    paths: '/cart-editor/customize'
  });

  const [gridItemsAddOns, setGridItemsAddOns] = useState({
    cart_bar: false,
    sticky_cart: false,
    quick_buy: false,
    cart_animator: false,
    coupon_bar: false,
    paths: '/additional-functions/cart-bar'
  });
  const routes = useRoutes(pages);

  // Función para actualizar los items en GridLayout
  const updateGridItems = (newValues) => {
      setGridItems((prevState) => ({
      ...prevState,
      ...newValues, // Actualiza el estado del menú
      }));
  };

  const updateGridItemsAddOns = (newValues) => {
      setGridItemsAddOns((prevState) => ({
      ...prevState,
      ...newValues, // Actualiza el estado del menú
      }));
  };

  const routeComponents = routes.map(function (page) {
    var path = page.path, Component =  page.component;
    var element = <Component />
    if(path.indexOf('additional-function')>-1){
      element =  <AddGridLayout paths={path} gridItemsAddOns={gridItemsAddOns} updateGridItemsAddOns={updateGridItemsAddOns}>
        {(isNewUser) => (
        <>
          <Component isNewUser={isNewUser} updateGridItemsAddOns={updateGridItemsAddOns}/>
        </>
      )}
        </AddGridLayout>
    };

    if(path.indexOf('cart-editor')>-1){
      element =  <GridLayout paths={path} gridItems={gridItems} updateGridItems={updateGridItems}><ScrollToTop /><Component updateGridItems={updateGridItems} /></GridLayout>
    };
    
   return <Route key={path} path={path} element={element} />
  })

  const NotFound = routes.find(({ path }) => path === "/notFound").component;
 
  return (
    <ReactRouterRoutes>
      {routeComponents}
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "")
        .replace(/\.(t|j)sx?$/, "")
        /**
         * Replace /index with /
         */
        .replace(/\/index$/i, "/")
        /**
         * Only lowercase the first letter. This allows the developer to use camelCase
         * dynamic paths while ensuring their standard routes are normalized to lowercase.
         */
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
        /**
         * Convert /[handle].jsx and /[...handle].jsx to /:handle.jsx for react-router-dom
         */
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

      if (path.endsWith("/") && path !== "/") {
        path = path.substring(0, path.length - 1);
      }

      if (!pages[key].default) {
        console.warn(`${key} doesn't export a default React component`);
      }

      return {
        path,
        component: pages[key].default,
      };
    })
    .filter((route) => route.component);

  return routes;
}
