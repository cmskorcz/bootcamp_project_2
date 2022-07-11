const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            },
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        modelName: 'Event'
    }
);

module.exports = Event;