import React from "react";
import Radium from "radium";

class UpdatePost extends React.Component <{},any> {
    constructor(props:any){
        super(props)
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

export default Radium(UpdatePost);