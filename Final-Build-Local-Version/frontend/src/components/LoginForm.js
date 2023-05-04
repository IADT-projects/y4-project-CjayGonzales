import { useState, useEffect } from 'react'
import axios from '../config';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const LoginForm = (props) => {

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const isRequired = (fields) => {
        let error = false;
        fields.forEach(field => {
            console.log("running")
            if (!form[field]) {
                error = true;

                setErrors(prevState => ({
                    ...prevState,
                    [field]: {

                        message: `${field} is required!`
                    }
                }));
            }
        });

        return error;
    };

    const submitForm = () => {
        if (!isRequired(['email', 'password'])) {
            axios.post('/users/login', {
                email: form.email,
                password: form.password
            })
                .then((response) => {
                    console.log(response.data);
                    setErrorMessage("");
                    props.onAuthenticated(true, response.data.token, response.data._id);

                })
                .catch((err) => {
                    console.error(err);
                    console.log(err.response.data)
                    setErrorMessage(err.response.data.msg)
                });
        }
    };

    useEffect(() => {

        const keyDownHandler = event => {
            console.log("testing");

            if (event.key === 'Enter') {
                event.preventDefault();
                submitForm();
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);



    // if (authenticated) return "You are logged in";

    return (
        <>
            <div className='breathe' />
            <Grid container md={12} justifyContent="center">
                <div className='register-background' md={8}>

                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">

                        <h1 >Log In</h1>
                        <h2 className='heading-3 faded'>Don't have an account?</h2>
                        <Link to='/register'><p className='underline'>Sign Up</p></Link>

                    </Grid>

                    <Grid>
                        <p>Email</p>
                        <input type="text"
                            className='textarea-width my-placeholder'
                            id="outlined-basic"
                            label="Email"
                            name="email"
                            onChange={handleForm}
                            variant="outlined"
                            error={errors.email}
                            // ternary operator
                            placeholder={errors.email?.message.toUpperCase()}

                            value={form.email}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <p>Password</p>
                        <input type="password"
                            className='textarea-width my-placeholder'
                            id="outlined-basic"
                            label="Password"
                            name="password"
                            onChange={handleForm}
                            variant="outlined"
                            error={errors.password}
                            placeholder={errors.password?.message.toUpperCase()}
                            value={form.password}
                            fullWidth
                        />

                    </Grid>
                    <p className='error-message'>{errorMessage}</p>

                    <Grid container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <button className="button-important breathe-m" variant="outlined" onClick={submitForm}>Submit</button>

                    </Grid>

                    <br />

                </div >
            </Grid >
        </>
    );

};

export default LoginForm;