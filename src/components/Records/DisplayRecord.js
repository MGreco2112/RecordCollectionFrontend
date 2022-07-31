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

const DisplayRecord = (props) => {

    const params = useParams();
    const navigate = useNavigate();

    let postableComment = true;

    const [record, setRecord] = useState({
        nameFormatted: params.nameFormatted,
    });

    const [newComment, setNewComment] = useState({
        userComment: ""
    });

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    const [collectorRecords, setCollectorRecords] = useState([]);

    const [collector, setCollector] = useState({});

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
            setCollector(collectorRecords.data);
            setRecord(res.data);
            setLoading(false);

        }

        setLoading(true);
        _fetchRecord();
        console.log(record);
    }, [auth]);

    const _postComment = async (newComment) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/collectors/comment`, newComment, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            navigate(`/collector/${auth.profile.username}`)
        } catch (err) {
            console.error(err.message);
        }
    }

    const formatTracks = () => {
        return(
            
            record.tracks.map(track => {
                return <p>{track}</p>
            })
        )
    }

    const onChange = (field, value) => {
        setNewComment({
            ...newComment,
            [field]: value
        });
    }

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const onSubmit = () => {
        const data = newComment;

        data.record = {
            name: record.name
        };

        _postComment(data);
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
                if (comment.collector.nameFormatted === collector.nameFormatted) {
                    postableComment = false;
                }
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
                    <Checkbox style={{minWidth: '20px', width: '5%', minHeight: '0vh'}} id={"box1"} name={"ownedRecord"} value={true}
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

    const onSelect = () => {
        navigate(`/artists/${record.artist.artistNameFormatted}`);
    }

    const onSelectCollector = (user) => {
        navigate(`/collector/${user.username}`)
    }

    const onClick = async () => {

        const data = {
            "record": {
                "id": record.id
            }
        };

        try {
            const res = await axios.delete(`http://localhost:8080/api/collectors/delete/comment/${record.id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                },

            });

            navigate(`/collector/${auth.profile.username}`);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const gotoEdit = () => {
        navigate(`/records/editRecord/${record.id}`);
    }

    const deleteRecord = () => {
        navigate(`/records/delete/${record.id}`);
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

                    {auth.roles.includes("ROLE_ADMIN") ?
                        <Button onClick={gotoEdit}>Edit</Button>
                        :
                        <div/>
                    }
                    

                </div>
                
                <h3>{record.releaseYear}</h3>

                <h3>Artist</h3>
                {
                    record.artist ?
                    <Artist artist={record.artist} key={record.artist.artistNameFormatted} onSelect={onSelect}/>
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
                            <h3>User Comments:</h3>
                            {formatComments()}
                        </div>
                        <div style={{flexDirection: 'column', alignItems: 'center'}}>
                            {formatCheckbox()}
                        </div>
                    </div>
                
                    { postableComment ?

                            <Container>
                            <h2>Post A Comment</h2>
                            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                                <InlineInputContainer>
                                    <Input
                                        name="userComment"
                                        id="userComment"
                                        value={newComment.userComment}
                                        placeholder={"Write New Comment Here"}
                                        onChange={handleChange}
                                        required
                                    />
                                </InlineInputContainer>
                                <Button>Submit</Button>
                            </Form>
                        </Container>

                        :

                        <Container>
                            <Button onClick={onClick}>Delete Comment</Button>
                        </Container>
                    }

                    {auth.roles.includes("ROLE_ADMIN") ?
                        <Button onClick={deleteRecord}>Delete Record</Button>
                        :
                        <div/>
                    }
                            
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