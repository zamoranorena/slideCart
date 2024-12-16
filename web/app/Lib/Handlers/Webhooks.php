<?php

declare(strict_types=1);

namespace App\Lib\Handlers;

use Illuminate\Support\Facades\Log;
use Shopify\Webhooks\Handler;
use App\Lib\EnsureClientFile;
use App\Models\Session;
use App\Models\Customer;
use App\Models\Settings;
use App\Models\Payment;


class Webhooks implements Handler
{
    public function handle(string $topic, string $shop, array $body): void
    {
        Log::debug("WEBHOOKS body: ". json_encode($body, JSON_PRETTY_PRINT));
        $customer = Customer::where('shop_url', $shop)->where('install', 1)->first();
        Log::debug("WEBHOOKS customer: ". json_encode($customer, JSON_PRETTY_PRINT));
        switch ($topic) {
            case "APP_UNINSTALLED":
                if(isset($customer)){
                    Log::debug("App was uninstalled from $shop - removing all sessions");
                    $customer->install = 0;
                    $customer->pay = 0;
                    $customer->update();
                    Payment::where('customer_id', $customer->id)->update(['status' => 'CANCELLED']); // Actualizar pago a cancelado
                    Session::where('id_session', 'offline_'.$shop)->delete(); // Eliminar sessiones
                    EnsureClientFile::chargeEnvironment($shop);
                };
                break;
            case "SHOP_UPDATE":
                if(isset($body) && isset($body["money_format"])){
                    Log::debug("SHOP_UPDATE $shop");
                    Settings::where('customer_id', $customer->id)->update(['money_format' => $body["money_format"]]); // Actualizar pago a cancelado
                };
                break;
        };
    }
}
