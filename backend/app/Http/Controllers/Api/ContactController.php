<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Notifications\NewContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::create($validated);

        // Send email notification to admin (if configured)
        try {
            $adminEmail = env('ADMIN_EMAIL');
            if ($adminEmail) {
                Notification::route('mail', $adminEmail)
                    ->notify(new NewContactMessage($message));
            }
        } catch (\Exception $e) {
            // Log error but don't fail the request
            logger()->error('Failed to send contact notification: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }

    public function index(Request $request)
    {
        $query = ContactMessage::query()->latest();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('company', 'like', '%' . $request->search . '%')
                  ->orWhere('message', 'like', '%' . $request->search . '%');
            });
        }

        $messages = $query->paginate($request->get('per_page', 20));

        return response()->json($messages);
    }

    public function show(ContactMessage $message)
    {
        // Mark as read when viewed
        if ($message->status === 'new') {
            $message->markAsRead();
        }

        return response()->json($message);
    }

    public function updateStatus(Request $request, ContactMessage $message)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,responded',
            'response_note' => 'nullable|string',
        ]);

        if ($validated['status'] === 'read') {
            $message->markAsRead();
        } elseif ($validated['status'] === 'responded') {
            $message->markAsResponded($validated['response_note'] ?? null);
        } else {
            $message->update($validated);
        }

        return response()->json($message);
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return response()->json([
            'message' => 'Contact message deleted successfully'
        ]);
    }
}
