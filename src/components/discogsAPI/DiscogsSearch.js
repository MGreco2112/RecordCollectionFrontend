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


    //switch this to a called method for custom queries
    useEffect(async () => {

        if (auth.token) {
            try {
                const discogsSearch = await axios.get(`${apiHostURL}/api/discogs/searchRecords/Caress Of Steel`, {
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
    }, [auth])


    return(
        <Container>
            {loading ?
                <h1>DiscogsSearch</h1>
                :
                //Add selectable elements to save bulk to system
                searchResults.map(record => {
                    return <DiscogsRecord discogsRecord={record}/>
                })
            }
        </Container>
    )
}

export default DiscogsSearch;