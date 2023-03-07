import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {

    const navigate = useNavigate;

    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };

    return (

        <div>

            <Link to='/'>
                Home
            </Link>
            <Link to='/ocr'>
                OcrPrototype
            </Link>
            <Link to='/register'>
                Register
            </Link>
            <Link to='/login'>
                Login
            </Link>

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