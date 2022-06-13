import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import LoginForm from "./LoginForm";
import Container from "../common/Container";
import Splash from "../common/Splash";
import LoginImg from "../../assets/loginsignup.jpg"
import { useNavigate , useSearchParams} from "react-router-dom";
import {apiHostURL} from "../../config";

const Login = (props) => {

    const [searchParams] = useSearchParams();

    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: "",

    });

    const [discogsCreds, setDiscogsCreds] = useState({
        token: "",
        secret: ""
    });

    const navigate = useNavigate();

    const [auth, setAuth, saveAuth] = useContext(AuthContext);

    useEffect(() => {
        const loadCreds = () => {
            setDiscogsCreds({
                token: searchParams.get("oauth_token"),
                secret: searchParams.get("oauth_verifier")
            });
        }

        if (searchParams.get("oauth_token")) {
            loadCreds();
        }
    }, [searchParams])

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
        console.log(data);

        try {
            
            const res = await axios.post(`${apiHostURL}/api/auth/signin`, data);

            setAuth({
                token: res.data.token,
                profile: {
                    id: res.data.id,
                    username: res.data.username
                },
                roles: res.data.roles,

            });

            saveAuth(res.data);
            

            const authorizeToken = await axios.post(`${apiHostURL}/api/auth/discogsAccessToken`, discogsCreds);

            console.log(authorizeToken.data);

            const formattedAuthorizeToken = authorizeToken.data.response.split("&");

            const authorizeCreds = {
                discogsToken: formattedAuthorizeToken[0],
                discogsSecret: formattedAuthorizeToken[1]
            };

            if (discogsCreds.discogsToken != "") {
                const updateUser = await axios.put(`${apiHostURL}/api/collectors/user`, formattedAuthorizeToken, {
                    headers: {
                        Authorization: `Bearer ${res.data.token}`
                    }
                });
            }

            navigate("/");
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    }

    return (
        <Container>
            <Splash
            image={LoginImg}
            style={{
                height: "20vh",
                color: "#F1F1F1"
            }}
            >
                <h1>Login</h1>
            </Splash>
            <LoginForm
                currentUser={currentUser}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default Login;