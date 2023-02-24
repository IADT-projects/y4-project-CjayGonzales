const express = require('express');
const router = express.Router();

// import document_controller. curly braces is where you specify what ur importing
const {
    readData,
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/document_controller');

// takes the function from the controller in the document_controller files
router.get('/', readData);

// need params to be passed through, without /:id it wont be able to get that user
router.get('/:id', readOne);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;
