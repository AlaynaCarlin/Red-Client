import React from "react";
import Radium from "radium";
import {Table, Button, Row} from 'reactstrap';

type Props = {
    fetch: any,
    postArray: any,
    token: any
}

class PostTable extends React.Component <Props,any> {
    constructor(props:Props){
        super(props)
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <div>
                <h3>Recent Reviews</h3>
                <hr/>
                <tbody>
        <Row xs="2" md="3" xl="6" style={{ overflow: "scroll", height: "60vh" }}>
          
        </Row>
      </tbody>
            </div>
        )
    }
}

export default PostTable;