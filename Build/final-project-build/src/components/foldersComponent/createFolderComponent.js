import { useState } from 'react';
import axios from '../../config/index';
import { useNavigate } from 'react-router-dom';

const CreateFolderComponent = (props) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        folderTitle: "",
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

    const submitForm = (e) => {
        let token = localStorage.getItem('token');
        let userID = localStorage.getItem('userID');

        e.preventDefault();
        const formData = new FormData();
        formData.append('folderTitle', form.folderTitle)
        formData.append('image', newImg);

        axios.post(`/folder/${userID}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
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
    };

    return (
        <>
            <form encType='multipart/form-data'>
                <h1>Create Folder</h1>
                <textarea
                    label="folderTitle"
                    name="folderTitle"
                    onChange={handleForm}
                    error={errors.folderTitle}
                    helperText={errors.folderTitle?.message}
                    value={form.folderTitle}
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

export default CreateFolderComponent;