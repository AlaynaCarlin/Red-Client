import React, { ErrorInfo } from "react";
// import Radium from "radium";
import Signup from "./Signup";
import { Container, Row, Col } from 'reactstrap';
import Login from "./Login";

type Props = {
    tokenUpdate: (newToken: string) => void,
}

type State = {
    hasError: boolean,
    toggle: boolean,
}

class Auth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            toggle: false
        };
    }

    static getDerivedStateFromError(error: number | string) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
            <Container className="splash">
                <Row>
                    <Col>
                        {this.state.toggle ?
                            <Login update={this.props.tokenUpdate} toggleFunc={this.toggleFunc} /> :
                            <Signup update={this.props.tokenUpdate} toggleFunc={this.toggleFunc} />}
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Auth;