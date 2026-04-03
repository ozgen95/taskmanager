import express from "express";
import taskRoutes from "./routes/tasks";

const app = express();
const PORT = 3000;

// Parses incoming JSON request bodies — without this, req.body will be undefined
app.use(express.json());

// All task routes will be prefixed with /tasks
// e.g. GET /tasks, POST /tasks, DELETE /tasks/:id
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
