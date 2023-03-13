const express = require('express');
const router = express.Router();

// import user_controller. curly braces is where you specify what ur importing
const {
    register,
    login,
    updateUser,
    readData
} = require('../controllers/user_controller');

router
    .post('/register', register)
    .post('/login', login)
    .put('/:id', updateUser)
    .get('/', readData)

module.exports = router;
