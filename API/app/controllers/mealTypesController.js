const db = require("../models");
const { Op } = require("sequelize");

const MealTypes = db.mealTypes;

exports.findAll = async (req, res) => {
  try {
    const data = await MealTypes.findAll();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Wystąpił błąd podczas pobierania typów posiłków.",
    });
  }
};
