import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/index';
import OcrCard from '../../components/ocrComponents/ViewAllOcrCard';
import ErrorBoundry from "../../components/ErrorBoundry"

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
        return <OcrCard key={ocrs._id} ocrs={ocrs} callback={deleteCallback} />;
    });


    return (

        <>
            <h1>Display Ocr Files</h1>
            <ErrorBoundry>

                {ocrsList}

            </ErrorBoundry>
        </>
    );
};

export default OcrView;