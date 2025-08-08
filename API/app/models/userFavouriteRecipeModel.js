module.exports = (sequelize, Sequelize) => {
  const UserFavouriteRecipe = sequelize.define(
    "UserFavouriteRecipe",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "user_favourite_recipes",
      underscored: true,
    }
  );

  UserFavouriteRecipe.associate = (models) => {
    UserFavouriteRecipe.belongsTo(models.Users, { foreignKey: "user_id" });
    UserFavouriteRecipe.belongsTo(models.Recipes, { foreignKey: "recipe_id" });
  };

  return UserFavouriteRecipe;
};
