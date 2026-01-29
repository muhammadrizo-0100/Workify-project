import React, { useState, useEffect } from 'react';
import './CompanyProfile.css';
import fonts1 from "../../assets/Group 8768.svg";
import { companyAPI } from '../../service/api'; 
import image from "../../assets/image 389.svg"

// 🔔 Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    id: "",
    name: "",
    industry: "",
    since: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    telegram: "",
    website: "",
    about: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempData, setTempData] = useState({
    name: "",
    industry: "",
    since: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    about: ""
  });
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await companyAPI.getCompany();

        if (result.success && result.data) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            const company = result.data[0];
            setCompanyData(company);
            setCompanyId(company.id);
          }
          else if (typeof result.data === 'object') {
            setCompanyData(result.data);
            setCompanyId(result.data.id);
          }
          else {
            toast.info("Sizda hali kompaniya profili mavjud emas");
          }
        } else {
          toast.error("Ma'lumot yuklanmadi: " + (result.error || "Noma'lum xato"));
        }
      } catch (error) {
        console.error("Data fetch error", error);
        toast.error("Server bilan bog'lanishda xatolik");
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
    if (!companyId) {
      toast.error("Kompaniya ID topilmadi");
      return;
    }

    try {
      // Barcha kerakli fieldlarni yuborish
      const updateData = {
        name: tempData.name || companyData.name,
        industry: tempData.industry || companyData.industry,
        since: tempData.since || companyData.since,
        city: tempData.city || companyData.city,
        country: tempData.country || companyData.country,
        phone: tempData.phone || companyData.phone,
        email: tempData.email || companyData.email,
        website: tempData.website || companyData.website,
        about: tempData.about || companyData.about,
        telegram: tempData.telegram || companyData.telegram
      };

      const result = await companyAPI.updateCompany(companyId, updateData);

      if (result.success) {
        // Yangilangan ma'lumotlarni state'ga o'rnatish
        setCompanyData(prev => ({
          ...prev,
          ...updateData
        }));
        
        toast.success("Muvaffaqiyatli saqlandi!", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsModalOpen(false);
      } else {
        toast.error("Xatolik yuz berdi: " + (result.error || "Noma'lum xato"), {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error("Save error", error);
      toast.error("Saqlashda xatolik yuz berdi");
    }
  };

  const openEditModal = () => {
    // Joriy ma'lumotlarni to'liq nusxalash
    setTempData({
      name: companyData.name || "",
      industry: companyData.industry || "",
      since: companyData.since || "",
      city: companyData.city || "",
      country: companyData.country || "",
      phone: companyData.phone || "",
      email: companyData.email || "",
      website: companyData.website || "",
      about: companyData.about || "",
      telegram: companyData.telegram || ""
    });
    setIsModalOpen(true);
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
        {/* Left Card - Company Profile */}
        <div className="left-card">
          <div className="edit-icon" onClick={openEditModal}>
            ✎
          </div>

          <div className="profile-main-info">
            <div className="logo-container">
              <img src={fonts1} alt="Logo" />
            </div>

            <h2 className="company-title">
              {companyData.name} <span className="verified"><img src={image} alt="" /></span>
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
            <div className="info-item"><span>Website:</span> <strong>{companyData.website}</strong></div>
          </div>
        </div>

        {/* Right Side - Statistics and About */}
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
              <span className="edit-icon" onClick={openEditModal}>✎</span>
            </div>
            <p className={companyData.about ? "" : "placeholder-text"}>
              {companyData.about || "Please tell us something about your company..."}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h2 className="modal-title">Edit Company details</h2>

            <div className="form-grid">
              <div className="input-group">
                <label>Company name</label>
                <input
                  type="text"
                  name="name"
                  value={tempData.name || ''}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>

              <div className="input-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={tempData.phone || ''}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="input-group">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={tempData.website || ''}
                  onChange={handleChange}
                  placeholder="www.example.com"
                />
              </div>

              <div className="input-group">
                <label>Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={tempData.industry || ''}
                  onChange={handleChange}
                  placeholder="Enter industry"
                />
              </div>

              <div className="input-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={tempData.country || ''}
                  onChange={handleChange}
                  placeholder="Enter country"
                />
              </div>

              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={tempData.city || ''}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>



              <div className="input-group full-width">
                <label>About Company</label>
                <textarea
                  name="about"
                  value={tempData.about || ''}
                  onChange={handleChange}
                  placeholder="Tell us about your company..."
                  rows="4"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;