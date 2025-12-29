<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SettingsController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);
Route::get('/settings', [SettingsController::class, 'index']);
Route::get('/settings/{key}', [SettingsController::class, 'show']);
Route::get('/stats', [SettingsController::class, 'stats']);

// Auth routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Projects Management
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Services Management
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    // Contact Messages Management
    Route::get('/messages', [ContactController::class, 'index']);
    Route::get('/messages/{message}', [ContactController::class, 'show']);
    Route::patch('/messages/{message}/status', [ContactController::class, 'updateStatus']);
    Route::delete('/messages/{message}', [ContactController::class, 'destroy']);

    // Settings Management
    Route::put('/settings', [SettingsController::class, 'update']);
    Route::put('/settings/{key}', [SettingsController::class, 'updateSingle']);
});
