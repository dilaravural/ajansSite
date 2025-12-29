<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteSetting::query();

        if ($request->has('group')) {
            $query->byGroup($request->group);
        }

        $settings = $query->get();

        // Transform to key-value pairs for easier consumption
        $transformed = [];
        foreach ($settings as $setting) {
            if ($request->has('flat') && $request->flat === 'true') {
                $transformed[$setting->key] = $setting->value;
            } else {
                if (!isset($transformed[$setting->group])) {
                    $transformed[$setting->group] = [];
                }
                $transformed[$setting->group][$setting->key] = [
                    'value' => $setting->value,
                    'label' => $setting->label,
                    'type' => $setting->type,
                ];
            }
        }

        return response()->json($transformed);
    }

    public function show($key)
    {
        $setting = SiteSetting::byKey($key)->firstOrFail();

        return response()->json($setting);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'required',
        ]);

        $updated = [];
        foreach ($validated['settings'] as $settingData) {
            $setting = SiteSetting::byKey($settingData['key'])->first();

            if ($setting) {
                $setting->update(['value' => $settingData['value']]);
                $updated[] = $setting;
            } else {
                // Create new setting if it doesn't exist
                $updated[] = SiteSetting::create([
                    'key' => $settingData['key'],
                    'value' => $settingData['value'],
                    'type' => $settingData['type'] ?? 'text',
                    'group' => $settingData['group'] ?? 'general',
                    'label' => $settingData['label'] ?? $settingData['key'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Settings updated successfully',
            'data' => $updated
        ]);
    }

    public function updateSingle(Request $request, $key)
    {
        $validated = $request->validate([
            'value' => 'required',
        ]);

        $setting = SiteSetting::byKey($key)->first();

        if ($setting) {
            $setting->update(['value' => $validated['value']]);
        } else {
            $setting = SiteSetting::create([
                'key' => $key,
                'value' => $validated['value'],
                'type' => $request->get('type', 'text'),
                'group' => $request->get('group', 'general'),
                'label' => $request->get('label', $key),
            ]);
        }

        return response()->json($setting);
    }

    public function stats()
    {
        $stats = [
            'total_projects' => \App\Models\Project::count(),
            'total_services' => \App\Models\Service::active()->count(),
            'total_messages' => \App\Models\ContactMessage::count(),
            'unread_messages' => \App\Models\ContactMessage::new()->count(),
            'recent_projects' => \App\Models\Project::latest()->take(5)->get(),
            'recent_messages' => \App\Models\ContactMessage::latest()->take(5)->get(),
        ];

        return response()->json($stats);
    }
}
