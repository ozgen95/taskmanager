import { Request, Response } from "express";
import { tasks } from "../store";
import { CreateTaskBody, UpdateTaskBody, Task } from "../types/task";
import { randomUUID } from "crypto";

// GET /tasks
// Should return all tasks in the store
export const getAllTasks = (req: Request, res: Response) => {
  // TODO: respond with the full tasks array and a 200 status
  //res.status(200)   → returns res (modified with status 200)
  //  .json(tasks)   → sends the response, returns void
  // res (the response object) — a JavaScript object sitting in memory on your server. .status() modifies it by setting a status code field on it.
  // The actual HTTP response — the bytes that get sent over the network to the client when you call .json().

  // You can think of res as a draft. You keep editing the draft with methods like .status(), and when you're happy with it, .json() publishes it — converts it into real HTTP bytes and sends it down the wire. Once published, the draft is gone and you can't edit it anymore.
  return res.status(200).json(tasks);
};

// GET /tasks/:id
// Should return a single task by its id, or 404 if not found
export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: find the task in the store whose id matches
  const taskExists = tasks.find((task) => task.id === id);
  // TODO: if not found, respond with 404 and { error: "Task not found" }
  if (!taskExists) {
    return res.status(404).json({ error: "Task not found" });
  }
  // TODO: if found, respond with the task and 200
  return res.status(200).json(taskExists);
};

// POST /tasks
// Should create a new task and add it to the store
export const createTask = (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
) => {
  const { title, description } = req.body;
  // TODO: validate that title and description exist — if not, respond 400
  if (!title || !description) {
    return res.status(400).json({ error: "Title or description is invalid." });
  }
  // TODO: build a new Task object using randomUUID() for the id and new Date() for createdAt
  const newTask: Task = {
    id: randomUUID(),
    title: title,
    description: description,
    status: "pending",
    createdAt: new Date(),
  };
  // TODO: push it into the tasks array
  tasks.push(newTask);
  // TODO: respond with the new task and 201 status
  return res.status(201).json(newTask);
};

// PUT /tasks/:id
// Should update an existing task's fields
export const updateTask = (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response,
) => {
  const { id } = req.params;
  // TODO: find the task by id — respond 404 if missing
  const taskUpdate = tasks.find((task) => task.id === id);
  if (!taskUpdate) {
    return res.status(404).json({ error: "Task does not exist." });
  }

  // TODO: update only the fields that were provided in req.body (title, description, status)
  const { description } = req.body;
  const { title } = req.body;
  const { status } = req.body;

  if (description) {
    taskUpdate.description = description;
  }

  if (title) {
    taskUpdate.title = title;
  }

  if (status) {
    taskUpdate.status = status;
  }
  // TODO: respond with the updated task and 200
  res.status(200).json(taskUpdate);
};

// DELETE /tasks/:id
// Should remove a task from the store
export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: find the index of the task with this id
  const index = tasks.findIndex((task) => task.id === id);
  // TODO: if not found, respond 404
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "The task to be deleted wasn't found" });
  }
  // TODO: splice it out of the array
  tasks.splice(index, 1);
  // TODO: respond with 204 (no content)
  return res.status(204).send();
};
