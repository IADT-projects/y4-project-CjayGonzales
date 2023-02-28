const Document = require('../models/Document')


// creates the server location. need to then use cors
const io = require('socket.io')(3002, {

    // cors allows for the client-server connections
    cors: {
        methods: ['GET', 'POST'],
        origin: '*',
        credentials: true,
        optionSuccessStatus: 200

    },
})

const defaultValue = ""
io.on("connection", socket => {
    socket.on('get-document', async documentId => {
        const document = await CreateDocument(documentId)
        socket.join(documentId)             //sets up the rooms to allow people to comunicate with eachother / file share
        socket.emit('load-document', document.data)

        // the "delta" function allows saves to be created and takes account the small inputs 
        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("recieve-changes", delta)     // this broadcasts the changes to everyone else except the user (filesharing). sends to specific room when broadcasting them
        })

        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
})

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

const CreateDocument = (req, res) => {
    let documentData = req.body;
    console.log(documentData)
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
    return document = documentData


}

/*
async function CreateDocument(id) {
    if (id == null) return                              // checks to see if its null
    const document = await Document.findById(id)        // finds by id
    if (document) return document                       // returns document if its available
    return await Document.create({ _id: id, data: defaultValue })   // creates a new ID and sets the default value to empty if there is none
}
*/

async function findDocument(id) {
    if (id == null) return                              // checks to see if its null
    const document = await Document.findById(id)        // finds by id
    if (document) return document                       // returns document if its available
}

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
    CreateDocument,
    findDocument,
    readData,
    readOne,
    createData,
    updateData,
    deleteData
};