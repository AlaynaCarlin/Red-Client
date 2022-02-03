import React from "react";
import Radium from "radium";

class DeleteComment extends React.Component <{},any> {
    constructor(props:any){
        super(props)
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <div>
                {/* modal */}
                Delete Comment
            </div>
        )
    }
}

export default Radium(DeleteComment);