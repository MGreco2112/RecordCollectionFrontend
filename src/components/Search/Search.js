import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import Button from "../common/Button";
import Form from "../common/Form";
import Select from "../common/Select";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import Container from "../common/Container";
import Record from "../Records/Record";
import Artist from "../Artist/Artist";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const Search = (props) => {
    const [queryResult, setQueryResult] = useState([]);

    const [searchMode, setSearchMode] = useState(0);

    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState('');

    const [searchModeUrl, setsearchModeUrl] = useState(`${apiHostURL}/api/records/search/name/${query}`);

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const _searchByQuery = async (query) => {

        if (searchMode === 0) {
            setsearchModeUrl(`${apiHostURL}/api/records/search/name/${query}`);
        } else if (searchMode === 1) {
            setsearchModeUrl(`${apiHostURL}/api/records/search/artist_name/${query}`);
        }

        try {
            const res = await axios.get(searchModeUrl, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            setQueryResult(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleSubmit = (e) => {
        setQuery(query);
        console.log(query);
        _searchByQuery(query);
    }

    const displayResults = (queryResult) => {
        if (searchMode === 0) {
            return queryResult.map(record => {
                return <Record record={record} key={record.id} onSelect={onSelect}/>
            })
        } else if (searchMode === 1) {
            return queryResult.map(artist => {
                return <Artist artist={artist} key={artist.id} onSelect={onSelect}/>
            })
        }
    }

    const onSelect = (navigateToNameFormatted) => {
        if (searchMode === 0) {
            navigate(`/records/${navigateToNameFormatted}`);
        } else if (searchMode === 1) {
            navigate(`/artists/${navigateToNameFormatted}`);
        }
    }

    const onChange = (value) => {
        setSearchMode(value);
    }

    return(
        <Container>
            {loading ?
                <Form onSubmit={handleSubmit}>
                    <InlineInputContainer>
                        <Input
                            id="query"
                            placeholder="Enter a Search Query"
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                        />
                        <Select 
                            onChange={onChange}
                        >
                            <option value={0}>Search By Record Name</option>
                            <option value={1}>Search By Artist Name</option>
                        </Select>
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Button>Search</Button>
                    </InlineInputContainer>
                </Form>
                :
                displayResults(queryResult)
            }
        </Container>
    )
}

export default Search;