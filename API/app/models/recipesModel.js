module.exports = (sequelize, Sequelize) => {
    const Recipes = sequelize.define("recipes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        prepTimeMin: {
            type: Sequelize.INTEGER,
            field: 'prep_time_min' 
        },
        servings: {
            type: Sequelize.INTEGER
        },
        mealTypeId: {
            type: Sequelize.INTEGER,
            field: 'meal_type_id' 
        },
        authorId: {
            type: Sequelize.INTEGER,
            field: 'author_id' 
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at' 
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at' 
        }
    },{timestamps:false});

    return Recipes;
}