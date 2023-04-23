import OcrReader from "../../components/ocrComponents/OcrReader2";
// import OcrReader from "../../components/ocrComponents/OcrReader";
import Grid from '@mui/material/Grid';

const OcrReaderPage = (props) => {
    return (
        <>
            <Grid container md={12} justifyContent="center">
                <OcrReader />

            </Grid>

        </>
    );
};

export default OcrReaderPage;