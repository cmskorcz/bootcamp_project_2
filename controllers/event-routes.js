const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Comment } = require('../models');


router.get('/new', (req, res) => {
    return res.render('newEvent')
})

router.get('/:id', async (req, res) => {
    try {
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
        res.render('singleEvent', { event })
    
    } catch (error) {
        res.status(500).redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
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
    res.render('editEvent', event)
})

module.exports = router;