
// importing the url and axios from config/index file
import axios from "../../../config/index";
import { useParams } from 'react-router-dom'

const DeleteBtn = (props) => {
    const userID = localStorage.getItem('userID')
    const { folderId } = useParams();

    const onDelete = () => {
        let token = localStorage.getItem('token');
        axios.delete(`/${props.resource}/${userID}/${folderId}/${props.id}`, {
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
            className="options-modal-delete"
            // this delete button is gunna expect a function
            onClick={onDelete}
        >Delete</button>
    );
};

export default DeleteBtn;