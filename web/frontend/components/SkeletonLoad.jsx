import React from 'react';
import { SkeletonPage, Layout, Card, BlockStack, Box, Frame, SkeletonDisplayText, SkeletonBodyText } from '@shopify/polaris';
import { Loading } from '@shopify/app-bridge-react';
export function SkeletonLoad() {
    return (
        <div>
            <Frame>
                <Loading />
                <Layout>
                    <Layout.Section>
                        <BlockStack gap={500}>
                            <Card>

                                <Box padding="200">
                                    <SkeletonBodyText lines={1} />
                                </Box>

                            </Card>
                            <Card>
                                <SkeletonBodyText lines={10} />
                            </Card>
                        </BlockStack>
                    </Layout.Section>
                </Layout>
            </Frame>
        </div>
    );
}