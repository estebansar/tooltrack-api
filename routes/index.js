const express = require("express")
const router = express.Router()

const toolsController = require("../controllers/toolsController")

// This route shows all tools
router.get("/tools", toolsController.getAllTools)

// This route creates a new tool
router.post("/tools", toolsController.createTool)

module.exports = router