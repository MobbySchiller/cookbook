const db = require('../models');
const { Op } = require("sequelize");
const Recipes = db.recipes;
const MealTypes = db.mealTypes;
const RecipeIngredients = db.recipeIngredients;
const RecipeSteps = db.recipeSteps;

exports.create = async (req, res) => {
  const {
    name,
    description,
    prepTimeMin,
    servings,
    authorId,
    imageUrl,
    ingredients,
    steps
  } = req.body;

  try {
    const newRecipe = await db.recipes.create({
      name,
      description,
      prepTimeMin,
      servings,
      authorId,
      imageUrl
    });

    const recipeId = newRecipe.id;

    const ingredientsData = ingredients.map((item) => ({
      recipe_id: recipeId,
      name: item.name,
      quantity: item.quantity
    }));

    const stepsData = steps.map((item) => ({
      recipe_id: recipeId,
      step_number: item.stepNumber,
      title: item.title
    }));

    await db.recipeIngredients.bulkCreate(ingredientsData);
    await db.recipeSteps.bulkCreate(stepsData);

    res.status(201).send({
      message: "Przepis został pomyślnie utworzony.",
      recipeId
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Wystąpił błąd podczas tworzenia przepisu."
    });
  }
};

exports.findAll = async (req, res) => {
  const { name, mealTypeId } = req.query;

  const recipeConditions = {};

  if (name) {
    recipeConditions.name = { [Op.like]: `%${name}%` };
  }
  if (mealTypeId) {
    recipeConditions.meal_type_id = mealTypeId;
  }

  try {
    const data = await Recipes.findAll({
      where: recipeConditions,
      attributes: {
        exclude: ['mealTypeId', 'meal_type_id']
      },
      include: [{
        model: MealTypes,
        as: 'mealType',
        attributes: ['name']
      }]
    });

    const formatted = data.map(recipe => {
      const json = recipe.toJSON();
      json.mealType = json.mealType?.name || null;
      return json;
    });

    res.send(formatted);

  } catch (err) {
    res.status(500).send({
      message: err.message || 'Wystąpił błąd podczas pobierania przepisów.'
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await Recipes.findByPk(id, {
      attributes: {
        exclude: ['mealTypeId', 'meal_type_id']
      },
      include: [
        {
          model: MealTypes,
          as: 'mealType',
          attributes: ['name']
        },
        {
          model: RecipeIngredients,
          as: 'ingredients',
          attributes: ['name', 'quantity']
        },
        {
          model: RecipeSteps,
          as: 'steps',
          attributes: ['step_number', 'title', 'description'],
          order: [['step_number', 'ASC']]
        }
      ]
    });

    if (!recipe) {
      return res.status(404).send({
        message: `Nie znaleziono przepisu o id=${id}.`
      });
    }

    const data = recipe.toJSON();

    // Uprość mealType do stringa
    data.mealType = data.mealType?.name || null;

    // Zamień step_number → stepNumber
    data.steps = data.steps?.map(step => ({
      ...step,
      stepNumber: step.step_number,
      step_number: undefined
    }));

    res.send(data);

  } catch (err) {
    res.status(500).send({
      message: `Błąd przy pobieraniu przepisu o id=${id}`
    });
  }
};


exports.update = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    prepTimeMin,
    servings,
    authorId,
    imageUrl,
    ingredients,
    steps
  } = req.body;

  try {
    const recipe = await Recipes.findByPk(id);
    if (!recipe) {
      return res.status(404).send({
        message: `Nie znaleziono przepisu o id=${id}.`
      });
    }

    await recipe.update({
      name,
      description,
      prep_time_min: prepTimeMin,
      servings,
      author_id: authorId,
      image_url: imageUrl
    });

    await RecipeIngredients.destroy({ where: { recipe_id: id } });
    await RecipeSteps.destroy({ where: { recipe_id: id } });

    const ingredientsData = ingredients.map(item => ({
      recipe_id: id,
      name: item.name,
      quantity: item.quantity
    }));
    await RecipeIngredients.bulkCreate(ingredientsData);

    const stepsData = steps.map(item => ({
      recipe_id: id,
      step_number: item.stepNumber,
      title: item.title
    }));
    await RecipeSteps.bulkCreate(stepsData);

    res.send({ message: `Przepis o id=${id} został zaktualizowany.` });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: `Błąd podczas aktualizacji przepisu o id=${id}`
    });
  }
};


exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedCount = await Recipes.destroy({
            where: { id: id }
        });

        if (deletedCount === 0) {
            return res.status(404).send({
                message: `Nie znaleziono przepisu o id=${id}.`
            });
        }

        res.send({
            message: `Przepis o id=${id} został usunięty.`
        });

    } catch (err) {
        res.status(500).send({
            message: `Błąd podczas usuwania przepisu o id=${id}`
        });
    }
};

