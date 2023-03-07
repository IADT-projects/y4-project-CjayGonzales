import LoginForm from "../components/LoginForm";

const Login = (props) => {
    return (
        <>

            <h1>Login</h1>


            {(!props.authenticated) ? (
                // Passing onAuthenticated to Login Form 
                < LoginForm onAuthenticated={props.onAuthenticated} />
            ) : (
                <p>You are logged in</p>

            )}
        </>
    );
};

export default Login;