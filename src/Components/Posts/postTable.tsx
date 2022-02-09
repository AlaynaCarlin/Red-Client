import React from "react";
// import Radium from "radium";
import { Table, Button, Row, Col, List } from 'reactstrap';
import 'infinite-scroll';
// import { logRoles } from "@testing-library/react";

type Props = {
    fetch: () => void,
    // ! issue
    postArray: object[],
    token: string,
    setPosts: (searchItem: string) => void
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

    componentDidMount () {
        // this.setState({postProps: this.props.postArray})
        this.props.fetch()
    }

    postMapper = () => {
        // this.props.fetch();
        console.log('postMapper');
        console.log(this.props.postArray)
        console.log(this.state.postProps)
        
        // console.log(posts);
        
        return this.props.postArray.map((post: any, idx: number) =>{
            return (
                <Col key={idx}>
                    <div>
                        <List type="unstyled">
                            <ul>
                                <li>Product: {post.product}</li>
                                <li>Brand: {post.brand}</li>
                                <li>{post.content}</li>
                                <Button>update</Button>
                                <Button>Delete</Button>
                            </ul>
                        </List>
                    </div>
                </Col>
            )
        })

    }

    componentDidUpdate = () => {
        // this.setState({postProps: this.state.isSpecific ? this.state.searchArr : this.props.postArray}) 
    }

    render() {
        console.log('table render');
        return (
            <div>
                <h3>Recent Reviews</h3>
                <hr />
                <ul>
                    {/* <li>{this.props.postArray[1].product}</li> */}
                </ul>

                <Row xs="2" md="3" xl="6" style={{ overflow: "scroll", height: "100vh" }}>
                    {this.postMapper()}
                </Row>

            </div>
        )
    }
}

export default PostTable;