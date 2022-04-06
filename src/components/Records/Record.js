import React from 'react';
import BorderCard from "../common/BorderCard"

const Record = (props) => {
    const {id, name, artists, releaseYear} = props.record;

    const onSelect = () => {
        props.onSelect(id);
    }

    return (
        <BorderCard onClick={onSelect}>
            <p>{name}</p>
            <p>{releaseYear}</p>
        </BorderCard>
    )
}

export default Record;