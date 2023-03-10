import { useState } from 'react'
import axios from '../config';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const styles = { color: "red", backgroundColor: "white" };
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
                    props.onAuthenticated(true, response.data.token);
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
            <textarea
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
            <button variant="outlined" onClick={submitForm}>Submit</button>


            <button component={Link} to='/register'>
                Register
            </button>
            <br />

            <p >{errorMessage}</p>
        </>
    );

};

export default LoginForm;