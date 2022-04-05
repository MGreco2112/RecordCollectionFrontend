import React, {useState, useEffect, useContext, Fragment} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {AuthContext} from "../Providers/AuthProvider"
import Button from "../common/Button"
import Spinner from "../faCommon/Spinner"
import {apiHostURL} from "../../config"

const DisplayRecord = (props) => {

    const params = useParams();
    const [record, setRecord] = useState({
        id: params.recordId,
    });

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchRecord = async () => {
                const res = await axios.get(`${apiHostURL}/api/records/${record.id}`, {
                    headers : {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            console.log("Record" + "\n" + res.data);
            setRecord(res.data);
            setLoading(false);

        }

        setLoading(true);
        _fetchRecord();

    }, [])



    return (
        <h1>Display Records</h1>
    )
}

export default DisplayRecord;