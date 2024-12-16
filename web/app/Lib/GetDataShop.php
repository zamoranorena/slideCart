<?php

declare(strict_types=1);

namespace App\Lib;

use Shopify\Auth\Session;
use Shopify\Clients\Graphql;

class GetDataShop
{
  private const SHOP_GRAPHQL_QUERY = <<<QUERY
    {
        shop {
            name
            email
            plan {
              displayName
              partnerDevelopment
              shopifyPlus
            }
            currencyFormats {
              moneyFormat 
            }
            primaryDomain {
              url
              host
            }
        }
    }
    QUERY;

  public static function call($shop,$token)
  {
    try {
      $client = new Graphql($shop, $token);
      $response = $client->query(self::SHOP_GRAPHQL_QUERY);
      $response = json_decode($response->getBody()->getContents(), true);
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
