import { Request, Response } from "express";
import { tasks } from "../store";
import { CreateTaskBody, UpdateTaskBody } from "../types/task";
import { randomUUID } from "crypto";

// GET /tasks
// Should return all tasks in the store
export const getAllTasks = (req: Request, res: Response) => {
  // TODO: respond with the full tasks array and a 200 status
};

// GET /tasks/:id
// Should return a single task by its id, or 404 if not found
export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: find the task in the store whose id matches
  // TODO: if not found, respond with 404 and { error: "Task not found" }
  // TODO: if found, respond with the task and 200
};

// POST /tasks
// Should create a new task and add it to the store
export const createTask = (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
  const { title, description } = req.body;
  // TODO: validate that title and description exist — if not, respond 400
  // TODO: build a new Task object using randomUUID() for the id and new Date() for createdAt
  // TODO: push it into the tasks array
  // TODO: respond with the new task and 201 status
};

// PUT /tasks/:id
// Should update an existing task's fields
export const updateTask = (req: Request<{ id: string }, {}, UpdateTaskBody>, res: Response) => {
  const { id } = req.params;
  // TODO: find the task by id — respond 404 if missing
  // TODO: update only the fields that were provided in req.body (title, description, status)
  // TODO: respond with the updated task and 200
};

// DELETE /tasks/:id
// Should remove a task from the store
export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: find the index of the task with this id
  // TODO: if not found, respond 404
  // TODO: splice it out of the array
  // TODO: respond with 204 (no content)
};
