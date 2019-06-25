import React , {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Chatbox from '../chatbox/Chatbox';
import post from '../helperfunctions/postdata';
import './Login.css'
const url = "https://0924b73d.ngrok.io/api/auth/token";
const data = {
	login: "Kevinandres",
	password: "123"
}
class Login extends Component {
    render(){
        const onClickLogin = () => {
            post(url, data).then((token) => {
                localStorage.setItem("token", token);
            })
        }
        return(
    <article className="Login">
        <main className="">
                <fieldset id="sign_up" className="">
                    <legend className="">Sign In</legend>
                    <div className="margin10">
                        <label className="" htmlFor="email-address">Email:</label>
                        <input className="" type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="margin10">
                        <label className="" htmlFor="password">Password:</label>
                        <input className="" type="password" name="password" id="password" />
                    </div>
                </fieldset>
                <div className="margin10">
                    <button 
                    onClick={() => onClickLogin()} //on route change
                    className="boton" 
                    value="Sign in">Sign in</button>
                </div>
        </main>
        </article >
        )
    }
}

export default Login;