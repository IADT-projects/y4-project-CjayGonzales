import React from 'react';
import RegisterForm from "../components/RegisterForm";

const Register = (props) => {

    return (
        <>
            {(!props.authenticated) ? (
                // Passing onAuthenticated to Login Form 
                < RegisterForm onAuthenticated={props.onAuthenticated} />
            ) : (
                <p>You are logged in</p>
            )}
        </>
    );
}

export default Register;