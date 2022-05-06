import React, {useState, useContext} from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import Input from "../common/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";


const NewComment = (props) => {

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const [newComment, setNewComment] = useState({
        name: "",
        userComment: ""
    });

    const onChange = (field, value) => {
        setNewComment({
            ...newComment,
            [field]: value
        });
    }

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const onSubmit = () => {
        const data = newComment;

        data.record = {
            name: newComment.name
        };

        _postComment(data);
    }

    const _postComment = async (newComment) => {
        try {
            const res = await axios.post(`${apiHostURL}/api/collectors/comment`, newComment, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            navigate(`/collector/${auth.profile.username}`)
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Container>
                <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                    <InlineInputContainer>
                        <Input
                            name="userComment"
                            id="userComment"
                            value={newComment.userComment}
                            placeholder={"Write New Comment Here"}
                            onChange={handleChange}
                            required
                        />
                    </InlineInputContainer>
                    <InlineInputContainer>
                        <Input
                            name="name"
                            id="name"
                            value={newComment.name}
                            placeholder={"Name a Record"}
                            onChange={handleChange}
                            required
                        />
                    </InlineInputContainer>
                    <Button>Submit</Button>
                </Form>
            </Container>
    );
}

export default NewComment;