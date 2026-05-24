const express = require("express")
const router = express.Router()

const toolsController = require("../controllers/toolsController")

// This route shows all tools
router.get("/tools", toolsController.getAllTools)

// This route shows one tool by id
router.get("/tools/:id", toolsController.getSingleTool)

// This route creates a new tool
router.post("/tools", toolsController.createTool)

// This route updates a tool by id
router.put("/tools/:id", toolsController.updateTool)

// This route deletes a tool by id
router.delete("/tools/:id", toolsController.deleteTool)

module.exports = router