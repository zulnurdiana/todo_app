const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middleware/auth");
const { validateTodo, checkValidation } = require("../middleware/validation");

router.use(authenticateToken);

router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", validateTodo, checkValidation, todoController.createTodo);
router.put("/:id", validateTodo, checkValidation, todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
