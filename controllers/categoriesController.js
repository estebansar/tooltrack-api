const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This checks if the id from the URL is a real MongoDB id_lesson 8
const isValidObjectId = (id) => {
  return ObjectId.isValid(id)
}

// This checks that the required category information is included_lesson 8
const validateCategory = (category) => {
  if (!category.categoryName || !category.description) {
    return "Please provide categoryName and description."
  }

  return null
}

// This gets all categories from the categories collection
const getAllCategories = async (req, res) => {
  const result = await mongodb.getDb().collection("categories").find()

  result.toArray().then((categories) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(categories)
  })
}

// This gets one category by its id
const getSingleCategory = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json("Invalid category id.")
    }

    const categoryId = new ObjectId(req.params.id)

    const result = await mongodb
      .getDb()
      .collection("categories")
      .find({ _id: categoryId })

    const categories = await result.toArray()

    if (!categories[0]) {
      return res.status(404).json("Category not found.")
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(categories[0])
  } catch (error) {
    res.status(500).json("Some error occurred while getting the category.")
  }
}

// This creates a new category in MongoDB
const createCategory = async (req, res) => {
  try {
    const category = {
      categoryName: req.body.categoryName,
      description: req.body.description
    }

    const validationError = validateCategory(category)

    if (validationError) {
      return res.status(400).json(validationError)
    }

    const response = await mongodb
      .getDb()
      .collection("categories")
      .insertOne(category)

    if (response.acknowledged) {
      res.status(201).json(response)
    } else {
      res.status(500).json("Some error occurred while creating the category.")
    }
  } catch (error) {
    res.status(500).json("Some error occurred while creating the category.")
  }
}

// This updates a category by its id
const updateCategory = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json("Invalid category id.")
    }

    const categoryId = new ObjectId(req.params.id)

    const category = {
      categoryName: req.body.categoryName,
      description: req.body.description
    }

    const validationError = validateCategory(category)

    if (validationError) {
      return res.status(400).json(validationError)
    }

    const response = await mongodb
      .getDb()
      .collection("categories")
      .replaceOne({ _id: categoryId }, category)

    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(404).json("Category not found or no changes were made.")
    }
  } catch (error) {
    res.status(500).json("Some error occurred while updating the category.")
  }
}

// This deletes a category by its id
const deleteCategory = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json("Invalid category id.")
    }

    const categoryId = new ObjectId(req.params.id)

    const response = await mongodb
      .getDb()
      .collection("categories")
      .deleteOne({ _id: categoryId })

    if (response.deletedCount > 0) {
      res.status(204).send()
    } else {
      res.status(404).json("Category not found.")
    }
  } catch (error) {
    res.status(500).json("Some error occurred while deleting the category.")
  }
}

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
}