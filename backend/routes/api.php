<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\PaymentProviderController;
use App\Http\Controllers\TimingOptionController;
use App\Http\Controllers\WashController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('refresh', [AuthController::class, 'refresh']);
});

Route::group(['middleware' => 'api'], function() {
    Route::get('users/all', [UserController::class, 'getAllUsers']);
    Route::get('users/single/{id}', [UserController::class, 'getOneUser']);
    Route::post('users/add', [UserController::class, 'createUser']);
    Route::put('users/edit/{id}', [UserController::class, 'editUser']);
    Route::get('users/delete/{id}', [UserController::class, 'deleteUser']);

    Route::get('programs/all', [ProgramController::class, 'getAllPrograms']);
    Route::get('programs/single/{id}', [ProgramController::class, 'getOneProgram']);
    Route::post('programs/add', [ProgramController::class, 'createProgram']);
    Route::put('programs/edit/{id}', [ProgramController::class, 'editProgram']);
    Route::get('programs/delete/{id}', [ProgramController::class, 'deleteProgram']);

    Route::get('steps/all', [StepController::class, 'getAllSteps']);
    Route::get('steps/available', [StepController::class, 'getAvailableSteps']);
    Route::get('steps/single/{id}', [StepController::class, 'getOneStep']);
    Route::post('steps/add', [StepController::class, 'createStep']);
    Route::put('steps/edit/{id}', [StepController::class, 'editStep']);
    Route::get('steps/delete/{id}', [StepController::class, 'deleteStep']);

    Route::get('washes/all', [WashController::class, 'getAllWashes']);
    Route::get('washes/single/{id}', [WashController::class, 'getOneWash']);
    Route::get('washes/user/{id}', [WashController::class, 'getWashesForUser']);
    Route::post('washes/add', [WashController::class, 'createWash']);
    Route::put('washes/edit/{id}', [WashController::class, 'editWash']);
    Route::get('washes/delete/{id}', [WashController::class, 'deleteWash']);

    Route::get('payment-providers/all', [PaymentProviderController::class, 'getAllProviders']);
    Route::get('payment-providers/single/{id}', [PaymentProviderController::class, 'getOneProvider']);
    Route::post('payment-providers/add', [PaymentProviderController::class, 'createProvider']);
    Route::put('payment-providers/edit/{id}', [PaymentProviderController::class, 'editProvider']);
    Route::get('payment-providers/delete/{id}', [PaymentProviderController::class, 'deleteProvider']);

    Route::get('timing-options/all', [TimingOptionController::class, 'getAllTimingOptions']);
    Route::post('timing-options/add', [TimingOptionController::class, 'createTimingOption']);
    Route::put('timing-options/edit/{id}', [TimingOptionController::class, 'editTimingOption']);
    Route::get('timing-options/delete/{id}', [TimingOptionController::class, 'deleteTimingOption']);

    Route::get('discounts/all', [DiscountController::class, 'getAllDiscounts']);
    Route::get('discounts/active', [DiscountController::class, 'getActiveDiscounts']);
    Route::put('discounts/edit/{id}', [DiscountController::class, 'editDiscount']);
});


