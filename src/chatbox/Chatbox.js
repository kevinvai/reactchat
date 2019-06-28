import React from 'react';
import UserTable from './Usertable'
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';//import './Chatbox.css';

function Chatbox(){
    return(
        <div className="flex">
            <UserTable />
            <Widget />
            <section className="chat-window">
                <p>text</p>
            </section>
            <Widget />
        </div>
    );
}

export default Chatbox;