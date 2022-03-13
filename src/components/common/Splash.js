import React from "react";

const Splash = (props) => {

    return (
        <div style={{...defaultStyle,
            ...props.style,
            backgroundImage: `url(${props.image})`}}
        >
            {props.children}
        </div>
    )
}

const defaultStyle = {
    backgroundSize: 'cover',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    zIndex: 0,

}

export default Splash;