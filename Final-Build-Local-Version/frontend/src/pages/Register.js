import React from 'react';
import RegisterForm from "../components/RegisterForm";
import { Grid } from '@mui/material';

const Register = (props) => {

    return (
        <>
            {(!props.authenticated) ? (
                // Passing onAuthenticated to Login Form 
                < RegisterForm onAuthenticated={props.onAuthenticated} />
            ) : (
                <Grid container justifyContent="center">
                    <p>You are logged in</p>
                </Grid>
            )}
        </>
    );
}

export default Register;