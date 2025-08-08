module.exports = (app) => {
  const authMiddleware = require("../middlewares/auth");
  const favouritesController = require("../controllers/userFavouriteRecipeController");

  app.get(
    "/api/favourites/ids",
    authMiddleware,
    favouritesController.getFavouriteRecipeIds
  );

  app.post(
    "/api/favourites",
    authMiddleware,
    favouritesController.addFavourite
  );

  app.delete(
    "/api/favourites/:recipeId",
    authMiddleware,
    favouritesController.removeFavourite
  );

  app.get(
    "/api/favourites",
    authMiddleware,
    favouritesController.getFavourites
  );
};
