import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill";                        // import quill
import "quill/dist/quill.snow.css"                // import quill stylesheet
import { io } from 'socket.io-client'             // import the client version of socket.io
import { useParams } from 'react-router-dom';
import axios from '../config/index';
import { Grid } from '@mui/material';


// These are all from Quill. It is the options for the text editor
const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]


export default function TextEditor(props) {
    const { id: documentId } = useParams()            //renaming to document ID and accessing it from URL
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const userID = localStorage.getItem('userID');
    const { folderId } = useParams();
    const [documentData, setDocument] = useState(null);

    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/';
    useEffect(() => {
        axios.get(`/document/${userID}/${folderId}/${documentId}`)
            // axios.get('/document')
            .then((response) => {
                console.log(response.data[0].folders.documents);
                setDocument(response.data[0].folders.documents);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [userID]);

    useEffect(() => {
        const s = io("https://4th-year-project-backend.vercel.app")      // the connection is established here
        setSocket(s)
        return () => {                             // disconnection here
            s.disconnect()
        }
    }, [])

    // load document use effect
    useEffect(() => {
        if (socket == null || quill == null) return     // checks to see if socket or quill is null
        socket.once("load-document", document => {      // loads the document
            quill.setContents(document)                 // sets content to loaded document
            quill.enable()                              // text editor is disable till document is loaded
        })
        socket.emit('get-document', documentId)         // gets the document through ID
    }, [socket, quill, documentId])

    // saving use effect
    useEffect(() => {
        if (socket == null || quill == null) return
        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    // this takes into account the changes that happen (UPDATES IT)
    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = (delta) => {
            quill.updateContents(delta)         // updates changes on document
        }
        socket.on('recieve-changes', handler)

        return () => {
            socket.off('recieve-changes', handler)
        }
    }, [socket, quill])

    // this useEffect is to detect changes when Quill makes changes
    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit("send-changes", delta)
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    // when a new document is created or loaded
    const wrapperRef = useCallback((wrapper) => {       // use callback as we only want one instance, to prevent it from rendering multiple toolbars
        if (wrapper == null) return                     // checks to see if wrapper is null
        wrapper.innerHTML = ""                          // sets inner HTML to an empty string
        const editor = document.createElement('div')    // creates "div"
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })    // quill takes in an ID and a theme, and modules for the toolbar
        // q.disable()
        // q.setText("Loading...")
        setQuill(q)
    }, [])


    if (!documentData) return 'Loading...';
    const imgPath = documentData.imgPath;
    const documentTitle = documentData.title;

    return (
        <>
            <img className='view-all-documents-header-image img-cover' src={`${STATIC_FILES_URL}${imgPath}`} alt="Document Page"></img>

            <Grid container justifyContent="center" className="doc-title-background">
                <h1 className='doc-title'>{documentTitle}</h1>

            </Grid>

            <div className="container" ref={wrapperRef} >

            </div >

        </>

    )
}