import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Talents from "./pages/Talent";
import Jobs from "./pages/Jobs";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/talents" element={<Talents />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;