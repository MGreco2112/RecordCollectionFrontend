import React, {useEffect, useState, useContext} from "react";
import Container from "../common/Container";
import VerifyLoginForm from "./VerifyLoginForm"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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

    const location = useLocation();

    const [loginCreds, setLoginCreds] = useState({
        username: "",
        password: ""
    });

    const [editCollector] = useState(location.state.collector);
    const [editUser] = useState(location.state.user);

    console.log(editCollector);
    console.log(editUser);

    const [auth, setAuth, saveAuth] = useContext(AuthContext);

    const navigate = useNavigate();

    const updateForm = (field, value) => {
        setLoginCreds({
            ...loginCreds,
            [field]: value
        });
    }

    const onSubmit = () => {
        // const login = _verifyLogin(loginCreds);

        // if (login.data) {
            _updateCollector(editCollector);
        // }
    }

    const _verifyLogin = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signin`, data);

            return res;
        } catch (err) {
            console.error(err.message ? err.message : err.response);
            alert("Incorrect Username or Password, try again");
        }
    }

    const _updateCollector = async (updates) => {
        try {
            const res = await axios.put(`${apiHostURL}/api/collectors`, updates, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            _updateUser(editUser);
            
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const _updateUser = async (updates) => {
        try {
            const res = await axios.put(`${apiHostURL}/api/collectors/user`, updates, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            _loginNewUser(editUser);

        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const _loginNewUser = async (postUpdateUser) => {
        console.log(true);
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signin`, postUpdateUser);

            setAuth(res.data);

            saveAuth(res.data);

            navigate("/");
        } catch (err) {
            console.error(err.message ? err.message : err.response);
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