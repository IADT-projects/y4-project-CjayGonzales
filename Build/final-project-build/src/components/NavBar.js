import { useState, useCallback } from 'react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditUser from './modals/userProfileModal/EditUserModal'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Grid } from "@mui/material";


const Navbar = (props) => {

    const [show, setShow] = useState(false)
    const navigate = useNavigate;
    const userID = props.userID;

    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };

    // MUI navbar drawer
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[<Link to='/'>Home</Link>,
                <Link to='/ocr'>Ocr Reader</Link>,
                <Link to={`/saved_ocr_files/${userID}`}>View Ocr Files</Link>,
                <Link to={`/folder/${userID}`}>Select Folder</Link>,
                (props.authenticated) ? (
                    <>
                        <button onClick={() => setShow(true)}>Edit User</button>

                    </>
                ) : (
                    <>
                        <Link to='/register'>Register</Link>
                    </>
                ),
                (props.authenticated) ? (
                    <>
                        <button onClick={logout}>Logout</button>

                    </>
                ) : (
                    <>
                        <Link to='/login'>Login</Link>
                    </>
                )
                ].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 6 === 0 ? <HomeIcon /> : index % 6 === 1 ? <CameraAltIcon /> : index % 6 === 2 ? <CloudCircleIcon /> : index % 6 === 3 ? <FolderIcon /> : index % 6 === 4 ? <PersonIcon /> : <LogoutIcon />}
                            </ListItemIcon>

                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />

        </Box>
    );

    return (
        <div>
            <div className='nav-background nav-bar'>
                {['left'].map((anchor) => (

                    <>
                        <React.Fragment key={anchor}>

                            <Grid className='nav-icon'
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <button onClick={toggleDrawer(anchor, true)}>
                                    <FontAwesomeIcon icon={faBars} size="lg" />
                                </button>
                            </Grid>

                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    </>

                ))}
                <EditUser show={show} userID={userID} />
            </div>

        </div>
    );
};

export default Navbar;





// v2
/*
const Navbar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [show, setShow] = useState(false)
    const userID = props.userID;
    const navigate = useNavigate;

    const onSetSidebarOpen = useCallback((open) => {
        setSidebarOpen(open);
    }, []);

    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };
    return (

        <>
            <Sidebar
                sidebar={
                    <>
                        <Link to='/'>Home</Link>
                        <br />
                        <Link to='/ocr'>OcrPrototype</Link>
                        <br />
                        <Link to='/register'>Register</Link>
                        <br />
                        <Link to='/login'>Login</Link>
                        <br />
                        <Link to={`/select-document/${userID}`}>Select-document</Link>

                        <button onClick={() => setShow(true)}>Edit User</button>
                        <br />
                        <button onClick={() => onSetSidebarOpen(false)}> Close sidebar</button>
                    </>
                }
                open={sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{
                    sidebar: {
                        background: "white",
                        color: "black",
                        width: "300px",
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


        </>

    );
}
export default Navbar;
*/

// V3
/*
import "../styles.css";

const Navbar = (props) => {
    const [showNav, setShowNav] = useState(false);
    const [show, setShow] = useState(false)
    const navigate = useNavigate;
    const userID = props.userID;

    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className="side-nav-app">
            <button className="open-side-nav-button" onClick={toggleNav}>
                Open Nav
            </button>
            <div className={`side-nav-overlay ${showNav ? "show" : ""}`} onClick={toggleNav}></div>
            <div className={`side-nav-wrapper ${showNav ? "show" : ""}`}>
                <button className="close-side-nav-button" onClick={toggleNav}>
                    Close Nav
                </button>
                <nav className='side-nav'>
                    <ul className="side-nav-ul">
                        <li className='side-nav-li'>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li className='side-nav-li'><Link to='/ocr'>
                            OcrPrototype
                        </Link></li>

                        <li className='side-nav-li'><Link to='/register'>
                            Register
                        </Link></li>

                        <li className='side-nav-li'><Link to='/login'>
                            Login
                        </Link></li>

                        <li className='side-nav-li'>
                            <Link to={`/select-document/${userID}`}>
                                Select-document
                            </Link>
                        </li>

                        <li className='side-nav-li'>
                            <button onClick={() => setShow(true)}>Edit User</button>
                            <EditUser show={show} userID={userID} />
                        </li>
                        {(props.authenticated) ? (
                            <li className='side-nav-li'><button onClick={logout}>Logout</button></li>

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
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;

*/