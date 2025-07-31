module.exports = (app) => {
  //   const authMiddleware = require("../middlewares/auth");
  const mealTypes = require("../controllers/mealTypesController");

  app.get("/api/meal-types", mealTypes.findAll);
};
