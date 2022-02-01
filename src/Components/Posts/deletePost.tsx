import React from "react";
import Radium from "radium";

class DeletePost extends React.Component <{},any> {
    constructor(props:any){
        super(props)
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <div>
                Delete Posts
            </div>
        )
    }
}

export default Radium(DeletePost);