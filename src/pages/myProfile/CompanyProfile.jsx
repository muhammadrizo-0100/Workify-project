import React, { useState, useEffect } from 'react';
import './CompanyProfile.css';
import fonts1 from "../../assets/Group 8768.svg";
import { fetchAPI } from '../../service/api';

// 🔔 Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    name: "TecCells LLC",
    industry: "Computer Software Company",
    since: "2015",
    city: "Tashkent",
    country: "Uzbekistan",
    phone: "+99894-498-65-65",
    email: "TechCells@mail.ru",
    telegram: "@TechCells",
    website: "www.TechCells.com",
    about: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempData, setTempData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchAPI('/companies/1');
        if (result.success && result.data) {
          setCompanyData(result.data);
        }
      } catch (error) {
        console.error("Data fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const result = await fetchAPI('/companies/1', {
      method: 'PUT',
      body: JSON.stringify(tempData),
    });

    if (result.success) {
      setCompanyData(tempData);
      setIsModalOpen(false);
      toast.success("Muvaffaqiyatli saqlandi!");
    } else {
      toast.error("Xatolik yuz berdi!");
    }
  };

  if (loading) return <div className="loader">Yuklanmoqda...</div>;

  return (
    <div className="profile-wrapper">
      <ToastContainer />

      <div className="profile-header">
        <div className="tab-menu">
          <span className="tab active">Company profile</span>
        </div>
        <button className="post-job-btn">Post a Job</button>
      </div>

      <div className="profile-content">
        {/* 1-rasmga mos: Profil kartasi */}
        <div className="left-card">
          <div className="edit-icon" onClick={() => { setTempData(companyData); setIsModalOpen(true); }}>
            ✎
          </div>

          <div className="profile-main-info">
            <div className="logo-container">
               {/* Logo ostidagi kamera ikonkasi uchun badge */}
              <img src={fonts1} alt="Logo" />
            </div>
            
            <h2 className="company-title">
              {companyData.name} <span className="verified">✔</span>
            </h2>
            <p className="industry">{companyData.industry}</p>
            
            <div className="rating">
              <span className="stars">★★★★☆</span>
              <span className="rating-text">(4.0) | 1K reviews</span>
            </div>
          </div>

          <div className="info-list">
            <h4>Company info:</h4>
            <div className="info-item"><span>Since:</span> <strong>{companyData.since}</strong></div>
            <div className="info-item"><span>City:</span> <strong>{companyData.city}</strong></div>
            <div className="info-item"><span>Country:</span> <strong>{companyData.country}</strong></div>
            <div className="info-item"><span>Phone:</span> <strong>{companyData.phone}</strong></div>
            <div className="info-item"><span>Email:</span> <strong>{companyData.email}</strong></div>
            <div className="info-item"><span>Telegram:</span> <strong>{companyData.telegram}</strong></div>
            <div className="info-item"><span>Website:</span> <strong>{companyData.website}</strong></div>
          </div>
        </div>

        {/* O'ng taraf (Statistika va About) */}
        <div className="right-sections">
          <div className="stats-card">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box"><h2>300</h2><p>Active jobs</p></div>
              <hr />
              <div className="stat-box"><h2>5210</h2><p>Posted Jobs</p></div>
              <hr />
              <div className="stat-box"><h2>56</h2><p>Hired talents</p></div>
            </div>
          </div>

          <div className="about-card">
            <div className="card-header">
              <h3>About company</h3>
              <span className="edit-icon" onClick={() => { setTempData(companyData); setIsModalOpen(true); }}>✎</span>
            </div>
            <p className={companyData.about ? "" : "placeholder-text"}>
              {companyData.about || "Please tell us something about your company..."}
            </p>
          </div>
        </div>
      </div>

      {/* 2-rasmga mos: Modal oynasi */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h2 className="modal-title">Edit Company details</h2>
            
            <div className="form-grid">
              <div className="input-group">
                <label>Company name</label>
                <input type="text" name="name" value={tempData.name || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" name="phone" value={tempData.phone || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Website</label>
                <input type="text" name="website" value={tempData.website || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Industry</label>
                <input type="text" name="industry" value={tempData.industry || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Country</label>
                <input type="text" name="country" value={tempData.country || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>City</label>
                <input type="text" name="city" value={tempData.city || ''} onChange={handleChange} />
              </div>
              
              <div className="input-group full-width">
                <label>About</label>
                <textarea name="about" value={tempData.about || ''} onChange={handleChange} />
              </div>
            </div>
            
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;