import React from "react";
import Radium from "radium";
import {Posts} from "../Posts/postIndex";
import {Form, FormGroup, Input, Button, Label} from 'reactstrap';

type Props = {
    token: string,
    fetchComments: ()=>void,
    post: Posts
}

type State = {
    content: string
}

class WriteComment extends React.Component <Props,State> {
    constructor(props:any){
        super(props)
        this.state = {
            content: ''
        }
    }

    componentDidMount=()=>{
    }

    handelSubmit = () => {
        fetch('http://localhost:3000/comment/post', {
            method: 'POST',
            body: JSON.stringify({comment: {content: this.state.content, postId: this.props.post.id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then ((res) => res.json())
        .then((commentData) => {
            console.log(commentData);
            this.setState({content: ''})
            this.props.fetchComments();
        })
    }

    render(){
        return(
          <Form inline onSubmit={e => {e.preventDefault(); this.handelSubmit() }}>
              <FormGroup>
                  <Label>write a comment</Label>
                  <Input value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}/>
              </FormGroup>
              <Button type="submit">Comment</Button>
          </Form>
        )
    }
}

export default WriteComment;