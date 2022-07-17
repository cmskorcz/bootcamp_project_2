const { User } = require('../models');

// Use before withEmailAuth
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn || !req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

// Use after withAuth
const withEmailAuth = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id',
            'is_auth_email'
        ]
    });

    if (!user.is_auth_email) {
        res.redirect('/');
    } else {
        next()
    }
}

module.exports = { withAuth, withEmailAuth };
