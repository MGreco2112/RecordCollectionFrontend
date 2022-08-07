import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";
import axios from "axios";
import Container from "../common/Container";
import Form from "../common/Form";
import Button from "../common/Button";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";

const EditArtist = (props) => {
    const [auth] = useContext(AuthContext);

    const params = useParams();

    const navigate = useNavigate();

    const [editArtist, setEditArtist] = useState({
        artistName: "",
        artistNameFormatted: "",
        members: []
    });

    const [membersArray, setMembersArray] = useState([]);

    let loading = true;

    useEffect(async () => {
        if (auth.token != undefined) {

            try {


                const res = await axios.get(`${apiHostURL}/api/records/artistToEdit/${params.editArtist}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                
                const namesArr = [];
                
                for (let i = 0; i < res.data.members.length; i++) {
                    namesArr.push(res.data.members[i].name);
                }
                
                setEditArtist(res.data);
                setMembersArray(namesArr);
                console.log(res.data);
                loading = false;

            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
    }, [auth]);

    const handleChange = (e) => {
        setEditArtist({
            ...editArtist,
            [e.target.id]: e.target.value
        });
    };

    const onSubmit = () => {
        editArtist.artistNameFormatted = editArtist.artistName.replaceAll(" ", "_");

        const membersFormatted = namesArr.toString().split(",");

        editArtist.members = membersFormatted;

        _putArtist(editArtist);
    };

    const _putArtist = async (editArtist) => {

        console.log(editArtist);

        try {
            const res = await axios.put(`${apiHostURL}/api/records/artist/${editArtist.id}`, editArtist, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            navigate(`/artists/${editArtist.artistNameFormatted}`);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }


    return(
        <Container>
            <h1>Edit Artist Listing</h1>
            {loading ? 
                <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                    <InlineInputContainer>
                        <Input
                            name="artistName"
                            id="artistName"
                            value={editArtist.artistName}
                            onChange={handleChange}
                            label="Artist Name"
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="members"
                            id="members"
                            value={namesArr}
                            onChange={handleChange}
                            label="Members"
                            required
                        />
                    </InlineInputContainer>
                    <Button>Submit</Button>
                </Form>
                :
                <h2>Loading...</h2>
            }
        </Container>
    )
}

export default EditArtist;