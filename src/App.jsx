import { Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css'
//Layoutlar
import Layout from "./layout/Layout.jsx";
import MainLayout from "./layout/MainLayout.jsx";

// Pageslar
import Talents from './pages/talents/Talents.jsx';
import Talents2 from './pages/talents2/talents.jsx';
import Jobs from './pages/jobs/Jobs.jsx';
import Jobs2 from './pages/jobs2/jobs2.jsx';
import Home from './pages/home/Home.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import MyProfile from './pages/myProfile/CompanyProfile.jsx';
import Contacts from './pages/contacts/Contacts.jsx';
import FAQ from './pages/FAQ/FAQ.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        <Route path="/talents" element={<Talents />} />
        <Route path="/jobs" element={<Jobs />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/jobs2" element={<Jobs2 />} />
        <Route path="/talents2" element={<Talents2 />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
}

export default App;
