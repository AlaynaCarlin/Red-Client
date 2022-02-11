import React from "react";
import { Posts } from "../Posts/postIndex";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button, Col } from "reactstrap";

type Props = {
    commentPost: Posts,
    commentOff: () => void,
    token: string,

}

type State = {
    comments: [],
    post: Posts
}

class CommentTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            comments: [],
            post: {
                id: '',
                product: '',
                brand: '',
                content: ''
            }
        }
    }

    componentDidMount = () => {
        this.fetchComments()
        console.log('component did mount comment', this.props.commentPost)
    }

    fetchComments = () => {
        console.log('fetch comments', this.props.commentPost.id)
        fetch(`http://localhost:3000/post/${this.props.commentPost.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                this.setState({
                    post: logData.post,
                    comments: logData.comments
                })
                console.log(this.state.post, this.state.comments)
            }).catch((error) => console.log(error));
    }

    close = () => {
        this.props.commentOff();
    }

    render() {
        console.log('render comments')
        return (
            <>
                <Modal isOpen={true}>
                    <ModalHeader>{this.state.post.product} - {this.state.post.brand} <br/> {this.state.post.content}</ModalHeader>
                    <ModalBody>
                        <Col>{this.state.comments}</Col>
                    </ModalBody>
                </Modal>
            </>
        )

    }
}

export default CommentTable;