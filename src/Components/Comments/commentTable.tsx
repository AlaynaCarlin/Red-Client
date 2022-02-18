import React from "react";
import { Posts } from "../Posts/postIndex";
import { Modal, ModalBody, ModalHeader, Button, Col, Row } from "reactstrap";
import WriteComment from "./writeComment";
import UpdateComment from "./updateComment";
import APIURL from "../../helpers/environment";

type Props = {
    commentPost: Posts,
    commentOff: () => void,
    token: string,
}

export interface Comments {
    id: string,
    content: string,
    postId: string
}

type State = {
    comments: Comments[],
    post: Posts,
    updateActive: boolean,
    commentToUpdate: Comments
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
                content: '',
                userId: ''
            },
            updateActive: false,
            commentToUpdate: {
                id: '',
                content: '',
                postId: ''
            }
        }
    }

    componentDidMount = () => {
        this.fetchComments()
        console.log('component did mount comment', this.props.commentPost)
    }

    fetchComments = () => {
        console.log('fetch comments', this.props.commentPost.id)
        fetch(`${APIURL}/post/${this.props.commentPost.id}`, {
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

    deleteComment = (comment: Comments) => {
        console.log('deleteComment');
        fetch(`${APIURL}/comment/delete/${comment.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchComments())
    }

    commentMapper = () => {
        console.log('comment mapper')
        return this.state.comments.map((comment: Comments, idx: number) => {
            return (
                <Row key={idx} className='comment'>
                    <Col id="col1"><p>{comment.content}</p></Col>
                    <Col style={{ textAlign: 'right' }}><Button id="Btns" onClick={() => this.deleteComment(comment)}>delete</Button>
                        <Button id="Btns" onClick={() => { this.editUpdateComment(comment); this.updateOn() }}>edit</Button></Col>
                </Row>
            )
        }
        )
    }

    editUpdateComment = (comment: Comments) => {
        this.setState({
            commentToUpdate: comment,
        })
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

    render() {
        console.log('render comments')
        return (
            <>
                <Modal isOpen={true}>
                    <ModalHeader>{this.state.post.product} - {this.state.post.brand} <br /> {this.state.post.content}</ModalHeader>
                    <ModalBody>
                        <Col>{this.commentMapper()}</Col>
                        {this.state.updateActive ?
                            <UpdateComment
                                token={this.props.token}
                                commentToUpdate={this.state.commentToUpdate}
                                updateOff={this.updateOff}
                                fetch={this.fetchComments} /> :
                            <WriteComment
                                token={this.props.token}
                                fetchComments={this.fetchComments}
                                post={this.state.post} />}

                        <Button id="Btns" onClick={this.close}>close</Button>

                    </ModalBody>
                </Modal>
            </>
        )

    }
}

export default CommentTable;