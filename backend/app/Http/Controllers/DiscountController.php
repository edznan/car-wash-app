<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class DiscountController extends Controller
{

    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllDiscounts(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $discounts = Discount::all();
                return response()->json($discounts, 200);
            }
        }
    }

    public function getActiveDiscounts(Request $request)
    {
        $discounts = Discount::where('is_active', 1)->get();
        return response()->json($discounts, 200);
    }

    public function editDiscount(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $discountId = $request->id;
                $value = $request->all();
                Discount::where('id', $discountId)->update(['is_active' => $value[0]]);
                return response()->json(['message' => 'success']);
            }
        }
    }
}
