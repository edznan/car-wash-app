<?php

namespace App\Http\Controllers;

use App\Models\Step;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class StepController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllSteps()
    {
        $steps = Step::all();
        return response()->json($steps, 200);
    }

    public function getAvailableSteps() {
        $steps = Step::where('program_id', 0)->orWhere('program_id', null)->get();
        return response()->json($steps, 200);
    }

    public function getOneStep(Request $request)
    {
        $step = Step::where('id', $request->id)->take(1)->get();
        return response()->json($step);
    }

    public function createStep(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                Step::create($request->all());
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function editStep(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $step = $request->all();
                Step::where('id', $step['id'])->update($step);
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function deleteStep(Request $request) {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $stepId = $request->id;
                Step::where('id', $stepId)->delete();
                return response()->json(['message' => 'success']);
            }
        }
    }
}
