import React from "react";
import Radium from "radium";
import APIURL from "../../helpers/environment";
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

type Props = {
    update: any
}

type State = {
    username: string,
    password: string,
    sessionToken: any
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            sessionToken: ''
        }
    }

    handleSubmit = () => {
        console.log('login handle')
        console.log(this.state.username, this.state.password)
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ users: { username: this.state.username, password: this.state.password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json()
        ) .then((data) => {
            console.log(data);
            console.log(this.props.update);
            this.props.update(data.sessionToken);
            })
    }

    render() {
        console.log('login render')
        return (
            <div>
                <h3>login</h3>
                <Form inline onSubmit={e => { e.preventDefault(); this.handleSubmit() }}>
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
                    </FormGroup>
                    <Button type="submit" >Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;