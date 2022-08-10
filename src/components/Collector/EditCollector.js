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

    const [auth, setAuth, updateAuth] = useContext(AuthContext);

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

    let editRecords = [];

    let editComments = [];

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const _apiCalls = async () => {

            if (auth.token) {
    
                try {
                    const res = await axios.get(`${apiHostURL}/api/collectors/formattedCollector`, {
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
                        name: res.data.name,
                        records: res.data.records.sort((a, b) => a - b),
                        comments: res.data.comments.sort((a, b) => a - b)
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

        setEditCollector({
            ...editCollector,
            records: editRecords,
            comments: editComments
        });

        console.log(editUser);
        console.log(editCollector);

        _putUpdates(editCollector, editUser);

    }

    const _putUpdates = async (editCollector, editUser) => {
        console.log("changed: " + editCollector.records);

        try {
            const putCollector = await axios.put(`${apiHostURL}/api/collectors`, editCollector, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (editUser.username != auth.profile.username) {
                setAuth({
                    ...auth,
                    profile: {
                        id: editUser.id,
                        username: editUser.username
                    },
                    roles: editUser.roles
                });

                updateAuth(editUser);

            }

            const putUser = await axios.put(`${apiHostURL}/api/collectors/user`, editUser, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            console.log(auth);

            navigate("/")

            // navigate(`/collector/${putUser.data.username}`);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const onChange = () => {
        const recordButtons = document.getElementsByName("recordButtons");
        const commentButtons = document.getElementsByName("commentButtons")

        editRecords = editCollector.records;
        editComments = editCollector.comments;

        for (let i = 0; i < recordButtons.length; i++) {
            if (!recordButtons[i].checked) {
                editRecords.splice(editRecords.indexOf(recordButtons[i].value, 1));
            } else {
                if (recordButtons[i].checked && !editRecords.includes(recordButtons[i].value)) {
                    editRecords.push(recordButtons[i].value);
                }
            }
        }

        for (let i = 0; i < commentButtons.length; i++) {
            if (!commentButtons[i].checked) {
                editComments.splice(editComments.indexOf(commentButtons[i].value, 1));
            } else {
                if (commentButtons[i].checked && !editComments.includes(commentButtons[i].value)) {
                    editComments.push(commentButtons[i].value);
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
                        //TODO fix so auth is updated
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
                    <div>
                        {editCollector.comments.map(comment => {
                            return <Checkbox style={{minWidth: '20px', width: '5%', minHeight: '0vh'}} id={comment} name={"commentButtons"} value={comment} onChange={onChange} checked label={comment}/>
                        })}
                    </div>
                    <Button>Submit</Button>
                </Form>
            }
        </Container>
    )
}

export default EditCollector;