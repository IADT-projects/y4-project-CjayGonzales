import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditUser from './modals/userProfileModal/EditUserModal'

const Navbar = (props) => {

    const [show, setShow] = useState(false)
    const navigate = useNavigate;
    const userID = props.userID;

    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };

    return (
        <div>

            <Link to='/'>
                Home
            </Link>
            |
            <Link to='/ocr'>
                OcrPrototype
            </Link>
            |
            <Link to='/register'>
                Register
            </Link>
            |
            <Link to='/login'>
                Login
            </Link>
            |
            <Link to={`/select-document/${userID}`}>
                Select-document
            </Link>

            <button onClick={() => setShow(true)}>Edit User</button>
            <EditUser show={show} userID={userID} />

            {(props.authenticated) ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <>
                    <button component={Link} to='/register'>
                        Register
                    </button>
                    <button component={Link} to='/login'>
                        Login
                    </button>
                </>
            )}


        </div>
    );
};

export default Navbar;