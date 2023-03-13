import React from "react";

function DocumentCard(props) {

    // COMMENT THE BELOW OUT TO FIX
    console.log("card props " + props)

    let ID = <p><b>ID: </b>{props.document._id}</p>
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