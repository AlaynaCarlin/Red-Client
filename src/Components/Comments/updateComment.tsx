import React from "react";
import Radium from "radium";
import { Comments } from './commentTable';
import {Form, FormGroup, Input, Button, Label} from 'reactstrap';

type Props = {
    token: string,
    commentToUpdate: Comments,
    updateOff: () => void,
    fetch: () => void,
}

type State = {
    content: string
}

class UpdateComment extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            content: ''
        }
    }

    componentDidMount = () => {

    }

    commentUpdate = () => {
        fetch(`http://localhost:3000/comment/update/${this.props.commentToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({comment: {content: this.state.content, postId: this.props.commentToUpdate.postId}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then((res) => {
            this.props.fetch();
            this.props.updateOff();
        })
    }

    render() {
        return (
            <Form inline onSubmit={e => {e.preventDefault(); this.commentUpdate() }}>
            <FormGroup>
                <Label>update Comment</Label>
                <Input value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}/>
            </FormGroup>
            <Button type="submit">Comment</Button>
        </Form>
        )
    }
}

export default UpdateComment;