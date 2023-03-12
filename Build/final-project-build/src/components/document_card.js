import React from "react";

function DocumentCard(props) {

    // COMMENT THE BELOW OUT TO FIX
    console.log("card props " + props.document._id)

    // let ID = <p><b>ID: </b>{props.document._id}</p>


    return (
        <div className="card">
            <div className="card-body">
                {/* <h5 className="card-title">{ID}</h5> */}

            </div>
        </div>
    );
}

export default DocumentCard;