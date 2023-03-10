import React from "react";

function DocumentCard(props) {
    return (
        <div className="card">
            <img src={props.imageUrl} alt={props.title} />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a href={props.link} className="btn btn-primary">
                    {props.buttonText}
                </a>
            </div>
        </div>
    );
}

export default DocumentCard;