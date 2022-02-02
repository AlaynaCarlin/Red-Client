import React from "react";
import Radium from "radium";
import { Button, Container, Row, Col, Navbar, } from "reactstrap";
import createPost from "./createPost";
import deletePost from "./deletePost";
import searchPost from "./searchPost";
import updatePost from "./updatePost";
import NavBar from "../Auth/NavBar";

interface 

class PostIndex extends React.Component<{}, any> {
    constructor(props: any){
        super(props)
    }

    // fetch and display the most recent posts

    render() {
        return (
            <Container>
                <Navbar />
                {/* call other components according to their buttons */}
                <Row>
                    <Button>Submit</Button>
                </Row>
            </Container>
        )
    }

}

export default Radium(PostIndex);