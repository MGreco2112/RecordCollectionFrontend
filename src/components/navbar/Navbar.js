import React, { Fragment } from "react";
import NavButton from "./NavButton";

const Navbar = (props) => {
    return (
        <Fragment>
        <div style={{
            backgroundColor: '#9EEBFA',
            position: "fixed",
            width: "100%",
            zIndex: 9999,
            top: 0,
            left: 0,
            height: "75px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

        }}>
            <h1 style={{
                fontFamily: 'sans-serif',
                fontWeight: "bold",
                fontSize: "2.5em",
                margin: "0 20px"
            }}>The Vinyl Hub</h1>
            <div style={{
                margin: "0 20px",
                flexDirection: "row",
                background: "transparent",
                userSelect: "none",
                alignItems: "center",
            }}>
                <NavButton to="/" label="Home"/>
                <NavButton to="/login" label="Login"/>
                <NavButton to="/register" label="Register"/>
                
            </div>
        </div>
        <div style={{height: "75px"}}/>
        </Fragment>
    )
}

export default Navbar;