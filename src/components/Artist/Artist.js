import React from "react";
import BorderCard from "../common/BorderCard";
import Container from "../common/Container";

const Artist = (props) => {
    const {id, artistName, artistNameFormatted, members} = props.artist;

    const onSelect = () => {
        props.onSelect(artistNameFormatted);
    }

    const mapMembers = () => {
        return (
            members.map(member => {
                return <p>{member.name}</p>
            })
        )
    }

    return(
        <BorderCard onClick={onSelect} style={{
            flexDirection: 'column', alignItems: 'center'
        }}>
            <h2>{artistName}</h2>
            <div style={{flexDirection: 'column'}}>
                {mapMembers()}
            </div>
        </BorderCard>
    )
}

export default Artist;