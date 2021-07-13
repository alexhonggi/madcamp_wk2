import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Good = sequelize.define('goods', {
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: 'mola'
    },
    img: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
    paranoid: true,
});

export default Good;