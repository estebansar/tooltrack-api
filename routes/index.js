const express = require("express")
const router = express.Router()

const toolsController = require("../controllers/toolsController")

// This route shows all tools
router.get("/tools", toolsController.getAllTools)

module.exports = router