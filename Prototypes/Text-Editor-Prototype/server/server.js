const mongoose = require('mongoose')
const express = require('express');
const { Server } = require('socket.io');


const app = express();

const http = require("http");

const port = 3001;
const server = http.createServer(app);
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,              //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const io = new Server(server, {     // creates the server location. need to then use cors
    cors: {                         // cors allows for the client-server connections
        methods: ['GET', 'POST'],
        origin: '*',
        credentials: true,
        optionSuccessStatus: 200

    },
})
app.use(cors(corsOptions))


require('dotenv').config();
require('./utils/db.js')();

app.use(express.json());              // All routes can accept json below this
app.set('view engine', 'html');
// app.use(express.static('public'));    // registers the middleware - takes a folder name. Built in express method
app.use(express.static(__dirname + '/public/'));

// paths
// app.use('/api/document', require('./routes/document'));
app.use('/api/document', require('./routes/document2'));

app.use('/api/folder', require('./routes/folder'));

require('./services/document_service')(io);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
