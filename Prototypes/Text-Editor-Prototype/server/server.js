const mongoose = require('mongoose')
const express = require('express');
const app = express();

require('dotenv').config();
require('./utils/db.js')();

app.use(express.json());              // All routes can accept json below this
app.set('view engine', 'html');
// app.use(express.static('public'));    // registers the middleware - takes a folder name. Built in express method
app.use(express.static(__dirname + '/public/'));

// paths
app.use('/api/document', require('./routes/document2'));
