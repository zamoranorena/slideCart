<?php

declare(strict_types=1);

namespace App\Lib;

use App\Exceptions\ShopifyBillingException;
use Illuminate\Support\Facades\Log;
use Shopify\Auth\Session;
use Shopify\Clients\Graphql;
use Shopify\Context;
use App\Lib\EnsurePlans;
use App\Models\Plans;
use App\Models\Customer;
use App\Models\Payment;

class EnsureBilling
{
    public const INTERVAL_ONE_TIME = "ONE_TIME";
    public const INTERVAL_EVERY_30_DAYS = "EVERY_30_DAYS";
    public const INTERVAL_ANNUAL = "ANNUAL";

    private static $RECURRING_INTERVALS = [
        self::INTERVAL_EVERY_30_DAYS, self::INTERVAL_ANNUAL
    ];

    /**
     * Check if the given session has an active payment based on the configs.
     *
     * @param Session $session The current session to check
     * @param array   $config  Associative array that accepts keys:
     *                         - "chargeName": string, the name of the charge
     *                         - "amount": float
     *                         - "currencyCode": string
     *                         - "interval": one of the INTERVAL_* consts
     *
     * @return array Array containing
     * - hasPayment: bool
     * - confirmationUrl: string|null
     */
    public static function check(Session $session, array $config): array
    {
        $confirmationUrl = null;
        $customer = Customer::where("shop_url", $session->getShop())->where('install', 1)->first();
        $payment = Payment::where("customer_id", $customer->id)->where("status", "ACTIVE")->first();

        if ($payment) {
            $hasPayment = true;
        } else {
            $hasPayment = false;
            $planName = $customer->plan_name;
            $planId = EnsurePlans::getPlan($planName); //LIB TO GET PLAN
            $plan = Plans::find($planId); //SE OBTIENE EL PLAN DE LA BD
            $planName = $plan->plan_name;
            $planPrice = $plan->plan_price;
            $planTrial = $plan->plan_trial;
            $trialDays = EnsurePlans::getTrialDays($planTrial, $customer->date->format('Y-m-d H:i:s'));
            //Casos Especificos
            if (strpos($planName, 'SHOPIFY ADVANCED - NO LIMITS PLAN') !== false || strpos($planName, 'SHOPIFY PLUS - NO LIMITS PLAN') !== false) {
                $customer->new_user = 0;
                $customer->save();
            };
            if($planId == 9){
                $client = array (
                    'customer' => $customer,
                    'plan' => $plan
                  );
                $hasPayment = EnsurePlans::checkDev($client,$session);
            }else{
                //Estableciendo configuración
                $config['chargeName'] = $planName;
                $config['planId'] = $planId;
                $config['amount'] = $planPrice;
                $config['trialDays'] = $trialDays;
                $confirmationUrl = self::requestPayment($customer, $config);
            };
            
        }
        return [$hasPayment, $confirmationUrl];
    }

    private static function hasActivePayment(Session $session, array $config): bool
    {
        if (self::isRecurring($config)) {
            return self::hasSubscription($session, $config);
        } else {
            return self::hasOneTimePayment($session, $config);
        }
    }

    private static function hasSubscription(Session $session, array $config): bool
    {
        $responseBody = self::queryOrException($session, self::RECURRING_PURCHASES_QUERY);
        $subscriptions = $responseBody["data"]["currentAppInstallation"]["activeSubscriptions"];

        foreach ($subscriptions as $subscription) {
            if (
                $subscription["name"] === $config["chargeName"] &&
                (!self::isProd() || !$subscription["test"])
            ) {
                return true;
            }
        }

        return false;
    }

    private static function hasOneTimePayment(Session $session, array $config): bool
    {
        $purchases = null;
        $endCursor = null;
        do {
            $responseBody = self::queryOrException(
                $session,
                [
                    "query" => self::ONE_TIME_PURCHASES_QUERY,
                    "variables" => ["endCursor" => $endCursor]
                ]
            );
            $purchases = $responseBody["data"]["currentAppInstallation"]["oneTimePurchases"];

            foreach ($purchases["edges"] as $purchase) {
                $node = $purchase["node"];
                if (
                    $node["name"] === $config["chargeName"] &&
                    (!self::isProd() || !$node["test"]) &&
                    $node["status"] === "ACTIVE"
                ) {
                    return true;
                }
            }

            $endCursor = $purchases["pageInfo"]["endCursor"];
        } while ($purchases["pageInfo"]["hasNextPage"]);

        return false;
    }

