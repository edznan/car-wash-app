<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Wash;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class WashController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllWashes(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $washes = Wash::all();
                return response()->json($washes, 200);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getWashesForUser(Request $request) {
        $washes = Wash::where('user_id', $request->id)->get();
        return response()->json($washes, 200);
    }

    public function createWash(Request $request)
    {
        $data = [
            'cost' => $request->cost,
            'payment_provider' => $request->paymentProvider,
            'program_name' => $request->programName,
            'program_id' => $request->programId,
            'user_id' => $request->userId,
            'length' => $request->length
        ];

        $discount = Discount::where('is_active', 1)->take(1)->get()->toArray();
        $discount_amount = 0;

        $user = User::where('user_id', $data['user_id']);
        $dt = Carbon::now();

        if ($discount[0]['id'] == 1) {
            if ($dt->isWeekend()) {
                $discount_amount = $request->cost - $discount[0]['discount_amount'];
            }
        } else if ($discount['id'] == 2) {
            if ($user['number_of_washes'] % 5 == 0) {
                $discount_amount = $request->cost - $discount[0]['discount_amount'];
            }
        }

        User::where('id', $data['user_id'])->increment('money_spent', $discount_amount);
        User::where('id', $data['user_id'])->increment('number_of_washes');
        Wash::create($data);

        return response()->json(['message' => 'success']);
    }
}
