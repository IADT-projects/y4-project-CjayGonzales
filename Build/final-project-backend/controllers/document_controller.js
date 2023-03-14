const Document = require('../models/Document')
const User = require('../models/user_schema')

const createData = (req, res) => {
    let documentData = req.body;
    // accessing the mongoose model
    Document.create(documentData)
        .then((data) => {
            console.log('new document created', data);
            res.status(201).json(data);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                console.error('Validation Error!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error": err.message
                });
            } else {
                console.error(err);
                res.status(500);
            }
        });

};

const readData = (req, res) => {
    Document.find()
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


const readOne = (req, res) => {
    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve document with :id
    Document.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    "message": `Document with ID: ${id} was not found`
                });
            }
        })

        // error handling 
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(404).json({
                    "message": `Bad Request. ${id} is not a valid ID`
                });
            }
            else {
                res.status(500).json(err)
            }
        })
};


const updateData = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Document.findByIdAndUpdate(id, body, {
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

const deleteData = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    Document.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount) {
                res.status(200).json({
                    "message": `Document with ID: ${id} was deleted sucessfully`
                });
            } else {
                res.status(404).json({
                    "message": `Document with ID: ${id} was not found`
                });
            }
        })

        // error handling 
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(404).json({
                    "message": `Bad Request. ${id} is not a valid ID`
                });
            }

            else {
                res.status(500).json(err)
            }

        })

};

module.exports = {
    readData,
    readOne,
    createData,
    updateData,
    deleteData

};