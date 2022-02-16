import React from "react";
// import Radium from "radium";
import Users from "./Users";
import PostIndex from "../Posts/postIndex";
import Auth from "./Auth";
import { Route, Link, Routes } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from "reactstrap";

interface Props {
    clickLogout: ()=>void,
    tokenUpdate: (newToken: string)=>void,
    token: string
}

type State = {
    isOpen: boolean,
    hasError: boolean,
    getUsers: boolean,
    postActive: boolean,
    searchActive: boolean
    // postOn: ()=>void,
}

class NavBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            hasError: false,
            getUsers: false,
            postActive: false,
            searchActive:false
        };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error, errorInfo);
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount = () => {

    }

    usersOn = () => {
        this.setState({
            getUsers: true
        })
    }

    usersOff = () => {
        this.setState({
            getUsers: false
        })
    }
    // !======
    postOn = () => {
        this.setState({
            postActive: true
        })
    }

    postOff = () => {
        this.setState({
            postActive: false
        })
    }
    // !==========
    
    searchOn = () =>{
        this.setState({
            searchActive: true
        })
    }
    
    searchOff = () => {
        this.setState({
            searchActive: false
        })
    } 


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return (
            <div>
                <Navbar color="light" light expand='md' className="nav">
                    <NavbarBrand href="/">Class&Sass</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={()=>this.props.clickLogout()}>Logout</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => { this.postOn() }}>Post</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => {this.searchOn() }}>Search</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => this.usersOn()}><Link to='/users'>Users</Link></Button>
                        </NavItem>
                        <NavItem>
                            <Button><Link to='/home'>Home</Link></Button>
                        </NavItem>
                    </Nav>
                </Navbar>
                <div>
                    <Routes>
                        <Route path='/users' element={<Users usersOff={this.usersOff} token={this.props.token}/>}/>
                        <Route path='/home' element={<PostIndex token={this.props.token} postOff={this.postOff} postActive={this.state.postActive} searchOff={this.searchOff} searchActive={this.state.searchActive}/>}/>
                    </Routes>
                </div>
                {this.state.getUsers ?
                    <></> :
                    <PostIndex
                        token={this.props.token}
                        postOff={this.postOff}
                        postActive={this.state.postActive}
                        searchOff={this.searchOff}
                        searchActive={this.state.searchActive}
                    />}
            </div>
        )
    }
}

export default NavBar;