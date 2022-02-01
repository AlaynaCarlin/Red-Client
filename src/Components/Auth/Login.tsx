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

class Login extends React.Component<{}, any> {
    constructor(props: any){
        super(props)
    }

    render() {
        return(
            <div>
                login
            </div>
        )
    }
}

export default Radium(Login);