<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

use Shopify\Clients\Graphql;
use App\Lib\EnsureBilling;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Plans;
use App\Models\Payment;

class PlansController extends Controller
{

    public function get_current_plan(Request $request)
    {
        /* try {
            $session = $request->get('shopifySession'); // Proporcionado por el middleware shopify.auth, garantizado para estar activo.
            Log::debug('route get current plan: '. $session->getShop());
            $customer = Customer::with('payment')->where("shop_url", $session->getShop())->where('install', 1)->first();
            if(isset($customer)){
                Log::debug("get_current_plan payment 1: ".json_encode($customer, JSON_PRETTY_PRINT));
                $payment = collect($customer->payment)->where('status', "ACTIVE")->first();
                Log::debug("get_current_plan payment: ".json_encode($payment, JSON_PRETTY_PRINT));
                //if(isset($payment)){
                    $plan_id = EnsurePlans::getPlan($customer->plan_name);
                    $plan = Plans::find($plan_id);
                    return response()->json([
                        "error" => false,
                        "message" => "success",
                        "id" => $customer->id,
                        "charge_id" => $plan->id,
                        "status" => isset($payment) ? 1 : 0,
                        "plan_price" => $plan->plan_price,
                        "plan_trial" => $plan->plan_trial,
                        "plan_type" => $plan->plan_type,
                        "plan_charged_every" => "Month"
                    ]);
                //};
            };
        } catch (\Exception $e) {
            //throw $th;
        } */
        $request->get('shopifySession');
    }

    // Crea un cargo en shopify y realiza un registro en la tabla pagos con estado ACTIVO
    public function create_charge(Request $request)
    {
        try {
            $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active
            
            list($hasCharge, $confirmationUrl) = ensureBilling::check($session, Config::get('shopify.billing'));
            $redirectUrl = null;
            if (!$hasCharge) {
                $redirectUrl = $confirmationUrl;
            }
            return response()->json([
                "result" => $redirectUrl,
                "install" => 1,
                'plan_status' => 1, //si tiene pago
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }

    public function cancel_charge(Request $request)
    {
        try {
            $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active
            $shop = $session->getShop();

            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $dbPayment = Payment::where('customer_id', $customer->id)->where('status', 'ACTIVE')->first();
                if ($dbPayment) {
                    $chargeId = $dbPayment->charge_id;
                    $cancelSubscription = new \stdClass();
                    $cancelSubscription->message='success';
                    if ($chargeId == 99999999999) {
                    } else {
                        $query = [
                            "query" => self::CANCEL_RECURRING_PURCHASE_MUTATION,
                            "variables" => [
                                "id" => "gid://shopify/AppSubscription/" . $dbPayment->charge_id
                            ],
                        ];
                        $client = new Graphql($shop, $customer->token);
                        $response = $client->query($query);
                        $cancelSubscription = $response->getDecodedBody();
                    };
                    Payment::where('id', $dbPayment->id)->update(['status' => 'CANCELLED']);
                    //const client = new Shopify.Clients.Rest(shopDomain, customer.data[0].token);
                    $query = ["query" => self::GET_WEBHHOKS_SHOP_UPDATE];
                    $client = new Graphql($shop, $customer->token);
                    $response = $client->query($query);
                    $responseBodyHook = $response->getDecodedBody();
                    if ($responseBodyHook && $responseBodyHook["data"]) {
                        if ($responseBodyHook["data"]["webhookSubscriptions"]) {
                            if (count($responseBodyHook["data"]["webhookSubscriptions"]["edges"]) > 0) {
                                if ($responseBodyHook["data"]["webhookSubscriptions"]["edges"][0]["node"]) {
                                    if ($responseBodyHook["data"]["webhookSubscriptions"]["edges"][0]["node"]["id"]) {
                                        $query = [
                                            "query" => self::DELETE_WEBHHOKS_SHOP_UPDATE,
                                            "variables" => [
                                                "id" => $responseBodyHook["data"]["webhookSubscriptions"]["edges"][0]["node"]["id"]
                                            ],
                                        ];
                                        $client = new Graphql($shop, $customer->token);
                                        $response = $client->query($query);
                                        $deleteHook = $response->getDecodedBody();
                                    };
                                };
                            };
                        };
                    };
                    EnsureClientFile::chargeEnvironment($shop);
                    return response()->json($cancelSubscription);
                };
            };
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }

    private const CANCEL_RECURRING_PURCHASE_MUTATION = <<<'QUERY'
    mutation appSubscriptionCancel($id: ID!) {
        appSubscriptionCancel(id: $id) {
          appSubscription {
            id,
            status
          }
          userErrors {
            field
            message
          }
        }
      }      
    QUERY;

    private const GET_WEBHHOKS_SHOP_UPDATE = <<<QUERY
    query {
        webhookSubscriptions(first: 2, topics: SHOP_UPDATE) {
        edges {
            node {
            id
            topic
            endpoint {
                __typename
                ... on WebhookHttpEndpoint {
                callbackUrl
                }
                ... on WebhookEventBridgeEndpoint {
                arn
                }
            }
            }
        }
        }
    }
    QUERY;

    private const DELETE_WEBHHOKS_SHOP_UPDATE = <<<'QUERY'
    mutation webhookSubscriptionDelete($id: ID!) {
      webhookSubscriptionDelete(id: $id) {
        userErrors {
          field
          message
        }
        deletedWebhookSubscriptionId
      }
    }
  QUERY;
}
