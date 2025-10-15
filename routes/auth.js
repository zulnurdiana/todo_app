const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const {
  validateUserRegistration,
  validateUserLogin,
  checkValidation,
} = require("../middleware/validation");

router.post(
  "/register",
  validateUserRegistration,
  checkValidation,
  authController.register
);
router.post("/login", validateUserLogin, checkValidation, authController.login);
router.get("/profile", authenticateToken, authController.getProfile);

module.exports = router;
