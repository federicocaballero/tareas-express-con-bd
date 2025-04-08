const pg = require('../config/db'); // Importa la configuración de la base de datos

//Ruta para obtener todas las tareas
const getTasks = async () => {
  try {
    const res = await pg.query('SELECT * FROM tasks ORDER BY id ASC');
    return res.rows;
  } catch (error) {
    throw error;
  }
}

//Ruta para obtener tareas por id
const getTasksById = async (id) => {
  try {
    const res = await pg.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

//Ruta para crear tareas
const createTask = async (title, description, completed) => {
  try {
    const res = await pg.query('INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING *', [title, description, completed]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

//Ruta para actualizar tareas
const updateTask = async (id, title, description, completed) => {
  try {
    const res = await pg.query('UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *', [title, description, completed, id]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

//Ruta para eliminar tareas
const deleteTask = async (id) => {
  try {
    const res = await pg.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask
};
