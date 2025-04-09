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
