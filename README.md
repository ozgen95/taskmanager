# Task Manager API — Phase 1

A REST API built with Express + TypeScript. Phase 1 uses in-memory storage.

## Setup

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

## Your job

All your work goes in `src/controllers/taskController.ts`.
Each function has TODO comments guiding you through what to implement.

## Endpoints

| Method | Path        | Description          |
|--------|-------------|----------------------|
| GET    | /tasks      | Get all tasks        |
| GET    | /tasks/:id  | Get one task by id   |
| POST   | /tasks      | Create a new task    |
| PUT    | /tasks/:id  | Update a task        |
| DELETE | /tasks/:id  | Delete a task        |

## Example request (POST /tasks)

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

## Testing your endpoints

Use [Postman](https://www.postman.com/) or curl:

```bash
# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'

# Get all tasks
curl http://localhost:3000/tasks
```
