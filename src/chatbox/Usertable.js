import React from "react";
import post from '../helperfunctions/postdata';

function UserTable() {
    //check users from API
    const token = localStorage.getItem("token");
    const usersURL = "https://0924b73d.ngrok.io/api/chats/users";
    const data = {
        Authorization: "beared{$token}"
    }
    let userlist = [
        "luis",
        "kevin",
        "andres",
        "joseph"
    ];
    /*post(usersURL, data).then(users => {
        console.log(users)
        if(users) userlist = [...users];
    })*/
    return ( 
        <div> 
            <h2>Users</h2>
        {
            userlist.map(user => ( <p> {
                    user
                } </p>
            ))
        } 
        </div>
    );
}

export default UserTable;