/*
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
*/

// attempting to fix users
const Document = require('../models/Document')
const User = require('../models/user_schema')
//file systems
const fs = require('fs');

const deleteImage = async (filename) => {

    if (process.env.STORAGE_ENGINE === 'S3') {
        const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        try {
            const data = await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET, Key: filename }));
            console.log("Success. Object deleted.", data)
        }
        catch (err) {
            console.log(err)
        }

    }
    else {
        let path = `public${process.env.STATIC_FILES_URL}${filename}`;
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            fs.unlink(path, (err) => {
                if (err) throw err;
                console.log(`${filename} was deleted`);
            });
        });
    }
};

const createData = (req, res) => {
    let documentData = req.body;
    console.log(req.body)

    // allows for image upload
    if (req.file) {
        console.log("hello")
        documentData.imgPath = process.env.STORAGE_ENGINE === 'S3' ? req.file.key : req.file.filename;
    }
    // include this else, if image required
    else {
        return res.status(422).json({
            message: req.imageError || "Image not uploaded!"
        });
    }
    User.findByIdAndUpdate(req.params.userId, { $push: { documents: documentData } })
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json(`Document not created`)
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json("Unsucccesful")
        })
};

const readData = (req, res) => {
    User.findById(req.params.userId)
        .then((data) => {
            if (data) {
                res.status(200).json(data.documents)
            } else {
                res.status(404).json('User has no documents')
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
};

const readOne = (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;

    User.findOne({ _id: userId }, { 'documents': { $elemMatch: { '_id': id } } })
        .then((data) => {
            if (data) {
                let img = `${process.env.STATIC_FILES_URL}${data.imgPath}`;
                data.imgPath = img;
                res.status(200).json(data.documents)
            } else {
                res.status(404).json('Document doesnt exist')
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
}

const updateData = (req, res) => {

    let id = req.params.id;

    // will attempt to fix image edit at another point
    // let body = req.body;
    // let file = req.file;

    // if (file) {
    //     body.imgPath = file.filename;
    // }
    // // include this else, if image required
    // else {
    //     return res.status(422).json({
    //         message: req.imageError || "Image not uploaded!"
    //     });
    // }

    User.findOneAndUpdate({ 'documents._id': id }, {
        $set: {
            'documents.$.title': req.body.title,
            'documents.$.imgPath': req.body.imgPath
        }
    })
        .then((data) => {

            if (data) {

                // removes the old image
                deleteImage(data.imgPath);
                res.status(200).json(data)
            } else {
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

}

const deleteData = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;
    let userId = req.params.userId;

    User.updateOne(
        { '_id': userId },
        { $pull: { documents: { _id: id } } }
    )
        .then((data) => {
            if (data) {
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
