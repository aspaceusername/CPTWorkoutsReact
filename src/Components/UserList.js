import React, { useEffect, useState } from 'react';
import { getUsers } from 'src\Services\API.js';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(setUsers).catch(error => {
            console.error("There was an error fetching the users!", error);
        });
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.Nome}>{user.Nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
