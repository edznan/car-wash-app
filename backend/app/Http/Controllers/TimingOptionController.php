<?php

namespace App\Http\Controllers;

use App\Models\TimingOption;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class TimingOptionController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllTimingOptions()
    {
        $timing_options = TimingOption::all();
        return response()->json($timing_options, 200);
    }

    public function createTimingOption(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                TimingOption::create($request->all());
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function editTimingOption(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $timing_option = $request->all();
                TimingOption::where('id', $timing_option['id'])->update($timing_option);
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function deleteTimingOption(Request $request) {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $timing_option_id = $request->id;
                TimingOption::where('id', $timing_option_id)->delete();
                return response()->json(['message' => 'success']);
            }
        }
    }
}
