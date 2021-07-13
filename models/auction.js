import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Auction = sequelize.define('auctions', {
    bid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    msg: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
});

export default Auction;