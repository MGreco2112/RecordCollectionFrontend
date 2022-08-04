import React, {useState, useEffect, useContext, Fragment} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {AuthContext} from "../Providers/AuthProvider"
import Button from "../common/Button";
import Input from "../common/Input";
import Artist from "../Artist/Artist";
import Container from "../common/Container";
import {apiHostURL} from "../../config"
import Form from "../common/Form";
import Collector from "../Collector/Collector";
import Checkbox from "../common/Checkbox";
import InlineInputContainer from "../common/InlineInputContainer";

const Test = () => {
    const navigate = useNavigate();

    const [record, setRecord] = useState({});

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    const [collectorRecords, setCollectorRecords] = useState([]);

    const [collector, setCollector] = useState({});

    useEffect(() => {
        const _fetchDiscogsRecord = async () => {
            try {
                const res = await axios.get(`${apiHostURL}/api/discogs/test`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                const collectorRecords = await axios.get(`${apiHostURL}/api/collectors/currentCollector`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                console.log(res.data);
                setCollectorRecords(collectorRecords.data.records);
                setCollector(collectorRecords.data);
                setRecord(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
        setLoading(true);

        if (auth.token) {
            _fetchDiscogsRecord();
        }
    }, [auth]);

    const formatTracks = () => {
        return(
            
            record.tracks.map(track => {
                return <p>{track.title}</p>
            })
        )
    }

    const formatCollectors = () => {
        
        if (record.collectors) {
            return(
                record.collectors.map(collector => {
                    return <Collector collector={collector} key={collector.name} onSelect={onSelectCollector}/>
                })
            )
        }
               
    }

    const formatCheckbox = () => {
        let isChecked = false;

        for (let i = 0; i < collectorRecords.length; i++) {
            if (collectorRecords[i].name === record.name) {
                isChecked = true;
                break;
            }
        }

        return(
            <Form onSubmit={_handleSubmit}>
                <InlineInputContainer>
                    <Checkbox style={{minWidth: '20px', width: '5%', minHeight: '0vh'}} id={"box1"} name={"ownedRecord"} value={true}
                        checked={isChecked} label= {isChecked ? "In your Collection" : "Click to add to Collection"}/>
                    <Button>Submit</Button>
                </InlineInputContainer>
            </Form>
        )
    }

    const _handleSubmit = async () => {
        if (document.getElementById("box1").checked) {

            const postAttempt = await axios.post(`${apiHostURL}/api/discogs/saveDiscogsRecord`, record, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });



            const sendRecord = {
                id: postAttempt.data.id
            };

            try {
                const res  = await axios.post(`${apiHostURL}/api/collectors/record/add`, sendRecord, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        } else {

            try {
                const res = await axios.delete(`${apiHostURL}/api/collectors/delete/record/${record.id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        }

        navigate(`/collector/${auth.profile.username}`);
    }

    const onSelectCollector = (user) => {
        navigate(`/collector/${user.username}`)
    }

    const formatPage = () => {
        return(
            <Container>
                <div style={{
                            flex: 1,
                            flexDirection: 'column',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                    
                    <div style={{
                        flexDirection: 'row'
                    }}>
                        <h1>{record.name}</h1>
                    </div>


                </div>
                
                <h3>{record.releaseYear}</h3>

                <h3>Artist</h3>
                {
                    record.artist ?
                    <Artist artist={record.artist} key={record.artist.artistNameFormatted}/>
                    :
                    <p>Unknown Artist</p>
                }

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
                            {formatCheckbox()}
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

export default Test;