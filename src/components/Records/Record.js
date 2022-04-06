import React from 'react';
import BorderCard from "../common/BorderCard"

const Record = (props) => {
    const {id, name, artists, year} = props.record;

    const onSelect = () => {
        props.onSelect(id);
    }

    return (
        <BorderCard onClick={onSelect}>
            <p>{name}</p>
            {/* <p>{artists}</p> */}
            <p>{year}</p>
        </BorderCard>
    )
}

export default Record;