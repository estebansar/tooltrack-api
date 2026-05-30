const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This checks if the id from the URL is a real MongoDB id_lesson 6
const isValidObjectId = (id) => {
  return ObjectId.isValid(id)
}

// This checks that the required tool information is included_lesson 6
const validateTool = (tool) => {
  if (!tool.toolName || !tool.brand || !tool.category || !tool.condition) {
    return "Please provide toolName, brand, category, and condition."
  }

  return null
}

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
  try {

    // This checks if the id in the URL is valid
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json("Invalid tool id.")
    }

    const toolId = new ObjectId(req.params.id)

    const result = await mongodb
      .getDb()
      .collection("tools")
      .find({ _id: toolId })

    const tools = await result.toArray()

    // This checks if the tool exists in MongoDB
    if (!tools[0]) {
      return res.status(404).json("Tool not found.")
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tools[0])

  } catch (error) {

    // This catches unexpected server errors
    res.status(500).json("Some error occurred while getting the tool.")
  }
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

// This deletes a tool by its id
const deleteTool = async (req, res) => {
  const toolId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDb()
    .collection("tools")
    .deleteOne({ _id: toolId })

  if (response.deletedCount > 0) {
    res.status(200).send()
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the tool.")
  }
}

module.exports = {
  getAllTools,
  getSingleTool,
  createTool,
  updateTool,
  deleteTool
}