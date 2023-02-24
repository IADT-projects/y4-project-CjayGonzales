const express = require('express');
const router = express.Router();

// import document_controller. curly braces is where you specify what ur importing
const {
    CreateDocument,
    findDocument
} = require('../controllers/document_controller2');

// takes the function from the controller in the document_controller files
router.post('/', CreateDocument);
router.get('/', findDocument)
module.exports = router;
