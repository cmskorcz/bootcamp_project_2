const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Comment } = require('../models');
const { withAuth, withEmailAuth } = require('../utils/auth');


router.get('/new', withAuth, withEmailAuth, (req, res) => {
    const loggedIn = req.session.loggedIn
    return res.render('newEvent', { loggedIn })
})

router.get('/:id', async (req, res) => {
    try {
        const loggedIn = req.session.loggedIn
        let event = await Event.findOne({
            where: {
                id: req.params.id
            },
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
                    model: User,
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'email'
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['first_name']
                    }
                }
            ]
        });
        if (!event) {
            res.status(404).redirect('/')
            return;
        }

        event = event.get({ plain: true })
        res.render('singleEvent', { event, loggedIn })
    
    } catch (error) {
        res.status(500).redirect('/')
    }
})

router.get('/:id/edit', withAuth, withEmailAuth, async (req, res) => {
    const loggedIn = req.session.loggedIn
    let event = await Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'description',
            'address',
            'date'
        ]
    });
    event = event.get({ plain: true });
    res.render('editEvent', { event, loggedIn })
})

module.exports = router;