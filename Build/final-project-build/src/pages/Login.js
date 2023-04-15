import LoginForm from "../components/LoginForm";
import { Grid } from '@mui/material';
const Login = (props) => {
    return (
        <>



            {(!props.authenticated) ? (
                // Passing onAuthenticated to Login Form 
                < LoginForm onAuthenticated={props.onAuthenticated} />
            ) : (
                <Grid container justifyContent="center">
                    <p>You are logged in</p>

                </Grid>

            )}
        </>
    );
};

export default Login;