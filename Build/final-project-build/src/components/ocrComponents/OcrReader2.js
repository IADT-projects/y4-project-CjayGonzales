
import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import preprocessImage from './preprocess';


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// THIS PAGE IS TO SIMPLY TEST THE OCR READER, NOT ACTUALLY USED IN FINAL CODE //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const OcrReader2 = () => {
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const handleChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleClick = () => {

        // taking the canvas 
        const canvas = canvasRef.current;

        console.log(canvasRef)
        const ctx = canvas.getContext('2d');

        // applying the preprocessed image before running it through the OCR reader
        ctx.drawImage(imageRef.current, 0, 0);
        ctx.putImageData(preprocessImage(canvas), 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg");

        Tesseract.recognize(
            dataUrl, 'eng',
            {
                logger: m => console.log(m)
            }
        )
            .catch(err => {
                console.error(err);
            })
            .then(result => {
                // Get Confidence score
                let confidence = result.confidence

                let text = result.data.text
                setText(text);
                console.log(text)

            })
    }

    return (
        <div className="App">
            <main className="App-main">
                <h3>Actual image uploaded</h3>
                <img
                    src={image} className="App-logo" alt="logo"
                    ref={imageRef}
                />
                <h3>Canvas</h3>
                <canvas ref={canvasRef} width={700} height={500}></canvas>
                <h3>Extracted text</h3>
                <div className="pin-box">
                    <p> {text} </p>
                </div>
                <input type="file" onChange={handleChange} />
                <button onClick={handleClick} style={{ height: 50 }}>Convert to text</button>
            </main>
        </div>
    );
}

export default OcrReader2;