const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
