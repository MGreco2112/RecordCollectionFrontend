import React, {useEffect, useState, useContext} from "react";
import Container from "../common/Container";
import VerifyLoginForm from "./VerifyLoginForm"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const VerifyLogin = () => {
    /**
     * Have user input old login credentials
     * send old login to backend with new user object fields
     * if old login is valid
     *      update user with new details
     *      login user with new credentials via backend
     *      return new user details and JWT to React
     *      navigate Home
     * else
     *      Alert that credentaials have not been updated
     */

    const [loginCreds, setLoginCreds] = useState({
        username: "",
        password: ""
    });

    const [auth, setAuth, saveAuth] = useContext(AuthContext);

    const navigate = useNavigate();

    const updateForm = (field, value) => {
        setLoginCreds({
            ...loginCreds,
            [field]: value
        });
    }

    const onSubmit = () => {
        _verifyLogin(loginCreds);
    }

    const _verifyLogin = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signin`, data);

            setAuth({
                token: res.data.token,
                profile: {
                    id: res.data.id,
                    username: res.data.username
                },
                roles: res.data.roles
            });

            saveAuth(res.data);
            
            navigate("/");

        } catch (err) {
            console.error(err.message ? err.message : err.response);
            alert("Incorrect Username or Password, try again");
        }
    }

    return(
        <Container>
            <h1>Verify Changes</h1>
            <VerifyLoginForm
                userRequest={loginCreds}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        </Container>
    );
}

export default VerifyLogin;