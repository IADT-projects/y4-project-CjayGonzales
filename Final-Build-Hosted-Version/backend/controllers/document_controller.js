const User = require('../models/user_schema')
//file systems
const fs = require('fs');
var mongoose = require('mongoose');

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
        documentData.imgPath = process.env.STORAGE_ENGINE === 'S3' ? req.file.key : req.file.filename;
    }
    // include this else, if image required
    else {
        return res.status(422).json({
            message: req.imageError || "Image not uploaded!"
        });
    }

    var userId = req.params.userId
    var folderId = req.params.folderId

    User.findOneAndUpdate(
        { _id: userId, "folders._id": folderId },
        { $push: { 'folders.$.documents': documentData } })
        .then((data) => {
            if (data) {
                console.log("its being pushed through")
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
    let userId = mongoose.Types.ObjectId(req.params.userId);
    let folderId = mongoose.Types.ObjectId(req.params.folderId);
    let documentId = mongoose.Types.ObjectId(req.params.documentId);

    User.aggregate([
        { $match: { _id: userId } },
        { $unwind: '$folders' },
        { $match: { 'folders._id': folderId } },
        { $unwind: '$folders.documents' },
        { $match: { 'folders.documents._id': documentId } }])
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json('Document doesnt exist')
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
};

const updateData = (req, res) => {
    let userId = mongoose.Types.ObjectId(req.params.userId);
    let folderId = mongoose.Types.ObjectId(req.params.folderId);
    let documentId = mongoose.Types.ObjectId(req.params.documentId);
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

    User.findByIdAndUpdate(
        { _id: userId },
        {
            $set: {
                'folders.$[i].documents.$[j].title': req.body.title,
            }
        },
        {
            arrayFilters: [
                { 'i._id': folderId },
                { 'j._id': documentId }
            ]
        }
    )
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json(`item not updated`)
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
};

const deleteData = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let documentId = req.params.documentId;
    let userId = req.params.userId;
    let folderId = req.params.folderId;

    User.updateOne(
        { '_id': userId, 'folders._id': folderId },
        { $pull: { "folders.$.documents": { _id: documentId } } }
    )
        .then((data) => {
            if (data) {
                res.status(200).json({
                    "message": `Document with ID: ${documentId} was deleted sucessfully`
                });
            } else {
                res.status(404).json({
                    "message": `Document with ID: ${documentId} was not found`
                });
            }
        })

        // error handling 
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(404).json({
                    "message": `Bad Request. ${documentId} is not a valid ID`
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
