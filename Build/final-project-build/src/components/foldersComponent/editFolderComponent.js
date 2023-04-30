import { useState, useEffect } from 'react';
import axios from '../../config/index'
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

const EditFolder = (props) => {




    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const folderId = props.folderId;


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
        if (!isRequired(['folderTitle'])) {
            let token = localStorage.getItem('token');
            let userID = localStorage.getItem('userID');

            // first {} is data second {} is config, this is what is being past through first after we send the post
            // Req body, headers, endpoit are being passed through
            axios.put(`/folder/${folderId}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    navigate(`/folder/${userID}`);
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
            {/* MODAL REFERENCE */}
            {/* https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a */}
            <div className='edit-folder-modal' onClick={props.onClose}>
                <div className='edit-folder-doc-modal' onClick={e => e.stopPropagation()}>
                    <div>
                        <Grid container justifyContent="center">
                            <h1 className='edit-folder-modal-title'>Edit Folder</h1>
                        </Grid>


                        <Grid container justifyContent="center" alignContent="column">

                            <div>
                                <p>Folder Name</p>

                                <input type="text"
                                    className="textarea-width"
                                    label="folderTitle"
                                    name="folderTitle"
                                    onChange={handleForm}
                                    error={errors.folderTitle}
                                    helperText={errors.folderTitle?.message}
                                    value={form.folderTitle}
                                    fullWidth
                                />
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                    <div className='edit-folder-modal-footer' >

                                        {/* resource recieved from here */}
                                        {/* https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler#:~:text=The%20first%20solution%20to%20perform,function%20greeting()%20%7B%20console. */}
                                        <button className='button-discard pad-right' onClick={props.onClose}>Close</button>

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

export default EditFolder;