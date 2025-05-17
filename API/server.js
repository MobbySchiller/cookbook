const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const routes = require('./app/routes/recipesRoutes')

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

db.sequelize.sync().then(() => {console.log("Sync db.");}).catch((err) => {console.log("Failde to sync db: " + err.message);});

routes(app);

app.listen(5000, () => {
    console.log("Server has started!");
})