import React, {useState, useEffect, useContext, Fragment} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {AuthContext} from "../Providers/AuthProvider"
import Button from "../common/Button"
import Spinner from "../faCommon/Spinner"
import { Navigate } from "react-router-dom";
import Artist from "../Artist/Artist";
import Container from "../common/Container";
import {apiHostURL} from "../../config"
import Collector from "../Collector/Collector";

const DisplayRecord = (props) => {

    const params = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState({
        nameFormatted: params.nameFormatted,
    });

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchRecord = async () => {
            console.log(params);

                const res = await axios.get(`${apiHostURL}/api/records/release/${record.nameFormatted}`, {
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
                return <Collector collector={collector} key={collector.id} onSelect={onSelectCollector}/>
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

    const onSelect = () => {
        navigate(`/artists/${record.artist.artistNameFormatted}`);
    }

    const onSelectCollector = (user) => {
        navigate(`/collector/${user.username}`)
    }


    const formatPage = () => {
        return(
            <Container>
                <h1>{record.name}</h1>
                
                <h3>{record.releaseYear}</h3>

                <h3>Artist</h3>
                <Artist artist={record.artist} key={record.artist.artistNameFormatted} onSelect={onSelect}/>

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