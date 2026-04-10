import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({ children }) {
    if(!localStorage.getItem('Token')){
        return <Navigate to = {"/login"} />
    }
    return children;
}