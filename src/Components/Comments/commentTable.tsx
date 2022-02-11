import React from "react";
import {Posts} from "../Posts/postIndex";
import {Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button, Col} from "reactstrap";

type Props = {
    commentPost: Posts,
    commentOff: ()=>void,
    token: string,
    
}

type State ={
    comments: [],
    post: Posts
}

class CommentTable extends React.Component<Props, State> {

    componentDidMount=()=>{
        this.fetchComments()
    }

    fetchComments = () => {
        console.log('fetch comments')
        fetch(`http://localhost:3000/post/${this.props.commentPost.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                this.setState({
                    post: logData.post,
                    comments: logData.comments
                })
            }).catch((error) => console.log(error));
    }

    close = () => {
        this.props.commentOff();
    }

    render() {
        return (
          <>
            <Modal>
                {/* <ModalHeader>{this.state.post.product} {this.state.post.brand}: {this.state.post.content}</ModalHeader> */}
                <ModalBody>
                    <Col></Col>
                </ModalBody>
            </Modal>
          </>
        )

    }
}

export default CommentTable;