import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import PokeballLogo from "../assets/pokeball.png"

class NavBar extends Component {
    routeToLink = (link) => {
        this.props.history.push(link)
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{'font-size': '20px'}}>
                <img src={PokeballLogo} height="35px"/>
                <Navbar.Brand className="btn btn-lg" onClick={() => this.routeToLink('/')}>Pokemon
                    Database
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="btn btn-lg" onClick={() => this.routeToLink('/')}>Home</Nav.Link>
                        <Nav.Link className="btn  btn-lg" onClick={() => this.routeToLink('/mypokemons')}>Catch 'em
                            All</Nav.Link>
                        <NavDropdown title="Games" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Game 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Game 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Game 3</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link className="btn btn-lg" onClick={() => this.routeToLink('/me')}>
                            Hello {this.props.currentUser}
                        </Nav.Link>
                        {this.props.currentUser === '' &&
                        (<Nav.Link onClick={() => this.routeToLink('login')}>
                            Log In
                        </Nav.Link>)}
                        {this.props.currentUser !== '' &&
                        (<Nav.Link onClick={this.props.logoutUser}>
                            Log Out
                        </Nav.Link>)}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavBar);