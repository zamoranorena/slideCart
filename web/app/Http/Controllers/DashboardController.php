<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
//use Illuminate\Support\Facades\DB;
use App\Lib\EnsureClientFile;
use App\Models\Dashboard;
use App\Models\Customer;

class DashboardController extends Controller
{
    public function get_dashboard(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                /* $alias = Dashboard::crossJoin('settings')
                    ->select('dashboard.dashboard_general_app', 'settings.enabled_desktop', 'settings.enabled_mobile')
                    ->where('dashboard.customer_id', '=', $customer['id'])
                    ->where('settings.customer_id', '=', $customer['id'])
                    ->get(); */
                   /*  Customer::with(
                        'Dashboard:customer_id,dashboard_general_app',
                        'Settings'
                        )->where("shop_url", $shop)->first(); */
                        
                //DB::enableQueryLog();
                $alias = Dashboard::join('settings', 'settings.customer_id', '=', 'dashboard.customer_id')
                ->join('cart_bar', 'cart_bar.customer_id', '=','dashboard.customer_id')
                ->join('sticky_cart', 'sticky_cart.customer_id', '=','dashboard.customer_id')
                ->join('quick_buy', 'quick_buy.customer_id', '=','dashboard.customer_id')
                ->join('cart_animator', 'cart_animator.customer_id', '=','dashboard.customer_id')
                ->join('coupon_bar', 'coupon_bar.customer_id', '=','dashboard.customer_id')
                ->where('dashboard.customer_id', $customer['id'])
                ->get(['dashboard.dashboard_general_app','settings.enabled_desktop', 'settings.enabled_mobile',
                'cart_bar.enabled_cart_bar','sticky_cart.enabled_sticky_cart','quick_buy.enabled_quick_buy','cart_animator.enabled_cart_animator','quick_buy.enabled_quick_buy','coupon_bar.enabled_coupon_bar']);
                //Log::debug(DB::getQueryLog());
                $var = '{
                "dashboard": ' . json_encode($alias) . ',
                "new_user":' . $customer['new_user'] . ',
                "status_user":' . $customer['old_user'] . '
            }';
                $var = json_decode($var, true);
                return response($var);
            };
        } catch (\Exception $e) {
            return response()->json([
                "saved" => 0,
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function set_dashboard(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $arr_dashboard = [
                    'dashboard_general_app' => $request->input('dashboard_general_app')
                ];
                $update_dashboard =  Dashboard::where('customer_id', $customer['id'])->update($arr_dashboard);
                 if ($update_dashboard) {
                        EnsureClientFile::chargeEnvironment($shop);
                    };
                return response()->json([
                    'error' => false,
                    'message' => 'success.',
                ]);
            };
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
}
