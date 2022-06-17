import React from "react";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";
import Form from "../common/Form";
import Input from "../common/Input";
import Button from "../common/Button";

const AdminRegisterForm = (props) => {
    const {onSubmit, onChange, newAdmin} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return(
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="fName"
                        id="fName"
                        value={newAdmin.fName}
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="lName"
                        id="lName"
                        value={newAdmin.lName}
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="username"
                        id="username"
                        value={newAdmin.username}
                        onChange={handleChange}
                        placeholder="username"
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        value={newAdmin.password}
                        onChange={handleChange}
                        placeholder="password"
                        type="password"
                        required
                    />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdminRegisterForm;