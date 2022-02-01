import React from "react";
import Radium from "radium";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
    FormText,
    Container,
    List,
} from "reactstrap";
import Login from "./Login";

class Signup extends React.Component<{}, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: '',
            admin: false,
            message: ''
        }
    }

    componentDidMount = () => {

    }

    handelSubmit = () => {
        // e.preventDefault();
        console.log('handel submit')
        let errorCode: number | string

        console.log(this.state.username, this.state.admin, this.state.password)
        fetch(`http://localhost:3000/user/signup`, {
            method: "POST",
            body: JSON.stringify({ users: { username: this.state.username, admin: this.state.admin, password: this.state.password } }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => {
                console.log(`fetch successful ${response}`);
                errorCode = response.status;
                console.log(errorCode);
                if (errorCode === 409) {
                    this.setState({ message: 'Username already in use' });
                    console.log(this.state.message);
                } else if (errorCode === 500) {
                    this.setState({ message: 'Failed to register user' });
                    console.log(this.state.message);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // update token
            })
    };

    validPassword = () => {
        console.log('valid password');
        return (
            this.state.password.length > 8 &&
            this.state.password.match(/[A-Z]/) !== null &&
            this.state.password.match(/[a-z]/) !== null &&
            this.state.password.match(/[0-9]/) !== null
        );
    }

    render() {
        console.log('render')
        return (
            <div>
                <Form inline onSubmit={e => { e.preventDefault(); this.handelSubmit() }}>
                    <FormGroup floating>
                        <Input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => this.setState({ username: e.target.value })}
                            value={this.state.username}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup floating>
                        <Input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password}
                        />
                        <br />
                        <FormText>
                            <List type="unstyled" id="passwordReq">
                                <li>Password Requirements:</li>
                                <li>At least 8 characters</li>
                                <li>A mixture of both uppercase and lowercase letters.</li>
                                <li> A mixture of letters and numbers.</li>
                            </List>
                        </FormText>
                        <FormFeedback>
                            {" "}
                            {this.state.message !== "" ? <p className="message">{this.state.message}</p> : ""}
                        </FormFeedback>

                    </FormGroup>
                    <Button type="submit" disabled={!this.validPassword()}>Submit</Button>
                    <Button type="button" >Login</Button>

                </Form>
            </div>
        )
    }

}

export default Radium(Signup);