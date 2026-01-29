import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api.js"
import { IoMdMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: false, password: false });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Agar token bo'lsa avtomatik yo'naltirish
    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            navigate("/myProfile", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        if (id === "remember") {
            setRememberMe(checked);
        } else {
            setFormData((p) => ({ ...p, [id]: value }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email kiriting";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email formati noto'g'ri";
        }

        if (!formData.password) {
            newErrors.password = "Parol kiriting";
        }

        return newErrors;
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Email yoki parol noto'g'ri");
            return;
        }

        setLoading(true);

        const result = await fetchAPI("/company/login", {
            method: "POST",
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        setLoading(false);

        if (!result.success) {
            toast.error(result.error || "Login amalga oshmadi");
            setErrors({ email: true, password: true });
            return;
        }
        const token =
            result.data.token ||
            result.data.data?.token ||
            result.data.accessToken;

        if (!token) {
            toast.error("Token topilmadi");
            return;
        }

        if (rememberMe) {
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }

        toast.success("Muvaffaqiyatli login!");
        navigate("/dashboard", { replace: true });
    };

    return (
        <>
            <Toaster
                toastOptions={{
                    // Global toast options
                    duration: 4000,
                    style: {
                        fontSize: '14px',
                        fontWeight: '500',
                        borderRadius: '8px',
                        padding: '12px 16px',
                    },
                    success: {
                        style: {
                            background: '#f0fdf4',
                            color: '#166534',
                            border: '1px solid #86efac',
                        },
                        iconTheme: {
                            primary: '#16a34a',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        style: {
                            background: '#fef2f2',
                            color: '#991b1b',
                            border: '1px solid #fca5a5',
                        },
                        iconTheme: {
                            primary: '#dc2626',
                            secondary: '#fff',
                        },
                    },
                }}
                containerStyle={{
                    top: 80,
                    right: 20,
                }}
            />

            <div className="login-container">
                <div className="login">
                    <h2>Login</h2>
                    <div className="login-details">
                        <div className="email-container">
                            <label htmlFor="email">Email</label>
                            <div className={`email-input ${errors.email ? "input-error" : ""}`}>
                                <IoMdMail className="signin-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="password-container">
                            <label htmlFor="password">Password</label>
                            <div className={`password-input ${errors.password ? "input-error" : ""}`}>
                                <MdLock className="signin-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="signin-icon2"
                                    onClick={() => setShowPassword((s) => !s)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="remember-forgot">
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={handleChange}
                                />
                                <p>Remember me</p>
                            </div>
                            <Link to="/forgot-password-1" className="forgot-password">Forgot password?</Link>
                        </div>
                        <button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                        <div className="register">
                            <p>Have no account yet? <span><Link to="/signup">Register</Link></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;