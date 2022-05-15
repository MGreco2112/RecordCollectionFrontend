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

    return(
        <h1>EditCollector</h1>
    )
}

export default EditCollector;