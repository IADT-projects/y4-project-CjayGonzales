
// importing the url and axios from config/index file
import axios from "../../config/index";

const DeleteFolder = (props) => {
    const userID = localStorage.getItem('userID')
    const folderID = props.id;


    const onDelete = () => {
        let token = localStorage.getItem('token');
        axios.delete(`/folder/${userID}/${folderID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                props.callback(props.id);
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data.message);
            });
    };

    return (
        <button
            variant='outlined'
            color='error'

            // this delete button is gunna expect a function
            onClick={onDelete}
        >Delete</button>
    );
};

export default DeleteFolder;