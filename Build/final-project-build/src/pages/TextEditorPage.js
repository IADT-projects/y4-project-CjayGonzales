import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../config/index';
import DocumentCard from '../components/document_card';

const TextEditorPage = (props) => {

    // gets all documents
    const [documents, setDocument] = useState(null);
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

    if (!documents) return 'Loading...';

    const deleteCallback = (id) => {
        let documentsNew = documents.filter(document => {
            return document._id !== id;
        })
        setDocument(documentsNew);
    };

    const documentsList = documents.map((document) => {
        return <DocumentCard key={document._id} document={document} callback={deleteCallback} />;
    });

    return (

        <>
            <h1>Text Editor Create</h1>
            <Link to={`/documents`}>
                TextEditor
            </Link>

            <h1>Display Documents</h1>
            <DocumentCard ></DocumentCard>
            {documentsList}

        </>
    );
};

export default TextEditorPage;