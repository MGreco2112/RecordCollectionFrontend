import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";
import Radio from "../common/Radio";
import InlineInputContainer from "../common/InlineInputContainer";
import Container from "../common/Container";
import DiscogsRecord from "../discogsAPI/DiscogsRecord";
import Artist from "../Artist/Artist";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const DiscogsSearch = () => {

    const [auth] = useContext(AuthContext);

    const [searchResults, setSearchResults] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");


    //switch this to a called method for custom queries
    // useEffect(async () => {

    //     if (auth.token) {
    //         try {
    //             const discogsSearch = await axios.get(`${apiHostURL}/api/discogs/searchRecords/Caress Of Steel`, {
    //                 headers: {
    //                     Authorization: `Bearer ${auth.token}`
    //                 }
    //             });
    
    //             setSearchResults(discogsSearch.data);
    //             setLoading(false);
    
    //         } catch (err) {
    //             console.error(err.message ? err.message : err.response);
    //         }
    //     }
    // }, [auth]);

    const _searchByQuery = async (searchQuery) => {
        if (auth.token) {
            console.log(true);
            try {
                const discogsSearch = await axios.get(`${apiHostURL}/api/discogs/searchRecords/${searchQuery}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
    
                setSearchResults(discogsSearch.data);
                setLoading(false);
    
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
    }

    const handleSubmit = () => {
        _searchByQuery(searchQuery);
    }

    const onSelect = async (url) => {
        const request = {
            path: url
        }

        try {
            const formattedRecord = await axios.get(`${apiHostURL}/api/discogs/formatRecord`, request, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });


        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }


    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <InlineInputContainer>
                    <Input
                        id="query"
                        placeholder="Enter a Record Title to search"
                        onChange={e => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <Button>Search</Button>
                </InlineInputContainer>
            </Form>
            {loading ?
                <InlineInputContainer/>
                :
                searchResults.map(record => {
                    return <DiscogsRecord discogsRecord={record}/>
                })
            }
        </Container>
    )
}

export default DiscogsSearch;