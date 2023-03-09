import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill";                        // import quill
import "quill/dist/quill.snow.css"                // import quill stylesheet
import { io } from 'socket.io-client'             // import the client version of socket.io
import { useParams } from 'react-router-dom';

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


export default function TextEditor() {
    const { id: documentId } = useParams()            //renaming to document ID and accessing it from URL
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()


    useEffect(() => {
        const s = io("http://localhost:3001")      // the connection is established here
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

    const wrapperRef = useCallback((wrapper) => {       // use callback as we only want one instance, to prevent it from rendering multiple toolbars
        if (wrapper == null) return                     // checks to see if wrapper is null
        wrapper.innerHTML = ""                          // sets inner HTML to an empty string
        const editor = document.createElement('div')    // creates "div"
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })            // quill takes in an ID and a theme, and modules for the toolbar
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return (
        <div className="container" ref={wrapperRef} >

        </div >
    )
}