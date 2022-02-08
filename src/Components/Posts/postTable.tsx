import React from "react";
import Radium from "radium";
import {Table, Button, Row, Col, List} from 'reactstrap';
import 'infinite-scroll';
import { logRoles } from "@testing-library/react";

type Props = {
    fetch: any,
    postArray: [],
    token: any,
    // scrollMore: any
}

class PostTable extends React.Component <Props,any> {
    constructor(props:Props){
        super(props)
        this.state ={
            isSpecific: false,
            searchArr: []
        }
        console.log('hit post table')
    }

    postMapper = () => {
        // this.props.fetch();
        console.log('postMapper');
        console.log(this.props.postArray)
        let posts: [] = this.state.isSpecific ? this.state.searchArr : this.props.postArray;
        console.log(posts); 
        return posts.map((posts: any) => {
            return (
                <Col>
                    <div>
                        <List type="unstyled">
                            <ul>
                                <li>Product: {posts.product}</li>
                                <li>Brand: {posts.brand}</li>
                                <li>{posts.content}</li>
                            </ul>
                        </List>
                    </div>
                </Col>
            )
        })

    }

    componentDidMount=()=>{

    }

    render(){
        console.log('table render');
        return(
            <div>
                <h3>Recent Reviews</h3>
                <hr/>
            
                <Row xs="2" md="3" xl="6" style={{ overflow: "scroll", height: "60vh" }}>
                {this.postMapper()}
                </Row>
            
            </div>
        )
    }
}

export default PostTable;