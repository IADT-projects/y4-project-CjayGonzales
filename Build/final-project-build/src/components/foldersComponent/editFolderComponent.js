import { useState, useEffect } from 'react';
import axios from '../../config/index'
import { useNavigate, useParams } from 'react-router-dom';

const EditFolder = (props) => {


    const modalBody = {
        padding: "10px",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee"
    }

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
                <div className='edit-folder-modal-body' onClick={e => e.stopPropagation()}>
                    <div>
                        <div className='edit-folder-modal-header' >
                            <h4 className='edit-folder-modal-title'>Edit Folder Name</h4>
                        </div>
                        <div className='edit-folder-modal-body' >
                            <input
                                type='text'
                                className='edit-folder-input'
                                label="folderTitle"
                                name="folderTitle"
                                onChange={handleForm}
                                error={errors.folderTitle}
                                helperText={errors.folderTitle?.message}
                                value={form.folderTitle}
                                fullWidth
                            />
                            <div className='edit-folder-modal-footer' >

                                {/* resource recieved from here */}
                                {/* https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler#:~:text=The%20first%20solution%20to%20perform,function%20greeting()%20%7B%20console. */}
                                <button onClick={() => {
                                    submitForm();
                                    refresh();
                                }}>Submit</button>

                                <button onClick={props.onClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    );

};

export default EditFolder;