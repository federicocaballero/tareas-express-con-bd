const taskModel = require('../models/taskModel');

//Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Obtener tareas por id
const getTasksById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await taskModel.getTasksById(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Crear tareas
const createTask = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const completed = req.body.completed;

        const task = await taskModel.createTask( title, description, completed);

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Actualizar tareas
const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const completed = req.body.completed;

        updatedTask = await taskModel.updateTask(id, title, description, completed);

        if (!updateTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Eliminar tareas
const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTask= await taskModel.deleteTask(id);

        if (!deleteTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }      
        res.json({message: 'Tarea eliminada', deleteTask});
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}

module.exports = {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask
}