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
                msg: "Invalid Details. Email is already in use!"
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
                    token: token,
                    _id: user._id
                });
            }
        })
        .catch((err) => {
            throw err;
        })
};

const readData = (req, res) => {
    User.find()
        .then((data) => {
            console.log(data);
            if (data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json("None found")
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
};

const updateUser = (req, res) => {

    let id = req.params.id;
    let body = req.body;
    body.password = bcrypt.hashSync(req.body.password, 10)

    User.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {

            if (data) {
                res.status(201).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Bad Request. ${id} is not a valid ID`
                });
            }
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                console.error('Validation Error!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error": err.message
                });
            }
            else if (err.name === 'CastError') {
                res.status(404).json({
                    "message": `Bad Request. ${id} is not a valid ID`
                });
            }
            else {
                console.error(err);
                res.status(500);
            }
        });

};



module.exports = {
    register,
    login,
    updateUser,
    readData
};

