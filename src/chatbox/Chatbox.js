import React from 'react';
import UserTable from './Usertable'
//import './Chatbox.css';

function Chatbox(){
    return(
        <div className="flex">
            <UserTable />
            <section className="chat-window">
                <p>text</p>
            </section>
        </div>
    );
}

export default Chatbox;