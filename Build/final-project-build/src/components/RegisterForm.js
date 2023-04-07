import { useState } from 'react';
import axios from '../config';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterForm = (props) => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",

    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleForm = (e) => {

        // way to handle different inputs
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
                        message: `${field} is required!!!`
                    }
                }));
            }
        });

        return error;
    };

    const submitForm = () => {
        if (!isRequired(['name', 'email', 'password'])) {
            axios.post('/users/register', {
                name: form.name,
                email: form.email,
                password: form.password,
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

    return (
        <>
            <Grid container md={12} justifyContent="center">

                <div className='register-background' md={8}>
                    <Grid>
                        <h1>Sign Up</h1>
                        <p>Already have an account?</p>
                        <Link to='/login'>Log In</Link>
                    </Grid>

                    <Grid>
                        <p>Name</p>
                        <textarea
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            onChange={handleForm}
                            variant="outlined"
                            error={errors.name}
                            helperText={errors.name?.message}
                            value={form.name}
                            fullWidth
                        />

                    </Grid>



                    <Grid>

                        <p>Email</p>
                        <textarea
                            id="outlined-basic"
                            label="Email"
                            name="email"
                            onChange={handleForm}
                            variant="outlined"
                            error={errors.email}
                            helperText={errors.email?.message}
                            value={form.email}
                            fullWidth
                        />

                    </Grid>


                    <Grid>
                        <p>Password</p>
                        <textarea
                            id="outlined-basic"
                            type="password"
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
                    <p>{errorMessage}</p>
                </div>

            </Grid>


        </>
    );

};

export default RegisterForm;