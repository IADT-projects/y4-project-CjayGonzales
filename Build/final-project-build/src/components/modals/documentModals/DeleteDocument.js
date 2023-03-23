
// importing the url and axios from config/index file
import axios from "../../../config/index";
const DeleteBtn = (props) => {
    const userID = localStorage.getItem('userID')

    const onDelete = () => {
        let token = localStorage.getItem('token');
        axios.delete(`/${props.resource}/${userID}/${props.id}`, {
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

export default DeleteBtn;