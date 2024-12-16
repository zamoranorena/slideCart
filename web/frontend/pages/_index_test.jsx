import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  BlockStack,
  Link,
  Text,
} from "@shopify/polaris";
import { Component } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { withTranslation, Trans } from "react-i18next";
import { Languages } from "../components";
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

class HomePage extends Component {
  render() {
    const { t } = this.props;
    return (
      <Page narrowWidth>
        <TitleBar title={t("HomePage.title")} primaryAction={null} />
        <Layout>
          <Layout.Section>
            <Card sectioned>
              {/* <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Text as="h2" variant="headingMd">
                    {t("HomePage.heading")}
                  </Text>
                  <p>
                    <Trans
                      i18nKey="HomePage.yourAppIsReadyToExplore"
                      components={{
                        PolarisLink: (
                          <Link url="https://polaris.shopify.com/" external />
                        ),
                        AdminApiLink: (
                          <Link
                            url="https://shopify.dev/api/admin-graphql"
                            external
                          />
                        ),
                        AppBridgeLink: (
                          <Link
                            url="https://shopify.dev/apps/tools/app-bridge"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                  <p>{t("HomePage.startPopulatingYourApp")}</p>
                  <p>
                    <Trans
                      i18nKey="HomePage.learnMore"
                      components={{
                        ShopifyTutorialLink: (
                          <Link
                            url="https://shopify.dev/apps/getting-started/add-functionality"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt={t("HomePage.trophyAltText")}
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack> */}
            </Card>
            <Card>
              <Layout.Section>
                <Languages />
              </Layout.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <ProductsCard />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}
export default withTranslation()(HomePage);