import React, { UseState, Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../style.scss';
import Cookies from 'js-cookie'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value 
    });  
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    
    axios
    .post("http://localhost:3001/sessions", {
      user: {
        email: email,
        password: password
      }
    },
    { withCredentials: true }
    )
    .then(response => {
      // console.log("res from login", response);
      
      if (response.data.logged_in) {
        Cookies.set('user', response.data.user.id)
        this.props.handleSuccessfulAuth(response.data);
      }
    })
    .catch(error => {
      console.log("login error", error);
    });
    
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="formContainer">
        <div className="formWrapper">
        <span className="logo">Pet Platform</span>
        <span className="title">Login</span>

        <form onSubmit={this.handleSubmit}>
          <input 
            className="break1"
            type="email" 
            name="email" 
            placeholder='email' 
            value={this.state.email} 
            onChange={this.handleChange} 
            required 
          />
          <input 
            className="break1"
            type="password" 
            name="password" 
            placeholder='password' 
            value={this.state.password} 
            onChange={this.handleChange} 
            required 
          />
          <button className="button" type="submit">Sign in</button>
          <p>You don't have an account? <Link to="/signup">Register</Link></p>
        </form>
        </div>
      </div>
    );
  }
}


