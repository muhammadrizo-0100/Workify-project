import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// 🔴 TOKEN BILAN ISHLAYDI - Dashboard.js
export default function Dashboard() {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [profilePercent, setProfilePercent] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. TOKEN'NI TEKSHIRISH VA DECODE QILISH
  useEffect(() => {
    console.log("🔄 Dashboard yuklanmoqda...");
    
    const token = localStorage.getItem("token");
    console.log("🔍 Tokenni tekshirish:", token ? "MAVJUD" : "YO'Q");

    if (token) {
      try {
        // Token'ni decode qilish
        const decoded = jwtDecode(token);
        console.log("✅ DECODED TOKEN:", decoded);
        
        // Token ma'lumotlarini saqlash
        setTokenInfo(decoded);
        
        // Kompaniya ID'sini topish
        const companyId = decoded.companyId || decoded.id || decoded.userId || decoded.sub;
        console.log("🔑 Topilgan companyId:", companyId);
        
        if (companyId) {
          // API dan kompaniya ma'lumotlarini olish
          fetchCompanyProfile(companyId);
        } else {
          console.error("❌ Tokenda companyId topilmadi");
          setLoading(false);
        }

      } catch (error) {
        console.error("❌ Token decode qilishda xato:", error);
        setLoading(false);
      }
    } else {
      console.error("❌ Token yo'q! Login qilishingiz kerak.");
      setLoading(false);
    }
  }, []);

  // 2. API DAN KOMPANIYA PROFILINI OLISH
  const fetchCompanyProfile = async (companyId) => {
    try {
      console.log(`📡 API ga so'rov: /company/${companyId}`);
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `https://workifybackend-production.up.railway.app/api/company/${companyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API xatosi: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API javobi:", data);
      setCompanyData(data);
      
      // Profil foizini hisoblash
      calculateProfilePercent(data);
      
    } catch (error) {
      console.error("❌ API so'rovida xato:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. PROFIL FOIZINI HISOBLASH
  const calculateProfilePercent = (data) => {
    const fields = [
      { key: "name", required: true },
      { key: "email", required: true },
      { key: "description", required: false },
      { key: "website", required: false },
      { key: "location", required: false },
      { key: "industry", required: false },
      { key: "size", required: false },
      { key: "logo", required: false },
    ];

    let filledRequired = 0;
    let totalRequired = 0;
    let filledOptional = 0;
    let totalOptional = 0;

    fields.forEach((field) => {
      const value = data[field.key];
      const isFilled = value && value.toString().trim() !== "";

      if (field.required) {
        totalRequired++;
        if (isFilled) filledRequired++;
      } else {
        totalOptional++;
        if (isFilled) filledOptional++;
      }
    });

    // Foizni hisoblash (70% majburiy + 30% ixtiyoriy)
    const requiredPercent = (filledRequired / totalRequired) * 70;
    const optionalPercent = (filledOptional / totalOptional) * 30;
    const totalPercent = Math.round(requiredPercent + optionalPercent);

    setProfilePercent(totalPercent);
    console.log(`📊 Profil foizi: ${totalPercent}%`);
  };

  // 4. TEST TOKEN QO'SHISH FUNKSIYASI
  const addTestToken = () => {
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29tcGFueUlkIjoxLCJuYW1lIjoiVGVjaENvcnAiLCJlbWFpbCI6ImNvbnRhY3RAdGVjaGNvcnAuY29tIiwiaWF0IjoxNzE3MDYyMDAwLCJleHAiOjE3MTc2NjY4MDB9.fake-signature";
    
    localStorage.setItem("token", testToken);
    alert("✅ Test token qo'shildi! Sahifani yangilang (F5).");
    console.log("Test token qo'shildi:", testToken);
  };

  // 5. TOKEN'NI O'CHIRISH
  const removeToken = () => {
    localStorage.removeItem("token");
    alert("🗑️ Token o'chirildi! Sahifani yangilang (F5).");
    window.location.reload();
  };

  // 6. TEST MA'LUMOTLAR
  const jobStats = {
    byCompany: [
      { name: "TechCorp", count: 15 },
      { name: "StartUp", count: 8 },
      { name: "DigitalLab", count: 6 },
      { name: "BiznesSoft", count: 4 },
    ],
    totalPosts: 33,
  };

  const profileViewsData = [
    { day: "Mon", views: 120 },
    { day: "Tue", views: 190 },
    { day: "Wed", views: 130 },
    { day: "Thu", views: 170 },
    { day: "Fri", views: 220 },
    { day: "Sat", views: 90 },
    { day: "Sun", views: 70 },
  ];

  // 7. YUKLASH HOLATI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-4">
            Dashboard yuklanmoqda...
          </div>
          <div className="text-gray-600">
            Token tekshirilmoqda va ma'lumotlar yuklanmoqda
          </div>
        </div>
      </div>
    );
  }

  // 8. ASOSIY UI
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔐 TOKEN MA'LUMOTLARI PANELI */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              🔐 Token Ma'lumotlari
            </h2>
            <div className="flex gap-3">
              <button
                onClick={addTestToken}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Test Token Qo'shish
              </button>
              <button
                onClick={removeToken}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Tokenni O'chirish
              </button>
            </div>
          </div>

          {tokenInfo ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(tokenInfo).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-3 rounded ${
                      key.includes("Id") || key === "companyId"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="font-semibold text-gray-700 mb-1">
                      {key}:
                    </div>
                    <div className="text-gray-900 font-mono text-sm">
                      {JSON.stringify(value)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Company ID xulosasi */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="font-semibold">🔑 Kompaniya ID'si:</div>
                <div className="text-lg font-bold mt-1">
                  {tokenInfo.companyId || tokenInfo.id || tokenInfo.userId || "Topilmadi"}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-red-50 rounded-lg">
              <div className="text-2xl mb-2">❌</div>
              <div className="text-xl font-semibold text-red-700 mb-2">
                Token topilmadi!
              </div>
              <div className="text-gray-600 mb-4">
                Iltimos, avval tizimga kiring yoki test token qo'shing.
              </div>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Login qilish
              </button>
            </div>
          )}
        </div>

        {/* 📊 ASOSIY DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PROFIL FOIZI */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-gray-800 font-semibold text-xl mb-6">
              Profile Completion
            </h3>

            <div className="flex flex-col items-center">
              {/* Progress Circle */}
              <div className="relative mb-8">
                <svg width="180" height="180" className="-rotate-90">
                  <circle
                    cx="90"
                    cy="90"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="80"
                    stroke="#4F46E5"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="502.4"
                    strokeDashoffset={502.4 - (502.4 * profilePercent) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gray-800">
                    {profilePercent}%
                  </span>
                  <span className="text-gray-500 mt-2">Completed</span>
                </div>
              </div>

              {/* Kompaniya ma'lumotlari */}
              {companyData && (
                <div className="w-full mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Kompaniya ma'lumotlari:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nomi:</span>
                      <span className="font-medium">
                        {companyData.name || "Yo'q"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">
                        {companyData.email || "Yo'q"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Manzil:</span>
                      <span className="font-medium">
                        {companyData.location || "Yo'q"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button className="w-full mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">
                Profilni to'ldirish
              </button>
            </div>
          </div>

          {/* PROFILE VIEWS CHART */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-800 font-semibold text-xl">
                Profile Views
              </h3>
              <span className="text-gray-600 font-medium">This week</span>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profileViewsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f3f4f6"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, "dataMax + 50"]}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-2xl">📊</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    {jobStats.totalPosts}
                  </div>
                  <div className="text-gray-500">Total job posts</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-green-600 text-2xl">🏢</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    {jobStats.byCompany.length}
                  </div>
                  <div className="text-gray-500">Companies</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-2xl">📈</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    {jobStats.byCompany.length > 0
                      ? (jobStats.totalPosts / jobStats.byCompany.length).toFixed(1)
                      : "0.0"}
                  </div>
                  <div className="text-gray-500">Avg posts/company</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📝 FOOTER YO'RIQNOMA */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🚀 Dashboard Yo'riqnoma
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-700 mb-2">
                Token yo'q bo'lsa:
              </div>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>"Test Token Qo'shish" tugmasini bosing</li>
                <li>Sahifani yangilang (F5)</li>
                <li>Token ma'lumotlari ko'rinadi</li>
              </ol>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-700 mb-2">
                Token bor bo'lsa:
              </div>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Token avtomatik decode qilinadi</li>
                <li>Kompaniya ID'si olinadi</li>
                <li>API dan kompaniya ma'lumotlari yuklanadi</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}













// import React, { useState, useEffect } from "react";
// import {
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   BarChart,
//   Bar
// } from "recharts";

// // Card komponentlari
// function Card({ children, className = "" }) {
//   return <div className={`bg-white rounded-2xl shadow-lg ${className}`}>{children}</div>;
// }

// function CardContent({ children, className = "" }) {
//   return <div className={className}>{children}</div>;
// }

// // 🔴 ProfileCompleted - Faqat bu komponent ko'rinadi register qilmaganlar uchun
// function ProfileCompleted() {
//   const [percent, setPercent] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           setIsLoggedIn(false);
//           setPercent(0);
//           setLoading(false);
//           return;
//         }
        
//         console.log("Token mavjud:", token.substring(0, 20) + "...");
        
//         // User ma'lumotlarini olish
//         try {
//           const userRes = await fetch(
//             'https://workifybackend-production.up.railway.app/api/users/me',
//             { 
//               headers: { 
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             }
//           );
          
//           if (userRes.ok) {
//             const userData = await userRes.json();
//             setIsLoggedIn(true);
//             setUserName(userData.name || userData.email || "Foydalanuvchi");
            
//             if (userData.companyId) {
//               try {
//                 const companyRes = await fetch(
//                   `https://workifybackend-production.up.railway.app/api/company/${userData.companyId}`,
//                   { headers: { 'Authorization': `Bearer ${token}` } }
//                 );
                
//                 if (companyRes.ok) {
//                   const companyData = await companyRes.json();
//                   calculateProfilePercentage(companyData);
//                 } else {
//                   calculateProfilePercentage(userData);
//                 }
//               } catch (companyError) {
//                 calculateProfilePercentage(userData);
//               }
//             } else {
//               calculateProfilePercentage(userData);
//             }
//             return;
//           }
//         } catch (userError) {
//           console.log("users/me endpoint ishlamayapti");
//         }
        
//         // Company endpoint ni tekshirish
//         try {
//           const companyRes = await fetch(
//             'https://workifybackend-production.up.railway.app/api/company/me',
//             { headers: { 'Authorization': `Bearer ${token}` } }
//           );
          
//           if (companyRes.ok) {
//             const companyData = await companyRes.json();
//             setIsLoggedIn(true);
//             setUserName(companyData.name || companyData.email || "Kompaniya");
//             calculateProfilePercentage(companyData);
//             return;
//           }
//         } catch (companyError) {
//           console.log("company/me endpoint ishlamayapti");
//         }
        
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//         setPercent(0);
        
//       } catch (error) {
//         console.error("Auth tekshirish xatosi:", error);
//         setIsLoggedIn(false);
//         setPercent(0);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     function calculateProfilePercentage(data) {
//       if (!data) {
//         setPercent(30);
//         return;
//       }
      
//       const mandatoryFields = ['email', 'password'];
//       const otherFields = ['name', 'phone', 'address', 'description', 'website', 'industry'];
      
//       let filledMandatory = 0;
//       let filledOptional = 0;
      
//       mandatoryFields.forEach(field => {
//         if (data[field] && data[field].toString().trim() !== '') {
//           filledMandatory++;
//         }
//       });
      
//       otherFields.forEach(field => {
//         if (data[field] && data[field].toString().trim() !== '') {
//           filledOptional++;
//         }
//       });
      
//       const calculatedPercent = 30 + (filledMandatory * 15) + (filledOptional * 11.666);
//       setPercent(Math.min(Math.round(calculatedPercent), 100));
//     }
    
//     checkAuth();
//   }, []);

//   const size = 160;
//   const strokeWidth = 12;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (circumference * percent) / 100;

//   return (
//     <Card className="w-[400px]">
//       <CardContent className="p-8">
//         <h3 className="text-gray-800 font-semibold text-xl mb-6">Profile completed</h3>
        
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-gray-500">Yuklanmoqda...</div>
//           </div>
//         ) : !isLoggedIn ? (
//           // 🔴 REGISTER QILMAGANLAR UCHUN - KATTA KARTADA
//           <div className="flex flex-col items-center justify-center py-8">
//             <div className="text-center mb-8">
//               <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
//                 <span className="text-6xl">👤</span>
//               </div>
//               <h4 className="text-2xl font-bold text-gray-800 mb-3">Profilingiz yo'q</h4>
//               <p className="text-gray-600 text-base max-w-[320px] mx-auto leading-relaxed">
//                 Dashboard ning to'liq imkoniyatlaridan foydalanish uchun ro'yxatdan o'ting
//               </p>
//             </div>
            
//             <div className="space-y-4 w-full max-w-[280px]">
//               <button 
//                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
//                 onClick={() => window.location.href = "/register"}
//               >
//                 Ro'yxatdan o'tish
//               </button>
              
//               <button 
//                 className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:bg-gray-50 transition-all"
//                 onClick={() => window.location.href = "/login"}
//               >
//                 Kirish
//               </button>
//             </div>
            
//             <div className="mt-10 text-center">
//               <p className="text-gray-700 font-medium mb-3">Ro'yxatdan o'tganingizdan so'ng:</p>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[400px]">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="text-blue-600 text-2xl mb-2">📊</div>
//                   <p className="text-sm font-medium text-gray-700">Profil to'ldirish foizi</p>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="text-green-600 text-2xl mb-2">📈</div>
//                   <p className="text-sm font-medium text-gray-700">Shaxsiy statistika</p>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <div className="text-purple-600 text-2xl mb-2">⚙️</div>
//                   <p className="text-sm font-medium text-gray-700">Boshqaruv paneli</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           // 🔴 LOGIN QILGANLAR UCHUN - NORMAL KARTADA
//           <div className="flex flex-col items-center justify-center">
//             <div className="relative mb-6">
//               <svg width={size} height={size} className="-rotate-90">
//                 <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
//                 <circle cx={size/2} cy={size/2} r={radius} stroke="#4F46E5" strokeWidth={strokeWidth} fill="none"
//                   strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
//               </svg>
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className="text-4xl font-bold text-gray-800">{percent}%</span>
//                 <span className="text-sm text-gray-500 mt-1">Profile</span>
//               </div>
//             </div>
            
//             <div className="text-center">
//               <p className="text-gray-700 font-medium mb-1">
//                 {userName}
//               </p>
//               <p className="text-gray-500 text-sm mb-4">
//                 {percent === 100 ? "Profil to'liq to'ldirilgan! 🎉" : 
//                  "Profilni to'ldiring va imkoniyatlaringizni oshiring"}
//               </p>
              
//               <div className="flex gap-2">
//                 <button 
//                   className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
//                   onClick={() => window.location.href = "/profile/edit"}
//                 >
//                   Profilni to'ldirish
//                 </button>
                
//                 <button 
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
//                   onClick={() => {
//                     localStorage.removeItem('token');
//                     window.location.reload();
//                   }}
//                 >
//                   Chiqish
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // 🔴 QOLGAN KOMPONENTLAR - Faqat isLoggedIn=true bo'lsa ko'rinadi
// function ProfileViews() {
//   const [viewsData, setViewsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const generateMockData = () => {
//       const days = ["M", "T", "W", "T", "F", "S", "S"];
//       return days.map(day => ({
//         day,
//         views: Math.floor(Math.random() * 50) + 50
//       }));
//     };
    
//     setTimeout(() => {
//       setViewsData(generateMockData());
//       setLoading(false);
//     }, 500);
//   }, []);

//   return (
//     <Card className="flex-1">
//       <CardContent className="p-8 h-full">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-gray-800 font-semibold text-xl">Profile views</h3>
//           <span className="text-gray-600 text-base font-medium">This week</span>
//         </div>
        
//         <div className="h-[300px] w-full min-h-[300px]">
//           {loading ? (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-gray-500">Yuklanmoqda...</div>
//             </div>
//           ) : (
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={true} vertical={false} />
//                 <XAxis dataKey="day" axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
//                 <YAxis axisLine={false} tickLine={false} domain={[0, 'dataMax + 20']} />
//                 <Tooltip formatter={(value) => [`${value}`, 'views']} />
//                 <Line type="monotone" dataKey="views" stroke="#4f46e5" strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function JobPosts() {
//   const [jobStats, setJobStats] = useState({ byCompany: [], totalPosts: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         const response = await fetch('https://workifybackend-production.up.railway.app/api/jobs');
        
//         if (!response.ok) {
//           throw new Error("Jobs olinmadi");
//         }
        
//         const jobs = await response.json();
        
//         const companyMap = {};
//         jobs.forEach(job => {
//           const company = job.company_name || job.company || "Noma'lum kompaniya";
//           companyMap[company] = (companyMap[company] || 0) + 1;
//         });
        
//         const companyArray = Object.entries(companyMap)
//           .map(([name, count]) => ({ name, count }))
//           .sort((a, b) => b.count - a.count);
        
//         setJobStats({
//           byCompany: companyArray,
//           totalPosts: jobs.length
//         });
        
//       } catch (error) {
//         console.error("Jobs yuklash xatosi:", error);
//         setJobStats({ byCompany: [], totalPosts: 0 });
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchJobs();
//   }, []);

//   const jobPostsChartData = jobStats.byCompany.slice(0, 10).map((company, index) => ({
//     name: company.name.length > 6 ? company.name.substring(0, 6) + ".." : company.name,
//     posts: company.count,
//     fullName: company.name,
//     index: index
//   }));

//   return (
//     <Card>
//       <CardContent className="p-8">
//         <h3 className="text-gray-800 font-semibold text-xl mb-6">Job posts</h3>
        
//         {loading ? (
//           <div className="flex items-center justify-center h-72">
//             <div className="text-gray-500">Yuklanmoqda...</div>
//           </div>
//         ) : jobStats.totalPosts === 0 ? (
//           <div className="flex flex-col items-center justify-center h-72">
//             <div className="text-gray-400 text-5xl mb-4">💼</div>
//             <p className="text-gray-500 mb-2">Ish o'rinlari mavjud emas</p>
//             <p className="text-gray-400 text-sm text-center">
//               Hozircha hech qanday ish e'lon qilinmagan
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="h-[350px] w-full min-h-[350px] mb-8">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={jobPostsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
//                   <XAxis 
//                     dataKey="name" 
//                     axisLine={{ stroke: '#e5e7eb' }} 
//                     tickLine={false}
//                   />
//                   <YAxis 
//                     axisLine={false} 
//                     tickLine={false}
//                     domain={[0, 'dataMax + 2']}
//                   />
//                   <Tooltip 
//                     formatter={(value) => [`${value} ta`, 'E\'lonlar']}
//                     labelFormatter={(label, items) => {
//                       if (items && items[0]) {
//                         return jobPostsChartData[items[0].dataIndex]?.fullName || label;
//                       }
//                       return label;
//                     }}
//                   />
//                   <Bar 
//                     dataKey="posts" 
//                     fill="#4f46e5" 
//                     radius={[4, 4, 0, 0]}
//                     barSize={40}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-blue-50 p-4 rounded-xl">
//                 <p className="text-gray-500 text-sm mb-1">Jami e'lonlar</p>
//                 <p className="text-2xl font-bold text-gray-800">{jobStats.totalPosts}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-xl">
//                 <p className="text-gray-500 text-sm mb-1">Kompaniyalar soni</p>
//                 <p className="text-2xl font-bold text-gray-800">{jobStats.byCompany.length}</p>
//               </div>
//             </div>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// function StatisticsCard({ title, value, change, icon, color }) {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-gray-500 text-sm mb-2">{title}</p>
//             <p className="text-2xl font-bold text-gray-800">{value}</p>
//             <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//               <span className="text-sm font-medium">
//                 {change >= 0 ? '+' : ''}{change}%
//               </span>
//               <span className="text-gray-500 text-sm ml-2">from last week</span>
//             </div>
//           </div>
//           <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
//             <span className="text-2xl">{icon}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function RecentApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchApplications() {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const response = await fetch(
//           'https://workifybackend-production.up.railway.app/api/applications/recent',
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setApplications(data);
//         } else {
//           // Mock data agar API ishlamasa
//           const mockData = [
//             { id: 1, job_title: 'Frontend Developer', applicant_name: 'Ali Valiyev', status: 'review', date: '2024-01-20' },
//             { id: 2, job_title: 'Backend Engineer', applicant_name: 'Dilnoza Karimova', status: 'accepted', date: '2024-01-19' },
//             { id: 3, job_title: 'UI/UX Designer', applicant_name: 'Sherzod Qodirov', status: 'rejected', date: '2024-01-18' },
//             { id: 4, job_title: 'Project Manager', applicant_name: 'Maftuna Yusupova', status: 'review', date: '2024-01-17' },
//             { id: 5, job_title: 'DevOps Specialist', applicant_name: 'Javohir Tursunov', status: 'review', date: '2024-01-16' },
//           ];
//           setApplications(mockData);
//         }
//       } catch (error) {
//         console.error('Ariza yuklash xatosi:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchApplications();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'accepted': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'review': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'accepted': return 'Qabul qilindi';
//       case 'rejected': return 'Rad etildi';
//       case 'review': return 'Ko\'rib chiqilmoqda';
//       default: return status;
//     }
//   };

//   return (
//     <Card className="flex-1">
//       <CardContent className="p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-gray-800 font-semibold text-xl">Recent applications</h3>
//           <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700">
//             See all →
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-gray-500">Yuklanmoqda...</div>
//           </div>
//         ) : applications.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64">
//             <div className="text-gray-400 text-5xl mb-4">📄</div>
//             <p className="text-gray-500 mb-2">Hozircha arizalar yo'q</p>
//             <p className="text-gray-400 text-sm text-center">
//               Ish e'lonlariga arizalar kelganda, ular shu yerda ko'rinadi
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {applications.map((app) => (
//               <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                     <span className="text-indigo-600 font-semibold">
//                       {app.applicant_name?.charAt(0) || 'A'}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">{app.job_title}</p>
//                     <p className="text-sm text-gray-500">{app.applicant_name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-6">
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
//                     {getStatusText(app.status)}
//                   </span>
//                   <span className="text-gray-500 text-sm">
//                     {new Date(app.date).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // 🔴 ASOSIY DASHBOARD KOMPONENTI
// function Dashboard() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-gray-500">Dashboard yuklanmoqda...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       {!isLoggedIn ? (
//         // 🔴 RO'YXATDAN O'TMAGANLAR UCHUN - FAQAT MODAL KO'RINISH
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <ProfileCompleted />
//         </div>
//       ) : (
//         // 🔴 RO'YXATDAN O'TGANLAR UCHUN - TO'LIQ DASHBOARD
//         <>
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
//             <p className="text-gray-600">Workify platformasiga xush kelibsiz</p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatisticsCard 
//               title="Total Jobs Posted"
//               value="124"
//               change={12}
//               icon="💼"
//               color="bg-blue-500"
//             />
//             <StatisticsCard 
//               title="Applications"
//               value="89"
//               change={8}
//               icon="📄"
//               color="bg-green-500"
//             />
//             <StatisticsCard 
//               title="Profile Views"
//               value="1,234"
//               change={23}
//               icon="👁️"
//               color="bg-purple-500"
//             />
//             <StatisticsCard 
//               title="Messages"
//               value="42"
//               change={-5}
//               icon="💬"
//               color="bg-yellow-500"
//             />
//           </div>

//           {/* Charts Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//             <ProfileCompleted />
//             <ProfileViews />
//           </div>

//           {/* Bottom Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <JobPosts />
//             <RecentApplications />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;