    /**
     * @return string|null
     */
    private static function requestPayment($customer, array $config)
    {
        $hostName = Context::$HOST_NAME;
        $shop = $customer->shop_url;
        $host = base64_encode("$shop/admin");
        //$returnUrl = "https://$hostName?shop={$shop}&host=$host";

        $returnUrl = Context::$HOST_SCHEME . '://' . $hostName . "/api/charge/callback?shop=$shop&host=$host&plan_id=$config[planId]";
        if (self::isRecurring($config)) {
            $data = self::requestRecurringPayment($customer, $config, $returnUrl);
            $data = $data["data"]["appSubscriptionCreate"];
        } else {
            $data = self::requestOneTimePayment($customer, $config, $returnUrl);
            $data = $data["data"]["appPurchaseOneTimeCreate"];
        }

        if (!empty($data["userErrors"])) {
            throw new ShopifyBillingException("Error while billing the store", $data["userErrors"]);
        }

        return $data["confirmationUrl"];
    }

    private static function requestRecurringPayment($customer, array $config, string $returnUrl): array
    {
        return self::queryOrException(
            $customer,
            [
                "query" => self::RECURRING_PURCHASE_MUTATION,
                "variables" => [
                    "name" => $config["chargeName"],
                    "trialDays" => $config["trialDays"],
                    "lineItems" => [
                        "plan" => [
                            "appRecurringPricingDetails" => [
                                "interval" => $config["interval"],
                                "price" => ["amount" => $config["amount"], "currencyCode" => $config["currencyCode"]],
                            ],
                        ],
                    ],
                    "returnUrl" => $returnUrl,
                    "test" => !self::isProd(),
                ],
            ]
        );
    }

    private static function requestOneTimePayment($customer, array $config, string $returnUrl): array
    {
        return self::queryOrException(
            $customer,
            [
                "query" => self::ONE_TIME_PURCHASE_MUTATION,
                "variables" => [
                    "name" => $config["chargeName"],
                    "price" => ["amount" => $config["amount"], "currencyCode" => $config["currencyCode"]],
                    "returnUrl" => $returnUrl,
                    "test" => !self::isProd(),
                ],
            ]
        );
    }

    private static function isProd()
    {
        return app()->environment() === 'production';
    }

    private static function isRecurring(array $config): bool
    {
        return in_array($config["interval"], self::$RECURRING_INTERVALS);
    }

    /**
     * @param string|array $query
     */
    private static function queryOrException($customer, $query): array
    {
        $client = new Graphql($customer->shop_url, $customer->token);

        $response = $client->query($query);
        $responseBody = $response->getDecodedBody();

        if (!empty($responseBody["errors"])) {
            throw new ShopifyBillingException("Error while billing the store", (array)$responseBody["errors"]);
        }

        return $responseBody;
    }

    private const RECURRING_PURCHASES_QUERY = <<<'QUERY'
    query appSubscription {
        currentAppInstallation {
            activeSubscriptions {
                name, test, status, id
            }
        }
    }
    QUERY;

    private const ONE_TIME_PURCHASES_QUERY = <<<'QUERY'
    query appPurchases($endCursor: String) {
        currentAppInstallation {
            oneTimePurchases(first: 250, sortKey: CREATED_AT, after: $endCursor) {
                edges {
                    node {
                        name, test, status
                    }
                }
                pageInfo {
                    hasNextPage, endCursor
                }
            }
        }
    }
    QUERY;

    private const RECURRING_PURCHASE_MUTATION = <<<'QUERY'
    mutation createPaymentMutation(
        $name: String!
        $trialDays: Int!
        $lineItems: [AppSubscriptionLineItemInput!]!
        $returnUrl: URL!
        $test: Boolean
    ) {
        appSubscriptionCreate(
            name: $name
            trialDays: $trialDays
            lineItems: $lineItems
            returnUrl: $returnUrl
            test: $test
        ) {
            appSubscription{
                id
            }
            confirmationUrl
            userErrors {
                field, message
            }
        }
    }
    QUERY;

    private const ONE_TIME_PURCHASE_MUTATION = <<<'QUERY'
    mutation createPaymentMutation(
        $name: String!
        $price: MoneyInput!
        $returnUrl: URL!
        $test: Boolean
    ) {
        appPurchaseOneTimeCreate(
            name: $name
            price: $price
            returnUrl: $returnUrl
            test: $test
        ) {
            confirmationUrl
            userErrors {
                field, message
            }
        }
    }
    QUERY;
}
