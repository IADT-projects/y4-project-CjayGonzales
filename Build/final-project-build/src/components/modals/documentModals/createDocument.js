import { useState } from 'react';
import axios from '../../../config';
import { useNavigate } from 'react-router-dom';

const CreateDocument = (props) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
    });
    const [newImg, setImg] = useState({
        imgPath: ""
    });

    const handleForm = (e) => {
        let name = e.target.name
        let value = e.target.value

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImg = (e) => {
        setImg({ ...newImg, imgPath: e.target.files[0] });
    }

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

    const submitForm = (e) => {

        let token = localStorage.getItem('token');
        let userID = localStorage.getItem('userID');

        // creates a multipart request
        e.preventDefault();
        const formData = new FormData();
        formData.append('imgPath', newImg.imgPath);
        formData.append('title', form.title)

        // console.log()
        console.log(formData)

        axios.post(`/document/${userID}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
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
            <form encType='multipart/form-data'>
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

                <input
                    type="file"
                    name="imgPath"
                    onChange={handleImg}
                    error={errors.imgPath}
                    // value={form.imgPath}
                    helperText={errors.imgPath?.message}
                    fullWidth
                />

                <button onClick={submitForm}>Submit</button>
            </form>

        </>
    );

};

export default CreateDocument;