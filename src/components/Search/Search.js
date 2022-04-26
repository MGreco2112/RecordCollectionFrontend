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

    const [searchMode, setSearchMode] = useState(50000);

    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState('');

    const [searchModeUrl, setsearchModeUrl] = useState(0);

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const _searchByQuery = async () => {

        console.log(searchMode);
        console.log(searchModeUrl);

        try {
            const res = await axios.get(searchModeUrl, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            console.log(res.data);
            setQueryResult(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    const chooseSearchModeUrl = () => {
        console.log(searchMode);

        if (searchMode == 0) {
            console.log(query);
            setsearchModeUrl(`${apiHostURL}/api/records/search/name/${query}`);
        } else if (searchMode == 1) {
            setsearchModeUrl(`${apiHostURL}/api/records/search/artist_name/${query}`);
        }

        console.log(searchModeUrl);
    }

    const handleSubmit = (e) => {
        setQuery(query);
        // console.log(query);
        _searchByQuery();
    }

    const displayResults = (queryResult) => {

        // if (queryResult.length === 0) {
        //     return(
        //         <p>No results found, try again</p>
        //     )
        // }

        console.log(queryResult);

        if (searchMode == 1) {
            return queryResult.map(record => {
                return <Record record={record} key={record.id} onSelect={onSelect}/>
            })
        } else if (searchMode == 0) {
            return queryResult.map(artist => {
                return <Artist artist={artist} key={artist.id} onSelect={onSelect}/>
            })
        }
    }

    const onSelect = (navigateToNameFormatted) => {
        if (searchMode == 1) {
            navigate(`/records/${navigateToNameFormatted}`);
        } else if (searchMode == 0) {
            navigate(`/artists/${navigateToNameFormatted}`);
        }
    }

    const onChange = () => {
        setSearchMode(document.getElementById('selectQuery').value);
        chooseSearchModeUrl();
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
                        {/* Switch Select to Radio Button React Element */}
                        <Select 
                            id={'selectQuery'}
                            onChange={onChange}
                            // placeholder={document.getElementById('defaultOption')}
                        >
                            <option value={50000} id="defaultOption">Choose A Mode</option>
                            <option value={0}>Search By Artist Name</option>
                            <option value={1}>Search By Record Name</option>
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