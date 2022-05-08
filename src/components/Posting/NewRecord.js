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
        nameFormatted: "",
        releaseYear: "",
        numberOfTracks: "",
        tracks: [],
        imageLink: ""
    });

    const handleChange = (e) => {
        setNewRecord({
            ...newRecord,
            [e.target.id]: e.target.value
        });
    };

    const handleTracks = (e) => {
        const tracksFormatted = e.target.value.split(",");

        setNewRecord({
            ...newRecord,
            [e.target.id]: tracksFormatted
        });
    };

    const onSubmit = () => {
        newRecord.nameFormatted = newRecord.name.replaceAll(" ", "_");
        
        console.log(newRecord);

        postRecord(newRecord);
    }

    const postRecord = async (data) => {
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
            // const res = await axios.post(`${apiHostURL}/api/records`, data, {
            //     headers: {
            //         Authorization: `Bearer ${auth.token}`
            //     }
            // });

            // navigate(`/records/${res.data.nameFormatted}`);
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
                        id="tracks"
                        value={newRecord.tracks}
                        placeholder="Enter Tracks separated by Comma"
                        onChange={handleTracks}
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