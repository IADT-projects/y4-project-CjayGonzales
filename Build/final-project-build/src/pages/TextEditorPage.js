import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../config/index';

const TextEditorPage = (props) => {
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

    const initial_value = ""
    return (

        <>
            <h1>Text Editor Create</h1>
            <Link to={`/documents/${initial_value}`}>
                TextEditor
            </Link>




        </>
    );
};

export default TextEditorPage;