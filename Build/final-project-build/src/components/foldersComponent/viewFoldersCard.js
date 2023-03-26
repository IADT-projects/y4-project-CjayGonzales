import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import EditDocument from "./modals/documentModals/EditDocument";
// import DeleteBtn from "./modals/documentModals/DeleteDocument";

const ViewFolderCard = (props) => {
    const folderId = props.folder._id;
    const userId = localStorage.getItem('userID');

    console.log(folderId)
    console.log(userId)

    const STATIC_FILES_URL = 'https://final-project-bucket-v2.s3.eu-west-1.amazonaws.com/'
    // creating an ID and returning it as html. the user is able to access the file through an ID link
    // let ID = <p><b></b><Link to={`/folders/${props.document._id}`}>{props.document._id}</Link></p>
    let title = <p><b>Folder Name: </b><Link to={`/view_folder/${userId}/${folderId}`} folderId={folderId}>{props.folder.folderTitle}</Link></p>
    let imgPath = props.folder.imgPath

    const [show, setShow] = useState(false)

    const testingFunction = () => {
        console.log("LOOOK HERE ")
        console.log(folderId)
        console.log(userId)
    }

    return (
        <div className="card">
            <div className="card-body">
                {/* <h5 >{ID}</h5> */}
                <h5 onClick={testingFunction}>{title}</h5>
                <img src={`${STATIC_FILES_URL}${imgPath}`} alt="Document" width="150" height="200"></img>


            </div>
        </div>
    );
}

export default ViewFolderCard;