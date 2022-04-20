import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import Record from "./Record";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";
import InlineInputContainer from "../common/InlineInputContainer";
import { apiHostURL } from "../../config";
import Container from "../common/Container";
import { AuthContext } from "../Providers/AuthProvider";


const SearchRecords = (props) => {

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const _fetchRecordsByQuery = async (query) => {
        try {
            const res = await axios.get(`${apiHostURL}/api/records/search/name/${query}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            console.log(res.data);
            setRecords(res.data);
            setLoading(false);
        } catch (e) {
            console.error(e.message);
        }
    }

    const handleSubmit = (e) => {
        setQuery(query);
        _fetchRecordsByQuery(query);
    }

    const displayRecords = (records) => {
        return records.map(record => {
            return <Record record={record} key={record.id} onSelect={onSelect}/>
        })
    }

    const onSelect = (recordNameFormatted) => {
        navigate(`/records/${recordNameFormatted}`);
    }

    const formatPage = () => {
        if (records.length !== 0) {
            return displayRecords(records);
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
                            placeholder="Enter Album Name"
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

export default SearchRecords;