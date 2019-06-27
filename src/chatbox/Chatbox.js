import React, {Component} from 'react';
import UserTable from './Usertable'
import './Chatbox.css';
import 'tachyons'
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3002');
//control variables, refactor possibly by redux store
let messages = [];
let usersOnline = [];
//-------------------socket logic----------------
socket.on("connect", function(){
    console.log('hubo una conexion exitosa');
    socket.on('chat message', function(msg){
        console.log('se escucha el broadcast: ' , msg)
        messages.push(msg);
    })
    socket.on('logout', function(msg){
        console.log('se escucha el broadcast: ' , msg)
        let message = {
            username: msg,
            message: "left the room"
        }
        messages.push(message);
    })

    socket.on('join', function (user) {
        usersOnline = user;
        console.log('users we have: ' + usersOnline);
    });
});
//------------------socket logic end---------------------------
class Chatbox extends Component{
    constructor(props){
        super(props);
        console.log('props: ', props.username)
        this.state = {
            message: "",
            messages: [],
            username: props.username,
            usersonline: [],
            text: ""
        }
        this.onClickSend = this.onClickSend.bind(this);
        this.onStatusChange = props.onStatusChange; //modifies app.js state
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);        
    }
    handleTextChange(event){
        this.setState({message: event.target.value, text: event.target.value});
    }

    handleButtonClick(){
        socket.emit('logout' , this.state.username);
        this.onStatusChange('offline' , null);
    }

    onClickSend(event){
        event.preventDefault();
        const usermsg = {
            message: this.state.message,
            username: this.state.username
        }
        this.setState({text: ""})
        socket.emit('chat message', usermsg);
    }
    componentDidMount(){
        socket.emit('join', this.state.username);
        //initialize messaging
        setInterval(()=> {
            this.setState({messages: messages, usersonline: usersOnline})
        }, 500)
    }

    render(){
        return(
            <div className="flex">
                <UserTable users={this.state.usersonline}/>
                <div className="center pa4 br3 shadow-5 body">
                    <h1>General chat</h1>
                    <form action="form" onChange={this.handleTextChange} onSubmit={this.onClickSend}>
                        <ul>
                            <li>You joined the chat</li>
                        {
                            this.state.messages.map(item => <li>{`${item.username = item.username === this.state.username ? "you " : item.username} say:   ${item.message}`}</li>)
                        }
                        </ul>
                    <input id="m" autocomplete="off" value={this.state.text}/><button>Enter</button>
                    </form>
                </div>
                <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"onClick={this.handleButtonClick}>Log out</button>
            </div>
        )
    }
}

export default Chatbox;