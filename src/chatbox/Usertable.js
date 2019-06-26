import React from "react";
import post from '../helperfunctions/postdata';

function UserTable() {
    //check users from API
    const token = localStorage.getItem("token");
    const usersURL = "http://localhost:9000/api/chats/users";
    const data = {
        Authorization: "Beared " + localStorage.getItem("Token")
    }

    const authkey = "Beared " + localStorage.getItem("Token");

    console.log("data auth: " , authkey);

    fetch(usersURL,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorized': authkey
        })
    }).then(response => {
        console.log("response from users: " , response);
    })
    return ( 
        <div> 
            <h2>Users</h2>
      
        </div>
    );
}

export default UserTable;