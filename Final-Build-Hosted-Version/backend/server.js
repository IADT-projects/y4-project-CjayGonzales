const express = require('express');
const jwt = require('jsonwebtoken');
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

app.use(express.json());
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public/'));


// ---------------------USER AUTH------------------------
app.use((req, res, next) => {
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

// ----------------PATHS------------------
app.use('/api/users', require('./routes/users'));
app.use('/api/document', require('./routes/document'));
app.use('/api/ocr', require('./routes/ocr'));
app.use('/api/folder', require('./routes/folder'));
require('./services/document_service')(io);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
