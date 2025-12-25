import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, client, date, videoUrl, thumbnailUrl } = body;

    // Validate required fields
    if (!title || !description || !category || !date) {
      return NextResponse.json(
        { error: "Title, description, category and date are required" },
        { status: 400 }
      );
    }

    // Here you would typically save to database
    const newProject = {
      id: String(Date.now()),
      title,
      description,
      category,
      client: client || "",
      date,
      videoUrl: videoUrl || "",
      thumbnailUrl: thumbnailUrl || "",
    };

    console.log("New project created:", newProject);

    return NextResponse.json(
      { success: true, project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
