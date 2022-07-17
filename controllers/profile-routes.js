const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Event, Reaction, Comment } = require('../models');

const { withAuth, withEmailAuth } = require('../utils/auth');

router.get('/', withAuth, withEmailAuth, async (req, res) => {
    const loggedIn = req.session.loggedIn

    let user = await User.findOne({
        where: {
            id: req.session.user_id
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
    res.render('profile', { user, loggedIn } );
});

router.get('/auth/:auth', async (req, res) => {
    const authenticatedEmail = await User.update({ is_auth_email: true }, {
        where: {
            auth_url: req.params.auth
        }
    })

    if (authenticatedEmail) {
        const user = await User.findOne({
            where: {
                auth_url: req.params.auth
            },
            exclude: ['password']
        });

        req.session.loggedIn = true
        req.session.user_id = user.user_id

        const loggedIn = req.session.loggedIn
        res.render('profile', { user, loggedIn})
    } else {
        res.redirect('/signup')
    }
})

module.exports = router