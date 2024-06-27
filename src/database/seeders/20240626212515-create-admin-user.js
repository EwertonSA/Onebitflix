'use strict';
const bcrypt= require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
const hashedPassword= await bcrypt.hash('12345', 10)
await queryInterface.bulkInsert('users',[{
  first_name: 'admin',
  last_name:'User',
  phone:'12345-6789',
  birth:'1999-09-09',
  email:'admin@email.com',
  password:hashedPassword,
  role:'admin',
  created_at: new Date(),
  updated_at:new Date()
},
])
  },

  async down (queryInterface, Sequelize) {
 await queryInterface.bulkDelete('users',null,{where:{email:'admin@email.com'}})
  }
};
