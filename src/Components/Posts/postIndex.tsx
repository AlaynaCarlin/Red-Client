import React from "react";
import Radium from "radium";
import {Container, Row, Col, } from "reactstrap";
import CreatePost from "./createPost";
import PostTable from "./postTable";
import searchPost from "./searchPost";
import UpdatePost from "./updatePost";
import NavBar from "../Auth/NavBar";
import CommentTable from "../Comments/commentTable";
import UpdateComment from "../Comments/updateComment";
import WriteComment from "../Comments/writeComment";

type Props = {
    token: string,
    clickLogout: any,
    tokenUpdate: any
}

type State = {
}

export interface Posts {
    id: string,
    product: string,
    brand: string,
    content: string,
}

// ! trying to set the state variables for the posts and comments. run into trouble when I try to make it an interface to get rid of any and when I try to use Posts in this.state

class PostIndex extends React.Component<Props,any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            posts: [],
            error: false,
            updateActive: false,
            postToUpdate: {},
            commentPost: {},
            comments: [],
        }
        // this.setState({
            // ! all the troublesome variables in here
        // })
    }


    fetchComments = () => {
        fetch(`http://localhost:3000/post/${this.state.post.id}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then ((res) => res.json())
        .then((logData) => {
            this.setState({
                post: logData.post,
                comments: logData.comments
            })
        }) .catch((error) => console.log(error));
    }

    // ! divider ****************************************
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

    editUpdatePost = (post: Posts) => {
        this.setState({
            postToUpdate: post,
        })
        console.log(this.state.postToUpdate);
    }

    updateOn = () => {
        this.setState({
            updateActive: true
        })
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
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
                            <PostTable 
                            setPosts={this.setPosts} 
                            postArray={this.state.posts} 
                            fetch={this.fetchPosts} 
                            token={this.props.token} 
                            editUpdatePost={this.editUpdatePost} 
                            updateOn={this.updateOn}
                            fetchComments={this.fetchComments}/>
                        </Col>
                    </Row>
                    {this.state.updateActive ? 
                    <UpdatePost 
                    postToUpdate={this.state.postToUpdate} 
                    updateOff={this.updateOff} 
                    token={this.props.token} 
                    fetch={this.fetchPosts}/> : 
                    <></>}
                </Container>
            </div>
        )
    }

}

export default PostIndex;