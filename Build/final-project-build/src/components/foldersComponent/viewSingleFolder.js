import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/index';
import ErrorBoundry from "../../components/ErrorBoundry"
import DocumentCard from '../DocumentCard';
import { Grid } from "@mui/material";

const ViewSingleFolder = (props) => {
    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // to pick up parameters from the links => useParams
    const { userId, folderId } = useParams();
    const [documents, setDocument] = useState(null);
    const [folderData, setFolderData] = useState(null);

    useEffect(() => {
        axios.get(`/folder/${userId}/${folderId}`)
            // axios.get('/document')
            .then((response) => {
                console.log(response.data[0].documents);
                setDocument(response.data[0].documents);
                console.log(response.data[0]);
                setFolderData(response.data[0]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [userId, folderId]);

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

    const folderTitle = folderData.folderTitle;
    const imgPath = folderData.imgPath;

    return (
        <>
            <img className='img-cover ' src={`${STATIC_FILES_URL}${imgPath}`} alt="Folder"></img>

            <h1>Create Document</h1>
            <Link to={`/create-document/${folderId}`}>Create Document</Link>
            <h1>View {folderTitle}</h1>
            <ErrorBoundry>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    {documentsList}
                </Grid>
            </ErrorBoundry>

        </>
    );
};

export default ViewSingleFolder;