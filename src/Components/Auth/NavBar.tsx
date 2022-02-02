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
    DropdownItem
} from "reactstrap";

interface tokens {
    clickLogout: any,
    tokenUpdate: any
}

class NavBar extends React.Component<tokens, any> {
    constructor(props: tokens) {
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


    toggle() {
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
                    {/* <NavbarToggler onClick={this.toggle} size="sm" /> */}
                    {/* <Collapse isOpen={this.state.isOpen} navbar> */}
                        <Nav className="ml-auto" navbar>
                            <Nav>
                                <NavLink href="/components/">Components</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </Nav>
                        </Nav>
                    {/* </Collapse> */}
                </Navbar>
            </div>
        )
    }
}

export default Radium(NavBar);