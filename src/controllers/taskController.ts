import { Request, Response } from "express";
import { tasks } from "../store";
import { CreateTaskBody, UpdateTaskBody, Task } from "../types/task";
import { randomUUID } from "crypto";
import prisma from "../../prisma/prismaClient";

// GET /tasks
// Should return all tasks in the store
export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  return res.status(200).json(tasks);
};

// GET /tasks/:id
// Should return a single task by its id, or 404 if not found
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.status(200).json(task);
};

// POST /tasks
// Should create a new task and add it to the store
export const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
) => {
  const { title, description } = req.body;
  // TODO: validate that title and description exist — if not, respond 400
  if (!title || !description) {
    return res.status(400).json({ error: "Title or description is invalid." });
  }
  const newTask = await prisma.task.create({
    data: {
      title: title,
      description: description,
    },
  });
  // TODO: respond with the new task and 201 status
  return res.status(201).json(newTask);
};

// PUT /tasks/:id
// Should update an existing task's fields
export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response,
) => {
  const { id } = req.params;
  // TODO: find the task by id — respond 404 if missing
  const taskUpdate = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });
  if (!taskUpdate) {
    return res.status(404).json({ error: "Task does not exist." });
  }

  // TODO: update only the fields that were provided in req.body (title, description, status)
  const { description } = req.body;
  const { title } = req.body;
  const { status } = req.body;

  const data: UpdateTaskBody = {};

  if (description !== undefined) {
    data.description = description;
  }

  if (title !== undefined) {
    data.title = title;
  }

  if (status !== undefined) {
    data.status = status;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No fields provided to update." });
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: id,
    },
    data,
  });
  // TODO: respond with the updated task and 200
  return res.status(200).json(updatedTask);
};

// DELETE /tasks/:id
// Should remove a task from the store
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.task.delete({ where: { id } });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(404).json({ error: "Task not found" });
  }
};
