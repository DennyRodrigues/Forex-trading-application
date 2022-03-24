import express from "express";
import protect from "../middleware/authMiddleware";
const tradeController = require("../controllers/tradeController");

const router = express.Router();

router.post("/", protect, tradeController.postTrade);
router.get("/", protect);

module.exports = router;
