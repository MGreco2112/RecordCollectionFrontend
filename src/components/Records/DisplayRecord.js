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
import Form from "../common/Form";
import Collector from "../Collector/Collector";
import Checkbox from "../common/Checkbox";
import InlineInputContainer from "../common/InlineInputContainer";

const DisplayRecord = (props) => {

    const params = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState({
        nameFormatted: params.nameFormatted,
    });

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    const [collectorRecords, setCollectorRecords] = useState([]);

    useEffect(() => {
        const _fetchRecord = async () => {

            const res = await axios.get(`${apiHostURL}/api/records/release/${record.nameFormatted}`, {
                headers : {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const collectorRecords = await axios.get(`${apiHostURL}/api/collectors/currentCollector`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            console.log(collectorRecords.data.records);
            setCollectorRecords(collectorRecords.data.records);
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
                return <Collector collector={collector} key={collector.name} onSelect={onSelectCollector}/>
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
                    <Checkbox id={"box1"} name={"ownedRecord"} value={true}
                        checked={isChecked} label={"In your Collection"}/>
                    <Button>Submit</Button>
                </InlineInputContainer>
            </Form>
        )
    }

    const _handleSubmit = async () => {
        if (document.getElementById("box1").checked) {

            const sendRecord = {
                id: record.id
            };

            console.log("was checked when submitted");
            console.log(`Auth Token: ${auth.token}`);
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
            console.log("wasn't cheched when submitted");
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

export default DisplayRecord;