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
        return <Grid className="breathe"><DocumentCard key={document._id} document={document} callback={deleteCallback} /></Grid>;
    });

    const folderTitle = folderData.folderTitle;
    const imgPath = folderData.imgPath;

    return (
        <>
            <img className='img-cover view-all-documents-header-image ' src={`${STATIC_FILES_URL}${imgPath}`} alt="Folder"></img>

            <Grid container justifyContent="center" className='breathe-m'>
                <ErrorBoundry>
                    <Grid justifyContent="space-around" container md={11.5}>
                        <Grid md={12}>
                            <h1>{folderTitle.charAt(0).toUpperCase() + folderTitle.slice(1)}</h1>
                        </Grid>
                        <Grid md={12} className=' breathe-s'>
                            <Link className='button-add-new' to={`/create-document/${folderId}`}>
                                +  Create new Document
                            </Link>
                        </Grid>
                        {documentsList}

                    </Grid >

                </ErrorBoundry>
            </Grid>


        </>
    );
};

export default ViewSingleFolder;