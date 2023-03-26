import React, { useState } from "react";
import { Link } from 'react-router-dom';
import EditDocument from "./modals/documentModals/EditDocument";
import DeleteBtn from "./modals/documentModals/DeleteDocument";

const DocumentCard = (props) => {
    const documentID = props.document._id
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    // let ID = <p><b></b><Link to={`/documents/${props.document._id}`}>{props.document._id}</Link></p>
    let title = <p><b>Title: </b><Link to={`/documents/${documentID}`}>{props.document.title}</Link></p>

    const [show, setShow] = useState(false)

    return (
        <div className="card">
            <div className="card-body">
                {/* <h5 >{ID}</h5> */}
                <h5 >{title}</h5>

                <button onClick={() => setShow(true)}>Edit</button>
                <EditDocument show={show} documentID={documentID} />
                <DeleteBtn id={props.document._id} resource={`document/`} callback={props.callback} />

            </div>
        </div>
    );
}

export default DocumentCard;