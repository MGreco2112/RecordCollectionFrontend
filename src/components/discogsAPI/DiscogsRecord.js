import React from "react";
import BorderCard from "../common/BorderCard";

const DiscogsRecord = (props) => {
    const {title, artist, resource_url} = props.discogsRecord;

    const onSelect = () => {
        props.onSelect(resource_url);
    }

    return(
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignItems: "center"}}>
            <h2>{title}</h2>
            <div style={{flexDirection: "column"}}>
                <p>{artist ? artist : "Unknown Artist"}</p>
            </div>
        </BorderCard>
    )
}

export default DiscogsRecord;