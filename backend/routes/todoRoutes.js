import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  doneTodos,
} from "../controllers/todoController.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello. Done!" });
});

router.use(requireAuth);

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

router.patch("/done/:id", doneTodos);

export default router;
