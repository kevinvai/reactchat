import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserTable from './Usertable'
import { Widget } from 'react-chat-widget';
import './Chatbox.css';
import 'tachyons'
import { isObject } from 'util';
const io = require('socket.io-client');
const messages = [];
const socket = io.connect('http://localhost:3002');
socket.on("connect", function(){
    console.log('hubo una conexion exitosa');
    socket.on('chat message', function(msg){
        messages.push(msg);
    })
});
class Chatbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: "",
            messages: []
        }
        this.onClickSend = this.onClickSend.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSocket = this.handleSocket.bind(this);
    }
    handleTextChange(event){
        this.setState({message: event.target.value});
    }

    handleSocket(message){
        console.log(message)
        messages.push(message);
        this.setState({messages: messages})
    }
    onClickSend(event){
        event.preventDefault();
        console.log('event: ' , event);
        socket.emit('chat message', this.state.message);
        this.setState({messages: messages});
    }
    

    render(){
        return(

            <div className="flex">
                <UserTable />
                <div className="center pa4 br3 shadow-5 body">
                    <h2>Chat window</h2>
                    <form action="form" onChange={this.handleTextChange} onSubmit={this.onClickSend}>
                        <ul>
                        {
                            this.state.messages.map(item => <li>{item}</li>)
                        }
                        </ul>
                    <input id="m" autocomplete="off"/><button>Send</button>
                    </form>
                </div>
                <Link to="/login">Log out</Link>
            </div>
        )
    }
}

export default Chatbox;