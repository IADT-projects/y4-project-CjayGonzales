import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/index';
import ErrorBoundry from "../../components/ErrorBoundry"
import FolderCard from '../../components/foldersComponent/viewFoldersCard';
import { Grid } from "@mui/material";

const FolderIndexPage = (props) => {

    const { userId } = useParams();

    // gets all folders
    const [folders, setFolders] = useState(null);

    useEffect(() => {
        axios.get(`/folder/${userId}`)
            // axios.get('/document')
            .then((response) => {
                setFolders(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [userId]);


    if (!folders) return 'Loading...';

    const deleteCallback = (id) => {
        let foldersNew = folders.filter(folder => {
            return folder._id !== id;
        })
        setFolders(foldersNew);
    };

    // maps the folders list for each folder card
    const foldersList = folders.map((folder) => {
        return <Grid className="breathe"><FolderCard key={folder._id} folder={folder} callback={deleteCallback} /></Grid>;

    });


    return (

        <>
            <Grid container justifyContent="center">
                <ErrorBoundry>
                    <Grid justifyContent="space-around" container md={11.5}>
                        <Grid md={12}>
                            <h1 className="breathe ma">Folders Collection</h1>
                        </Grid>

                        <Grid md={12} className=' breathe-s'>
                            <Link className='button-add-new  ' to={`/create_folder`}>
                                +  Create new Folder
                            </Link>
                        </Grid>

                        {foldersList}
                    </Grid>
                </ErrorBoundry >
            </Grid>
        </>
    );
};

export default FolderIndexPage;