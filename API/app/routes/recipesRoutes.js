module.exports = (app) => {
    const recipes = require('../controllers/recipesController');

    app.get('/', (req, res) => {
        res.json({message:"Hello - Your Server lives!!!"});
    });

    app.post('/api/recipes', recipes.create);
    app.get('/api/recipes', recipes.findAll);
    app.get('/api/recipes/:id', recipes.findOne);
    app.put('/api/recipes/:id', recipes.update);
    app.delete('/api/recipes/:id', recipes.delete);
}