module.exports = (sequelize, Sequelize) => {
  const RecipeIngredients = sequelize.define(
    "recipe_ingredients",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipeId: {
        type: Sequelize.INTEGER,
        field: "recipe_id",
      },
      name: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );

  return RecipeIngredients;
};
