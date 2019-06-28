import React from "react";
import post from '../helperfunctions/postdata';
import 'tachyons';

function UserTable(props) {
    //check users from API
    const token = localStorage.getItem("token");
    const usersURL = "http://localhost:9000/api/chats/users";
    const authkey = "Bearer " + localStorage.getItem("Token");
    //fake placeholder while api is down
    const users = [
        "Kevin",
        "Andres",
        "Joe"
    ];
    console.log("data auth: " , authkey);
    //get users from api and update state with received values to display
    /*fetch(usersURL,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        withCredentials: true,
        credentials: 'same-origin', // include, *same-origin, omit
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorized': authkey
        })
    }).then(response => {
        console.log("response from users: " , response);
    })*/
    return ( 
        <div className='left'>
            <h1>Chat Users</h1>
            <div className='center pa4 br3 shadow-5'>
                <table>
                    <thead>
                        <th>Users</th>
                    </thead>
                    <tbody>
                        {
                            users ? (
                                users.map(user => <tr>{user}</tr>)
                            ) : 
                            (
                                <td>No users..</td>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserTable;