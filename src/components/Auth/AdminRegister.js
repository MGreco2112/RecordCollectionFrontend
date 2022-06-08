import React, {useState} from "react";
import axios from "axios";
import Container from "../common/Container";
import AdminRegisterForm from "./AdminRegisterForm";
import Splash from "../common/Splash";
import SignUp from "../../assets/loginsignup.jpg";
import { useNavigate } from "react-router-dom";
import { apiHostURL, consumerKey, consumerSecret, requestTokenURL, authorizeURL, accessTokenURL, callbackURL } from "../../config";

const AdminRegister = () => {

    const navigate = useNavigate();

    const [newAdmin, setNewAdmin] = useState({
        username: "",
        password: "",
        roles: ["user", "admin"],
        fName: "",
        lName: "",
        discogsToken: ""
    });

    const updateForm = (field, value) => {
        setNewAdmin({
            ...newAdmin,
            [field]: value
        });
    }

    const onSubmit = () => {
        const data = newAdmin;
        data.name = `${data.fName} ${data.lName}`;

        _createAdmin(data);
    }

    const _createAdmin = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signup`, data);

            console.log(res.data);

            _login(data);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const _login = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signin`, data);

            console.log(res.data);

            _createCollector(data, res.data.token);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const _createCollector = async (data, token) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/collectors`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data);

            const discogsTokenRequest = await axios.get(`${apiHostURL}/api/auth/discogsTokenRequest`);

            console.log(discogsTokenRequest.data);

            const formattedTokenResponse = discogsTokenRequest.data.response.split("&");

            const accessToken = formattedTokenResponse[0];

            const tokenSecret = formattedTokenResponse[1];

            // console.log(authorizeURL + `?${accessToken}`);




            window.location.replace(authorizeURL + `?${accessToken}`);

            // const discogsAccessToken = await axios.post(accessTokenURL, {
            //     headers: {
            //         oauth_consumer_key: consumerKey,
            //         oauth_nonce: new Date().getTime(),
            //         oauth_token: accessToken,
            //         oauth_signature: `${consumerSecret}&`,
            //         oauth_signature_method: "PLAINTEXT",
            //         oauth_timestamp: new Date().getTime(),
            //         oauth_callback: callbackURL,
            //         oauthVerifier: tokenVerifier
            //     }
            // }, {
            //     "User_Agent": "Axios 0.26.1"
            // });

            // const discogsCreds = {
            //     discogsToken: discogsAccessToken.data.oauth_token,
            //     discogsSecret: discogsAccessToken.data.oauth_token_secret
            // }

            // const updateUser = await axios.put(`${apiHostURL}/api/collectors/user`, discogsCreds, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }


    return(
        <Container>
            <Splash
            image={SignUp}
            style={{
                height: "20vh",
                color: "#F1F1F1"
            }}
            >
                <h1>Welcome to the Admin Team!</h1>   
            </Splash>
            <AdminRegisterForm
                newAdmin={newAdmin}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default AdminRegister;