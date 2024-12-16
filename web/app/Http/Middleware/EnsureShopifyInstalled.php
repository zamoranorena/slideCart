<?php

namespace App\Http\Middleware;

use App\Lib\AuthRedirection;
use App\Models\Session;
use App\Models\Customer;
use Closure;
use Illuminate\Http\Request;
use Shopify\Utils;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;



class EnsureShopifyInstalled
{
    /**
     * Checks if the shop in the query arguments is currently installed.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        Log::debug("PASO 1");
        /* $shop = $request->query('shop') ? Utils::sanitizeShopDomain($request->query('shop')) : null;

        $appInstalled = $shop && Session::where('shop', $shop)->where('access_token', '<>', null)->exists();
        $isExitingIframe = preg_match("/^ExitIframe/i", $request->path());

        return ($appInstalled || $isExitingIframe) ? $next($request) : AuthRedirection::redirect($request); */

        try {
            Log::debug("PASO 1: El usuario realiza una solicitud para instalar la aplicación.");
            Log::debug("<---- Inicio Middleware EnsureShopifyInstalled ---->");
            Log::debug("Parametros de entrada");
            Log::debug("Host: " . $request->query('host'));
            Log::debug("Shop: " . $request->query('shop'));
            Log::debug("REQUEST1: " . $request->query("embedded"));
            $shop = $request->query('shop') ? Utils::sanitizeShopDomain($request->query('shop')) : null;
            if (!isset($shop)) {
                throw new InvalidArgumentException("Invalid shop domain: " . $request->query('shop'));
            }
            //Log::debug("sql table customer: " . Customer::where('shop_url', $shop)->where('install', 1)->toSql());
            $appInstalled = $shop && Customer::where('shop_url', $shop)->where('install', 1)->exists();
            if ($appInstalled) {
                Log::debug("Resultado: si tiene instalación");
                Log::debug("<---- Fin Middleware EnsureShopifyInstalled ---->");
                return $next($request);
            } else {
                Log::debug("Resultado: no tiene instalación");
                Log::debug("<---- Fin Middleware EnsureShopifyInstalled ---->");
                Log::debug("PASO 2:La aplicación redirige a Shopify para cargar la pantalla de concesión de OAuth y solicita al usuario que autorice los ámbitos requeridos.");
                return AuthRedirection::redirect($request);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'instaled_error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
}
