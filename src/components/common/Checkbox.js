import React from "react";
import Container from "./Container";

const Checkbox = (props) => {
    return(
        <Container>
            <input
                style={{...style.input , ...props.style}}
                type="checkbox"
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                defaultChecked={props.checked}
            />
            <label
                for={props.id}
            >
                {props.label}
            </label>
        </Container>
    )
}

const style = {
    input: {
        color: "#000",
        backgroundColor: "#eee",
        paddingRight: 5,
        paddingLeft: 10,
        fontSize: 18,
        border: "1px solid #d9d9d9",
        width: "100%",
        height: "auto",
        minWidth: 250,
        margin: 0,
        borderRadius: 5,
        flex: 1,
    }
}

export default Checkbox;