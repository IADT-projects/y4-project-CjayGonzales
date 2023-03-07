const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// we dont use the create method for a reason, create makes a festival in DB and then runs the code
// here we dont make a user in db, we make an object, then we eventuall add it to DB

const register = (req, res) => {
    let newUser = new User(req.body);                         // imported from user schema
    newUser.password = bcrypt.hashSync(req.body.password, 10) // uses bcrypt package (npm install bcryptjs)
    // console.log(newUser);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).json({
                msg: err
            });
        }
        else {
            user.password = undefined; // password gets deleted from client. doesnt affect the DB version of User
            return res.status(201).json(user);
        }
    });
};

const login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            // error handling
            if (!user || !user.comparePassword(req.body.password)) {
                res.status(401).json({
                    msg: 'Authentication failed. Invalid user or password'
                });
            }
            else {
                // generate a token
                let token = jwt.sign({
                    email: user.email,
                    name: user.name,
                    _id: user._id,
                    role: 'user'
                }, process.env.APP_KEY); //takes it from the .env file. This will generate a token for us

                res.status(200).json({
                    msg: 'All Good',
                    token: token
                });
            }
        })
        .catch((err) => {
            throw err;
        })
};



module.exports = {
    register,
    login
};

