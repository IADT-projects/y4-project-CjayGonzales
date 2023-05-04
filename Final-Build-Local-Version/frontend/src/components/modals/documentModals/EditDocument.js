import { useState, useEffect } from 'react';
import axios from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
const EditDocument = (props) => {

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const documentID = props.documentID;
    const { folderId } = useParams();

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
        console.log("form here " + form)
        if (!isRequired(['title'])) {
            let token = localStorage.getItem('token');
            let userID = localStorage.getItem('userID');
            console.log("Document ID: " + documentID)

            // first {} is data second {} is config, this is what is being past through first after we send the post
            // Req body, headers, endpoit are being passed through
            axios.put(`/document/${userID}/${folderId}/${documentID}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    navigate(`/view_folder/${userID}/${folderId}`);
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
            <div className='edit-folder-modal' onClick={props.onClose}>
                <div className='edit-folder-doc-modal' onClick={e => e.stopPropagation()}>

                    <div>
                        <Grid container justifyContent="center">
                            <h1 className='edit-folder-modal-title'>Edit Document</h1>
                        </Grid>

                        <Grid container justifyContent="center" alignContent="column">
                            <div>
                                <p>Document Name</p>
                                <input type="text"
                                    className="textarea-width"
                                    label="title"
                                    name="title"
                                    onChange={handleForm}
                                    error={errors.title}
                                    helperText={errors.title?.message}
                                    value={form.title}
                                    fullWidth
                                />
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                    <div className='edit-folder-modal-footer' >
                                        <button className='button-discard pad-right' onClick={props.onClose}>Close</button>

                                        {/* resource recieved from here */}
                                        {/* https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler#:~:text=The%20first%20solution%20to%20perform,function%20greeting()%20%7B%20console. */}
                                        <button className='button-important' onClick={() => {
                                            submitForm();
                                            refresh();
                                        }}>Submit</button>

                                    </div>
                                </Grid>
                            </div>

                        </Grid>










                    </div>
                </div>
            </div>




        </>
    );

};

export default EditDocument;