const Folder = require('../models/Folder');
const User = require('../models/user_schema')
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

const readData = (req, res) => {

    // console.log(req.user);


    User.findById(req.params.userId)
        .then((data) => {
            if (data) {
                res.status(200).json(data.folders)
            } else {
                res.status(404).json('User has no folders')
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
};

const readOne = (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;

    User.findOne({ _id: userId }, { 'folders': { $elemMatch: { '_id': id } } })
        .then((data) => {
            if (data) {
                let img = `${process.env.STATIC_FILES_URL}${data.imgPath}`;
                data.imgPath = img;
                res.status(200).json(data.folders)
            } else {
                res.status(404).json('Folder doesnt exist')
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
}

const createData = (req, res) => {
    let folderData = req.body;
    console.log(req.body)

    // allows for image upload
    if (req.file) {
        console.log("hello")
        folderData.imgPath = process.env.STORAGE_ENGINE === 'S3' ? req.file.key : req.file.filename;
    }
    // include this else, if image required
    else {
        return res.status(422).json({
            message: req.imageError || "Image not uploaded!"
        });
    }
    User.findByIdAndUpdate(req.params.userId, { $push: { folders: folderData } })
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

const updateData = (req, res) => {

    let id = req.params.id;

    User.findOneAndUpdate({ 'folders._id': id }, {
        $set: {
            'folders.$.folderTitle': req.body.folderTitle,
        }
    })
        .then((data) => {

            if (data) {
                // removes the old image
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
        { $pull: { folders: { _id: id } } }
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

