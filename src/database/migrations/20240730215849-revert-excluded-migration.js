'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // O método `up` pode ser deixado vazio ou implementado conforme necessário.
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorites');
  },
};
