// client/src/components/PrivateRoute.js
import React from 'react';
import { Redirect } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is saved in localStorage

    if (!token || (requiredRole && user?.role !== requiredRole)) {
        return <Redirect to="/" />;
    }

    return children;
}

export default PrivateRoute;
