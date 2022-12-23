import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getLocalData } from '../utils/localStorage';
import { useSelector } from 'react-redux';

export const  ReqAuth =({ children })=> {

    const token = getLocalData("token")

    // const isAuth = useSelector((store) => store.AuthReducer.isAuth)

    if (token) return children;
    return <Navigate to={'/login'} />
}

