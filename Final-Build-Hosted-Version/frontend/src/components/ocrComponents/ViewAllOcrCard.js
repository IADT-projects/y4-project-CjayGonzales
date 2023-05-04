import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const OcrCard = (props) => {
    const ocrID = props.ocrs._id
    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    let result = <p>{props.ocrs.result.slice(0, 150)}</p>
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
                        <h5 className="ocr-card-results">{result}</h5>
                    </div>
                </div>
            </Grid>

            {show && (

                <Grid  >

                    <div className="overlay" onClick={toggleModal} >

                        <Grid
                            container
                            justifyContent="center"
                        >

                            <div className="ocr-modal-content" onClick={e => e.stopPropagation()}>
                                <Grid container md={12} xs={12} >
                                    <Grid container justifyContent="center " >
                                        <img src={`${STATIC_FILES_URL}${imgPath}`} className="ocr-modal-image  breathe-m" alt="Ocr" />

                                        <div className="ocr-modal-content-width breathe-s">
                                            <Grid md={12}
                                                direction="column"
                                                justifyContent="flex-start"
                                                alignItems="flex-start">

                                                <h1>Results</h1>
                                                <h5>{modalResult}</h5>
                                                <button className="button-discard underline" onClick={toggleModal}>CLOSE</button>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                        </Grid >

                    </div >
                </Grid>



            )}

        </>
    );
}

export default OcrCard;