import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditUser from './modals/userProfileModal/EditUserModal'
// import Sidebar from "react-sidebar";

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

/*
const Navbar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = useCallback((open) => {
        setSidebarOpen(open);
    }, []);

    return (
        <Sidebar
            sidebar={
                <>
                    <Link to='/'>Home</Link>
                    <br/>
                    <Link to='/ocr'>OcrPrototype</Link>
                    <br/>
                    <Link to='/register'>Register</Link>
                    <br/>
                    <Link to='/login'>Login</Link>
                    <br/>
                    <Link to={`/select-document/${userID}`}>Select-document</Link>

                    <button onClick={() => setShow(true)}>Edit User</button>
                    <br/>
                    <button onClick={() => onSetSidebarOpen(false)}> Close sidebar</button>
                </>
            }
            open={sidebarOpen}
            onSetOpen={onSetSidebarOpen}
            styles={{
                sidebar: {
                    background: "white",
                    color: "black",
                    width: "300px"
                }
            }}
        >
            <button onClick={() => onSetSidebarOpen(true)}>
                Open sidebar
            </button>
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
        </Sidebar>
    );
}

export default Navbar;
*/
