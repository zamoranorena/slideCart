<?php

declare(strict_types=1);

namespace App\Lib;

use Exception;
use Illuminate\Support\Facades\Log;

class DbSettingsMoney
{
    public function updateMoney(int $customerId, $moneyFormat)
    {
        return \App\Models\Settings::where('customer_id', $customerId)->update([
            'money_format' => $moneyFormat,
        ]);
    }
}
