const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {
    static reaction(body, models) {
        return models.Reaction.create(body)
        .then(() => {
            return Event.findOne({
                where: {
                    id: body.event_id
                },
                attributes: [
                    'id',
                    'name',
                    'address',
                    'description',
                    'date',
                    'created_at',
                    [
                        [sequelize.literal('(SELECT COUNT(*) FROM Reaction WHERE Event.id = Reaction.event_id)'), 'reaction_count']

                    ]
                ]
            })
        })
    }
}

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