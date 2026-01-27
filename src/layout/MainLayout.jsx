import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import './MainLayout.css'; 

const MainLayout = () => {
    return (
        <div className="layout-wrapper">
            <Sidebar />
        
            <main className="content-area">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;