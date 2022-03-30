import axios from "axios";
import React from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import Splash from "../common/Splash";
import Signup from "../../assets/loginsignup.jpg"
import { useNavigate } from "react-router-dom";
import {apiHostURL} from "../../config"

const SignUp = (props) => {

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        fName: "",
        lName: "",

    });

    const updateForm = (field, value) => {
        setNewUser({
            ...newUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        const data = newUser;
        data.name = `${data.fName} ${data.lName}`

        _createUser(data);
    }

    const _createUser = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/signup`, data);

            console.log(res.data);

            _login(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const _login = async (data) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/auth/login`, data);

            console.log(res.data);

            createCollector(data, res.data.token);
        } catch (err) {
            console.error(err,response.data);
        }
    }

    const createCollector = async (data, token) => {
        try {
            const res = await axios.post(
                `${apiHostURL}/api/collectors`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);
            navigate('/login')

        } catch (err) {
            console.error(err.response.data);
        }
    }


    return (
        <Container>
            <Splash
            image={Signup}
            style={{
                height: "20vh",
                color: "#F1F1F1"
            }}
            >
                <h1>Join our Rockin' Community</h1>
            </Splash>
            <RegisterForm
                newUser={newUser}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default SignUp;