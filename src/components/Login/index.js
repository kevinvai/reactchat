import React, { Component } from 'react';
import { Redirect } from 'react-router';
import postData from '../../helperFunctions/postData';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            fireRedirect: false
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        
    }

    handleLogin(event) {
        event.preventDefault();
        console.log(this.state);
        const data = {
            login: this.state.email,
            password: this.state.password
        }
        console.log(data);
        const loginURL = "http://localhost:9000/api/auth/token";
        localStorage.removeItem("token");
        postData(loginURL, data)
        .then(response => localStorage.setItem("token", response.token))
        .then(response => console.log(response.token));
        this.setState({ fireRedirect: true })
    }

    render(){
        const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
        <div>
  <form onSubmit={this.handleLogin}>

        <h1>Login</h1>

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleInputChange}/><br/>

        <label htmlFor="password">Enter your password</label>
        <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/><br/>

        <button>Send data!</button>
      </form>
      {fireRedirect && (
        <Redirect to={from || '/'}/>
      )}
      </div>
    );}
}

export default Login;