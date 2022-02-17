import React from "react";
// import Radium from "radium";
import APIURL from "../../helpers/environment";
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
    updateOn: () => void,
    setCommentPost: (post: Posts)=>void,
    commentOn: ()=>void
    // scrollMore: any
}

type State = {
    isSpecific: boolean,
    searchArr: [],
    value: [],
    postProps: {},
}

class PostTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state={
            isSpecific: false,
            searchArr: [],
            value: [],
            postProps: this.props.postArray,
        }
    }

    deletePost = (post: Posts) => {
        console.log(post);
        fetch(`${APIURL}/post/delete/${post.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then(() => this.props.fetch())
    }

    componentDidMount() {
        this.props.fetch()
    }

    postMapper = () => {
        // this.props.fetch();
        console.log('postMapper');
        // console.log(this.props.postArray)
        // console.log(this.state.postProps)

        return this.props.postArray.map((post: any, idx: number) => {
            return (
                <Col key={idx}>
                    <div>
                        <List type="unstyled">
                            <ul className="posts">
                                <li style={{fontSize: '25px'}}>{post.product} from {post.brand}:</li>
                                <li style={{fontSize: '20px'}}>{post.content}</li>
                               {} 
                                <Button id="Btns" onClick={() => { this.props.editUpdatePost(post); this.props.updateOn() }}>update</Button>
                                <Button id="Btns" onClick={() => { this.deletePost(post) }}>Delete</Button>
                                <Button id="Btns" onClick={() => { this.props.setCommentPost(post); this.props.commentOn() }}>Comments</Button>
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

                <Row xs="2" md="3" xl="5" style={{ overflow: "scroll", height: "100vh" }}>
                    {this.postMapper()}
                </Row>

            </div>
        )
    }
}

export default PostTable;