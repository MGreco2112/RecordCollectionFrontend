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

    const newComment = useState({
        record: {
                name: ""
            },
        userComment: ""
    });

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const onSubmit = () => {
        _postComment(newComment);
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

    const displayCommentForm = () => {
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="comment"
                        id="comment"
                        value={newComment.userComment}
                        placeholder={"Write New Comment Here"}
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="record"
                        id="record"
                        value={newComment.record.name}
                        placeholder={"Name a Record"}
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    }

    return(
        displayCommentForm()
    );
}

export default NewComment;