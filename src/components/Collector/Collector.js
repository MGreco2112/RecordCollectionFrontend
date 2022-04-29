import React, {useState, useContext} from "react";
import BorderCard from "../common/BorderCard";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const Collector = (props) => {
    const {id, name}= props.collector;

    let user = {};

    const [auth] = useContext(AuthContext);

    const onSelect = async () => {
        const res = await axios.get(`${apiHostURL}/api/collectors/user/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        user = res.data;

        props.onSelect(user);
    }

    return(
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignItems: "center"}}>
            <h2>{name}</h2>
        </BorderCard>
    )
}

export default Collector;