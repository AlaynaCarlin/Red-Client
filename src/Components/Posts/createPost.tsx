import React from "react";
import Radium from "radium";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

type Props = {
    token: string,
    fetch: ()=>void,
    postOff: ()=>void
}

type State = {
    product: string,
    brand: string,
    content: string
}

class CreatePost extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            product: '',
            brand: '',
            content: ''
        }
    }

    handleSubmit = () => {
        fetch('http://localhost:3000/post/post', {
            method: 'POST',
            body: JSON.stringify({post: {product: this.state.product, brand: this.state.brand, content: this.state.content}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then((res) => res.json())
        .then((postData) => {
            console.log(postData);
            this.setState({
                product: '',
                brand: '',
                content: ''
            })
            this.props.fetch();
            this.props.postOff();
        })

    }

    render() {
        return (
            <div>
               <h3>create a Post</h3>
               <Form inline onSubmit={e => { e.preventDefault(); this.handleSubmit() }}>
                   <FormGroup>
                       <Label htmlFor="product">product</Label>
                       <Input name="product" value={this.state.product} onChange={(e) => this.setState({product: e.target.value})}/>
                   </FormGroup>
                   <FormGroup>
                       <Label htmlFor="brand">brand</Label>
                       <Input name="brand" value={this.state.brand} onChange={(e) => this.setState({brand: e.target.value})}/>
                   </FormGroup>
                   <FormGroup>
                       <Label htmlFor="content">content</Label>
                       <Input name="content" value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}/>
                   </FormGroup>
                   <Button type='submit'>Click to Submit</Button>
               </Form>
            </div>
        )
    }
}

export default CreatePost;