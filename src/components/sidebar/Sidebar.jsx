import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './Sidebar.css'; 

// Rasmlar
import page0 from '../../assets/Group 8768.svg';
import page1 from '../../assets/page1.svg';
import page2 from '../../assets/page2.svg';
import page3 from '../../assets/page3.svg';
import page4 from '../../assets/page4.svg';
import page5 from '../../assets/page5.svg';
import page6 from '../../assets/page6.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Yuklanmoqda...",
    location: "...",
    avatar: null
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => {
        setUser({
          name: data.company.name,
          location: data.address.city,
          avatar: null
        });
      })
      .catch(() => {
        setUser({ name: "Xatolik yuz berdi", location: "Noma'lum", avatar: null });
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', icon: page1, label: 'Dashboard', end: true },
    { path: '/myProfile', icon: page2, label: 'My company' },
    { path: '/jobs2', icon: page3, label: 'My jobs' },
    { path: '/talents2', icon: page4, label: 'Talents' },
    { path: '/faq', icon: page5, label: 'FAQ' },
    { path: '/contacts', icon: page6, label: 'Contacts' },
  ];

  return (
    <aside className="sidebar-container">
      {/* Profil qismi */}
      <div className="sidebar-profile">
        <div className="profile-image-wrapper">
          <img
            src={user.avatar || page0}
            alt="Profile"
            onError={(e) => { e.target.src = page0; }}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-location">{user.location}</p>
        </div>
      </div>

      {/* Navigatsiya */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src={item.icon} alt={item.label} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Chiqish tugmasi */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;