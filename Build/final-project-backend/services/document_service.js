const Document = require('../models/Document');

const defaultValue = "";
async function CreateDocument(id) {                     // this function finds or creates a document
    if (id == null) return                              // checks to see if its null
    const document = await Document.findById(id)        // finds by id
    if (document) return document                       // returns document if its available
    return await Document.create({ _id: id, data: defaultValue })   // creates a new ID and sets the default value to empty if there is none
}

module.exports = function (io) {
    io.on("connection", socket => {
        console.log("Connection established ")
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
};