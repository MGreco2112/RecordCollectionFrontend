import React, {useState} from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import Container from "../common/Container";
import Splash from "../common/Splash";
import Login from "../../assets/loginsignup.jpg"
import { useNavigate } from "react-router-dom";
import apiHostURL from "../../config";

const Login = (props) => {

    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: "",

    });

    const navigate = useNavigate();

    //todo authcontext

    const updateForm = (field, value) => {
        setCurrentUser({
            ...currentUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        const data = currentUser;

        _loginUser(data);
    }

    const _loginUser = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signin`, data);

            //todo set auth

            navigate("/")
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <h1>Login</h1>
    )
}

export default Login;