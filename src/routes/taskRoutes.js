const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const { body, param, validationResult } = require("express-validator");
//Validaciones para el body
const validateBody = [
  body("title")
    .isLength({ min: 1 })
    .withMessage("El título es obligatorio")
    .isString()
    .withMessage("El título debe ser una cadena")
    .trim() // Eliminar espacios en blanco al inicio y al final
    .escape(), // Escapar caracteres especiales para evitar inyecciones de codigo
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena")
    .trim()
    .escape(),
  body("completed")
    .isBoolean()
    .withMessage("El estado de la tarea debe ser un booleano")
    .trim()
    .escape(),
];
// Validaciones para el id de la tarea (pueden ir mas parametros)
const validateTaskId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un número entero mayor a 0")
    .toInt(),
];

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 * 
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por id
 *     tags: [Tareas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: OK  
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404: 
 *         description: Tarea no encontrada
 * /tasks/createTask:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 * /tasks/updateTask/{id}:
 *   put:
 *     summary: Actualizar una tarea por id
 *     tags: [Tareas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Tarea no encontrada 
 * /tasks/deleteTask/{id}:
 *   delete:
 *     summary: Eliminar una tarea por id 
 *     tags: [Tareas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *     responses:
 *       200: 
 *         description: OK  
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */


router.get("/", taskController.getTasks);
router.get("/:id", validateTaskId, taskController.getTasksById);
router.post("/createTask", validateBody, taskController.createTask);
router.put(
  "/updateTask/:id",
  validateBody.concat(validateTaskId),
  taskController.updateTask
);
router.delete("/deleteTask/:id", validateTaskId, taskController.deleteTask);

module.exports = router;
