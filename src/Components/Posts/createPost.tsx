import React from "react";
import Radium from "radium";
import APIURL from "../../helpers/environment";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

type Props = {
    token: string,
    fetch: () => void,
    postOff: () => void
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
        fetch(`${APIURL}/post/post`, {
            method: 'POST',
            body: JSON.stringify({ post: { product: this.state.product, brand: this.state.brand, content: this.state.content } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
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

    close = () => {
        this.props.postOff();
    }

    render() {
        return (
            <div>
                {/* important stuff */}
                            <h3 style={{}}>create a Post</h3>
                <Form inline onSubmit={e => { e.preventDefault(); this.handleSubmit() }} className="postForm">
                    <Row xs='1' md="3" xl="6">
                        <Col>
                                <Input name="product" value={this.state.product} onChange={(e) => this.setState({ product: e.target.value })} placeholder="product" />
                        </Col>
                        <Col>
                                <Input name="brand" value={this.state.brand} onChange={(e) => this.setState({ brand: e.target.value })} placeholder="brand" />
                        </Col>
                        <Col>
                                <Input name="content" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} placeholder='content'/>
                        </Col>
                        <Col>
                            <Button id="Btns" type='submit'>Click to Submit</Button>
                        </Col>
                        <Col>
                            <Button id="Btns" onClick={() => this.close()}>Close</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default CreatePost;