import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const OcrCard = (props) => {
    const ocrID = props.ocrs._id
    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let result = <p>{props.ocrs.result.slice(0, 200)}</p>
    let modalResult = <p>{props.ocrs.result}</p>
    let imgPath = props.ocrs.imgPath


    const [show, setShow] = useState(false)

    const toggleModal = () => {
        setShow(!show)

    }

    return (
        <>
            <Grid md={3}>
                <div className="ocr-card " onClick={toggleModal}>
                    <div className="">
                        <img className="ocr-card-img " src={`${STATIC_FILES_URL}${imgPath}`} alt="Ocr"></img>
                        <h5>{result}</h5>
                    </div>
                </div>
            </Grid>

            {show && (
                <div className="ocr-modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <img src={`${STATIC_FILES_URL}${imgPath}`} width="300px" height="200px" alt="Ocr" />
                            <h5>{modalResult}</h5>
                            <button onClick={toggleModal}>CLOSE</button>
                        </div>
                    </div>

                </div>
            )}

        </>
    );
}

export default OcrCard;