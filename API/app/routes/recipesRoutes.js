module.exports = (app) => {
    const recipes = require('../controllers/recipesController');

    app.get('/', (req, res) => {
        res.json({message:"Hello - Your Server lives!!!"});
    });

    app.post('/api/events', recipes.create);
    app.get('/api/recipes', recipes.findAll);
    app.get('/api/events/:id', recipes.findOne);
    app.put('/api/events/:id', recipes.update);
    app.delete('/api/events/:id', recipes.delete);
    app.get('/api/events/title/:title', recipes.findByTitle);
}