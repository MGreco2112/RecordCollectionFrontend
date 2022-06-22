import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const Test = () => {
    const [record, setRecord] = useState({});

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchDiscogsRecord = async () => {
            try {
                const res = await axios.get(`${apiHostURL}/api/discogs/frontendTest`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                console.log(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
        setLoading(true);

        if (auth.token) {
            _fetchDiscogsRecord();
        }
    }, [auth])




    return(
        <h1>Test</h1>
    )
}

export default Test;