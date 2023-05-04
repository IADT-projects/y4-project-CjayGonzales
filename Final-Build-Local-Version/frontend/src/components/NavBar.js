import { useState } from 'react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditUser from './modals/userProfileModal/EditUserModal'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
        alert('You have sucessfully logged out');
        navigate('/');
    };

    // MUI navbar drawer
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleModal = () => {
        setShow(!show)
    }

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
                {[
                    // places into array
                    <Link to='/'>Home</Link>,
                    <Link to='/ocr'>Ocr Reader</Link>,
                    <Link to={`/saved_ocr_files/${userID}`}>View Ocr Files</Link>,
                    <Link to={`/folder/${userID}`}>My Folders</Link>,
                    (props.authenticated) ? (
                        <><button onClick={toggleModal}>Edit User</button></>
                    ) : (
                        <><Link to='/register'>Register</Link></>
                    ),
                    (props.authenticated) ? (
                        <><button onClick={logout}><Link to='/'>Logout</Link></button></>
                    ) : (
                        <><Link to='/login'>Login</Link></>
                    ),

                    // takes the text and index and places them into a list of items
                ].map((text, index) => (
                    <ListItem key={text} disablePadding >
                        <ListItemButton >
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