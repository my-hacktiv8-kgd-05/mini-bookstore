'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Author)
    }
  };
  Book.init({
    title: { type: DataTypes.STRING, validate: { notEmpty: { msg: 'Title tidak boleh kosong'} }},
    isbn: { type: DataTypes.STRING, validate: { notEmpty: { msg: 'ISBN tidak boleh kosong'} }},
    price: { type: DataTypes.INTEGER, validate: { notEmpty: { msg: 'Price tidak boleh kosong'} }},
    stock: { type: DataTypes.INTEGER, validate: { notEmpty: { msg: 'Stock tidak boleh kosong'} }},
    AuthorId: { type: DataTypes.INTEGER, validate: { notEmpty: { msg: 'Author tidak boleh kosong'}}}
  }, {
    sequelize,
    modelName: 'Book',
  });

  Book.addHook('beforeCreate', (instance, options) => {
    instance.isbn = `${instance.title.toLowerCase().replace(' ', '_')}${instance.isbn}`
  })
  return Book;
};