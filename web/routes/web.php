<?php

use App\Exceptions\ShopifyProductCreatorException;
use App\Lib\AuthRedirection;
use App\Lib\EnsureBilling;
use App\Lib\ProductCreator;
use App\Lib\GetDataShop;
use App\Lib\EnsureEnvironment;
use App\Lib\EnsureClientFile;
use App\Models\Session;
use App\Models\Customer;
use App\Models\Settings;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Shopify\Auth\OAuth;
use Shopify\Exception\InvalidOAuthException;
use Shopify\Exception\CookieNotFoundException;
use Shopify\Exception\OAuthSessionNotFoundException;
use Shopify\Auth\Session as AuthSession;
use Shopify\Clients\HttpHeaders;
use Shopify\Clients\Rest;
use Shopify\Context;
use Shopify\Exception\InvalidWebhookException;
use Shopify\Utils;
use Shopify\Webhooks\Registry;
use Shopify\Webhooks\Topics;

use App\Http\Controllers\ClientController;

use App\Models\IntegrationsApp;
use App\Models\Integrations;
use PhpParser\Node\Expr\Assign;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
| If you are adding routes outside of the /api path, remember to also add a
| proxy rule for them in web/frontend/vite.config.js
|
*/

Route::fallback(function (Request $request) {
    Log::debug('fallback');
    Log::debug($request->query("host", false));
    Log::debug($request->query("shop", false));
    if (Context::$IS_EMBEDDED_APP &&  $request->query("embedded", false) === "1") {
        if (env('APP_ENV') === 'production') {
            return file_get_contents(public_path('index.html'));
        } else {
            //return redirect('/your-plan?host=' . $request->query("host", null));
            return file_get_contents(base_path('frontend/index.html'));
        }
    } else {
        return redirect(Utils::getEmbeddedAppUrl($request->query("host", null)) . "/" . $request->path());
    }
})->middleware('shopify.installed');

Route::get('/api/auth', function (Request $request) {
    $shop = Utils::sanitizeShopDomain($request->query('shop'));

    // Delete any previously created OAuth sessions that were not completed (don't have an access token)
    Session::where('id_session', 'offline_'.$shop)->where('data_session', null)->delete();
    Log::debug('/api/auth');
    Log::debug(AuthRedirection::redirect($request));

    return AuthRedirection::redirect($request);
});

// RESPUESTA DE INSTALACION DE SHOPIFY
Route::get('/api/auth/callback', function (Request $request) {
    Log::debug("/api/auth/callback");
    try {
        //Log::debug("PASO 3: El usuario autoriza la aplicación consintiendo los alcances solicitados.");
        //Log::debug("PASO 4: La aplicación recibe una concesión de autorización. Esta es una credencial temporal que representa la autorización.");
        $session = OAuth::callback(
            $request->cookie(),
            $request->query(),
            ['App\Lib\CookieHandler', 'saveShopifyCookie'],
        );

        //Log::debug("SESSION TOKEN");
        //Log::debug($session->getAccessToken());
        //Log::debug("SESSION SHOP");
        //Log::debug($session->getShop());

        $host = $request->query('host');
        $shop = Utils::sanitizeShopDomain($request->query('shop'));
        $token = $session->getAccessToken();

        $customer = Customer::where('shop_url', $session->getShop())->first();
        //Log::debug("Customer: " . json_encode($customer, JSON_PRETTY_PRINT));        

        $dataShop = GetDataShop::call($shop, $token);
        $planName = $dataShop["data"]["shop"]["plan"]["displayName"];
        $email = $dataShop["data"]["shop"]["email"];
        $shop_name = $dataShop["data"]["shop"]["name"];
        $money_format = $dataShop["data"]["shop"]["currencyFormats"]["moneyFormat"];

        if (!$customer) {
            $customer = new Customer();
        };
        $customer->email = $email;
        $customer->shop_name = $shop_name;
        $customer->shop_url = $session->getShop();
        $customer->token = $token;
        $customer->install = 1;
        $customer->pay = 1;
        $customer->plan_name = $planName;
        $customer->save();
        $customer_id = $customer->id;

        //Log::debug("customer_id: " . json_encode($customer_id, JSON_PRETTY_PRINT));
        EnsureEnvironment::create_environment($customer_id, $money_format); //crear enviro 

        // HOOKS
        $response_uninstall = Registry::register('/webhooks/uninstalled', Topics::APP_UNINSTALLED, $shop, $token); // Desinstalación

        if ($response_uninstall->isSuccess()) {
            //Log::debug("Registered APP_UNINSTALLED webhook for shop $shop");
        } else {
            /* Log::error(
                "Failed to register APP_UNINSTALLED webhook for shop $shop with response body: " . $response_uninstall->getBody()
            ); */
        };
        $redirectUrl = Utils::getEmbeddedAppUrl($host);

        if (Config::get('shopify.billing.required')) { //Requiere Pago
            list($hasPayment, $confirmationUrl) = EnsureBilling::check($session, Config::get('shopify.billing'));
            if (!$hasPayment) {
                //Log::debug("Si no tiene pago redirige a la pagina del cargo");
                $redirectUrl = $confirmationUrl;
            }
        };
        return redirect($redirectUrl);

        //throw new Exception('Error provocado');
    } catch (Exception $e) {
        if (($e instanceof CookieNotFoundException)) {
            //Log::debug("Error CookieNotFoundException: " .$e->getMessage());
            return AuthRedirection::redirect($request);
        };
        if (($e instanceof OAuthSessionNotFoundException)) {
            //Log::debug("Error OAuthSessionNotFoundException: " .$e->getMessage());
            return AuthRedirection::redirect($request);
        };
        if (($e instanceof InvalidOAuthException)) {
            //Log::debug("Error OAuthSessionNotFoundException: " .$e->getMessage());
            return AuthRedirection::redirect($request);
        };
        //Log::debug("Error Exception: " . $e->getMessage());
        return response()->json([
            'error' => true,
            'message' => $e->getMessage(),
            'error_line' => $e->getLine()
        ]);
    }
});

