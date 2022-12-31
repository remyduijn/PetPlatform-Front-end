import React, { Component } from 'react';
import Login from '../components/authentication/Login';
import axios from 'axios';


export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    // localStorage.setItem("user", "ADMIN");

    console.log(data);
    window.location.href = "/community";
    // this.props.history.push(`/dashboard`);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }
 
  render() { 
    return (
        <div>
          <Login handleSuccessfulAuth={this.handleSuccessfulAuth} /> 
        </div>
    );
  }
}