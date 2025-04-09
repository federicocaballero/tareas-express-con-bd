const taskModel = require("../models/taskModel");
const { validationResult } = require("express-validator");
//Obtener todas las tareas
const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

//Obtener tareas por id
const getTasksById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const task = await taskModel.getTasksById(id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(task);
  } catch (error) {
    next(error);
  } // Pasar el error al middleware de manejo de errores  }
};

//Crear tareas
const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;

    const task = await taskModel.createTask(title, description, completed);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

//Actualizar tareas
const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;

    updatedTask = await taskModel.updateTask(id, title, description, completed);

    if (!updateTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

//Eliminar tareas
const deleteTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const deleteTask = await taskModel.deleteTask(id);

    if (!deleteTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada", deleteTask });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
};
