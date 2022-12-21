import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getLocalData } from '../utils/localStorage';

export const  ReqAuth =({ children })=> {

    const token = getLocalData("token")
    // const location = useLocation();
    if (token) return children;
    return <Navigate to={'/login'} />
}

