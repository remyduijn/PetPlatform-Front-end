import React, { Component } from 'react';
import Registration from '../components/authentication/Registration';
// import axios from 'axios';
import Container from 'react-bootstrap/Container';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    window.location.href = "/community";
    // this.props.history.push("/dashboard");
  }

//   handleLogoutClick() {
//     axios
//       .delete("http://localhost:3001/logout", { withCredentials: true })
//       .then(response => {
//         this.props.handleLogout();
//       })
//       .catch(error => {
//         console.log("logout error", error);
//       });
//   }
 
  render() { 
    return (
        <div>
            <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
    );
  }
}