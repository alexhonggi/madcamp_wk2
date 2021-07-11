import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', null, {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;