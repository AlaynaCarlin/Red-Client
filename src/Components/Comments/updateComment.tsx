import React from "react";
import Radium from "radium";

class UpdateComment extends React.Component <{},any> {
    constructor(props:any){
        super(props)
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <div>
                {/* modal */}
                update comment
            </div>
        )
    }
}

export default Radium(UpdateComment);