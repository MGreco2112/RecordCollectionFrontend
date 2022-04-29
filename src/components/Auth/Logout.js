import React, {useContext, useEffect} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Container from "../common/Container";
import BackgroundImage from '../../assets/homeImage.jpg';
import Splash from "../common/Splash";

const Logout = (props) => {

    const [auth, setAuth] = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        setAuth({
            token: null,
            profile: null,
            roles: []
        });
    
        localStorage.removeItem('Token');
        localStorage.removeItem('Profile')
        localStorage.removeItem('Roles');

        alert("You have successfully logged out");
    
        navigate('/');
    }, [])

    return(
        <Container  style={{
            color: "#F1F1F1",
            }}
        >
            <Splash image={BackgroundImage}/>
        </Container>
        
    )
}

export default Logout;