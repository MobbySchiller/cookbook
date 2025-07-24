module.exports = (app) => {
  const authMiddleware = require("../middlewares/auth");
  const recipes = require("../controllers/recipesController");

  app.post("/api/recipes", authMiddleware, recipes.create);
  app.get("/api/recipes", authMiddleware, recipes.findAll);
  app.get("/api/recipes/:id", authMiddleware, recipes.findOne);
  app.put("/api/recipes/:id", authMiddleware, recipes.update);
  app.delete("/api/recipes/:id", authMiddleware, recipes.delete);
};
