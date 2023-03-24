import { useState } from 'react';
import axios from '../../../config';
import { useNavigate } from 'react-router-dom';

const CreateDocument = (props) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
    });
    const [newImg, setNewImg] = useState(null);

    const handleForm = (e) => {
        let name = e.target.name
        let value = e.target.value

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImg = (e) => {
        // takes the image file and sets it to "imgPath"
        setNewImg(e.target.files[0]);
        console.log("Image: " + e.target.files[0])
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

    // Fixes Attempted
    // creates a multipart request : https://arosh-segar.medium.com/how-to-upload-images-using-multer-in-the-mern-stack-1c6bf691947e
    // https://maximorlov.com/fix-unexpected-field-error-multer/#:~:text=When%20you%20configure%20multer%20to,('photos%5B%5D')%20.
    // https://stackoverflow.com/questions/31530200/node-multer-unexpected-field
    const submitForm = (e) => {

        let token = localStorage.getItem('token');
        let userID = localStorage.getItem('userID');


        e.preventDefault();
        const formData = new FormData();
        formData.append('image', newImg);
        formData.append('title', form.title)

        console.log("console logged" + newImg);

        axios.post(`/document/${userID}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
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
                    // value={newImg.imgPath}
                    helperText={errors.imgPath?.message}
                    fullWidth
                />

                <button onClick={submitForm}>Submit</button>
            </form>

        </>
    );

};

export default CreateDocument;