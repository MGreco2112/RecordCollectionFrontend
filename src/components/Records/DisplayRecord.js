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

    const formatTracks = () => {
        return(
            
            record.tracks.map(track => {
                return <p>{track}</p>
            })
        )
    }

    const formatCollectors = () => {
        return(    
            record.collectors.map(collector => {
                return <p>{collector.name}</p>
            })
        )    
    }

    const formatComments = () => {
        return(
            record.comments.map(comment => {
                return <p>{"Collector: " + comment.collector.name + ", Comment: "} {comment.userComment}</p>
            })
        )
    }


    const formatPage = () => {
        return(
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

                    <h2>Track Listing:</h2>
                    {formatTracks()}

                    <div style={{
                        flexDirection: 'row'
                    }}>
                        <div style={{flexDirection: 'column', alignItems: 'center'}}>
                            <h3>Record In Collections Of:</h3>
                            {formatCollectors()}
                        </div>
                        <div style={{flexDirection: 'column', alignItems: 'center'}}>
                            <h3>User Comments:</h3>
                            {formatComments()}
                        </div>
                    </div>
                            
                </div>
            </Container>
            
        )
    }


    return (

        <Container>

            {loading ?
                <p>LOADING...</p>
                :
                formatPage()
            }
            
        </Container>
    )
}

export default DisplayRecord;