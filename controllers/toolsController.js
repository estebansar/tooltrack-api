const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This gets all tools from the tools collection
const getAllTools = async (req, res) => {
  const result = await mongodb.getDb().collection("tools").find()

  result.toArray().then((tools) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tools)
  })
}

// This gets one tool by its id
const getSingleTool = async (req, res) => {
  const toolId = new ObjectId(req.params.id)

  const result = await mongodb.getDb().collection("tools").find({ _id: toolId })

  result.toArray().then((tools) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tools[0])
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

// This updates a tool by its id
const updateTool = async (req, res) => {
  const toolId = new ObjectId(req.params.id)

  const tool = {
    toolName: req.body.toolName,
    brand: req.body.brand,
    category: req.body.category,
    condition: req.body.condition,
    purchaseYear: req.body.purchaseYear,
    available: req.body.available,
    notes: req.body.notes
  }

  const response = await mongodb
    .getDb()
    .collection("tools")
    .replaceOne({ _id: toolId }, tool)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the tool.")
  }
}

module.exports = {
  getAllTools,
  getSingleTool,
  createTool,
  updateTool,
}