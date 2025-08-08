const db = require("../models");
const Recipes = db.recipes;
const UserFavouriteRecipe = db.userFavouriteRecipe;
const MealTypes = db.mealTypes;

exports.addFavourite = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
    const existing = await UserFavouriteRecipe.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });

    if (existing) {
      return res
        .status(400)
        .send({ message: "Przepis jest już w ulubionych." });
    }

    const favourite = await UserFavouriteRecipe.create({
      user_id: userId,
      recipe_id: recipeId,
    });

    res.status(201).send(favourite);
  } catch (err) {
    res.status(500).send({
      message: "Błąd podczas dodawania do ulubionych.",
      error: err.message,
    });
  }
};

exports.removeFavourite = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  try {
    const deleted = await UserFavouriteRecipe.destroy({
      where: { user_id: userId, recipe_id: recipeId },
    });

    if (deleted) {
      return res.send({ message: "Przepis usunięty z ulubionych." });
    } else {
      return res
        .status(404)
        .send({ message: "Ulubiony przepis nie został znaleziony." });
    }
  } catch (err) {
    res.status(500).send({
      message: "Błąd podczas usuwania z ulubionych.",
      error: err.message,
    });
  }
};

exports.getFavourites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favourites = await UserFavouriteRecipe.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Recipes,
          as: "recipe",
          attributes: {
            exclude: ["mealTypeId", "meal_type_id"],
          },
          include: [
            {
              model: MealTypes,
              as: "mealType",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const formatted = favourites.map((fav) => {
      const recipe = fav.recipe.toJSON();
      recipe.mealType = recipe.mealType?.name || null;
      return recipe;
    });

    res.send({
      data: formatted,
      pagination: {
        totalItems: formatted.length,
        currentPage: 1,
        totalPages: 1,
        limit: formatted.length,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: "Błąd podczas pobierania ulubionych.",
      error: err.message,
    });
  }
};

exports.getFavouriteRecipeIds = async (req, res) => {
  const userId = req.user.id;

  try {
    const favourites = await UserFavouriteRecipe.findAll({
      where: { user_id: userId },
      attributes: ["recipe_id"],
    });

    const favouriteIds = favourites.map((fav) => fav.recipe_id);

    res.send(favouriteIds);
  } catch (err) {
    res.status(500).send({
      message: "Błąd podczas pobierania ulubionych przepisów.",
      error: err.message,
    });
  }
};
