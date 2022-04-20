import React, {useContext, useEffect} from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Container from "../common/Container";

const NavCollector = (props) => {

    const navigate = useNavigate();

    const [auth] = useContext(AuthContext);

    return(
        <Container>
            {
                useEffect(() => {
                navigate(`/collector/${auth.profile.username}`)
                })
            }
        </Container>
    )
}

export default NavCollector;