<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Lib\EnsureClientFile;
use App\Models\Customer;
use App\Models\PaymentBadges;

class PaymentBadgesController extends Controller
{
    public function get_payment_badges(Request $request)
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
                $payment_badges = PaymentBadges::where('customer_id', $customer['id'])->first();
                if ($payment_badges) {
                    $var = [
                        'payment_badges' => $payment_badges
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
    public function put_payment_badges(Request $request)
    {
        try {
            $session = $request->get('shopifySession');
            $shop = $session->getShop();
            $customer =  Customer::with('Settings', 'PaymentBadges')->where('shop_url', $shop)->first();
            if ($customer->PaymentBadges) {
                $img_url_save = $img_url = $customer->PaymentBadges->url_img_host;
                if($request->file_payment){
                    $image = $request->file_payment; //almacena base64
                    preg_match('/^data:([A-Za-z-+\/]+);base64,(.+)$/', $image, $matches);
                    if (count($matches) !== 3) {
                        return throw new \Exception('Invalid input string.');
                    };
                    $existe = File::isDirectory('payment_badges');
                    if (!$existe) {
                        File::makeDirectory('payment_badges');
                    };
                    
                    // your base64 encoded
                    $imageExtension = explode('/', mime_content_type($image))[1];
                    $image = str_replace('data:' . $matches[1] . ';base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = 'hs_payment_badges_' . $shop . time() * 1000 . '.' . $imageExtension; 
                    $img_url_save = env('HOST', 'localhost') . "/payment_badges/" . $imageName;
                };

                $updatePaymentBadges = PaymentBadges::where('customer_id', $customer['id'])->update([
                    'enabled_payment_badges' => $request->enabled_payment_badges,
                    'url_img_host' => $img_url_save,
                    'url_img_shopify' =>  ''
                ]);
                Log::debug('updatePaymentBadges');
                Log::debug($updatePaymentBadges);
                if ($updatePaymentBadges) {
                    if ($request->file_payment) {
                        if ($img_url) {
                            $img_url  = str_replace(env('HOST', 'localhost') . '/payment_badges/', '', $img_url);
                            Log::debug($img_url);
                            if ($img_url !== 'trust-payment.png') {
                                if (File::exists('payment_badges/' . $img_url)) {
                                    Log::debug('IMAGEN EXISTE');//SI EXISTE LA IMAGEN SE ELIMINA
                                    File::delete('payment_badges/' . $img_url);
                                };
                            };
                        };
                        File::put('payment_badges/' . $imageName, base64_decode($image));//SE CREA LA IMAGEN
                    };
                    EnsureClientFile::chargeEnvironment($shop);
                };
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
