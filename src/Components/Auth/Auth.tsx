import React from "react";
// import Radium from "radium";
import Signup from "./Signup";
import { Container, Row, Col } from 'reactstrap';
import Login from "./Login";

type Props = {
    tokenUpdate: (newToken: string)=>void,
}

type State = {
    // updated: any
    hasError: boolean,
    toggle: boolean
}

class Auth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            hasError: false,
            toggle: false
            // updated: props.tokenUpdate
         };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    toggleFunc = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        console.log('Auth render')
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return (
            <Container>
                <Row>
                    <Col md='6'>
                        {this.state.toggle ?
                        <Signup update = {this.props.tokenUpdate} toggleFunc={this.toggleFunc}/> :
                        <Login update = {this.props.tokenUpdate} toggleFunc={this.toggleFunc}/> }
                    </Col>
                    {/* <Col md="6">
                        <Signup  }/>
                    </Col> 
                    <Col md="6">
                        <Login }/>
                    </Col> */}
                </Row>

            </Container>

        )
    }
}

export default Auth;