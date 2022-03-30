import React from "react";
import Container from "../common/Container";
import InLineInputContianer from "../common/InlineInputContainer";
import Form from "../common/Form";
import Input from "../common/Input";
import Button from "../common/Button";

const RegisterForm = (props) => {
    const {onSubmit, onChange, newUser} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InLineInputContianer>
                    <Input
                        name="fName"
                        id="fName"
                        value={newUser.fName}
                        placeholder={"First Name"}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="lName"
                        id="lName"
                        value={newUser.lName}
                        placeholder={"Last Name"}
                        onChange={handleChange}
                        required
                    />
                </InLineInputContianer>
                <InLineInputContianer>
                <Input
                        name="username"
                        id="username"
                        value={newUser.username}
                        placeholder={"Username"}
                        onChange={handleChange}
                        required
                    />
                </InLineInputContianer>
                <InLineInputContianer>
                <Input
                        name="password"
                        id="password"
                        value={newUser.password}
                        placeholder={"Password"}
                        onChange={handleChange}
                        type="password"
                        required
                    />
                </InLineInputContianer>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default RegisterForm;