import React from 'react';
import UserTable from './Usertable'
import { Widget } from 'react-chat-widget';
//import './Chatbox.css';

function Chatbox(){
    return(
        <div className="flex">
            <UserTable />
            <section className="chat-window">
                <p>text</p>
            </section>
            <Widget />
        </div>
    );
}

export default Chatbox;