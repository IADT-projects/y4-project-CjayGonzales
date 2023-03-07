import React from 'react';
import RegisterForm from "../components/RegisterForm";

const Register = (props) => {
    return (
        <>
            <h1>Register Page</h1>
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