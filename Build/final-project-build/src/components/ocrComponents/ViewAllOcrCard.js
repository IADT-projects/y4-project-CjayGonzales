import React, { useState } from "react";
import { Link } from 'react-router-dom';

const OcrCard = (props) => {
    const ocrID = props.ocrs._id
    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let result = <p><b>Result: </b><Link to={`/ocr/${ocrID}`}>{props.ocrs.result}</Link></p>
    let imgPath = props.ocrs.imgPath
    const [show, setShow] = useState(false)

    return (
        <div className="card">
            <div className="card-body">
                {/* <h5 >{ID}</h5> */}
                <h5 >{result}</h5>
                <img src={`${STATIC_FILES_URL}${imgPath}`} width="500" height="600"></img>
            </div>
        </div>
    );
}

export default OcrCard;