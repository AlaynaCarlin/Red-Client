import React from "react";
import Radium from "radium";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

type Props = {
    token: string,
    fetch: any
}

class CreatePost extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            product: '',
            brand: '',
            content: ''
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/post/post', {
            method: 'POST',
            body: JSON.stringify({post: {product: this.state.product, brand: this.state.brand, content: this.state.content}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })

    }

    render() {
        return (
            <div>
               <h3>create a Post</h3>
               <Form>
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