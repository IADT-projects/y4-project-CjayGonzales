import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/index';
import ErrorBoundry from "../../components/ErrorBoundry"
import DocumentCard from '../DocumentCard';

const ViewSingleFolder = (props) => {

    console.log(props.userID)
    // console.log("folder Id here: " + props.folder._id)
    console.log("single folder ID: " + props.folderId)

    const folderID = '642067f1df76a4968b3542fe';

    const [documents, setDocument] = useState(null);

    useEffect(() => {
        axios.get(`/folder/${props.userID}/${folderID}`)
            // axios.get('/document')
            .then((response) => {
                console.log(response.data[0].documents);
                setDocument(response.data[0].documents);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.userID]);


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
            <h1>View All Documents</h1>
            <ErrorBoundry>
                {documentsList}
            </ErrorBoundry>

        </>
    );
};

export default ViewSingleFolder;