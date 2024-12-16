<?php

declare(strict_types=1);

namespace App\Lib;

use Shopify\Auth\Session;
use Shopify\Clients\Graphql;
use Illuminate\Support\Facades\Log;
class GraphqlQuerys
{
  private const CANCEL_RECURRING_PURCHASE_MUTATION = <<<'QUERY'
  mutation appSubscriptionCancel($id: ID!) {
    appSubscriptionCancel(id: $id) {
      appSubscription {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
  QUERY;

  public static function cancel_charge($charge_id,$customer)
  {
    try {
      $client = new Graphql($customer->shop_url, $customer->token);
      $query = [
        "query" => self::CANCEL_RECURRING_PURCHASE_MUTATION,
        "variables" => [
            "id" => "gid://shopify/AppSubscription/$charge_id",
        ],
    ];
      $response = $client->query($query);
      $response = $response->getDecodedBody();
      return $response;
    } catch (\Exception $e) {
      return response()->json([
        'error' => true,
        'message' => $e->getMessage(),
        'error_line' => $e->getLine()
      ]);
    }
  }
}
