const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))


// need to install this package
require('dotenv').config();

require('./utils/db.js')();

app.use(express.json());              // All routes can accept json below this
app.set('view engine', 'html');
// app.use(express.static('public'));    // registers the middleware - takes a folder name. Built in express method
app.use(express.static(__dirname + '/public/'));


// ---------------------USER------------------------
app.use((req, res, next) => {
    // split will split the bearer and token and place it into an array
    // will run on every request
    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.APP_KEY, (err, decoded) => {
            if (err) req.user = undefined;
            req.user = decoded;
            next();
        });
    }
    else {
        req.user = undefined;
        next();
    }
});
// checks to see if the user is valid
// app.use((req, res, next) => {
//     console.log("USER: ")
//     console.log(req.user);
//     next();
// });


// ----------------PATHS------------------

app.use('/api/users', require('./routes/users'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
