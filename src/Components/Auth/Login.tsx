import React from "react";
import Radium from "radium";
import APIURL from "../../helpers/environment";
import {User} from './Users';
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
    update: any,
    toggleFunc: ()=>void,
    // currentUser: User
}

type State = {
    username: string,
    password: string,
    sessionToken: string,
    
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            sessionToken: '',
            
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
            this.setState({
                
            })
            })
    }

    render() {
        console.log('login render')
        return (
            <div >
                <Form onSubmit={e => { e.preventDefault(); this.handleSubmit(); }} id="splashForm">
                    <h2>Class & Sass</h2>
                    <Label>Login</Label>
                    <FormGroup >
                        <Input
                            bsSize="lg"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => this.setState({ username: e.target.value })}
                            value={this.state.username}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup >
                        <Input
                            bsSize="lg"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password}
                        />
                        <br />
                    </FormGroup>
                    <Button  id="splashBtn" onClick={() => this.props.toggleFunc()}>Go to Signup</Button>
                    <Button id="splashBtn" type="submit" >Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login;