Route::get('/api/products/count', function (Request $request) {
    /** @var AuthSession */
    $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

    $client = new Rest($session->getShop(), $session->getAccessToken());
    $result = $client->get('products/count');
    Log::debug('*******************--------------------------');
    Log::debug(print_r($result,true));
    return response($result->getDecodedBody());

})->middleware('shopify.auth');

Route::get('/api/products/create', function (Request $request) {
    /** @var AuthSession */
    $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

    $success = $code = $error = null;
    try {
        ProductCreator::call($session, 5);
        $success = true;
        $code = 200;
        $error = null;
    } catch (\Exception $e) {
        $success = false;

        if ($e instanceof ShopifyProductCreatorException) {
            $code = $e->response->getStatusCode();
            $error = $e->response->getDecodedBody();
            if (array_key_exists("errors", $error)) {
                $error = $error["errors"];
            }
        } else {
            $code = 500;
            $error = $e->getMessage();
        }

    } finally {
        return response()->json(["success" => $success, "error" => $error], $code);
    }
})->middleware('shopify.auth');

Route::get('/api/charge/callback', function (Request $request) {
    try {
        //Log::debug("<---- Respuesta de aprobación de la suscripción por parte de shopify ---->");
        //Log::debug(json_encode($request->all(), JSON_PRETTY_PRINT));

        $host = $request->query('host');
        $shop = $request->query('shop');
        $chargeId = $request->query('charge_id');
        $planId = $request->query('plan_id');
        $customer = Customer::where("shop_url", $shop)->where('install', 1)->first();
        //$access_token = $customer->token;
        $customer_id = $customer->id;
        $access_token = $customer->token;
        // Se realiza un registro en la tabla payment

        $payment = new Payment();
        $payment->plan_id = $planId;
        $payment->charge_id = $chargeId;
        $payment->status = "ACTIVE";
        $payment->customer_id = $customer_id;
        $payment->save();

        //Log::debug("Se registró correctamente el pago en la tabla payments de la aplicación.");
        $response_shop_update = Registry::register(
            '/webhooks/shop/update',
            Topics::SHOP_UPDATE,
            $shop,
            $access_token
        );

        $dataShop = GetDataShop::call($shop, $access_token);
        $money_format = $dataShop["data"]["shop"]["currencyFormats"]["moneyFormat"];
        $settings = Settings::where("customer_id", $customer_id)->first();
        if (isset($settings)) {
            $settings->money_format = $money_format;
            $settings->update();
        };
        EnsureClientFile::chargeEnvironment($shop);
        $redirectUrl = Utils::getEmbeddedAppUrl($host);

        //Log::debug("Url aplicación: " . $redirectUrl);
        // Redirige a la aplicación
        return redirect($redirectUrl);
    } catch (\Exception $e) {
        //Log::debug("Error exception: " . $e->getMessage());
        return response()->json([
            'error' => true,
            'message' => $e->getMessage(),
            'error_line' => $e->getLine()
        ]);
    }
});

