<?php

declare(strict_types=1);

namespace App\Lib;

use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Payment;
use Shopify\Webhooks\Registry;
use Shopify\Webhooks\Topics;

class EnsurePlans
{
    public static function getPlan($name)
    {
        switch ($name) {
            case 'Basic Shopify':
                $result = 10;
                break;
            case 'Shopify':
                $result = 11;
                break;
            case 'Advanced Shopify':
                $result = 12;
                break;
            case 'Shopify Plus':
                $result = 13;
                break;
            case 'Developer Preview':
                $result = 9;
                break;
            case 'Partner Test':
                $result = 9;
                break;
            case 'Development':
                $result = 9;
                break;
            default:
                $result = 10;
        }
        return $result;
        //return 10;
    }

    public static function getTrialDays($trialDays, $date)
    {
        $currentTrial = 0;
        $date1 = $date;
        $date2 = date('Y-m-d H:i:s');
        $seconds = strtotime($date2) - strtotime($date1);
        $minutes =  $seconds / 60;
        $hours = $minutes / 60;
        $days = $hours / 24;
        $daysRound = floor($days);
        $trial = $trialDays - $daysRound;
        if ($trialDays >= $daysRound) {
            $currentTrial = $trial;
        }
        return $currentTrial;
    }

    public static function checkDev($client, $session)
    {
        $hasPayment = false;
        if (isset($client) && isset($session)) {
            if (isset($client["plan"]) && isset($client["customer"])) {
                $dataShop = GetDataShop::call($session->getShop(),$session->getAccessToken());
                $money_format = $dataShop["data"]["shop"]["currencyFormats"]["moneyFormat"];
                $customerId = $client["customer"]["id"];
                $response_shop_update = Registry::register(
                    '/webhooks/shop/update',
                    Topics::SHOP_UPDATE,
                    $session->getShop(),
                    $session->getAccessToken()
                );

                $customer = Customer::with('Settings')->where('id', $customerId)->first();
                if (isset($customer)) {
                    if ($customer->Settings) {
                        $customer->Settings()->update([
                            'customer_id' => $customerId,
                            'money_format' => $money_format
                        ]);
                    };

                    $payment = new Payment();
                    $payment->plan_id = $client["plan"]["id"];
                    $payment->charge_id = 99999999999;
                    $payment->status = "ACTIVE";
                    $payment->customer_id = $customerId;
                    $payment->save();
                    if ($payment) {
                        EnsureClientFile::chargeEnvironment($session->getShop());
                        $hasPayment = true;
                    };
                };
            };
        };
        return $hasPayment;
    }
}
