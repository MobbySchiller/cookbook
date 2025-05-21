module.exports = (sequelize, Sequelize) => {
    const RecipeSteps = sequelize.define("recipe_steps", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recipeId: {
            type: Sequelize.INTEGER,
            field: 'recipe_id' 
        },
        stepNumber: {
            type: Sequelize.INTEGER,
            field: 'step_number' 
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    }, { timestamps: false });

    return RecipeSteps;
};