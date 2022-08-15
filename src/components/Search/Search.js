import React, {useState, useContext, useEffect, Fragment} from "react";
import axios from "axios";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";
import Radio from "../common/Radio";
import Container from "../common/Container";
import Record from "../Records/Record";
import Artist from "../Artist/Artist";
import InlineInputContainer from "../common/InlineInputContainer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";



const Search = (props) => {
    const [queryResult, setQueryResult] = useState([]);

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    const [searchQueryUrl, setSearchQueryUrl] = useState({
        query: "",
        searchMode: 0,
    });

    const navigate = useNavigate();

    const _searchByQuery = async () => {
            console.log(searchQueryUrl.searchMode);
        try {
            let searchUrl = "";

            switch (searchQueryUrl.searchMode) {
                case "0":
                    
                    searchUrl = `${apiHostURL}/api/records/search/artist_name/${searchQueryUrl.query}`
                    break;
                default:
                    console.log(true);
                    searchUrl = `${apiHostURL}/api/records/search/name/${searchQueryUrl.query}`
            }

            const res = await axios.get(searchUrl, {
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

    const handleSubmit = (e) => {
        const checkedButtons = document.getElementsByName('routeSel');

        for (let i = 0; i < checkedButtons.length; i++) {
            if (checkedButtons[i].checked) {
                _searchByQuery();
            }
        }

    }

    const onClick = () => {
        const checkedButtons = document.getElementsByName('routeSel');
        console.log(checkedButtons);
        for (let i = 0; i < checkedButtons.length; i++) {
            if (checkedButtons[i].checked) {
                setLoading(true);
                console.log(checkedButtons[i].value + " checked Button check");
                setSearchQueryUrl({
                                    ...searchQueryUrl,
                                    searchMode: checkedButtons[i].value,
                                }
                            )
                return;
            }
        }
    }

    const displayResults = (queryResult) => {

        if (searchQueryUrl.searchMode == 1) {
            return queryResult.map(record => {
                return <Record record={record} key={record.id} onSelect={onSelect}/>
            })
        } else if (searchQueryUrl.searchMode == 0) {
            return queryResult.map(artist => {
                return <Artist artist={artist} key={artist.id} onSelect={onSelect}/>
            })
        }
    }

    const onSelect = (navigateToNameFormatted) => {
        if (searchQueryUrl.searchMode == 1) {
            navigate(`/records/${navigateToNameFormatted}`);
        } else if (searchQueryUrl.searchMode == 0) {
            navigate(`/artists/${navigateToNameFormatted}`);
        }
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                    <InlineInputContainer>
                        <Input
                            id="query"
                            placeholder="Enter a Search Query"
                            onChange={e => setSearchQueryUrl({
                                                                ...searchQueryUrl,
                                                                query: e.target.value
                                                            }
                                                        )}
                            value={searchQueryUrl.query}
                        />
                        <Button>Search</Button>
                        <Radio id="Artist" name="routeSel" value={0} label={"Search By Artist"} onClick={onClick}/>
                        <Radio id="Record" name="routeSel" value={1} label={"Search By Record"} onClick={onClick}/>
                    </InlineInputContainer>
                   
                </Form>
            {loading ?
                <Fragment/>
                :
                displayResults(queryResult)
            }
        </Container>
    )
}

export default Search;