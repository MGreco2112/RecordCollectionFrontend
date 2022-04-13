import React, {useState, useEffect, useContext, Fragment} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {AuthContext} from "../Providers/AuthProvider"
import Button from "../common/Button"
import Spinner from "../faCommon/Spinner"
import Container from "../common/Container";
import {apiHostURL} from "../../config"

const DisplayRecord = (props) => {

    const params = useParams();
    const [record, setRecord] = useState({
        id: params.recId,
    });

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchRecord = async () => {
            console.log(params);

                const res = await axios.get(`${apiHostURL}/api/records/${record.id}`, {
                    headers : {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            console.log("Record" + "\n" + res.data.name);
            setRecord(res.data);
            setLoading(false);

        }

        setLoading(true);
        _fetchRecord();
        console.log(record);
    }, [])



    return (
        <Container>
            <h1>{record.name}</h1>

            <h2>{record.artist.artistName}</h2>

            <h3>{record.releaseYear}</h3>

            <div style={{
                        flex: 1,
                        flexDirection: 'column',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={record.imageLink}/>

                        <p>Track Listing</p>
                        <p>{record.tracks}</p>
                        {record.tracks.map(track => {
                            <p>{track}</p>
                        })}
            </div>
        </Container>
    )
}

export default DisplayRecord;