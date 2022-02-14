import React from "react";
// import Radium from "radium";
import {Posts} from "./postIndex";

type Props = {

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

    render(){
        return(
            <div>
                Search Posts
            </div>
        )
    }
}

export default SearchPost;