Route::post('/webhooks/uninstalled', function (Request $request) {
    try {
        $topic = $request->header(HttpHeaders::X_SHOPIFY_TOPIC, '');
        $response = Registry::process($request->header(), $request->getContent());
        if (!$response->isSuccess()) {
            /* Log::error("Failed to process '$topic' webhook: {$response->getErrorMessage()}");
            return response()->json(['message' => "Failed to process '$topic' webhook"], 500); */
        }
    } catch (InvalidWebhookException $e) {
        /* Log::error("Got invalid webhook request for topic '$topic': {$e->getMessage()}");
        return response()->json(['message' => "Got invalid webhook request for topic '$topic'"], 401); */
    } catch (\Exception $e) {
        /* Log::error("Got an exception when handling '$topic' webhook: {$e->getMessage()}");
        return response()->json(['message' => "Got an exception when handling '$topic' webhook"], 500); */
    }
});
Route::post('/webhooks/shop/update', function (Request $request) {
    try {
        $topic = $request->header(HttpHeaders::X_SHOPIFY_TOPIC, '');
        $response = Registry::process($request->header(), $request->getContent());
        //Log::debug(json_encode($response, JSON_PRETTY_PRINT));
        if (!$response->isSuccess()) {
            /* Log::error("Failed to process '$topic' webhook: {$response->getErrorMessage()}");
            return response()->json(['message' => "Failed to process '$topic' webhook"], 500); */
        }
    } catch (InvalidWebhookException $e) {
        /* Log::error("Got invalid webhook request for topic '$topic': {$e->getMessage()}");
        return response()->json(['message' => "Got invalid webhook request for topic '$topic'"], 401); */
    } catch (\Exception $e) {
        /* Log::error("Got an exception when handling '$topic' webhook: {$e->getMessage()}");
        return response()->json(['message' => "Got an exception when handling '$topic' webhook"], 500); */
    }
});


Route::post('/hooks/mandatory/customer', function (Request $request) {
    try {
        $topic = $request->header(HttpHeaders::X_SHOPIFY_TOPIC, '');
        $response = Registry::process($request->header(), $request->getContent());      
        if (!$response->isSuccess()) {
            /* Log::error("Failed to process '$topic' webhook: {$response->getErrorMessage()}");
            return response()->json(['message' => "Failed to process '$topic' webhook"], 500); */
        };
        return response()->json(['message' => "Checked"], 200);;
    } catch (InvalidWebhookException $e) {
        /* Log::error("Got invalid webhook request for topic '$topic': {$e->getMessage()}");
        return response()->json(['message' => "Got invalid webhook request for topic '$topic'"], 401); */
    } catch (\Exception $e) {
        /* Log::error("Got an exception when handling '$topic' webhook: {$e->getMessage()}");
        return response()->json(['message' => "Got an exception when handling '$topic' webhook"], 500); */
    }
});
Route::post('/hooks/mandatory/shop', function (Request $request) {
    try {
        $topic = $request->header(HttpHeaders::X_SHOPIFY_TOPIC, '');
        $response = Registry::process($request->header(), $request->getContent());
        if (!$response->isSuccess()) {
            /* Log::error("Failed to process '$topic' webhook: {$response->getErrorMessage()}");
            return response()->json(['message' => "Failed to process '$topic' webhook"], 500); */
        };
        return response()->json(['message' => "Checked"], 200);;
    } catch (InvalidWebhookException $e) {
        /* Log::error("Got invalid webhook request for topic '$topic': {$e->getMessage()}");
        return response()->json(['message' => "Got invalid webhook request for topic '$topic'"], 401); */
    } catch (\Exception $e) {
        /* Log::error("Got an exception when handling '$topic' webhook: {$e->getMessage()}");
        return response()->json(['message' => "Got an exception when handling '$topic' webhook"], 500); */
    }
});


Route::get('/api/test', function (Request $request) {
    Log::debug('/api/test');
    /* CAMBIOS TEST GIT HUB */
    $customerId = 1;
    /* EnsureEnvironment::create_environment($customerId, ''); */
});