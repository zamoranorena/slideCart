<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\Announcement;
use App\Models\AnnouncementTiers;

class AnnouncementController extends Controller
{
    public function get_announcement(Request $request)
    {
        try {
            $var = [
                'error' => true,
                'message' => "Error get data.",
            ];

            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $announcement = Announcement::where('customer_id', $customer['id'])->first();
                //$announcemenTiers = AnnouncementTiers::select(['announcement_text'])->where('customer_id', $customer['id'])->get();
                $announcemenTiers = AnnouncementTiers::where('customer_id', $customer['id'])->get();
                if ($announcement) {
                    $var = [
                        'announcement' => $announcement,
                        'announcemenTiers' => $announcemenTiers
                    ];
                };
            };
            return response($var);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
    public function put_announcement(Request $request)
    {

        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer = Customer::where('shop_url', $shop)->first();
            if ($customer) {
                $announcement = Announcement::where('customer_id', $customer['id'])->first();
                if ($announcement) {
                    $announcement->update([
                        'enabled_announcement' => $request->enabled_announcement,
                        'announcement_background_color_h' => $request->announcement_background_color_h,
                        'announcement_background_color_s' => $request->announcement_background_color_s,
                        'announcement_background_color_b' => $request->announcement_background_color_b,
                        'announcement_background_color_hex' => $request->announcement_background_color_hex,
                        'announcement_border_color_h' => $request->announcement_border_color_h,
                        'announcement_border_color_s' => $request->announcement_border_color_s,
                        'announcement_border_color_b' => $request->announcement_border_color_b,
                        'announcement_border_color_hex' => $request->announcement_border_color_hex,
                        'announcement_font_color_h' => $request->announcement_font_color_h,
                        'announcement_font_color_s' => $request->announcement_font_color_s,
                        'announcement_font_color_b' => $request->announcement_font_color_b,
                        'announcement_font_color_hex' => $request->announcement_font_color_hex,
                        'announcement_font_size' => $request->announcement_font_size,
                        'announcement_text_transform' => $request->announcement_text_transform,
                        'announcement_font_weight' => $request->announcement_font_weight,
                        'announcement_text_alignment' => $request->announcement_text_alignment,
                    ]);
                };

                $update_announcement_tier = $request->update_announcement_tier || false;
                if ($update_announcement_tier) {
                    $announcement_tiers = AnnouncementTiers::where('customer_id', $customer['id'])->get(); //DATA DE LA BD
                    $arr_announcement_tiers = $request->values_announcement_tier; //DATA RECIBIDA

                    if (count($arr_announcement_tiers) == 0 && count($announcement_tiers) > 0) {
                        AnnouncementTiers::where('settings_announcement_id', $announcement_tiers[0]['settings_announcement_id'])->delete();
                    };
                    if (count($arr_announcement_tiers) > 0 && count($announcement_tiers) == 0) {
                        $PresetData = [];
                        for ($i = 0; $i < count($arr_announcement_tiers); $i++) {
                            $employee = array(
                                'settings_announcement_id' => $announcement['id'],
                                'announcement_text' => $arr_announcement_tiers[$i]['announcement_text'],
                                'customer_id' => $customer['id'],
                            );
                            array_push($PresetData, $employee);
                        };
                        AnnouncementTiers::insert($PresetData);
                    };
                    if (count($arr_announcement_tiers) > 0 && count($announcement_tiers) > 0) {
                        AnnouncementTiers::where('settings_announcement_id', $announcement_tiers[0]['settings_announcement_id'])->delete();
                        $PresetData = [];
                        for ($i = 0; $i < count($arr_announcement_tiers); $i++) {
                            $employee = array(
                                'settings_announcement_id' => $announcement['id'],
                                'announcement_text' => $arr_announcement_tiers[$i]['announcement_text'],
                                'customer_id' => $customer['id'],
                            );
                            array_push($PresetData, $employee);
                        };
                        AnnouncementTiers::insert($PresetData);
                    };
                };
                EnsureClientFile::chargeEnvironment($shop);
            };
            return response()->json([
                'error' => false,
                'message' => 'success.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'error_line' => $e->getLine()
            ]);
        }
    }
}
