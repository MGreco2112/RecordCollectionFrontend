import React, { useContext, useEffect, useState} from "react";
import axios from "axios";
import Artist from "./Artist";
import Container from "../common/Container";
import { apiHostURL } from "../../config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Artists = (props) => {
    const [auth] = useContext(AuthContext);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const _getArtists = async () => {
            try {
                const res = await axios.get(`${apiHostURL}/api/records/artists`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setLoading(false);
                setArtists(res.data);

            } catch (err) {
                console.error(err.response ? err.response.message : err.message);
            }
        }
        setLoading(true);
        _getArtists();
    }, [])

    const displayArtists = () => {
        return artists.map(artist => 
            <Artist artist={artist} key={artist.id} onSelect={onSelect}/>);
    }

    const onSelect = (nameFormatted) => {
        console.log(nameFormatted);
        navigate(`/artists/${nameFormatted}`);
    }

    return(
        <Container>
            <h1>Artists</h1>
            {loading ?
                <p>LOADING...</p>
                :
                displayArtists()
            }
        </Container>
    )
}

export default Artists;