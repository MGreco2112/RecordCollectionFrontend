import React from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";
import Button from "../common/Button";

const VerifyLoginForm = (props) => {

    const {onSubmit, onChange, userRequest} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return(
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="username"
                        id="username"
                        value={userRequest.username}
                        placeholder={"Enter current Username"}
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="password"
                        id="password"
                        value={userRequest.password}
                        placeholder={"Enter current Password"}
                        onChange={handleChange}
                        type="password"
                        required
                    />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default VerifyLoginForm;