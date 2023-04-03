import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

function OcrReader2() {
    const worker = createWorker({
        logger: m => console.log(m),
    });
    const doOCR = async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
        setOcr(text);
    };
    const [ocr, setOcr] = useState('Recognizing...');
    useEffect(() => {
        doOCR();
    });
    return (
        <div className="App">
            <p>{ocr}</p>
        </div>
    );
}

// https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr/

export default OcrReader2;