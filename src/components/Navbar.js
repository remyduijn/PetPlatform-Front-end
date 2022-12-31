import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import store from "../store"
import '../styles/Navbar.css';


const Div = styled.div`
  background-color: #f69d9d; 
  padding-top: 5px;
  padding-bottom: 5px;
`;

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        localStorage.removeItem("user");
        Cookies.remove('user')
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    const userName = store.getState().loggedInUser?.loggedInUser?.full_name
    console.log("store.getState().loggedInUser?.loggedInUser" , store.getState().loggedInUser?.loggedInUser?.id)

    return (
      <Div>
        <Navbar expand="lg" className='position-sticky'>
          <Container>
          <Navbar.Brand as={Link} to={"/"} className="fontBold" id="logo">Pet Platform</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/"} className="text homeButton">Home</Nav.Link>
                <Nav.Link as={Link} to={"/dashboard"} className="text">Dashboard</Nav.Link>
                <Nav.Link as={Link} to={"/chatrooms"} className="text">Chat</Nav.Link>
                <Nav.Link as={Link} to={"/communityform"} className="text">Community Help </Nav.Link>
                <Nav.Link as={Link} to={"/signin"} onClick={() => this.handleLogoutClick()} className="text">Logout</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link className='text-white p-0 user-icon'><i class="bi bi-person-circle"></i><span className='px-1 ms-1'>{userName}</span></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Div>
    );
  }
}


