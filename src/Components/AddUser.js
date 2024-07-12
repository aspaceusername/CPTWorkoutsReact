/*import React, { useState } from 'react';
import { addUser } from 'src\Services\API.js';

const AddUser = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { Nome: name, Password: password };
        try {
            await addUser(user);
            console.log("User added successfully");
        } catch (error) {
            console.error("There was an error adding the user!", error);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;
*/