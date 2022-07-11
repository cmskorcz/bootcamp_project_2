const router = require('express').Router();
const sequelize = require('../../config/connection')
const {User} = require('../../models');

// Find all users
router.get('/', async (req, res) => {
    try {
        const foundUsers = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        res.json(foundUsers);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Find single User
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password']
            }
        });
    
        if (!foundUser) {
            res.status(404).json({ message: 'No User found by that id'});
            return;
        }
    
        res.json(foundUser);
    
    } catch (error) {
        res.status(500).json(error)
    }
})

//Create new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(newUserData)
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
         res 
           .status(400)
           .json({message: 'Incorrect email or password. Please try again.'});
           return;
        }
        const validPw = await dbUserData.checkPassword(req.body.password);

        if (!validPw) {
            res 
              .status(400)
              .json({message: 'Incorrect email or password. Please try again.'});
              return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res 
              .status(200)
              .json({user: dbUserData, message: 'You are now logged in!'});
        });
    }catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//Logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
});

// Edit User
router.put('/:id', async (req, res) => {
    try {
        if(req.session.loggedIn) {
            const updatedUser = User.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            if (!updatedUser) {
                res.status(404).json({ message: 'Unable to locate User' });
                return;
            }

            res.json(updatedUser);
            return;
        }
        res.status(400).json({ message: 'You must be logged in to update this profile' });

    } catch (error) {
        res.status(500).json(error)   
    }
});

// Delete Account
router.delete('/:id', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const deletedUser = User.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (!deletedUser) {
                res.status(404).json({ message: 'Unable to locate User' });
                return;
            }

            res.json(deletedUser);
            return;
        }
        res.status(400).json({ message: 'You must be logged in to delete a profile' })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;