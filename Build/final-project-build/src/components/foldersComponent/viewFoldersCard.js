import React, { useState } from "react";
import { Link } from 'react-router-dom';
import EditFolder from "./editFolderComponent";
import DeleteFolder from "./deleteFolderComponent";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const ViewFolderCard = (props) => {

    const folderId = props.folder._id;
    const userId = localStorage.getItem('userID');
    let imgPath = props.folder.imgPath

    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let title = <p><b></b><Link to={`/view_folder/${userId}/${folderId}`}>{props.folder.folderTitle.charAt(0).toUpperCase() + props.folder.folderTitle.slice(1, 20)}</Link></p>

    const [show, setShow] = useState(false);
    const [optionsModal, setOptionsModal] = useState(false);
    const displayModal = () => {
        setOptionsModal(!optionsModal)
    };

    return (
        <>

            <Grid md={3}>
                <div className="folder-card">
                    <Link to={`/view_folder/${userId}/${folderId}`}>
                        <img className="folder-card-image" src={`${STATIC_FILES_URL}${imgPath}`} alt="Folder"></img>
                    </Link>

                    <Grid md={12}
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Grid md={9}>
                            <h5 className="folder-card-title">{title}</h5>

                        </Grid>
                        <Grid md={3} justifyContent="center" container onClick={displayModal}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </Grid>
                    </Grid>

                    {optionsModal && (
                        <>
                            <div className="options-modal">
                                <button className="options-modal-edit" onClick={() => { setShow(true); displayModal() }}>Edit</button>
                                <div className="border-below"></div>
                                <DeleteFolder id={props.folder._id} callback={props.callback} />
                            </div>
                        </>
                    )}

                </div>
                <EditFolder onClose={() => setShow(false)} show={show} folderId={folderId} />
            </Grid>

        </>

    );
}

export default ViewFolderCard;