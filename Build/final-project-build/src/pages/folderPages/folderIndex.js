import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/index';
import ErrorBoundry from "../../components/ErrorBoundry"
import FolderCard from '../../components/foldersComponent/viewFoldersCard';

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
        return <FolderCard key={folder._id} folder={folder} callback={deleteCallback} />;

    });


    return (

        <>
            <h1>Folders Page</h1>

            <Link to={`/create_folder`}>
                Create new Folder
            </Link>

            <h1>Display Folders</h1>
            <ErrorBoundry>

                {foldersList}

            </ErrorBoundry>
        </>
    );
};

export default FolderIndexPage;