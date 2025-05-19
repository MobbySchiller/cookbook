const db = require('../models');
const { Op } = require("sequelize");
const Recipes = db.recipes;
const MealTypes = db.mealTypes;

exports.create = (req, res) => {
    res.json({ message: "Sent from create method" });
};

exports.findAll = (req, res) => {
    const { name, mealTypeId } = req.query;

    const recipeConditions = {};

    if (name) {
        recipeConditions.name = { [Op.like]: `%${name}%` };
    }
    if (mealTypeId) {
        recipeConditions.meal_type_id = mealTypeId;
    }

    Recipes.findAll({
        where: recipeConditions,
        attributes: {
            exclude: ['mealTypeId', 'meal_type_id']
        },
        include: [{
            model: MealTypes,
            as: 'mealType',
            attributes: ['name']
        }]
    })
    .then(data => {
        const formatted = data.map(recipe => {
            const json = recipe.toJSON();
            json.mealType = json.mealType?.name || null;
            return json;
        });
        res.send(formatted);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Wystąpił błąd podczas pobierania przepisów.'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    db.recipes.findByPk(id, {
        attributes: {
            exclude: ['mealTypeId', 'meal_type_id']
        },
        include: [{
            model: db.mealTypes,
            as: 'mealType',
            attributes: ['name']
        }]
    })
    .then(recipe => {
        if (!recipe) {
            return res.status(404).send({
                message: `Nie znaleziono przepisu o id=${id}.`
            });
        }

        const data = recipe.toJSON();
        data.mealType = data.mealType?.name || null;

        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: `Błąd przy pobieraniu przepisu o id=${id}`
        });
    });
};


exports.update = (req, res) => {
    res.json({ message: "Sent from update method" });
};

exports.delete = (req, res) => {
 res.json({ message: "Sent from delete method" });
};

