import React from 'react';
import { BlockStack, Modal } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { makePutPostRequest } from '../utils/Services';

export function ModalUpdateUser({paths='/'}) {
   
    const app = useAppBridge();

    const redirectToPage = (paths) => {
        console.log(paths)
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, { path: paths, });
    };

    const update_user = async () => {
        const arr ={status_user: 0 };

        const get = await makePutPostRequest('/api/put_client_data', 'PUT', arr, app);

        if (!!get.status_user) {
            redirectToPage(paths);
        };
    };
    console.log(paths)
    return (
        <div style={{ height: '500px' }}>
            <Modal
                size='large'
                activator={''}
                open={true}
                title={<strong>Update App</strong>}
                primaryAction={{
                    content: 'Accept',
                    onAction: update_user,
                }}
            >
                <Modal.Section>
                    <BlockStack gap={500}>
                        <p>
                            Due to the changes that Shopify has made to the 2.0 templates, it has been necessary to update the application to a new version, to integrate with these changes.
                        </p>
                        <p>
                            In such a way you have to reconfigure the app, due to the new functions that it includes.
                        </p>
                        <p>
                            <strong>If you have customizations with the app, these will not apply to the new version.</strong>
                        </p>
                        <p>
                            <strong>Note: Once the update is accepted, you will not be able to return to the old version of the app.</strong>
                        </p>
                    </BlockStack>
                </Modal.Section>
            </Modal>
        </div>
    );
}