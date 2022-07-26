<?php

namespace App\Http\Controllers;

use App\Repositories\ImageRepository;
use App\Models\PaymentProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PaymentProviderController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllProviders()
    {
        $providers = PaymentProvider::all();

        foreach($providers as $provider) {
           $path = Storage::disk('public')->url($provider['logo']);
           $provider['logo'] = $path;
        }

        return response()->json($providers, 200)->header('Content-Type', 'image/jpeg');
    }

    public function getOneProvider(Request $request)
    {
        $provider = PaymentProvider::where('id', $request->id)->take(1)->get();
        return response()->json($provider, 200);
    }

    public function createProvider(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {

                $validator = Validator::make($request->all(), [
                    'name' => 'required',
                    'logo' => 'required'
                ]);

                if($validator->fails()){
                    return response()->json([
                        'success'=>false,
                        'message'=>$validator->errors()->first(),
                    ],400);
                }

                $attachment_url = (new ImageRepository)->image_upload($request->input('image_file'), 'images', $request->name);

                PaymentProvider::create(['name' => $request->name, 'logo' => $attachment_url]);

                return response()->json(['message' => 'success']);
            }
        }
    }

    public function editProvider(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {

                $validator = Validator::make($request->all(), [
                    'name' => 'required',
                    'logo' => 'required'
                ]);

                if($validator->fails()){
                    return response()->json([
                        'success'=>false,
                        'message'=>$validator->errors()->first(),
                    ], 400);
                }

                $current_logo = PaymentProvider::where('id', $request->id)->get('name');

                Storage::delete('images/' . $current_logo[0]['name']);

                $attachment_url = (new ImageRepository)->image_upload($request->input('image_file'), 'images', $request->name);
                PaymentProvider::where('id', $request->id)->update(['name' => $request->name, 'logo' => $attachment_url]);

                return response()->json(['message' => 'success']);
            }
        }
    }

    public function deleteProvider(Request $request) {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $providerId = $request->id;
                PaymentProvider::where('id', $providerId)->delete();
                return response()->json(['message' => 'success']);
            }
        }
    }
}
