import React from "react";
import Radium from "radium";
import Signup from "./Signup";
import { Container, Row, Col } from 'reactstrap';
import Login from "./Login";

type Props = {
    tokenUpdate: any,
}

type State = {
    // updated: any
    hasError: boolean

}

class Auth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            hasError: false,
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


    render() {
        console.log('Auth render')
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <Signup  update = {this.props.tokenUpdate}/>
                    </Col> 
                    <Col md="6">
                        <Login update = {this.props.tokenUpdate}/>
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Auth;