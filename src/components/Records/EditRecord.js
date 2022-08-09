import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import Input from "../common/Input";
import { apiHostURL } from "../../config";
import { AuthContext } from "../Providers/AuthProvider";
import Container from "../common/Container";

const EditRecord = (props) => {
    const [auth] = useContext(AuthContext);

    const params = useParams();

    const [editRecord, setEditRecord] = useState({
        id: 0,
        name :"",
        nameFormatted: "",
        releaseYear: "",
        numberOfTracks: "",
        tracks: [],
        imageLink: ""
    });

    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(async () => {

        // setLoading(true);

        if (auth.token != undefined) {

            console.log(params);

            try {
                const res = await axios.get(`${apiHostURL}/api/records/${params.editRecord}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                
                console.log(res.data);
                setEditRecord(res.data);
                setLoading(false);
    
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }

        }

    }, [auth]);

    const handleChange = (e) => {
        setEditRecord({
            ...editRecord,
            [e.target.id]: e.target.value
        });
    }

    const onSubmit = () => {
        editRecord.nameFormatted = editRecord.name.replaceAll(" ", "_");

        const tracksFormatted = trackNames.toString().split(",");

        for (let i = 0; i < tracksFormatted.length; i++) {
            if (tracksFormatted[i] != editRecord.tracks[i].title) {
                editRecord.tracks[i].title = tracksFormatted[i]
            }
        }

        _putRecord(editRecord);
    }

    const _putRecord = async (editRecord) => {
        try {
            const res = await axios.put(`${apiHostURL}/api/records/${editRecord.id}`, editRecord, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            navigate(`/records`);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    return(
        <Container>
            <h1>Edit A Record Listing</h1>
            { loading ?
                <h2>Loading...</h2>
                :
                <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                    <InlineInputContainer>
                        <Input
                            name="name"
                            id="name"
                            value={editRecord.name}
                            onChange={handleChange}
                            label={"Record Name"}
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="releaseYear"
                            id="releaseYear"
                            value={editRecord.releaseYear}
                            onChange={handleChange}
                            label={"Release Year"}
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="numberOfTracks"
                            id="numberOfTracks"
                            value={editRecord.numberOfTracks}
                            onChange={handleChange}
                            label={"Number Of Tracks"}
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="tracks"
                            id="tracks"
                            value={editRecord.tracks}
                            onChange={handleChange}
                            label={"Track Listing"}
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="imageLink"
                            id="imageLink"
                            value={editRecord.imageLink}
                            onChange={handleChange}
                            label={"Link to Image"}
                            required
                        />
                    </InlineInputContainer>
                    <Button>Submit</Button>
                </Form>

                /**
                Create new Form below for editing Tracks
                Each Track field will have a spot for an ID and a Title
                IDs will range from 1 - X where X is number of tracks; this is for sorting to backend, not for database
                Editing the Title will modify the Object Title field
                Each Track field will have a button to insert a new Track between it and the next Track
                    This will auto increment the IDs of each track below
                OnSubmit the Track Objects will be placed into an Array and sent to Backend via Put for processing 
                
                 */
            }
        </Container>
    )
}

export default EditRecord;