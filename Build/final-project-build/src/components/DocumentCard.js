import React from "react";
import { Link } from 'react-router-dom';

function DocumentCard(props) {

    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let ID = <p><b></b><Link to={`/documents/${props.document._id}`}>{props.document._id}</Link></p>
    let title = <p><b>Title: </b>{props.document.title}</p>

    return (
        <div className="card">
            <div className="card-body">
                <h5 >{ID}</h5>
                <h5 >{title}</h5>

            </div>
        </div>
    );
}

export default DocumentCard;