'use strict';

const authors = require('../json/authors.json')

authors.forEach( author => {
  author.createdAt = new Date()
  author.updatedAt = new Date()
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', authors, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {})
  }
};
