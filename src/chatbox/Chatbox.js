import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserTable from './Usertable'
import { Widget } from 'react-chat-widget';
//import './Chatbox.css';

class Chatbox extends Component{
    constructor(props){
        super(props);
        //this.onStatusChange = this.props.onStatusChange;
        //this.handleRedirect = this.handleRedirect.bind(this);
    }


    render(){
        return(
            <div className="flex">
                <UserTable />
                <Widget />
                <section className="chat-window">
                    <p>text</p>
                </section>
                <Link to="/login">Log out</Link>
            </div>
        )
    }
}

export default Chatbox;