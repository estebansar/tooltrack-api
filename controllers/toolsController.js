const mongodb = require("../data/database")

// This gets all tools from the tools collection
const getAllTools = async (req, res) => {
  const result = await mongodb.getDb().collection("tools").find()

  result.toArray().then((tools) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tools)
  })
}

// This creates a new tool in MongoDB
const createTool = async (req, res) => {
  const tool = {
    toolName: req.body.toolName,
    brand: req.body.brand,
    category: req.body.category,
    condition: req.body.condition,
    purchaseYear: req.body.purchaseYear,
    available: req.body.available,
    notes: req.body.notes
  }

  const response = await mongodb.getDb().collection("tools").insertOne(tool)

  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the tool.")
  }
}

module.exports = {
  getAllTools,
  createTool
}