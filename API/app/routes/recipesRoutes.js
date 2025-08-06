module.exports = (app) => {
  const authMiddleware = require("../middlewares/auth");
  const uploadCloudinaryMiddleware = require("../middlewares/uploadCloudinary");
  const recipes = require("../controllers/recipesController");

  app.post(
    "/api/recipes",
    authMiddleware,
    uploadCloudinaryMiddleware.single("image"),
    recipes.create
  );
  app.get("/api/recipes", recipes.findAll);
  app.get("/api/recipes/user", authMiddleware, recipes.findUserRecipes);
  app.get("/api/recipes/:id", recipes.findOne);
  app.put("/api/recipes/:id", recipes.update);
  app.delete("/api/recipes/:id", authMiddleware, recipes.delete);
};
