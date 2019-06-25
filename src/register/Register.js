import React , {Component} from 'react';
import post from '../helperfunctions/postdata';
import '../login/Login.css'
import 'tachyons'

const url = "https://0924b73d.ngrok.io/api/users";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "", //todo security
        }
        this.handleUserNameChange = this.handleEmailChange.bind(this);
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

        //set the token logic
        const data = { //TODO get values by handler
            username: this.state.username,
            email: this.state.email,
            password: this.state.password //todo security
        }

        post(url, data); // create token
    }

    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form onSubmit={this.handleSubmit}>
                    <fieldset id="sign_up" className="">
                        <legend className="">Sign In</legend>
                        <div className="">
                            <label className="" htmlFor="email-address">Name</label>
                            <input className="" value={this.state.username} onChange={this.handleUserNameChange} type="text" name="name" id="name" />
                        </div>
                        <div className="">
                            <label className="" htmlFor="email-address">Email</label>
                            <input className="" value={this.state.email} onChange={this.handleEmailChange} type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="">
                            <label className="" htmlFor="password">Password</label>
                            <input className="" value={this.state.password} onChange={this.handlePasswordChange} type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <button 
                        className="" 
                        type="submit" 
                        value="Register">Register</button>
                    </div>
                </form>
            </main>
            </article >
        )
    }
}

export default Register;