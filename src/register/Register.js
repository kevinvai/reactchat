import React , {Component} from 'react';
import post from '../helperfunctions/postdata';
import '../login/Login.css'

const url = "https://0924b73d.ngrok.io/api/users";
const data = { //TODO get values by handler
        name: "Kevin3",
        "username": "kevin3",
        "email": "kevin33@test.com",
        "password": "123"
}
class Register extends Component {

    render(){
    const onClickRegister = () => {
         post(url, data); // create token
    }
        return(
            <article className="Login">
            <main className="">
                <form className="">
                    <fieldset id="sign_up" className="">
                        <legend className="">Sign In</legend>
                        <div className="">
                            <label className="" htmlFor="email-address">Name</label>
                            <input className="" type="text" name="name" id="name" />
                        </div>
                        <div className="">
                            <label className="" htmlFor="email-address">Email</label>
                            <input className="" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="">
                            <label className="" htmlFor="password">Password</label>
                            <input className="" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <button 
                        onClick={() => onClickRegister()} 
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