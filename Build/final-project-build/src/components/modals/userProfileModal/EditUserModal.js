import { useState, useEffect } from 'react';
import axios from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const EditUser = (props) => {

    const [document, setDocument] = useState(null);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

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
                        message: `${field} is Required!!!`
                    }
                }));
            }
        });
        return error;
    };

    const submitForm = () => {
        console.log("form here :" + form)
        if (!isRequired(['email'])) {
            let token = localStorage.getItem('token');
            let userID = localStorage.getItem('userID');

            // first {} is data second {} is config, this is what is being past through first after we send the post
            // Req body, headers, endpoit are being passed through
            axios.put(`/users/${userID}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    navigate(`/select-document/${userID}`);
                })
                .catch(err => {
                    console.error(err);
                    console.log(err.response.data);
                    setErrors(err.response.data.errors);
                });
        }
    };

    if (!props.show) {
        return null
    }

    const refresh = () => window.location.reload(true)

    return (
        <>

            <Grid>
                <div className='overlay edit-user-modal' >

                    <div className='edit-user-modal-content' >

                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center">

                            <Grid md={12}>
                                <div className='edit-folder-modal-header' >
                                    <h1 className='edit-folder-modal-title' >Edit Profile</h1>
                                </div>
                            </Grid>

                            <Grid md={12}>
                                <div className='edit-user-modal-body'>
                                    <p>Enter New Email</p>
                                    <input
                                        className='edit-user-input '
                                        label="email"
                                        name="email"
                                        onChange={handleForm}
                                        error={errors.email}
                                        helperText={errors.email?.message}
                                        value={form.email}
                                        fullWidth
                                    />
                                    <br />
                                    <p>Enter New Username</p>
                                    <input
                                        className='edit-user-input '
                                        label="name"
                                        name="name"
                                        onChange={handleForm}
                                        error={errors.name}
                                        helperText={errors.name?.message}
                                        value={form.name}
                                        fullWidth
                                    />
                                    <p>Enter New Password</p>
                                    <input
                                        className='edit-user-input '
                                        label="password"
                                        name="password"
                                        onChange={handleForm}
                                        error={errors.password}
                                        helperText={errors.password?.message}
                                        value={form.password}
                                        fullWidth
                                    />
                                    <div className='edit-user-modal-footer ' >

                                        {/* resource recieved from here */}
                                        {/* https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler#:~:text=The%20first%20solution%20to%20perform,function%20greeting()%20%7B%20console. */}
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            columnSpacing={{ md: 3 }}
                                        >
                                            <Grid item >
                                                <button className='underline button-discard' onClick={() => { refresh() }}>Close</button>
                                            </Grid>

                                            <Grid item >
                                                <button className='button-important' onClick={() => {
                                                    submitForm();
                                                    refresh();
                                                }}>Confirm</button>
                                            </Grid>


                                        </Grid>
                                    </div>
                                </div>

                            </Grid>


                        </Grid>

                    </div>
                </div>
            </Grid>




        </>
    );

};

export default EditUser;