

import { Sequelize } from 'sequelize'

export const database = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix',
       username: 'postgres',
      password: 'ewerton.raquel',
	define: {
    underscored: true
  }
})