// this will connect to the database (mongodb atlas)
const mongoose = require('mongoose');

// link is taken from the server (mongodb atlas)
const connect = async () => {
    let db = null;

    try {
        await mongoose.connect(process.env.DB_ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected sucessfully to db");
        db = mongoose.connection;                   // Store DB into here
    }
    catch (error) {
        console.log(error)
    }
    finally {
        if (db !== null && db.readyState === 1) {
        }
    }
};

module.exports = connect;