import React from "react";
import Radium from "radium";
import APIURL from "../../helpers/environment";
import { Container, Row, Col, } from "reactstrap";
import CreatePost from "./createPost";
import PostTable from "./postTable";
import searchPost from "./searchPost";
import UpdatePost from "./updatePost";
import CommentTable from "../Comments/commentTable";
import SearchPost from "./searchPost";


type Props = {
    token: string,
    postOff:()=>void,
    postActive: boolean,
    searchOff: ()=>void,
    searchActive: boolean
}

/*  I need my variables in an interface so that I have access to the Posts interface,
  but my app won't read the value of any of the variables */
type State = {
    posts: Posts[],
    error: boolean,
    updateActive: boolean,
    postToUpdate: Posts,
    commentPost: Posts,
    commentActive: boolean,
    
}

export interface Posts {
    id: string,
    product: string,
    brand: string,
    content: string,
}

class PostIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            posts: [],
            error: false,
            updateActive: false,
            postToUpdate: {
                id: '',
                product: '',
                brand: '',
                content: ''
            },
            commentPost: {
                id: '',
                product: '',
                brand: '',
                content: ''
            },
            commentActive: false,
            
        };
        // console.log(this.state.posts)
    }


    // ! divider ****************************************
    componentDidMount() {
        console.log('component did mount')
        this.fetchPosts()
    }

    fetchPosts = () => {
        // console.log('fetch Posts', this.props.token)
        fetch(`${APIURL}/post/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                this.setState({ posts: logData.posts })
                // console.log(logData.posts)
            }).catch((error) => this.setState({
                error: true
            }));
    }

    // gives postToUpdate the value of the current post
    editUpdatePost = (post: Posts) => {
        this.setState({
            postToUpdate: post,
        })
        console.log(this.state.postToUpdate);
    }

    // sets update active to true so that updatePost will run
    updateOn = () => {
        this.setState({
            updateActive: true
        })
    }

    //  sets update active to false so that upon rerender updatePost will not run
    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }
    // !======

    setCommentPost = (post: Posts) => {
        this.setState({
            commentPost: post,
        })
    }

    commentOn = () => {
        this.setState({
            commentActive: true
        })
    }

    commentOff = () => {
        this.setState({
            commentActive: false
        })
    }
    // !=======

// ! ==========

    setPosts = (searchItem: string) => {
        let filtered = this.state.posts.filter((i: Posts) => i.product.includes(searchItem))
        this.setState({ posts: filtered })
    }

    render() {
        console.log('postIndex render');
        return (
            <div>
                <Container>
                    <Col>
                    <Row md='3'>
                            {this.props.searchActive ?
                                <SearchPost
                                    token={this.props.token}
                                    setPosts={this.setPosts} 
                                    searchOff={this.props.searchOff}/> :
                                <></>
                            }
                        </Row>
                        <Row md='3'>
                            {this.props.postActive ?
                                <CreatePost
                                    token={this.props.token}
                                    fetch={this.fetchPosts} 
                                    postOff={this.props.postOff}/> :
                                <></>
                            }
                        </Row>
                        <Row md='9'>
                            <PostTable
                                setPosts={this.setPosts}
                                postArray={this.state.posts}
                                fetch={this.fetchPosts}
                                token={this.props.token}
                                editUpdatePost={this.editUpdatePost}
                                updateOn={this.updateOn}
                                setCommentPost={this.setCommentPost}
                                commentOn={this.commentOn}
                            />
                        </Row>
                    </Col>
                    {this.state.updateActive ?
                        <UpdatePost
                            postToUpdate={this.state.postToUpdate}
                            updateOff={this.updateOff}
                            token={this.props.token}
                            fetch={this.fetchPosts} /> :
                        <></>}
                    {this.state.commentActive ?
                        <CommentTable
                            commentPost={this.state.commentPost}
                            commentOff={this.commentOff}
                            token={this.props.token} /> :
                        <></>}
                </Container>
            </div>
        )
    }

}

export default PostIndex;