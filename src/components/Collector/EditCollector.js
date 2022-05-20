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
import Checkbox from "../common/Checkbox";


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

    const [loading, setLoading] = useState(true);

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

                    const records = []

                    res.data.records.forEach(record => {
                        records.push(record.name);
                    })
    
                    setEditCollector({
                        ...editCollector,
                        name: res.data.name,
                        records: records,
                        comments: res.data.comments
                    });
    
                    setEditUser({
                        ...editUser,
                        username: getUser.data.username,
                        password: getUser.data.password
                    });
    
                    setLoading(false);
                } catch (err) {
                    console.error(err.message ? err.message : err.response);
                }
            }
        }

        setLoading(true);

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

        console.log(editUser);
        console.log(editCollector);

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

    const onChange = () => {
        const buttons = document.getElementsByName("recordButtons");

        const editRecords = editCollector.records;

        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].checked) {
                for (let j = 0; j < editRecords.length; j++) {
                    if (editRecords[j] == buttons[i].value) {
                        editRecords.splice(j, 1);
                    }
                }
            } else {
                if (buttons[i].checked && !editRecords.includes(buttons[i].value)) {
                    editRecords.push(buttons[i].value);
                }
            }
        }

    }

    return(
        <Container>
            <h1>Edit Your Profile</h1>

            {loading ?
                <h1>loading...</h1>
                :
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
                    <InlineInputContainer>
                        <InlineInputContainer>
                            <h3>Uncheck to Remove Records</h3>

                        </InlineInputContainer>
                        {editCollector.records.map(record => {
                            return <Checkbox style={{minWidth: '20px', width: '5%', minHeight: '0vh'}} id={record} name ={"recordButtons"} value={record} onChange={onChange} checked label={record}/>
                        })}
                    </InlineInputContainer>
                    <Button>Submit</Button>
                </Form>
            }
        </Container>
    )
}

export default EditCollector;