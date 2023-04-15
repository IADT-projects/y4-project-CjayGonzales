import { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { createWorker } from "tesseract.js";
import axios from '../../config/index';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'

const OcrReader = () => {
   const [imageData, setImageData] = useState(null);
   const [imgPath, setImagePath] = useState(null);

   const navigate = useNavigate();

   // storing a string and encoding a file to put into that string
   const loadFile = (file) => {

      setImagePath(file); // img path is set to store the image itself in the backend

      const reader = new FileReader();
      reader.onloadend = () => {
         const imageDataUri = reader.result;
         setImageData(imageDataUri);
      };
      reader.readAsDataURL(file);
   };

   // progress and ocr result
   const [progress, setProgress] = useState(0);
   const [progressLabel, setProgressLabel] = useState("idle");
   const [ocrResult, setOcrResult] = useState("");

   const workerRef = useRef(null);

   useEffect(() => {
      // creates worker from tesseract.js
      workerRef.current = createWorker({
         logger: (message) => {
            if ("progress" in message) {
               setProgress(message.progress);
               setProgressLabel(message.progress === 1 ? "Done" : message.status);
            }
         },
      });
      return () => {
         workerRef.current?.terminate();
         workerRef.current = null;
      };
   }, []);

   // extracts the ocr files
   const handleExtract = async () => {
      setProgress(0);
      setProgressLabel("starting");

      const worker = workerRef.current;
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const response = await worker.recognize(imageData);
      setOcrResult(response.data.text);
      console.log(response.data);
   };

   const submitForm = (e) => {
      let token = localStorage.getItem('token');
      let userID = localStorage.getItem('userID');

      e.preventDefault();

      console.log(imgPath);
      console.log(ocrResult);

      const formData = new FormData();
      formData.append('image', imgPath);
      formData.append('result', ocrResult);

      axios.post(`/ocr/${userID}`, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
         }
      })
         .then(response => {
            console.log(response.data);
            navigate(`/saved_ocr_files/${userID}`);
         })
         .catch(err => {
            console.error(err);
            console.log(err.response.data);
         });
   };



   return (
      <Grid container md={12} justifyContent="center" >

         {/* Image Posting */}
         <Grid >
            <h1>OCR Reader!</h1>
            <Grid >
               {imageData ? (
                  <img className="label-file-upload" src={imageData} alt="Selected" />
               ) : (
                  <>
                     <input type="file" multiple={true} id="input-file-upload" accept="image/*" onChange={(e) => loadFile(e.target.files[0])} />
                     <label className="label-file-upload" htmlFor="input-file-upload">

                        <Grid
                           container
                           direction="column"
                           justifyContent="flex-end"
                           alignItems="center"
                        >
                           <div>
                              <FontAwesomeIcon icon={faFileArrowUp} className="faded ocr-page-upload-icon" />
                              <p className="faded">Click to add image</p>
                           </div>

                        </Grid>

                     </label>

                     {!!imageData && <img src={imageData} alt="Selected " />}


                  </>
               )}

               {/* Setting Progress */}

            </Grid>


            {/* Extraction*/}
            <Grid
               container
               direction="column"
               justifyContent="flex-start"
               alignItems="flex-start"
            >

               <Grid >
                  <button className="button-important breathe-m" disabled={!imageData || !workerRef.current} onClick={handleExtract} >
                     Extract
                  </button>
               </Grid>

               <Grid className="breathe-s">
                  <Typography sx={{ marginTop: "10px", textTransform: "uppercase" }}>{progressLabel}</Typography>
                  <CircularProgress variant="determinate" value={progress * 100} />
               </Grid>

            </Grid >
         </Grid >

         {/* Checking if there is a result and returning if one is available */}
         {
            !!ocrResult && (
               <Grid item md={8}  >
                  <div className="results-body breathe-m">
                     <h1>Results</h1>
                     <p>
                        {ocrResult}
                     </p>
                     <button className="button-important breathe-s" onClick={submitForm}>Save Result</button>

                  </div>


               </Grid>
            )
         }
      </Grid >
   );
};

export default OcrReader;