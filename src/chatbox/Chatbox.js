import React, {Component} from 'react';
import UserTable from './Usertable'
import './Chatbox.css';
import 'tachyons'

class Chatbox extends Component{
    constructor(props){
        super(props);
        console.log('props: ', props.username)
        this.state = {
            messages: [], //fetch from api
            username: props.username,
            usersonline: [], //fetch from api to send to usertable component,
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
        this.onStatusChange('offline' , null);
    }

    onClickSend(event){
        event.preventDefault();
        this.setState({text: ""})
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
                            //this.state.messages.map(item => <li>{`${item.username = item.username === this.state.username ? "you " : item.username} say:   ${item.message}`}</li>)
                        }
                        </ul>
                    <input
                        id="m"
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        autocomplete="off" 
                        placeholder="Press enter key to send"
                        value={this.state.text}
                        />
                    </form>
                </div>
                <button className='button-sign-out grow f4 link ph3 pv2 dib white bg-light-purple' onClick={this.handleButtonClick}>Log out</button>
            </div>
        )
    }
}

export default Chatbox;