import React from "react";
// import Radium from "radium";
import { Posts } from "./postIndex";
import { Input, Button, Form, Row, Col } from 'reactstrap';

type Props = {
    token: string,
    setPosts: (searchItem: string) => void,
    searchOff: () => void,
    reFetch: () => void
}

type State = {
    searchPosts: Posts[],
    searchTerm: string
}

class SearchPost extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            searchPosts: [],
            searchTerm: ''
        }
    }

    handleChange = () => {
        this.props.setPosts(this.state.searchTerm);
        this.setState({
            searchTerm: ''
        })
    }

    close = () => {
        this.props.searchOff();
        this.props.reFetch();
    }

    render() {
        return (
            <div>
                <Form onSubmit={e => { e.preventDefault(); this.handleChange() }} className='search'>
                    <Row xs="1" md='3' xl='3'>
                        <Col>
                            <h4>Search for a Post</h4>
                        </Col>
                        <Col>
                            <Input placeholder="search " onChange={(e) => this.setState({ searchTerm: e.target.value })} />
                        </Col>
                        <Col>
                            <Button id="Btns" type="submit">Search</Button>
                            <Button id="Btns" onClick={() => this.close()}>Close</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default SearchPost;