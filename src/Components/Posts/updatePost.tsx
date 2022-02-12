import React from "react";
// import Radium from "radium";
import APIURL from "../../helpers/environment";
import {Posts} from "./postIndex"
import {Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button} from 'reactstrap';

type Props = {
    postToUpdate: Posts,
    updateOff: ()=>void,
    token: string,
    fetch: ()=>void

}

type State = {
    editProduct: string,
    editBrand: string,
    editContent: string
}

class UpdatePost extends React.Component <Props,State> {
    constructor(props:Props){
        super(props)
        this.state = {
            editProduct: '',
            editBrand: '',
            editContent: ''
        }
    }

    componentDidMount=()=>{

    }

    postUpdate = () => {
        fetch(`${APIURL}/post/update/${this.props.postToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({post: {product: this.state.editProduct, brand: this.state.editBrand, content: this.state.editContent}}),
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

    render(){
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update your Post</ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={e => {e.preventDefault(); this.postUpdate() }}>
                        <FormGroup>
                            <Label htmlFor="product">Edit Product:</Label>
                            <Input name="product" value={this.state.editProduct} onChange={(e) => this.setState({editProduct: e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="brand">Edit Brand:</Label>
                            <Input name="brand" value={this.state.editBrand} onChange={(e) => this.setState({editBrand: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="content">Edit Content:</Label>
                            <Input name="content" value={this.state.editContent} onChange={(e) => this.setState({editContent: e.target.value})} />
                        </FormGroup>
                        <Button type="submit">Update your Post!</Button>
                        <Button type="reset" onClick={this.close}>close</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default UpdatePost;