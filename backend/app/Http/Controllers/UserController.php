<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAllUsers(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $users = User::all();
                return response()->json($users, 200);
            } else {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function getOneUser(Request $request)
    {

        $user = User::where('id', $request->id)->take(1)->get();
        return response()->json([$user[0]]);
    }

    public function createUser(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                User::create($request->all());
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function editUser(Request $request)
    {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $new_info = $request->all();
                $user = User::where('id', $new_info['id']);
                $user->update($new_info);
                return response()->json(['message' => 'success']);
            }
        }
    }

    public function deleteUser(Request $request) {
        if ($this->user) {
            $current_user = $request->user();
            if ($current_user['is_admin']) {
                $userId = $request->id;
                User::where('id', $userId)->delete();
                return response()->json(['message' => 'success']);
            }
        }
    }
}
