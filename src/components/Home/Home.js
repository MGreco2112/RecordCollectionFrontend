import React from "react";
import Container from '../common/Container';
import Splash from '../common/Splash';
import BackgroundImage from '../../assets/homeImage.jpg';

const Home = (props) => {
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