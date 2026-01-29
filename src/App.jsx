import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Layout from "./components/Layout.jsx";
import Talents from "./pages/Talent";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword1 from './pages/ForgotPassword1';
import ForgotPassword2 from './pages/ForgotPassword2';
import ForgotPassword3 from './pages/ForgotPassword3';
import ForgotPassword4 from './pages/ForgotPassword4';
import SignIn from "./pages/SignIn.jsx";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route element={<Layout />}>
          <Route path="/talents" element={<Talents />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password-1" element={<ForgotPassword1 />} />
          <Route path="/forgot-password-2" element={<ForgotPassword2 />} />
          <Route path="/forgot-password-3" element={<ForgotPassword3 />} />
          <Route path="/forgot-password-4" element={<ForgotPassword4 />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
      <Route element={<Layout />}>
        <Route path="/talents" element={<Talents />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

    </Routes>
  );
}

export default App;