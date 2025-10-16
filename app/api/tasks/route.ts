import { NextRequest, NextResponse } from "next/server";

// In-memory store for tasks (in production, use a database)
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

let tasks: Task[] = [
  {
    id: "1",
    title: "Welcome to Cline",
    description: "This is a sample task to demonstrate the API functionality",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * GET /api/tasks - Fetch all tasks
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    let filteredTasks = tasks;
    if (status) {
      filteredTasks = tasks.filter((task) => task.status === status);
    }

    return NextResponse.json({
      success: true,
      tasks: filteredTasks,
      total: filteredTasks.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tasks",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks - Create a new task
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          message: "Title and description are required",
        },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      status: body.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    return NextResponse.json(
      {
        success: true,
        task: newTask,
        message: "Task created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create task",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/tasks - Update an existing task
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, status } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing task ID",
          message: "Task ID is required for updates",
        },
        { status: 400 }
      );
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
          message: `Task with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(status && { status }),
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;

    return NextResponse.json({
      success: true,
      task: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update task",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks - Delete a task
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing task ID",
          message: "Task ID is required for deletion",
        },
        { status: 400 }
      );
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
          message: `Task with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);

    return NextResponse.json({
      success: true,
      task: deletedTask,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete task",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
