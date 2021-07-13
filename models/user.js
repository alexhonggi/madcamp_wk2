import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   nick: {
      type: Sequelize.STRING,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   money: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100000,
  },
   
});

export default User;