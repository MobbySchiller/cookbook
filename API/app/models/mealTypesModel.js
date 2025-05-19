module.exports = (sequelize, Sequelize) => {
    const MealTypes = sequelize.define("meal_types", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });

    return MealTypes;
};