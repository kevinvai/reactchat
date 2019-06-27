import React , {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import Chatbox from '../chatbox/Chatbox';
import post from '../helperfunctions/postdata';
import './Login.css'
import { functionTypeAnnotation, thisTypeAnnotation } from '@babel/types';
const urlToken = "http://localhost:9000/api/auth/token";
const urlStatus = "http://localhost:9000/api/chats/connect";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.onStatusChange = props.onStatusChange; //modifies app.js state
        //this.onRouteChange = props.onRouteChange;
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.onRouteChange = this.onRouteChange.bind(this);
    }
    
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.email.length < 1 || this.state.password.length < 1) return alert("fill the goddamn form")
        console.log('this was submitted: ' + this.state.email + " and " + this.state.password);

        //get the token logic
        const dataToken = {
            login: this.state.email,
            password: this.state.password //todo security
        }

        post(urlToken, dataToken).then(response => {
            console.log(response);
            localStorage.removeItem("Token")
            if(response.token) localStorage.setItem("Token", response.token);
            else return alert('no jalo')
            this.onStatusChange("online" , this.state.email)
            const dataStatus = {
                Authorization: "Bearer " + response.token
            }

            console.log("token before fetching " , response.token)

            //fetch(urlStatus, dataStatus).then(response => console.log("response del fetch : " , response))
        })
        
    }

    render(){
        return(
<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
            <form className="measure" onSubmit={this.handleSubmit}>
                <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Log In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 required" htmlFor="email-address">Email</label>
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
                    value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                   <Link to="/register" className="f6 link dim black db pointer">Register</Link>
                </div>
            </form>
        </main>
        </article >
        )
    }
}

export default Login;