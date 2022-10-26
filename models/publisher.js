'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publisher.hasMany(models.Books, {
        foreignKey: 'publisher_id',
        as: 'books'
      })
    }
  }
  Publisher.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: { msg: 'O campo nome é obrigatório' },
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
    modelName: 'Publishers',
    underscored: true,
    freezeTableName: true
  });
  return Publisher;
};