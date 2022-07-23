import React, {useState, useContext} from "react";
import axios from "axios";
import Container from "../common/Container";
import Form from "../common/Form";
import Input from "../common/Input";
import { apiHostURL } from "../../config";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";

const NewRecord = (props) => {

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const [newRecord, setNewRecord] = useState({
        name: "",
        artistName: "",
        nameFormatted: "",
        releaseYear: "",
        numberOfTracks: "",
        unformattedTracks: [],
        tracks: [],
        imageLink: ""
    });

    const handleChange = (e) => {
        setNewRecord({
            ...newRecord,
            [e.target.id]: e.target.value
        });
    };

    const onSubmit = () => {
        newRecord.nameFormatted = newRecord.name.replaceAll(" ", "_")
                                                .replace("\"", "")
                                                .replace("\'", "");

        newRecord.tracks = newRecord.unformattedTracks.split(":");
        
        _postRecord(newRecord);
    }

    const _postRecord = async (data) => {
        /*
        post record to backend
        Checks if Artist exists by name formatted in backend
            if so exit conditional

            else
            post Artist to backend
            
        add Artist to Record
        Navigate to Record page
        */
        try {
            const res = await axios.post(`${apiHostURL}/api/records`, data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const artistCheck = await axios.get(`${apiHostURL}/api/records/artistExists/${data.artistName}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (artistCheck.data.length == 0) {
                navigate(`/newArtist/${res.data.id}`)
            } else {
                const postBody = {
                    recordId: res.data.id,
                    artistId: artistCheck.data[0].id
                }

                const artistAdd = await axios.post(`${apiHostURL}/api/records/artistAdd`, postBody, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                navigate(`/records/${res.data.nameFormatted}`);
            }



            
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    return(
        <Container>
            <h1>Submit A New Record</h1>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="name"
                        id="name"
                        value={newRecord.name}
                        placeholder="Record Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="releaseYear"
                        id="releaseYear"
                        value={newRecord.releaseYear}
                        placeholder="Year Of Release"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="artistName"
                        id="artistName"
                        value={newRecord.artistName}
                        placeholder="Name Of Artist"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="numberOfTracks"
                        id="numberOfTracks"
                        value={newRecord.numberOfTracks}
                        placeholder="Number of Tracks"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="tracks"
                        id="unformattedTracks"
                        value={newRecord.unformattedTracks}
                        placeholder="Enter Tracks separated by Colon"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="imageLink"
                        id="imageLink"
                        value={newRecord.imageLink}
                        placeholder="Link To Record Art"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                </InlineInputContainer>
                    <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default NewRecord;