import React, { useState } from "react";
import { Link } from 'react-router-dom';
import EditDocument from "./modals/documentModals/EditDocument";
import DeleteBtn from "./modals/documentModals/DeleteDocument";

const DocumentCard = (props) => {
    const documentID = props.document._id
    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    // let ID = <p><b></b><Link to={`/documents/${props.document._id}`}>{props.document._id}</Link></p>
    let title = <p><b>Title: </b><Link to={`/documents/${documentID}`}>{props.document.title}</Link></p>
    let imgPath = props.document.imgPath

    const [show, setShow] = useState(false)

    return (
        <div className="card">
            <div className="card-body">
                {/* <h5 >{ID}</h5> */}
                <h5 >{title}</h5>
                <img src={`${STATIC_FILES_URL}${imgPath}`} width="150" height="200"></img>

                <button onClick={() => setShow(true)}>Edit</button>
                <EditDocument show={show} documentID={documentID} />
                <DeleteBtn id={props.document._id} resource={`document/`} callback={props.callback} />

            </div>
        </div>
    );
}

export default DocumentCard;