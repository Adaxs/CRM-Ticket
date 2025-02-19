// client/src/components/Dashboard.js
import React from 'react';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is saved in localStorage

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Role: {user.role}</p>
        </div>
    );
}

export default Dashboard;
