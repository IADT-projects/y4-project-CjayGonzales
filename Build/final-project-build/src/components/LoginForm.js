import { useState } from 'react'
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
            if (!form[field]) {
                error = true;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is incorrect!!!`
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
                    setErrorMessage(err.response.data.message)
                });
        }
    };


    // if (authenticated) return "You are logged in";

    return (
        <>
            <Grid container md={12} justifyContent="center">
                <div className='register-background' md={8}>

                    <Grid>
                        <h1>Log In</h1>
                        <p>Don't have an account?</p>
                        <Link to='/register'>Sign Up</Link>
                    </Grid>

                    <Grid>
                        <p>Email</p>
                        <input type="text"
                            className='textarea-width'
                            id="outlined-basic"
                            label="Email"
                            name="email"
                            onChange={handleForm}
                            variant="outlined"
                            error={errors.email}
                            // ternary operator
                            helperText={errors.email?.message}
                            value={form.email}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <p>Password</p>
                        <input type="text"
                            className='textarea-width'
                            id="outlined-basic"
                            label="Password"
                            name="password"
                            onChange={handleForm}
                            variant="outlined"
                            error={errors.password}
                            helperText={errors.password?.message}
                            value={form.password}
                            fullWidth
                        />
                    </Grid>

                    <button variant="outlined" onClick={submitForm}>Submit</button>

                    <br />

                    <p >{errorMessage}</p>
                </div>
            </Grid>
        </>
    );

};

export default LoginForm;