// import { Sequelize } from 'sequelize';

// import sequelize from '../utils/database.js';

// const Auction = sequelize.define('auctions', {
//     bid: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//     },
//     msg: {
//         type: Sequelize.STRING(100),
//         allowNull: true,
//     },
// }, {
//     timestamps: true,
//     paranoid:true,
// });

// export default Auction;
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('auctions', {
        bid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        msg: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
};