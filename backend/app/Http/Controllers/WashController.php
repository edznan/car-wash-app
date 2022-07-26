<?php

namespace App\Http\Controllers;

use App\Models\Wash;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class WashController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllWashes()
    {
        $washes = Wash::all();
        return response()->json($washes, 200);
    }

    public function getWashesForUser(Request $request) {
        $washes = Wash::where('user_id', $request->id)->get();
        return response()->json($washes, 200);
    }

    public function createWash(Request $request)
    {
        User::where('id', $request->user_id)->increment('money_spent', $request->cost);
        Wash::create($request->all());
        return response()->json(['message' => 'success']);
    }

    public function editWash(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $wash = $request->all();
                Wash::where('id', $wash['id'])->update($wash);
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function deleteTimingOption(Request $request) {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $wash_id = $request->id;
                Wash::where('id', $wash_id)->delete();
                return response()->json(['message' => 'success']);
            }
        }
    }
}
