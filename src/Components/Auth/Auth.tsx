import React from "react";
import Radium from "radium";
import Signup from "./Signup";

interface tokenUpdate {
    tokenUpdate: any
}

class Auth extends React.Component<tokenUpdate, any> {
    constructor(props: tokenUpdate) {
        super(props);
        this.state = { hasError: false };
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
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
          }
        return (
            <div>
                <Signup />
            </div>
        )
    }
}

export default Auth;