import React from "react";
import Radium from "radium";

class CreatePost extends React.Component <{},any> {
    constructor(props:any){
        super(props)
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <div>
                {/* modal */}
                Create Posts
            </div>
        )
    }
}

export default Radium(CreatePost);