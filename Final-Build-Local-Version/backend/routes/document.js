const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/image_upload');

// import document_controller. curly braces is where you specify what ur importing
const {
    readData,
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/document_controller');

// takes the function from the controller in the document_controller files

router.get('/:userId/:folderId', readData);
router.get('/:userId/:folderId/:documentId', readOne);
router.post('/:userId/:folderId', imageUpload.single('image'), createData);
router.put('/:userId/:folderId/:documentId', imageUpload.single('image'), updateData);
router.delete('/:userId/:folderId/:documentId', deleteData);

module.exports = router;
