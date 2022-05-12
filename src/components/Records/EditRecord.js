import React, {useState, useEffect, useContext} from "react";
import { Params } from "react-router-dom";
import axios from "axios";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import Input from "../common/Input";
import { apiHostURL } from "../../config";
import { AuthContext } from "../Providers/AuthProvider";

const EditRecord = (props) => {
    const [auth] = useContext(AuthContext);

    const [editRecord, setEditRecord] = useState({});

    useEffect(() => {
        try {
            const res = axios.get(`${apiHostURL}/api/records/${params.recordId}`, {
                headers: {
                    Autorization: `Bearer ${auth.token}`
                }
            });
            
            setEditRecord(res.data);

        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    });

    const onSelect = (e) => {
        setEditRecord({
            ...editRecord,
            [e.target.id]: e.target.value
        });
    }

    const onSubmit = () => {
        
    }

    return(
        <h1>EditRecord</h1>
    )
}

export default EditRecord;