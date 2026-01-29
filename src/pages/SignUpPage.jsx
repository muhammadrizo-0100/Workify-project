import React, { useState } from "react";
import img1 from "../assets/Group 8634.svg";
import img2 from "../assets/phone.svg";
import img3 from "../assets/08-Email.svg";
import img4 from "../assets/Group (1).svg";
import img5 from "../assets/Vector.svg";
import img7 from "../assets/Group (2).svg";
import axios from "axios";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("company"); // 'talent' yoki 'company'
  const [companyData, setCompanyData] = useState({
    company_name: "",
    phone: "",
    email: "",
    password: "",
    website: "",
    industry: "",
    country: "",
    city: "",
  });

  const countries = [
    "Uzbekistan",
    "USA",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Russia",
    "China",
    "India",
    "Turkey",
    "Kazakhstan",
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Construction",
    "Transportation",
    "Hospitality",
    "Other",
  ];

  const handleChange = (e) =>
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (userType === "company") {
      const { company_name, email, password } = companyData;
      if (!company_name || !email || !password) {
        setError("Please fill all required fields");
        return;
      }

      try {
        setIsLoading(true);
        await axios.post(
          "https://workifybackend-production.up.railway.app/api/company/register",
          companyData,
          { headers: { "Content-Type": "application/json" } },
        );

        setSuccess("Company successfully registered!");
        setCompanyData({
          company_name: "",
          phone: "",
          email: "",
          password: "",
          website: "",
          industry: "",
          country: "",
          city: "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Registration failed. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // Talent uchun submit logikasi
      alert("Talent registration functionality will be implemented here");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <main className="signup-main">
          {/* User Type Selector */}
          <div className="user-type-selector">
            <div className="user-type-tabs">
              <button
                type="button"
                className={`user-tab ${userType === "talent" ? "active" : ""}`}
                onClick={() => setUserType("talent")}
              >
                Talent
              </button>
              <button
                type="button"
                className={`user-tab ${userType === "company" ? "active" : ""}`}
                onClick={() => setUserType("company")}
              >
                Company
              </button>
            </div>
          </div>

          {error && <div className="alert alert-error">❌ {error}</div>}
          {success && <div className="alert alert-success">✅ {success}</div>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>{userType === "company" ? "" : "Talent Registration"}</h2>

            {userType === "company" ? (
              // Company Registration Form
              <div className="form-grid">
                {/** Company Name */}
                <div className="form-group">
                  <label>Company name *</label>
                  <div className="input-with-icon">
                    <img src={img1} alt="company" className="input-icon" />
                    <input
                      type="text"
                      name="company_name"
                      value={companyData.company_name}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                </div>

                {/** Phone */}
                <div className="form-group">
                  <label>Phone *</label>
                  <div className="input-with-icon">
                    <img src={img2} alt="phone" className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={companyData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                {/** Email */}
                <div className="form-group">
                  <label>Email *</label>
                  <div className="input-with-icon">
                    <img src={img3} alt="email" className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={companyData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                {/** Password */}
                <div className="form-group">
                  <label>Password *</label>
                  <div
                    className="input-with-icon password-container"
                    style={{ position: "relative" }}
                  >
                    <img src={img4} alt="lock" className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={companyData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                      style={{ paddingRight: "2.5rem" }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {showPassword ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#64748b"
                          strokeWidth="2"
                          width="20"
                          height="20"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#64748b"
                          strokeWidth="2"
                          width="20"
                          height="20"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/** Website */}
                <div className="form-group">
                  <label>Website</label>
                  <div className="input-with-icon">
                    <img src={img5} alt="website" className="input-icon" />
                    <input
                      type="url"
                      name="website"
                      value={companyData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/** Industry */}
                <div className="form-group">
                  <label>Industry *</label>
                  <div className="input-with-icon">
                    <img src={img5} alt="industry" className="input-icon" />
                    <select
                      name="industry"
                      value={companyData.industry}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select industry</option>
                      {industries.map((ind, i) => (
                        <option key={i} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/** Country */}
                <div className="form-group">
                  <label>Country *</label>
                  <div className="input-with-icon">
                    <img src={img7} alt="country" className="input-icon" />
                    <select
                      name="country"
                      value={companyData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select country</option>
                      {countries.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/** City */}
                <div className="form-group">
                  <label>City *</label>
                  <div className="input-with-icon">
                    <img src={img1} alt="city" className="input-icon" />
                    <input
                      type="text"
                      name="city"
                      value={companyData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Talent Registration Form - Hech qanday input yo'q
              <div className="talent-placeholder">
                <p
                  style={{
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "16px",
                    padding: "40px 20px",
                  }}
                >
                  Talent registration form will be available soon.
                </p>
              </div>
            )}

            {/* Back va Next tugmalari */}
            <div className="button-container">
              <button
                type="button"
                className="back-btn"
                onClick={() => console.log("Back clicked")}
              >
                Back
              </button>
              <button type="submit" className="next-btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Next"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignUpPage;
