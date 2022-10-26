'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Authors, {
        foreignKey: 'author_id',
        as: 'author'
      })
      Book.belongsTo(models.Publishers, {
        foreignKey: 'publisher_id',
        as: 'publisher'
      })
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: { msg: 'O campo título é obrigatório' },
        maximoCinquenta(value) {
          if (value.length > 50) {
            throw new Error("Máximo de 50 caracteres");
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { 
        notNull: { msg: 'O campo nome é obrigatório' },
        maximoQuinhentos(value) {
          if (value.length > 500) {
            throw new Error("Máximo de 500 caracteres");
          }
        } 
      }
    }
  }, {
    sequelize,
    modelName: 'Books',
    underscored: true,
    freezeTableName: true
  });
  return Book;
};