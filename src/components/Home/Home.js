import React, {useContext, useEffect} from "react";
import Container from '../common/Container';
import Splash from '../common/Splash';
import BackgroundImage from '../../assets/homeImage.jpg';
import { AuthContext } from "../Providers/AuthProvider";

const Home = (props) => {

    const [auth, setAuth, saveAuth] = useContext(AuthContext);

    // useEffect(() => {
    //     if (auth.token != null) {
    //         if (localStorage['Token'] != undefined) {
                
    //             localStorage.removeItem('Token');
    //             localStorage.removeItem('Profile');
    //             localStorage.removeItem('Roles');
                
    //         }

    //         localStorage.setItem('Token', JSON.stringify(auth.token));
    //         localStorage.setItem('Profile', JSON.stringify({"id": auth.profile.id,
    //             "username": auth.profile.username}));
    //         localStorage.setItem('Roles', JSON.stringify(auth.roles));
        
    //     } else if (localStorage['Token'] != undefined){

    //         setAuth({
    //             token: JSON.parse(localStorage['Token']),
    //             profile: {
    //                 id: JSON.parse(localStorage['Profile']).id,
    //                 username: JSON.parse(localStorage['Profile']).username  
    //             },
    //             roles: JSON.parse(localStorage['Roles'])
    //         });
    //     }
    // }, []);


      return (
        <Container style={{
            color: "#F1F1F1",
            }}
            >
            <Splash image={BackgroundImage}>

                <h1>Welcome to The Vinyl Hub</h1>
                <h2>Connecting Vinyl Enthusiasts since 2022</h2>
            </Splash>
        </Container>
    )
}

export default Home;