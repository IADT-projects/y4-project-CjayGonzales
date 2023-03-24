import React from "react";
import { useState, useCallback } from 'react';
import Sidebar from "react-sidebar";

const NavBar2 = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = useCallback((open) => {
        setSidebarOpen(open);
    }, []);

    return (
        <Sidebar
            sidebar={
                <>
                    <b>Sidebar content</b>
                    <br />
                    <a href="https://www.youtube.com/">Hello</a>
                    <h1>
                        Hello
                    </h1>
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
        </Sidebar>
    );
}

export default NavBar2;