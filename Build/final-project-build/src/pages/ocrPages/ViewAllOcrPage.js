import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/index';
import OcrCard from '../../components/ocrComponents/ViewAllOcrCard';
import ErrorBoundry from "../../components/ErrorBoundry"
import Grid from '@mui/material/Grid';

const OcrView = (props) => {

    const [ocrs, setOcrs] = useState(null);

    useEffect(() => {
        axios.get(`/ocr/${props.userID}`)
            // axios.get('/ocr')
            .then((response) => {
                console.log(response.data);
                setOcrs(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.userID]);

    if (!ocrs) return 'Loading...';

    const deleteCallback = (id) => {
        let ocrsNew = ocrs.filter(ocr => {
            return ocr._id !== id;
        })
        setOcrs(ocrsNew);
    };

    const ocrsList = ocrs.map((ocrs) => {
        return <Grid className="breathe-m"><OcrCard key={ocrs._id} ocrs={ocrs} callback={deleteCallback} /></Grid>;
    });


    return (

        <>
            <Grid container justifyContent="center">

                <ErrorBoundry>
                    <Grid container justifyContent="space-around" md={11.5}>
                        <Grid md={12}>
                            <h1 className="breathe">OCR Files</h1>
                        </Grid>
                        {ocrsList}

                    </Grid>

                </ErrorBoundry>
            </Grid>

        </>
    );
};

export default OcrView;