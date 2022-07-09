const router = require('express').Router()
const sequelize = require('../config/connection');
const {Comment} = require('../models');

router.post('/', (req,res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    }
})

module.exports = router;