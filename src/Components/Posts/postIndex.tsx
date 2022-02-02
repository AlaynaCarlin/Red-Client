import React from "react";
import Radium from "radium";
import { Button, Container, Row, Col, Navbar, } from "reactstrap";
import createPost from "./createPost";
import deletePost from "./deletePost";
import searchPost from "./searchPost";
import updatePost from "./updatePost";
import NavBar from "../Auth/NavBar";

interface token {
    token: string
}

class PostIndex extends React.Component<token, any> {
    constructor(props: token){
        super(props)
    }

    // fetch and display the most recent posts

    render() {
        return (
            <Container>
               <h1>Wassup!</h1>
            </Container>
        )
    }

}

export default Radium(PostIndex);