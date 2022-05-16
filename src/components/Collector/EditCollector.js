import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiHostURL } from "../../config";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";
import Button from "../common/Button";
import Container from "../common/Container";

const EditCollector = (props) => {

    const navigate = useNavigate();

    const [auth] = useContext(AuthContext);

    const [editCollector, setEditCollector] = useState({
        name: "",
        records: [],
        comments: []
    });

    const [newPassword, setNewPassword] = useState("");

    const [editUser, setEditUser] = useState({
        username: "",
        password: ""
    });

    const [editRecords, setEditRecords] = useState();

    const [editComments, setEditComments] = useState();

    let loading = true;

    useEffect(() => {

        const _apiCalls = async () => {

            if (auth.token) {
    
                try {
                    const res = await axios.get(`${apiHostURL}/api/collectors/currentCollector`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
    
                    const getUser = await axios.get(`${apiHostURL}/api/collectors/user/${auth.profile.id}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
    
                    setEditCollector({
                        ...editCollector,
                        name: res.data.name
                    });
    
                    setEditUser({
                        ...editUser,
                        username: getUser.data.username,
                        password: getUser.data.password
                    });
    
                    setEditRecords(res.data.records);
    
                    setEditComments(res.data.comments);
    
                    loading = false;
                } catch (err) {
                    console.error(err.message ? err.message : err.response);
                }
            }
        }

        loading = true;

        _apiCalls();
    }, [auth]);

    const handleCollectorChange = (e) => {
        setEditCollector({
            ...editCollector,
            [e.target.id]: e.target.value
        });
    };

    const handleUserChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.id]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);

        setEditUser({
            ...editUser,
            password: e.target.value
        });
    }

    const onSubmit = () => {

        _putUpdates(editCollector, editUser);

    }

    const _putUpdates = async (editCollector, editUser) => {
        console.log(editCollector);

        try {
            const putCollector = await axios.put(`${apiHostURL}/api/collectors`, editCollector, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const putUser = await axios.put(`${apiHostURL}/api/collectors/user`, editUser, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            navigate(`/collector/${auth.profile.username}`);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }
    
    console.log(editCollector);


    return(
        <Container>
            <h1>Edit Your Profile</h1>

            {loading ?
                <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                    <InlineInputContainer>
                        <Input
                            name="username"
                            id="username"
                            value={editUser.username}
                            onChange={handleUserChange}
                            label={"Username"}
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="password"
                            id="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            label={"New Password"}
                            placeholder="Leave blank for old password"
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="name"
                            id="name"
                            value={editCollector.name}
                            onChange={handleCollectorChange}
                            label={"Display Name"}
                            required
                        />
                    </InlineInputContainer>
                    <Button>Submit</Button>
                </Form>
                :
                <h1>loading...</h1>
            }
        </Container>
    )
}

export default EditCollector;