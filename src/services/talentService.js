// import { fetchAPI } from './api';

// // API dan talentlarni olish
// export const getTalents = async () => {
//     const result = await fetchAPI('/talent');

//     // Agar server xatolik bersa yoki ma'lumot bo'lmasa, mock ma'lumotlar qaytaramiz
//     if (!result.success || !result.data || result.data.length === 0) {
//         console.log('Mock ma\'lumotlar ishlatilmoqda...');
//         return getMockTalents();
//     }

//     // API dan kelgan ma'lumotlarni normalize qilish
//     return result.data.map(normalizeTalentData);
// };

// // Mock ma'lumotlar (rasmdagi kabi)
// const getMockTalents = () => {
//     return [
//         {
//             id: 1,
//             firstName: "Abrorbek",
//             lastName: "Ibrokhimov",
//             role: "UX / UI Designer",
//             city: "Ferghana, Uzbekistan",
//             price: 1250,
//             description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
//             skills: ["Figma (2 years)", "Adobe Photoshop (1 year)", "Adobe Photoshop (1 year)", "Adobe XD (1 year)"]
//         },
//         {
//             id: 2,
//             firstName: "John",
//             lastName: "Doe",
//             role: "Frontend Developer",
//             city: "Tashkent, Uzbekistan",
//             price: 1800,
//             description: "Experienced frontend developer with 5+ years in React and Vue.js. Passionate about creating responsive and user-friendly web applications.",
//             skills: ["React (5 years)", "Vue.js (3 years)", "JavaScript (6 years)", "TypeScript (2 years)"]
//         },
//         {
//             id: 3,
//             firstName: "Sarah",
//             lastName: "Smith",
//             role: "Backend Developer",
//             city: "Samarkand, Uzbekistan",
//             price: 2000,
//             description: "Backend specialist with expertise in Node.js and Python. Focus on scalable and secure server-side applications.",
//             skills: ["Node.js (4 years)", "Python (5 years)", "MongoDB (3 years)", "PostgreSQL (4 years)"]
//         },
//         {
//             id: 4,
//             firstName: "Alex",
//             lastName: "Johnson",
//             role: "Full Stack Developer",
//             city: "Andijan, Uzbekistan",
//             price: 2200,
//             description: "Full stack developer experienced in both frontend and backend technologies. Delivers end-to-end solutions.",
//             skills: ["React (4 years)", "Node.js (4 years)", "Express (4 years)", "MySQL (3 years)"]
//         },
//         {
//             id: 5,
//             firstName: "Maria",
//             lastName: "Garcia",
//             role: "UI/UX Designer",
//             city: "Bukhara, Uzbekistan",
//             price: 1500,
//             description: "Creative UI/UX designer focused on creating intuitive and beautiful user interfaces.",
//             skills: ["Figma (3 years)", "Sketch (2 years)", "Adobe XD (2 years)", "Prototyping (3 years)"]
//         },
//         {
//             id: 6,
//             firstName: "David",
//             lastName: "Kim",
//             role: "Mobile Developer",
//             city: "Namangan, Uzbekistan",
//             price: 1900,
//             description: "Mobile app developer specializing in React Native and Flutter. Builds cross-platform applications.",
//             skills: ["React Native (3 years)", "Flutter (2 years)", "iOS (4 years)", "Android (4 years)"]
//         }
//     ];
// };

// // API dan kelgan ma'lumotlarni normalize qilish
// const normalizeTalentData = (talent) => {
//     // API ning turli maydon nomlari bilan ishlash
//     return {
//         id: talent.id || talent._id || Math.random(),
//         firstName: talent.firstName || talent.firstname || talent.name?.split(' ')[0] || 'User',
//         lastName: talent.lastName || talent.lastname || talent.name?.split(' ').slice(1).join(' ') || '',
//         role: talent.role || talent.position || talent.profession || talent.jobTitle || 'Freelancer',
//         city: talent.city || talent.location || talent.address || talent.country || 'Location not specified',
//         price: talent.price || talent.hourlyRate || talent.salary || talent.rate || 1250,
//         description: talent.description || talent.bio || talent.about || talent.summary ||
//             "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
//         skills: Array.isArray(talent.skills) ? talent.skills :
//             Array.isArray(talent.technologies) ? talent.technologies :
//                 Array.isArray(talent.tags) ? talent.tags :
//                     ["Figma (2 years)", "Adobe Photoshop (1 year)", "Adobe XD (1 year)"]
//     };
// };