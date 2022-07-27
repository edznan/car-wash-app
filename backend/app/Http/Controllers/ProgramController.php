<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Step;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProgramController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllPrograms()
    {
        $programs = Program::all();
        return response()->json($programs, 200);
    }

    public function getOneProgram(Request $request)
    {
        $program = Program::where('id', $request->id)->take(1)->get();
        $steps = Step::where('program_id', $request->id)->get();

        $value = [
            'program' => $program,
            'steps' => $steps
        ];

        return response()->json($value);
    }

    public function createProgram(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {

                $data = $request->all();
                $data_program = $data;
                $data_steps = $data['steps'];
                unset($data_program['steps']);

                $id = Program::create($data_program)->id;

                foreach($data_steps as $step) {
                    $step['program_id'] = $id;
                    Step::where('label', $step['label'])->delete();
                    Step::create($step);
                }

                return response()->json(['message' => 'success']);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function editProgram(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $data = $request->all();
                $data_program = $data;
                $data_steps = $data['steps'];
                unset($data_program['steps']);

                Program::where('id', $data['id'])->update($data_program);

                foreach($data_steps as $step) {
                    if (isset($step['program_id'])) {
                        if (($step['program_id'] != null) && ($step['program_id'] != 0)) {
                            Step::where('program_id', $data['id'])->update($step);
                        } else {
                            $step['program_id'] = $data['id'];
                            Step::where('program_id', $data['id'])->delete();
                            Step::create($step);
                        }
                    }
                }

                return response()->json(['message' => 'success']);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function deleteProgram(Request $request) {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $programId = $request->id;
                Step::where('program_id', $programId)->update(['program_id' => 0]);
                Program::where('id', $programId)->delete();
                return response()->json(['message' => 'success']);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
