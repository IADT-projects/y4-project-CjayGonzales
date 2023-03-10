import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../config/index';

const TextEditorPage = (props) => {

    // gets all documents
    const [document, setDocument] = useState(null);
    useEffect(() => {
        axios.get('/document')
            .then((response) => {
                console.log(response.data);
                setDocument(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (

        <>
            <h1>Text Editor Create</h1>
            <Link to={`/documents`}>
                TextEditor
            </Link>

        </>
    );
};

export default TextEditorPage;