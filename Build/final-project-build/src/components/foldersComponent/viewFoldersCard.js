import React, { useState } from "react";
import { Link } from 'react-router-dom';
import EditFolder from "./editFolderComponent";
import DeleteFolder from "./deleteFolderComponent";
import { Grid } from "@mui/material";

const ViewFolderCard = (props) => {

    const folderId = props.folder._id;
    const userId = localStorage.getItem('userID');

    console.log("FOLDER ID : " + folderId)
    console.log("USER ID: " + userId)
    let imgPath = props.folder.imgPath

    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let title = <p><b></b><Link to={`/view_folder/${userId}/${folderId}`}>{props.folder.folderTitle}</Link></p>

    const [show, setShow] = useState(false)

    return (
        <>


            <Grid md={3}>
                <div className="folder-card">
                    <img className="card-image" src={`${STATIC_FILES_URL}${imgPath}`} alt="Folder"></img>
                    <h5>{title}</h5>


                    <button onClick={() => setShow(true)}>Edit</button>
                    <EditFolder show={show} folderId={folderId} />
                    <DeleteFolder id={props.folder._id} callback={props.callback} />

                </div>
            </Grid>



        </>

    );
}

export default ViewFolderCard;