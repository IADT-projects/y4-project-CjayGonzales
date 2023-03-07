import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {

    // const navigate = useNavigate();

    return (
        <div>

            <Link to='/'>
                Home
            </Link>

            <Link to='/register'>
                Register
            </Link>
            <Link to='/login'>
                Login
            </Link>

        </div>
    );
};

export default Navbar;