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
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const DiscogsSearch = () => {

    const [auth] = useContext(AuthContext);

    const [searchResults, setSearchResults] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();


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

    const onSelect = async (resource_url) => {
        const request = {
            discogsPath: resource_url
        }

        localStorage.setItem("Record", JSON.stringify(request));

        navigate(`/displayDiscogs`);


        
    }

    const onClick = async () => {
        try {
            const convertedRecords = await axios.post(`${apiHostURL}/api/discogs/convertBulkRecords`, searchResults, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            // console.log(convertedRecords.data);

            const saveRecords = await axios.post(`${apiHostURL}/api/records/bulkAddRecords_Artists`, convertedRecords.data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            navigate("/records");
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
                <Container>
                    {searchResults.map(record => {
                        return <DiscogsRecord discogsRecord={record} onSelect={onSelect}/>
                    })}
    
                    <Button onClick={onClick}>Save All</Button>

                </Container>
            }
        </Container>
    )
}

export default DiscogsSearch;