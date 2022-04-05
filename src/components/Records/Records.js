import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Spinner from "../faCommon/Spinner";
import axios from "axios";
import Record from "./Record";
import Container from "../common/Container"
import { apiHostURL } from "../../config";
import { useNavigate } from "react-router-dom";

const Records = (props) => {
    const [auth] = useContext(AuthContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const _getRecords = async () => {
            try {
                const res = await axios.get(`${apiHostURL}/api/records`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setLoading(false);
                setRecords(res.data);

            } catch (err) {
                console.error(err.response.message);
            }
        }
        setLoading(true);
        _getRecords();
    }, [])

    const displayRecords = () => {
        return records.map(rec => <Record record={rec} key={rec.id} onSelect={onSelect}/>);
    }

    const onSelect = (recId) => {
        navigate(`/records/${recId}`);
    }

    return (
        <Container>
            <h1>Records</h1>
            { loading ?
                <Spinner/>
                :
                displayRecords()
            }
        </Container>
        
    )
}

export default Records;