<?php

namespace App\Http\Controllers;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Wash;
use App\Models\Program;

class DashboardController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getDashboard(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $washes = Wash::all();
                $programs = Program::get('label')->all();

                $washes_today = 0;
                $washes_this_week = 0;
                $earnings = Wash::all()->sum('cost');

                foreach ($washes as $wash) {
                    $date = Carbon::parse($wash['created_at']);
                    $currentWeek = Carbon::createFromFormat('Y-m-d H:i:s', $wash['created_at']);
                    if ($date->isToday()) {
                        $washes_today++;
                    }
                    if ($currentWeek->isCurrentWeek()) {
                        $washes_this_week++;
                    }
                }

                $dashboard = [
                    'washes_today' => $washes_today,
                    'washes_this_week' => $washes_this_week,
                    'earnings' => $earnings,
                    'programs' => $programs
                ];

                return response()->json($dashboard, 200);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
