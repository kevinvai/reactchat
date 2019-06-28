import React, { Component } from 'react';
import getData from '../../helperFunctions/getData';


class Chatbox extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages: ["1","2"],
            users: [],
            token: localStorage.token
        }
    };

    

    connect = () => {
        const connectURL = "http://localhost:9000/api/chats/connect";
        const token = this.state.token;
        return getData(connectURL, token)
        .then(response=>console.log(response));
    }

    showUsers = () => {
        const showUsersURL = "http://localhost:9000/api/chats/users";
        const token = this.state.token;
        return getData(showUsersURL, token)
        .then(response=>console.log(response));
    }

    componentDidMount() {
        this.connect();
        this.showUsers();
    }

    

    render() {
        return (
        
        <div>{this.state.messages}</div>
        )
    }
}

export default Chatbox;