import React from "react";
import Radium from "radium";
import { Button, Container, Row, Col, } from "reactstrap";
import CreatePost from "./createPost";
import deletePost from "./deletePost";
import searchPost from "./searchPost";
import updatePost from "./updatePost";
import NavBar from "../Auth/NavBar";

interface Props {
    token: string,
    clickLogout: any,
    tokenUpdate: any
}

class PostIndex extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state={
            posts: [],
            error: false
        }
    }

    componentDidMount(){
         console.log('fetch Posts', this.props.token)
        fetch(`http://localhost:3000/post/`,{
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then ( (res) => res.json())
            .then((logData) => {
                this.setState({posts: logData})
            }) .catch((error) => this.setState({
                error: true
            }));
    }
  

    fetchPosts = () => {
        fetch(`http://localhost:3000/post/`,{
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then ( (res) => res.json())
            .then((logData) => {
                this.setState({posts: logData})
            }) .catch((error) => this.setState({
                error: true
            }));
    }

    render() {
        console.log('postIndex render');
        return (
            <div>
                <NavBar clickLogout={this.props.clickLogout} tokenUpdate={this.props.tokenUpdate} />
                <Container>
                    <Row>
                        <Col md='3'>
                            <CreatePost token={this.props.token} fetch={this.fetchPosts}/>
                        </Col>
                        <Col md='9'>
                            <h2>Log a workout to see a table. This will be added in later pages</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default PostIndex;