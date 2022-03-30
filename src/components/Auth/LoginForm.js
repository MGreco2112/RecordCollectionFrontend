import React from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";

const LoginForm = (props) => {

    const {onSubmit, onChange, currentUser} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                <Input
                    name="username"
                    id="username"
                    value={currentUser.username}
                    placeholder={"Username"}
                    onChange={handleChange}
                    required
                />
                </InlineInputContainer>
                <InlineInputContainer>
                <Input
                    name="password"
                    id="password"
                    value={currentUser.password}
                    placeholder={"Password"}
                    onChange={handleChange}
                    type="password"
                    required
                />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default LoginForm;