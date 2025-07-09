const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const authRoutes = require("./app/routes/authRoutes");
const recipesRoutes = require("./app/routes/recipesRoutes");

const app = express();
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

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

app.listen(5000, () => {
  console.log("Server has started!");
});
