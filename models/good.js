// import { Sequelize } from 'sequelize';

// import sequelize from '../utils/database.js';

// const Good = sequelize.define('goods', {
//     name: {
//         type: Sequelize.STRING(40),
//         allowNull: false,
//         defaultValue: 'mola'
//     },
//     img: {
//         type: Sequelize.STRING(200),
//         allowNull: true,
//     },
//     price: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//     },
// }, {
//     timestamps: true,
//     paranoid: true,
// });

// export default Good;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('goods', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
};