import React from "react";
// import Radium from "radium";
import {Posts} from "./postIndex"

type Props = {
    postToUpdate: Posts,
    updateOff: any,
    token: string,
    fetch: ()=>void

}

class UpdatePost extends React.Component <Props,any> {
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

    render(){
        return(
            <div>
                Update Posts
            </div>
        )
    }
}

export default UpdatePost;