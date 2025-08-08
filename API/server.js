const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./app/models");
const authRoutes = require("./app/routes/authRoutes");
const recipesRoutes = require("./app/routes/recipesRoutes");
const mealTypesRoutes = require("./app/routes/mealTypesRoutes");
const userFavouriteRecipeRoutes = require("./app/routes/userFavouriteRecipeRoutes");

const app = express();
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Sync db.");
  })
  .catch((err) => {
    console.log("Failde to sync db: " + err.message);
  });

authRoutes(app);
recipesRoutes(app);
mealTypesRoutes(app);
userFavouriteRecipeRoutes(app);

app.listen(5000, () => {
  console.log("Server has started!");
});
