import React from "react";
import Radium from "radium";
import { Button, Container, Row, Col, } from "reactstrap";
import CreatePost from "./createPost";
import PostTable from "./postTable";
import searchPost from "./searchPost";
import updatePost from "./updatePost";
import NavBar from "../Auth/NavBar";

interface Props {
    token: string,
    clickLogout: any,
    tokenUpdate: any
}

export interface Posts {
    id: string,
    product: string,
    brand: string,
    content: string,
}

class PostIndex extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state={
            posts: [],
            error: false
        }
    }

    // componentDidMount(){
    //      console.log('fetch Posts', this.props.token)
    //     fetch(`http://localhost:3000/post/`,{
    //         method: 'GET',
    //         headers: new Headers ({
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${this.props.token}`
    //         })
    //     }) .then ( (res) => res.json())
    //         .then((logData) => {
    //             this.setState({posts: logData})
    //             console.log(logData)
    //         }) .catch((error) => this.setState({
    //             error: true
    //         }));
    // }

    componentDidMount () {
        this.fetchPosts()
    }

    fetchPosts = () => {
        console.log('fetch Posts', this.props.token)
        fetch(`http://localhost:3000/post/`,{
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then ( (res) => res.json())
            .then((logData) => {
                this.setState({posts: logData.posts})
                console.log(logData.posts)
            }) .catch((error) => this.setState({
                error: true
            }));
    }

    setPosts = (searchItem: string) => {
        let filtered = this.state.posts.filter((i:Posts) => i.product.includes(searchItem))
        this.setState({posts: filtered})
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
                            <PostTable setPosts={this.setPosts} postArray={this.state.posts} fetch={this.fetchPosts} token={this.props.token}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default PostIndex;