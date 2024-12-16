import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import { Frame } from "@shopify/polaris";
import Routes from "./Routes";
import './assets/css/polaris.css';//3.54
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { match } from "@formatjs/intl-localematcher";
import { CustomizeProvider } from "./components/providers/CartEditor";
const urlMatcher = (link, location) => {
  var match = location.pathname.indexOf(link.destination.split('/')[1]) > -1 ? true : false;
  return match || false;
};
const App = () => {

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <CustomizeProvider>
              <NavigationMenu
                  navigationLinks={[
                    {
                      label: t("NavigationMenu.CartEditor"),
                      destination: "/cart-editor/customize",
                    },
                    {
                      label: t("NavigationMenu.AdditionalFunctions"),
                      destination: "/additional-functions",
                    },
                    {
                      label: t("NavigationMenu.Analytics"),
                      destination: "/analytics",
                    },
                    {
                      label: t("NavigationMenu.YourPlan"),
                      destination: "/plans",
                    },
                    {
                      label: t("NavigationMenu.Help&Support"),
                      destination: "/tutorial",
                    },
                    {
                      label: t("NavigationMenu.Recommend"),
                      destination: "/recommend",
                    },
                  ]}
                  matcher={(link, location) => urlMatcher(link, location)}
                />
                <Frame>
                  <Routes pages={pages} />
                </Frame>
            </CustomizeProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
export default App;
