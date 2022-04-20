import React, {useState, useContext} from "react";
import axios from "axios";
import Artist from "./Artist";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { apiHostURL } from "../../config";
import { AuthContext } from "../Providers/AuthProvider";

const SearchArtists = (props) => {
    const [artists, setArtists] = useState([]);

    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const _fetchArtistsByQuery = async (query) => {
        try {
            const res = await axios.get(`${apiHostURL}/api/records/search/artist_name/${query}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            console.log(res.data);
            setArtists(res.data);
            setLoading(false);
        } catch (e) {
            console.error(e.message);
        }
    }

    const handleSubmit = (e) => {
        setQuery(query);
        _fetchArtistsByQuery(query);
    }

    const displayArtists = (artists) => {
        return artists.map(artist => {
            return <Artist artist={artist} key={artist.artistNameFormatted} onSelect={onSelect}/>
        })
    }

    const onSelect = (artistNameFormatted) => {
        navigate(`/artists/${artistNameFormatted}`);
    }
    
    const formatPage = () => {
        if (artists.length !== 0) {
            return displayArtists(artists);
        } else {
            setLoading(true);
        }
    }

    return(
        <Container>
            {loading ?
                <Form onSubmit={handleSubmit}>
                    <InlineInputContainer>
                        <Input
                            id="query"
                            placeholder="Enter Artist Name"
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                        />
                        <Button>Search</Button>
                    </InlineInputContainer>
                </Form>
                :
                formatPage()
            }
        </Container>
    )
}

export default SearchArtists;