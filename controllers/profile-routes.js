const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Event, Reaction, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    let user = await User.findOne({
        where: {
            id: 1
            // id: req.session.user_id
        },
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Event,
                attributes: [
                    'id',
                    'name',
                    'description',
                    'address',
                    'date',
                    'created_at'
                ],
                include: [
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'comment_text',
                            'created_at'
                        ],
                        include: {
                            model: User,
                            attributes: [
                                'id',
                                'first_name'
                            ]
                        }
                    }
                ]
            },
            {
                model: Event,
                through: Reaction,
                attributes: ['name', 'date'],
                as: 'saved_events'
            }
        ]
    });
    user = user.get({ plain: true });
    res.render('profile', { user } );
});

router.get('/auth/:auth', async (req, res) => {
    await User.update({ is_auth_email: true }, {
        where: {
            auth_url: req.params.auth
        }
    });
    res.redirect('/profile')
})

module.exports = router