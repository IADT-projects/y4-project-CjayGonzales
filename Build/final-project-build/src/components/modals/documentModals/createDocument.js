import { useState } from 'react';
import axios from '../../../config';
import { useNavigate } from 'react-router-dom';

const CreateDocument = (props) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: ""
    });


    const handleForm = (e) => {
        let name = e.target.name
        let value = e.target.value

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

        let token = localStorage.getItem('token');
        let userID = localStorage.getItem('userID')

        axios.post(`/document/${userID}`, form, {
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
    };

    return (
        <>
            <h1>Create Document</h1>
            <textarea
                label="Title"
                name="title"
                onChange={handleForm}
                error={errors.title}
                helperText={errors.title?.message}
                value={form.title}
                fullWidth
            />

            <button onClick={submitForm}>Submit</button>
        </>
    );

};

export default CreateDocument;