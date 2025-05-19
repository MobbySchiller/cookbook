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
        authorId: {
            type: Sequelize.INTEGER,
            field: 'author_id' 
        },
        imageUrl: {
            type: Sequelize.INTEGER,
            field: 'image_url' 
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