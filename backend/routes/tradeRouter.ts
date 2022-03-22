const tradeController = require('../controllers/tradeController')
import * as express from "express";

const router = express.Router()

router.route('/')
.post(tradeController.trade)


module.exports = router;