import React from "react";
// import Radium from "radium";
import {Posts} from "./postIndex";
import {Input, Button, Form} from 'reactstrap';

type Props = {
    token: string,
    setPosts: (searchItem: string)=>void,
    searchOff: ()=>void
}

type State = {
    searchPosts: Posts[],
    searchTerm: string
}

class SearchPost extends React.Component <Props,State> {
    constructor(props:Props){
        super(props)
        this.state = {
            searchPosts: [],
            searchTerm: ''
        }
    }

    componentDidMount=()=>{
    }

    handleChange = () => {
        this.props.setPosts(this.state.searchTerm)
    }

    // searchFilter = () => {
    //     let searchObjects = this.props.posts.filter(posts => posts.product.includes(this.state.searchTerm));
    //     this.setState({
    //         searchPosts: searchObjects
    //     })
    // }

    render(){
        return(
            <div>
                <Form onSubmit={e => { e.preventDefault(); this.handleChange()}}> 
                <h4>Search for a Post</h4>
                <Input onChange={(e) => this.setState({searchTerm: e.target.value})}/>
                <Button type="submit">Search</Button>
                </Form>
            </div>
        )
    }
}

export default SearchPost;