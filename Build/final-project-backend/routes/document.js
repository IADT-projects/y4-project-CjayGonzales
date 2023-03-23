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

router.get('/:userId', readData);
router.get('/:userId/:id', readOne);
router.post('/:userId', imageUpload.single('image'), createData);
router.put('/:id', imageUpload.single('image'), updateData);
router.delete('/:userId/:id', deleteData);

module.exports = router;
