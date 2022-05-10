import React, {useState, useContext} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";
import Button from "../common/Button";
import Container from "../common/Container";


const NewArtist = (props) => {
    const [artist, setArtist] = useState({
        artistName: "",
        artistNameFormatted: "",
        membersUnformatted: "",
        members: []
    });

    const navigate = useNavigate();

    const params = useParams();

    const [auth] = useContext(AuthContext);

    const handleChange = (e) => {
        setArtist({
            ...artist,
            [e.target.id]: e.target.value
        });
    };


    const onSubmit = () => {
        artist.artistNameFormatted = artist.artistName.replaceAll(" ", "_");

        artist.members = artist.membersUnformatted.split(":");

        _postArtist(artist);
    }

    const _postArtist = async (newArtist) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/records/artist`, newArtist, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const postBody = {
                recordId: params.recordId,
                artistId: res.data.id
            };

            const artistAdd = await axios.post(`${apiHostURL}/api/records/artistAdd`, postBody, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            navigate(`/artists/${newArtist.artistNameFormatted}`);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }





    return(
        <Container>
            <h1>Submit A New Artist To Record</h1>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="artistName"
                        id="artistName"
                        value={artist.name}
                        placeholder="Artist Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="membersUnformatted"
                        id="membersUnformatted"
                        value={artist.membersUnformatted}
                        placeholder="Enter Members divided by a Colon"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default NewArtist;