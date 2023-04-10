import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const OcrCard = (props) => {
    const ocrID = props.ocrs._id
    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let result = <p>{props.ocrs.result.slice(0, 200)}</p>
    let imgPath = props.ocrs.imgPath
    const [show, setShow] = useState(false)

    return (
        <>
            <Grid md={3}>
                <div className="ocr-card">
                    <div className="">
                        <img className="ocr-card-img " src={`${STATIC_FILES_URL}${imgPath}`} alt="Ocr"></img>
                        <h5>{result}</h5>
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default OcrCard;