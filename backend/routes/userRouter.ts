import express from "express";
import protect from "../middleware/authMiddleware"
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", protect, userController.getUserData);

module.exports = router;
