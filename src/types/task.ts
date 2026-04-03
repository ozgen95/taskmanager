// The shape of a Task object throughout your app

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
  createdAt: Date;
}

// What the request body looks like when creating a task
export interface CreateTaskBody {
  title: string;
  description: string;
}

// What the request body looks like when updating a task
export interface UpdateTaskBody {
  title?: string;
  description?: string;
  status?: "pending" | "in-progress" | "done";
}
