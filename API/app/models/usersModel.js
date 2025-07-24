module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "password_hash",
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: "is_verified",
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
      guid: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false, underscored: true }
  );

  return User;
};
