import mongoose from "mongoose";
import Todos from "../models/todoModel.js";

const getTodos = async (req, res) => {
  try {
    const uid = req.user._id;
    const todos = await Todos.find({ uid }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: "error.message" });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const todo = await Todos.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const doneTodos = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const todo = await Todos.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  const { todo } = req.body;

  try {
    const uid = req.user._id;
    const todos = await Todos.create({
      todo,
      uid,
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such document." });
  }

  try {
    const todos = await Todos.findByIdAndDelete({ _id: id });

    if (!todos) {
      return res.status(404).json({ message: "No such document" });
    }

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such document." });
  }

  try {
    const todos = await Todos.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!todos) {
      return res.status(404).json({ message: "No such document" });
    }

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getTodos, getTodo, doneTodos, createTodo, deleteTodo, updateTodo };
