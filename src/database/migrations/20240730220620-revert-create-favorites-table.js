'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // O método `up` pode ser deixado vazio ou configurado conforme necessário.
  },

  down: async (queryInterface, Sequelize) => {
    // Código para reverter a criação da tabela
    await queryInterface.dropTable('favorites');
  },
};

