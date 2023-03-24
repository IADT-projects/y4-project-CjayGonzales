import { useState, useEffect } from 'react';
import axios from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = (props) => {

    const modal = {
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        backgroundColor: '0,0,0,1.0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const modalContent = {
        width: '500px',
        backgroundColor: '#fff'
    }

    const modalHeader = {
        padding: "10px"
    }

    const modalFooter = {
        padding: "10px"
    }

    const modalTitle = {
        margin: "0"
    }

    const modalBody = {
        padding: "10px",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee"
    }

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
            <div className='modal' style={modal}>
                <div className='modalContent' style={modalContent}>
                    <div className='modalHeader' style={modalHeader}>
                        <h4 className='modalTitle' style={modalTitle}>Edit Profile</h4>
                    </div>
                    <div className='modalBody' style={modalBody}>
                        <h3>Enter New Email</h3>
                        <textarea
                            label="email"
                            name="email"
                            onChange={handleForm}
                            error={errors.email}
                            helperText={errors.email?.message}
                            value={form.email}
                            fullWidth
                        />
                        <br />
                        <h3>Enter New Username</h3>
                        <textarea
                            label="name"
                            name="name"
                            onChange={handleForm}
                            error={errors.name}
                            helperText={errors.name?.message}
                            value={form.name}
                            fullWidth
                        />
                        <h3>Enter New Password</h3>
                        <textarea
                            label="password"
                            name="password"
                            onChange={handleForm}
                            error={errors.password}
                            helperText={errors.password?.message}
                            value={form.password}
                            fullWidth
                        />
                        <div className='modal-footer' style={modalFooter}>

                            {/* resource recieved from here */}
                            {/* https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler#:~:text=The%20first%20solution%20to%20perform,function%20greeting()%20%7B%20console. */}
                            <button onClick={() => {
                                submitForm();
                                refresh();
                            }}>Submit</button>
                            <button onClick={() => {
                                refresh();
                            }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>




        </>
    );

};

export default EditUser;