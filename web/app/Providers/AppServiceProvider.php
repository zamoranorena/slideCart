<?php

namespace App\Providers;

use App\Lib\DbSessionStorage;
use App\Lib\Handlers\Webhooks;
use App\Lib\Handlers\ShopUpdate;
use App\Lib\Handlers\Gdpr\CustomersDataRequest;
use App\Lib\Handlers\Gdpr\CustomersRedact;
use App\Lib\Handlers\Gdpr\ShopRedact;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Application\isLocal;
use Shopify\Context;
use Shopify\ApiVersion;
use Shopify\Webhooks\Registry;
use Shopify\Webhooks\Topics;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     * @throws \Shopify\Exception\MissingArgumentException
     */
    public function boot()
    {
        $host = str_replace('https://', '', env('HOST', 'not_defined'));
        /* Log::debug('AppService');
        Log::debug(env('SCOPES', 'not_defined'),); */
        $customDomain = env('SHOP_CUSTOM_DOMAIN', null);
        Context::initialize(
            env('SHOPIFY_API_KEY', 'not_defined'),
            env('SHOPIFY_API_SECRET', 'not_defined'),
            env('SCOPES', 'not_defined'),
            $host,
            new DbSessionStorage(),
            ApiVersion::LATEST,
            true,
            false,
            null,
            '',
            null,
            (array)$customDomain,
        );

        URL::forceRootUrl("https://$host");
        URL::forceScheme('https');

        //REGISTER HANDLE TOPIC
        Registry::addHandler(Topics::APP_UNINSTALLED, new Webhooks());
        Registry::addHandler(Topics::SHOP_UPDATE, new Webhooks());

        /*
         * This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint to be used by your app in the
         * “GDPR mandatory webhooks” section in the “App setup” tab, and customize the code when you store customer data
         * in the handlers being registered below.
         *
         * More details can be found on shopify.dev:
         * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks
         *
         * Note that you'll only receive these webhooks if your app has the relevant scopes as detailed in the docs.
         */
        Registry::addHandler('CUSTOMERS_DATA_REQUEST', new CustomersDataRequest());
        Registry::addHandler('CUSTOMERS_REDACT', new CustomersRedact());
        Registry::addHandler('SHOP_REDACT', new ShopRedact());


        /* Validator::extend('image64', function ($attribute, $value, $parameters, $validator) {
            // Decode the image
            $decodedImage = base64_decode($value);

            // Get image size in kilobytes 
            $imageSize = strlen($decodedImage) / 1024;

            // Check if image is below max size
            return $imageSize <= $parameters[0];
        }); */

       /*  Validator::replacer('image64', function ($message, $attribute, $rule, $parameters) {
            return str_replace([':attribute', ':max'], [$attribute, $parameters[0]], $message);
        }); */
    }
}
