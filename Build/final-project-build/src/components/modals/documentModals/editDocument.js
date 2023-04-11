import { useState, useEffect } from 'react';
import axios from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';

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
                <div className='edit-folder-modal-body' onClick={e => e.stopPropagation()}>

                    <div>
                        <div className='edit-folder-modal-header' >
                            <h4 className='edit-folder-modal-title' >Edit Document</h4>
                        </div>
                        <div className='edit-folder-modal-body' >
                            <input
                                type="text"
                                className='edit-folder-input'
                                label="title"
                                name="title"
                                onChange={handleForm}
                                error={errors.title}
                                helperText={errors.title?.message}
                                value={form.title}
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

export default EditDocument;