import React from "react";
import Radium from "radium";

class NavBar extends React.Component <{},any> {
    constructor(props:any){
        super(props)
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <div>
                {/* send to post index */}
                Nav bar
            </div>
        )
    }
}

export default Radium(NavBar);