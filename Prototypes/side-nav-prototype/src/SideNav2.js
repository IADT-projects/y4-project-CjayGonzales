import React from "react";
import Sidebar from "react-sidebar";

const NavBar2 = (props) => {
    super(props);
    this.state = {
        sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);


    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

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
                    <button onClick={() => this.onSetSidebarOpen(false)}> Close sidebar</button>
                </>
            }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{
                sidebar: {
                    background: "black",
                    color: "white",
                    width: "300px"
                }
            }}
        >
            <button onClick={() => this.onSetSidebarOpen(true)}>
                Open sidebar
            </button>
        </Sidebar>
    );

}

export default NavBar2;