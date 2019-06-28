import React , {Component} from 'react';
import post from '../helperfunctions/postdata';
import '../login/Login.css'
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import 'tachyons'
import { thisExpression } from '@babel/types';

const url = "http://localhost:9000/api/users";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "", //todo security
        }
        this.onTokenChange = props.onTokenChange; //modifies app.js state
        this.onStatusChange = props.onStatusChange; //modifies app.js state
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }
    
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit(event) {
        console.log('this was submitted: ' + this.state.email + " and " + this.state.username);
        event.preventDefault();
        if(this.state.email.length < 1 || this.state.password.length < 1 || this.state.username.length < 1) return alert("fill the goddamn form");

        //set the token logic
        const data = { 
            name: this.state.username,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password //todo security
        }

        //post(url, data); // create token
        //place holder porque la api no funciona
        post(url, data).then((response) => {
            console.log('the token recieved' , response);
            this.onStatusChange("Online", this.state.email)
        })
    }

    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure" onSubmit={this.handleSubmit}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" value={this.state.username} onChange={this.handleUserNameChange} type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" value={this.state.email} onChange={this.handleEmailChange} type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" value={this.state.password} onChange={this.handlePasswordChange} type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                <Link to="/login" className="f6 link dim black db pointer">Already have an account? Login</Link>
                </div>
                </form>
            </main>
            </article >
        )
    }
}

export default Register;