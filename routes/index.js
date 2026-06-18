const express = require("express")
const router = express.Router()
const toolsController = require("../controllers/toolsController")
const categoriesController = require("../controllers/categoriesController") // lesson 8
const passport = require("../config/passport")

// This checks if the user is logged in before using protected routes- lesson 8
const isAuthenticated = (req, res, next) => {
  // If the user is logged in, continue- lesosn 8
  if (req.isAuthenticated()) {
    return next()
  }

  // If not logged in, block the request- lesson 8
  res.status(401).json({ message: "You must be logged in to access this route." })
}

// This route sends the user to GitHub to log in- lesson 7
router.get("/login", passport.authenticate("github", { scope: ["user:email"] }))

// This route is where GitHub sends the user after login -- lesson 7
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.send("You are logged in with GitHub")
  }
)

// This route logs the user out- lesson 8
router.get("/logout", (req, res, next) => {
  // Passport removes the user from the session -lesson 8
  req.logout((err) => {
    // If there is an error, go to the error handler- lesson 8
    if (err) {
      return next(err)
    }

    // Shows a simple logout message - lesson 8
    res.send("You are logged out")
  })
})

// This route checks if the user is currently logged in-- testing for lesson 8
router.get("/auth-status", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null
  })
})

// This route shows all tools- lesson 7
router.get("/tools", toolsController.getAllTools)

// This route shows one tool by id--- lesson 7
router.get("/tools/:id", toolsController.getSingleTool)

// This route creates a new tool- lesson 7--- updated to lesson 8 by adding isAuthenticated
router.post("/tools", isAuthenticated, toolsController.createTool)

// This route updates a tool by id- lesson 7--- updated to lesson 8 by adding isAuthenticated
router.put("/tools/:id", isAuthenticated, toolsController.updateTool)

// This route deletes a tool by id- lesson 7--- updated to lesson 8 by adding isAuthenticated
router.delete("/tools/:id", isAuthenticated, toolsController.deleteTool)

// Categories routes - Lesson 8 second collection
router.get("/categories", categoriesController.getAllCategories)

router.get("/categories/:id", categoriesController.getSingleCategory)

router.post(
  "/categories",
  isAuthenticated,
  categoriesController.createCategory
)

router.put(
  "/categories/:id",
  isAuthenticated,
  categoriesController.updateCategory
)

router.delete(
  "/categories/:id",
  isAuthenticated,
  categoriesController.deleteCategory
)

module.exports = router