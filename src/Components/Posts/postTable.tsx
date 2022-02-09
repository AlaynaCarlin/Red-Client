import React from "react";
// import Radium from "radium";
import { Table, Button, Row, Col, List } from 'reactstrap';
import 'infinite-scroll';
import { Posts } from "./postIndex";
// import { logRoles } from "@testing-library/react";

type Props = {
    fetch: () => void,
    // ! issue
    postArray: object[],
    token: string,
    setPosts: (searchItem: string) => void,
    editUpdatePost: (post: Posts) => void,
    updateOn: () => void
    // scrollMore: any
}



class PostTable extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isSpecific: false,
            searchArr: [],
            value: [],
            postProps: this.props.postArray
        }
        console.log('hit post table')
    }

    deletePost = (post: Posts) => {
        console.log(post);
        fetch(`http://localhost:3000/post/delete/${post.id}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(() => this.props.fetch())
    }

    componentDidMount () {
        this.props.fetch()
    }

    postMapper = () => {
        // this.props.fetch();
        console.log('postMapper');
        console.log(this.props.postArray)
        // console.log(this.state.postProps)
        
        return this.props.postArray.map((post: any, idx: number) =>{
            return (
                <Col key={idx}>
                    <div>
                        <List type="unstyled">
                            <ul>
                                <li>Product: {post.product}</li>
                                <li>Brand: {post.brand}</li>
                                <li>{post.content}</li>
                                <Button onClick={() => {this.props.editUpdatePost(post); this.props.updateOn()}}>update</Button>
                                <Button onClick={() => {this.deletePost(post)}}>Delete</Button>
                            </ul>
                        </List>
                    </div>
                </Col>
            )
        })

    }


    render() {
        console.log('table render');
        return (
            <div>
                <h3>Recent Reviews</h3>
                <hr />

                <Row xs="2" md="3" xl="6" style={{ overflow: "scroll", height: "100vh" }}>
                    {this.postMapper()}
                </Row>

            </div>
        )
    }
}

export default PostTable;