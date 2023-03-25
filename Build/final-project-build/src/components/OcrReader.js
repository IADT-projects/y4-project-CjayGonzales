import { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { createWorker } from "tesseract.js";

const OcrReader = () => {
   const [imageData, setImageData] = useState(null);

   // storing a string and encoding a file to put into that string
   const loadFile = (file) => {
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

   return (
      <Box sx={{ padding: "10px" }}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <input type="file" accept="image/*" onChange={(e) => loadFile(e.target.files[0])} />
               {!!imageData && <img src={imageData} style={{ width: "100%" }} alt="Selected Image" />}
            </Grid>

            <Grid item xs={12}>
               <Button disabled={!imageData || !workerRef.current} onClick={handleExtract} variant="contained">
                  Extract
               </Button>
               <Typography sx={{ marginTop: "10px", textTransform: "uppercase" }}>{progressLabel}</Typography>
               <CircularProgress variant="determinate" value={progress * 100} />
            </Grid>

            {!!ocrResult && (
               <Grid item xs={12}>
                  <Typography variant="h6">RESULT</Typography>
                  <Typography
                     variant="body1"
                     sx={{
                        fontFamily: "monospace",
                        background: "white",
                        padding: "10px",
                     }}
                  >
                     {ocrResult}
                  </Typography>
               </Grid>
            )}
         </Grid>
      </Box>
   );
};

export default OcrReader;