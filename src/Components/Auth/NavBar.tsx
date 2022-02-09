import React from "react";
import Radium from "radium";
import Login from "./Login";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from "reactstrap";

interface Props {
    clickLogout: any,
    tokenUpdate: any
}

class NavBar extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            hasError: false
        };
    }

    static getDerivedStateFromError(error:any) {
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

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
          }
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Class&Sass</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button onClick={this.props.clickLogout}>Logout</Button>
                            </NavItem>
                            <NavItem>
                                <Button>Post</Button>
                            </NavItem>
                            <NavItem>
                                <Button>Search</Button>
                            </NavItem>
                            <NavItem>
                                <Button>Users</Button>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;