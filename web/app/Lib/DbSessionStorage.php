<?php

declare(strict_types=1);

namespace App\Lib;

use Exception;
use Shopify\Auth\AccessTokenOnlineUserInfo;
use Shopify\Auth\Session;
use Shopify\Auth\SessionStorage;
use Illuminate\Support\Facades\Log;

class DbSessionStorage implements SessionStorage
{
    public function loadSession(string $sessionId): ?Session
    {
        /*$dbSession = \App\Models\Session::where('session_id', $sessionId)->first();
        Log::debug('session');
        Log::debug($data_session['shop']); */
        /* if ($dbSession) {
            $session = new Session(
                $dbSession->session_id,
                $dbSession->shop,
                $dbSession->is_online == 1,
                $dbSession->state
            );
            
            if ($dbSession->expires_at) {
                $session->setExpires($dbSession->expires_at);
                $session->setExpires($data_session['expires_at']);
            }

            if ($dbSession->access_token) {
                $session->setAccessToken($dbSession->access_token);
            }

            if ($dbSession->scope) {
                $session->setScope($dbSession->scope);
            }

            if ($dbSession->user_id) {
                $onlineAccessInfo = new AccessTokenOnlineUserInfo(
                    (int)$dbSession->user_id,
                    $dbSession->user_first_name,
                    $dbSession->user_last_name,
                    $dbSession->user_email,
                    $dbSession->user_email_verified == 1,
                    $dbSession->account_owner == 1,
                    $dbSession->locale,
                    $dbSession->collaborator == 1
                );
                $session->setOnlineAccessInfo($onlineAccessInfo);
            }
            return $session;
        } */

        $dbSession = \App\Models\Session::where('id_session', $sessionId)->first();
        if ($dbSession) {
            $data_session = json_decode($dbSession->data_session, true);
            $session = new Session(
                $data_session['id'],
                $data_session['shop'],
                $data_session['isOnline'] == 1,
                $data_session['state'],
            );
            if (isset($data_session['expires_at'])) {
                $session->setExpires($data_session['expires_at']);
            }
            if (isset($data_session['accessToken'])) {
                $session->setAccessToken($data_session['accessToken']);
            }
            if (isset($data_session['scope'])) {
                $session->setScope($data_session['scope']);
            }
            if (isset($data_session['user_id'])) {
                $onlineAccessInfo = new AccessTokenOnlineUserInfo(
                    (int)$data_session['user_id'],
                    $data_session['user_first_name'],
                    $data_session['user_last_name'],
                    $data_session['user_email'],
                    $data_session['user_email_verified'] == 1,
                    $data_session['account_owner'] == 1,
                    $data_session['locale'],
                    $data_session['collaborator'] == 1
                );
                $session->setOnlineAccessInfo($onlineAccessInfo);
            }
            return $session;
        }
        return null;
    }

    public function storeSession(Session $session): bool
    {
        /*$dbSession = \App\Models\Session::where('session_id', $session->getId())->first();
        if (!$dbSession) {
            $dbSession = new \App\Models\Session();
        }
        $dbSession->session_id = $session->getId();
        $dbSession->shop = $session->getShop();
        $dbSession->state = $session->getState();
        $dbSession->is_online = $session->isOnline();
        $dbSession->access_token = $session->getAccessToken();
        $dbSession->expires_at = $session->getExpires();
        $dbSession->scope = $session->getScope();
        if (!empty($session->getOnlineAccessInfo())) {
            $dbSession->user_id = $session->getOnlineAccessInfo()->getId();
            $dbSession->user_first_name = $session->getOnlineAccessInfo()->getFirstName();
            $dbSession->user_last_name = $session->getOnlineAccessInfo()->getLastName();
            $dbSession->user_email = $session->getOnlineAccessInfo()->getEmail();
            $dbSession->user_email_verified = $session->getOnlineAccessInfo()->isEmailVerified();
            $dbSession->account_owner = $session->getOnlineAccessInfo()->isAccountOwner();
            $dbSession->locale = $session->getOnlineAccessInfo()->getLocale();
            $dbSession->collaborator = $session->getOnlineAccessInfo()->isCollaborator();
        }
        try {
            return $dbSession->save();
        } catch (Exception $err) {
            //Log::error("Failed to save session to database: " . $err->getMessage());
            return false;
        } */
        $dbSession = \App\Models\Session::where('id_session', $session->getId())->first();
        if (!$dbSession) {
            $dbSession = new \App\Models\Session();
        }
        $data_session = [
            'id' => $session->getId(),
            'shop' => $session->getShop(),
            'state' => $session->getState(),
            'isOnline' => $session->isOnline(),
            'accessToken' => $session->getAccessToken(),
            'expires_at' => $session->getExpires(),
            'scope' => $session->getScope(),
        ];
        
        $dbSession->id_session = $session->getId();

        if (!empty($session->getOnlineAccessInfo())) {           
            $data_session['user_id'] = $session->getOnlineAccessInfo()->getId();
            $data_session['user_first_name'] = $session->getOnlineAccessInfo()->getFirstName();
            $data_session['user_last_name'] = $session->getOnlineAccessInfo()->getLastName();
            $data_session['user_email'] = $session->getOnlineAccessInfo()->getEmail();
            $data_session['user_email_verified'] = $session->getOnlineAccessInfo()->isEmailVerified();
            $data_session['account_owner'] = $session->getOnlineAccessInfo()->isAccountOwner();
            $data_session['locale'] = $session->getOnlineAccessInfo()->getLocale();
            $data_session['collaborator'] = $session->getOnlineAccessInfo()->isCollaborator();
        }

        $dbSession->data_session = json_encode($data_session);
        try {
            return $dbSession->save();
        } catch (Exception $err) {
            //Log::error("Failed to save session to database: " . $err->getMessage());
            return false;
        }
    }

    public function deleteSession(string $sessionId): bool
    {
        return \App\Models\Session::where('id_session', $sessionId)->delete() === 1;
    }
}
