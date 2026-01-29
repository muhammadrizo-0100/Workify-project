// Dashboard.js eng yuqorisida
import { jwtDecode } from "jwt-decode";

// Keyin useEffect ichida:
useEffect(() => {
  // 1. Tokenni localStorage'dan olish
  const token = localStorage.getItem('token');
  console.log("🔍 Tokenni olish:", token ? "BOR" : "YO'Q");
  
  if (token) {
    // 2. Token'ni decode qilish
    try {
      const decoded = jwtDecode(token);
      console.log("✅ DECODED TOKEN:", decoded);
      
      // 3. Token'dan kompaniya ID'sini qidirish
      const companyId = decoded.companyId || decoded.id || decoded.userId || decoded.sub;
      console.log("🔑 Topilgan companyId:", companyId);
      
      // 4. Token'dan barcha ma'lumotlarni ko'rsatish
      console.log("📋 Token'dan barcha field'lar:");
      Object.keys(decoded).forEach(key => {
        console.log(`  ${key}: ${decoded[key]}`);
      });
      
    } catch (error) {
      console.log("❌ Token decode qilinmadi:", error);
    }
  }
}, []);