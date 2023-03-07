const express = require('express');
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

// ---PATHS---
app.use('/api/folder', require('./routes/folder'));
app.use('/api/document', require('./routes/document'));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});