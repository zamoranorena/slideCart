<?php

namespace App\Http\Middleware;

use App\Exceptions\ShopifyBillingException;
use App\Lib\AuthRedirection;
use App\Lib\EnsurePlans;
use App\Lib\TopLevelRedirection;
use App\Models\Customer;
use App\Models\Plans;
use App\Models\Payment;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Shopify\Clients\Graphql;
use Shopify\Context;
use Shopify\Utils;
use Illuminate\Support\Facades\Log;

class EnsureShopifySession
{
    public const ACCESS_MODE_ONLINE = 'online';
    public const ACCESS_MODE_OFFLINE = 'offline';

    /* public const TEST_GRAPHQL_QUERY = <<<QUERY
    {
        shop {
            name
        }
    }
    QUERY; */

    /**
     * Checks if there is currently an active Shopify session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $accessMode
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $accessMode = self::ACCESS_MODE_OFFLINE)
    {
        try {
            switch ($accessMode) {
                case self::ACCESS_MODE_ONLINE:
                    $isOnline = true;
                    break;
                case self::ACCESS_MODE_OFFLINE:
                    $isOnline = false;
                    break;
                default:
                    throw new Exception(
                        "Unrecognized access mode '$accessMode', accepted values are 'online' and 'offline'"
                    );
            }

            $shop = Utils::sanitizeShopDomain($request->query('shop', ''));
            $session = Utils::loadCurrentSession($request->header(), $request->cookie(), $isOnline);
            //Log::info(print_r($session, true));
            if ($session && $shop && $session->getShop() !== $shop) {
                // This request is for a different shop. Go straight to login
                return AuthRedirection::redirect($request);
            };

            if ($session && $session->isValid()) {
                $customer = Customer::with('payment')->where("shop_url", $session->getShop())->where('install', 1)->first();
                if ($customer) {
                    $plan_id = EnsurePlans::getPlan($customer->plan_name);
                    $plan = Plans::find($plan_id);
                    $payment = collect($customer->payment)->where('status', "ACTIVE")->first();

                    $clientObj = new \stdClass();
                    $clientObj->error = false;
                    $clientObj->install = 1;
                    $clientObj->id = $customer->id;
                    $clientObj->charge_id = $plan->id;
                    $clientObj->message = "success";
                    $clientObj->plan_name = $plan->plan_name;
                    $clientObj->plan_charged_every = "Month";
                    $clientObj->plan_type = "RECURRING";
                    $clientObj->plan_trial = $plan->plan_trial;
                    $clientObj->plan_price = $plan->plan_price;
                    $clientObj->plan_status = $payment ? 1 : 0; //tiene pago

                    if ($payment) {
                        if ($request->is('api/get_current_plan')) {
                            return response()->json($clientObj);
                        };
                    } else {
                        if (!$request->is('api/create_charge')) {
                            return response()->json($clientObj);
                        };
                    };
                } else {
                    return response()->json([
                        "error" => false,
                        "install" => 0,
                        "plan_status" => 0,
                        "message" => "The client does not have an installation."
                    ]);
                }
                $request->attributes->set('shopifySession', $session);
                return $next($request);
            };
            $bearerPresent = preg_match("/Bearer (.*)/", $request->header('Authorization', ''), $bearerMatches);
            if (!$shop) {
                if ($session) {
                    $shop = $session->getShop();
                } elseif (Context::$IS_EMBEDDED_APP) {
                    if ($bearerPresent !== false) {
                        $payload = Utils::decodeSessionToken($bearerMatches[1]);
                        $shop = parse_url($payload['dest'], PHP_URL_HOST);
                    }
                }
            }
            return TopLevelRedirection::redirect($request, "/api/auth?shop=$shop");
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine(),
            ]);
        }
    }
}
