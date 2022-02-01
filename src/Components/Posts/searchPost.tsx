import React from "react";
import Radium from "radium";

class SearchPost extends React.Component <{},any> {
    constructor(props:any){
        super(props)
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

export default Radium(SearchPost);