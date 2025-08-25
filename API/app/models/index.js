const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./usersModel.js")(sequelize, Sequelize);

db.recipes = require("./recipesModel.js")(sequelize, Sequelize);
db.mealTypes = require("./mealTypesModel.js")(sequelize, Sequelize);
db.recipeIngredients = require("./recipeIngredientsModel.js")(
  sequelize,
  Sequelize
);
db.recipeSteps = require("./recipeStepsModel.js")(sequelize, Sequelize);
db.userFavouriteRecipe = require("./userFavouriteRecipeModel.js")(
  sequelize,
  Sequelize
);

db.recipes.belongsTo(db.mealTypes, {
  foreignKey: "meal_type_id",
  as: "mealType",
});
db.mealTypes.hasMany(db.recipes, { foreignKey: "meal_type_id", as: "recipes" });
db.userFavouriteRecipe.belongsTo(db.recipes, {
  foreignKey: "recipe_id",
  as: "recipe",
});
db.recipes.belongsTo(db.users, { foreignKey: "author_id", as: "author" });
db.recipes.hasMany(db.recipeIngredients, {
  foreignKey: "recipe_id",
  as: "ingredients",
});
db.recipes.hasMany(db.recipeSteps, { foreignKey: "recipe_id", as: "steps" });

module.exports = db;
