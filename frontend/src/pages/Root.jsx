/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import { AuthProvider } from '@context/AuthContext';

function Root()  {
return (

    
<AuthProvider>
    <PageRoot/>
</AuthProvider>
);
}

function PageRoot() {
return (
    <>
        <Navbar />
        <Outlet />
    </>
);
}

export default Root;