<?php

declare(strict_types=1);

namespace App\Lib;

use App\Exceptions\ShopifyProductCreatorException;
use Shopify\Auth\Session;
use Shopify\Clients\Rest;
use Illuminate\Support\Facades\Log;
use Shopify\Context;
class VerifyApp
{


    public static function call(Session $session)
    {
        $client = new Rest($session->getShop(), $session->getAccessToken());
        $getThemes = $client->get(path: 'themes', query: ['fields' => 'id,role']);
        $getBody = $getThemes->getDecodedBody();
        $themeId = '';

        foreach ($getBody["themes"] as $element) {
            if ($element['role'] === 'main') {
                $themeId = $element['id'];
            }
        };
        
        if(isset($themeId)){
            /* Log::debug(Context::$API_VERSION); */
            //$getAsset = $client->get(path: `themes/{$themeId}/assets`,query: ["asset" => ["key" => "config/settings_data.json"]]);
            $getAsset = $client->get(path: "themes/".$themeId."/assets",query: ["asset[key]" => "config/settings_data.json"]);
            $getAsset = $getAsset->getDecodedBody()['asset']['value'];
            Log::debug($getAsset);
            if (!$getAsset) return false;
            $getAsset = json_decode($getAsset, true);
            if (!isset($getAsset['current']['blocks'])) return false;
            $typeSuffix = 'blocks/star_rating/e734792e-48a3-4957-8757-ca877aedfbef';
            $embedBlock = null;
            foreach ($getAsset['current']['blocks'] as $id => $info) {
                if (str_ends_with($info['type'], $typeSuffix) && !$info['disabled']) {
                    $embedBlock = [$id, $info];
                    break;
                }
            }
            Log::debug($embedBlock);
            $Activated = !is_null($embedBlock);
            if ($Activated) {
                return (int)$Activated;
            } else {
                $shop = $session->getShop();
                return "https://{$shop}/admin/themes/{$themeId}/editor?context=apps&template&activateAppId=e734792e-48a3-4957-8757-ca877aedfbef/star_rating";
                //return "https://{$shop}/admin/themes/{$themeId}/editor?context=apps&appEmbed=e734792e-48a3-4957-8757-ca877aedfbef%2Fstar_rating";
            };

            //Log::debug($getAsset->getDecodedBody()['asset']);


        };
        /* if ($response->getStatusCode() !== 200) {
                throw new ShopifyProductCreatorException($response->getBody()->__toString(), $response);
            } */
    }
}
