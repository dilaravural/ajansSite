<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()->ordered();

        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('client', 'like', '%' . $request->search . '%');
            });
        }

        $projects = $query->get();

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'client' => 'nullable|string|max:255',
            'date' => 'required|date',
            'video_url' => 'nullable|url',
            'thumbnail' => 'nullable|image|max:5120', // 5MB
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('projects', $filename, 'public');
            $validated['thumbnail_url'] = Storage::url($path);
        }

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'client' => 'nullable|string|max:255',
            'date' => 'sometimes|required|date',
            'video_url' => 'nullable|url',
            'thumbnail' => 'nullable|image|max:5120',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($project->thumbnail_url) {
                $oldPath = str_replace('/storage/', '', parse_url($project->thumbnail_url, PHP_URL_PATH));
                Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('thumbnail');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('projects', $filename, 'public');
            $validated['thumbnail_url'] = Storage::url($path);
        }

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        // Delete thumbnail if exists
        if ($project->thumbnail_url) {
            $oldPath = str_replace('/storage/', '', parse_url($project->thumbnail_url, PHP_URL_PATH));
            Storage::disk('public')->delete($oldPath);
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
