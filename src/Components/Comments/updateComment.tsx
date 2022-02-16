import React from "react";
import Radium from "radium";
import APIURL from "../../helpers/environment";
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
        fetch(`${APIURL}/comment/update/${this.props.commentToUpdate.id}`, {
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

    close = () => {
        this.props.updateOff();
    }

    render() {
        return (
            <Form inline onSubmit={e => {e.preventDefault(); this.commentUpdate() }}>
            <FormGroup>
                <h5>update Comment</h5> 
                <Button onClick={() => this.close()}>Update Off</Button>
                <Input value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}/>
            </FormGroup>
            <Button type="submit">Comment</Button>
        </Form>
        )
    }
}

export default UpdateComment;