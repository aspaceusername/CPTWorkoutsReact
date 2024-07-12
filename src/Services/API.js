const API_URL = 'https://localhost:7258/api/Aulas';

export const getUsers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const addUser = async (user) => {
    const response = await fetch(`${API_URL}/insereUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const editUser = async (id, user) => {
    const response = await fetch(`${API_URL}/editUser?id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const signInUser = async (email, pass) => {
    const response = await fetch(`${API_URL}/signInUser?email=${email}&pass=${pass}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const createUser = async () => {
    const response = await fetch(`${API_URL}/createUser`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default {
    getUsers,
    addUser,
    editUser,
    signInUser,
    createUser,
};
