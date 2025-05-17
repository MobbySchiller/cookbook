const db = require('../models');
const Recipes = db.recipes;

exports.create = (req, res) => {
    res.json({ message: "Sent from create method" });
};

exports.findAll = (req, res) => {
    Recipes.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving events.'
            });
        });
};

exports.findOne = (req, res) => {
    res.json({ message: "Sent from get method" });
};


exports.update = (req, res) => {
    res.json({ message: "Sent from update method" });
};

exports.delete = (req, res) => {
 res.json({ message: "Sent from delete method" });
};

exports.findByTitle = (req, res) => {
    res.json({ message: "Sent from findByTitle method" });
};
