import React from 'react';
import '../styles.css';
import { Grid } from '@mui/material';
import homepageImage from './homepageImage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Grid container spacing={12}
                justifyContent="flex-end">

                <Grid item xs={12} md={4} >
                    <h1>Noted</h1>
                    <p>Noted is a notes-taking website, with a built in OCR system to allow users to effectively transfer notes from paper to the device of their choice.
                        The website is experimental and will aim to accomplish these goals with an easy to use User Interface</p>

                    <h2>About Us</h2>
                    <p>Noted is a student project, developed by Clemente Gonzales.
                        The aim is to develop a web application that can effectively
                        allow users to take notes with the use of OCR for added spice.
                    </p>
                    <Link to='/register' className="button-important">Get Started</Link>

                </Grid>

                <Grid item xs={12} md={7}>
                    <img className="img-cover homepage-image" src={homepageImage} alt="homepage" ></img>

                </Grid>

            </Grid >

        </>
    );
}

export default Home;