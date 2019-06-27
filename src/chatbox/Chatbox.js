import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserTable from './Usertable'
import { Widget } from 'react-chat-widget';
import './Chatbox.css';
import 'tachyons'
import { isObject } from 'util';
const io = require('socket.io-client');
let messages = [];
let usersOnline = [];
const socket = io.connect('http://localhost:3002');
socket.on("connect", function(){
    console.log('hubo una conexion exitosa');
    socket.on('chat message', function(msg){
        console.log('se escucha el broadcast: ' , msg)
        messages.push(msg);
    })
    socket.on('join', function (user) {
        usersOnline = usersOnline.filter(Boolean);
        usersOnline.push(user);
        console.log('users we have: ' + usersOnline);
    });
});
class Chatbox extends Component{
    constructor(props){
        super(props);
        console.log('props: ', props.username)
        this.state = {
            message: "",
            messages: [],
            username: props.username,
            usersonline: []
        }
        this.onClickSend = this.onClickSend.bind(this);
        this.onStatusChange = props.onStatusChange; //modifies app.js state
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);        
    }
    handleTextChange(event){
        this.setState({message: event.target.value});
    }

    handleButtonClick(){
        console.log('button was clicked')
        socket.emit('logout' , this.state.username);
        this.onStatusChange('offline' , null);
    }

    onClickSend(event){
        event.preventDefault();
        const usermsg = {
            message: this.state.message,
            username: this.state.username
        }
        socket.emit('chat message', usermsg);
        setInterval(()=> {
            this.setState({messages: messages})
        }, 500)
        //this.setState({messages: messages});
    }
    componentDidMount(){
        console.log('estamos enviando al lobby', this.state.username)
        socket.emit('join', this.state.username);
        setInterval(()=> {
            this.setState({usersonline: usersOnline})
        }, 1000)
    }
    render(){
        return(
            <div className="flex">
                <UserTable users={this.state.usersonline}/>
                <div className="center pa4 br3 shadow-5 body">
                    <h1>General chat</h1>
                    <form action="form" onChange={this.handleTextChange} onSubmit={this.onClickSend}>
                        <ul>
                        {
                            this.state.messages.map(({username, message}) => <li>{`${username = username === this.state.username ? "you " : username} say:   ${message}`}</li>)
                        }
                        </ul>
                    <input id="m" autocomplete="off"/><button>Send</button>
                    </form>
                </div>
                <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"onClick={this.handleButtonClick}>Log out</button>
            </div>
        )
        
    }

    
}

export default Chatbox;