import React from 'react';
import BorderCard from "../common/BorderCard";
import Container from '../common/Container';

const Record = (props) => {
    const {id, name, artist, releaseYear} = props.record;

    console.log(props.record);

    const onSelect = () => {
        props.onSelect(id);
    }

    return (
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignItems: "center"}}>
            <h2>{name}</h2>
            <div style={{flexDirection: "column"}}>
                <p>{artist.artistName}</p>
                <p>{releaseYear}</p>
            </div>
        </BorderCard>
    )
}

export default Record;