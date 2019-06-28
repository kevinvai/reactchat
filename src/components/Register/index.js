import React, { Component } from 'react';
import { Redirect } from 'react-router';
import postData from '../../helperFunctions/postData';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            fireRedirect: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        
    }

    handleRegister(event) {
        event.preventDefault();
        console.log(this.state);
        const data = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(data);
        const registerURL = "http://localhost:9000/api/users";
        postData(registerURL, data)
        .then(response => console.log(response));

        this.setState({ fireRedirect: true })
    }

    render(){
        const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
        <div>
  <form onSubmit={this.handleRegister}>

        <h1>Register</h1>

        <label htmlFor="name">Enter name</label>
        <input id="name" name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/><br/>

        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleInputChange}/><br/>

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleInputChange}/><br/>

        <label htmlFor="password">Enter your password</label>
        <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/><br/>

        <button>Send data!</button>
      </form>
      {fireRedirect && (
        <Redirect to={from || '/Login'}/>
      )}
      </div>
    );}
}

export default Register;