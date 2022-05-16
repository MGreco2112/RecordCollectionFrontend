import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiHostURL } from "../../config";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import Container from "../common/Container";

const EditCollector = (props) => {

    const [auth] = useContext(AuthContext);

    const [editCollector, setEditCollector] = useState({
        name: ""
    });

    const [editUser, setEditUser] = useState({
        username: "",
        password: ""
    });

    let records = [];

    let comments = [];

    let loading = true;

    useEffect( async () => {
        if (auth.token) {

            try {
                const res = await axios.get(`${apiHostURL}/api/collectors/currentCollector`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setEditCollector({
                    name: res.data.name
                });

                records = res.data.records;

                comments = res.data.comments

                loading = false;
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
    }, [auth]);

    const handleCollectorChange = (e) => {
        setEditCollector({
            ...editCollector,
            [e.target.id]: e.target.value
        });
    };

    const handleUserChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.id]: e.target.value
        });
    };

    



    return(
        <h1>EditCollector</h1>
    )
}

export default EditCollector;