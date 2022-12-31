import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style.scss';
import Add from '../../images/addAvatar.png';
import Cookies from 'js-cookie'

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    const {
      name, 
      last_name,
      email, 
      password,
      password_confirmation
    } = this.state;

      axios
        .post("http://localhost:3001/registrations", {
          user: {
            name: name,
            last_name: last_name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.status === 'created') {
          Cookies.set('user', response.data.user.id)
          this.props.handleSuccessfulAuth(response.data);
          }
        })
        .catch(error => {
          console.log("registration error", error);
        });

      event.preventDefault();
  }

  render() {
    return (
      <div className="formContainer">
        <div className="formWrapper">
        <span className="logo">Pet Platform</span>
        <span className="title">Register</span>

        <form onSubmit={this.handleSubmit}>
          <input 
            className='input-name'
            type="name" 
            name="name" 
            placeholder='name' 
            value={this.state.name} 
            onChange={this.handleChange} 
            required 
          />
          <input 
            className='input-name'
            type="name" 
            name="last_name" 
            placeholder='last name' 
            value={this.state.last_name} 
            onChange={this.handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder='email' 
            value={this.state.email} 
            onChange={this.handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder='password' 
            value={this.state.password} 
            onChange={this.handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password_confirmation" 
            placeholder='password confirmation' 
            value={this.state.password_confirmation}  
            onChange={this.handleChange} 
            required 
          />
          <label className='flex'>
            <input
              type="file"
              style={{ display: "none" }}
              name="identity"
              value={this.state.identity} 
              onChange={this.handleChange} 
              required 
            />
            <img src={Add} alt="" />
            <span>Upload ID document</span>
          </label>
          <button type="submit">Sign up</button>
          {/* {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>} */}
          <p>You already have an account? <Link to="/signin">Login</Link></p>
        </form>
        </div>
      </div>
    );
  }
}


