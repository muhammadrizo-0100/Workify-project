// src/pages/Jobs.jsx
import { Link } from 'react-router-dom';
import { IoWalletOutline } from "react-icons/io5";

function Jobs() {
    // keyinchalik API dan keladi
    const mockJobs = [
        {
            id: 1,
            title: "Senior React Developer",
            company: "TechNova",
            location: "Toshkent (remote)",
            salary: "15–25 mln so'm",
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Hub",
            location: "Toshkent",
            salary: "12–18 mln so'm",
        },
        {
            id: 3,
            title: "Node.js Backend Developer",
            company: "Payme",
            location: "Toshkent",
            salary: "18–30 mln so'm",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-[1114px] mx-auto px-5">

                {/* Sarlavha va qidiruv */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <h1 className="text-3xl font-bold text-[#163D5C] flex items-center gap-3">
                        <IoWalletOutline size={32} />
                        Jobs
                    </h1>

                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Lavozim, kompaniya yoki shahar bo'yicha..."
                            className="w-full md:w-80 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#163D5C]"
                        />
                        <button className="px-8 py-3 bg-[#163D5C] text-white font-semibold rounded-xl hover:bg-[#0f2e48] transition">
                            Qidirish
                        </button>
                    </div>
                </div>

                {/* Ish kartalari */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockJobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 flex flex-col"
                        >
                            <h3 className="font-bold text-xl text-[#163D5C] mb-2">{job.title}</h3>
                            <p className="text-gray-700 font-medium mb-1">{job.company}</p>
                            <p className="text-gray-500 mb-4">📍 {job.location}</p>

                            <div className="mt-auto">
                                <p className="text-green-600 font-semibold mb-4">{job.salary}</p>
                                <Link
                                    to={`/jobs/${job.id}`}
                                    className="inline-block px-6 py-2 bg-[#163D5C] text-white rounded-lg hover:bg-[#0f2e48] transition"
                                >
                                    Ariza yuborish
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {mockJobs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Hozircha ish o'rinlari mavjud emas...
                    </div>
                )}

            </div>
        </div>
    );
}

export default Jobs;