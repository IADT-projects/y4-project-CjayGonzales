import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import EditDocument from "./modals/documentModals/EditDocument";
import DeleteBtn from "./modals/documentModals/DeleteDocument";
import { Grid } from "@mui/material";
const DocumentCard = (props) => {
    const documentID = props.document._id
    const { userId, folderId } = useParams();

    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    // let ID = <p><b></b><Link to={`/documents/${props.document._id}`}>{props.document._id}</Link></p>
    let title = <p><b>Title: </b><Link to={`/documents/${folderId}/${documentID}`}>{props.document.title}</Link></p>
    let imgPath = props.document.imgPath

    const [show, setShow] = useState(false)

    return (
        <>
            <Grid md={3}>
                <div className="folder-card">
                    {/* <h5 >{ID}</h5> */}
                    <img className="card-image" src={`${STATIC_FILES_URL}${imgPath}`} alt="Document" width="150" height="200"></img>
                    <h5 >{title}</h5>

                    <button onClick={() => setShow(true)}>Edit</button>
                    <EditDocument show={show} documentID={documentID} />
                    <DeleteBtn id={props.document._id} resource={`document/`} callback={props.callback} />

                </div>
            </Grid>
        </>

    );
}

export default DocumentCard;