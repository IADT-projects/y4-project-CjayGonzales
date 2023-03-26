import React, { useState } from "react";
import { Link } from 'react-router-dom';

const OcrCard = (props) => {
    const ocrID = props.ocrs._id
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    // let ID = <p><b></b><Link to={`/documents/${props.document._id}`}>{props.document._id}</Link></p>
    let result = <p><b>Result: </b><Link to={`/ocr/${ocrID}`}>{props.ocrs.result}</Link></p>

    const [show, setShow] = useState(false)

    return (
        <div className="card">
            <div className="card-body">
                {/* <h5 >{ID}</h5> */}
                <h5 >{result}</h5>

            </div>
        </div>
    );
}

export default OcrCard;